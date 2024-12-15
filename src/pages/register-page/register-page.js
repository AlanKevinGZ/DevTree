import { LitElement, html, css } from 'lit';
import { CreateAccount } from '../../services/crear-accout-services/create-accounts-services';
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 

export class RegisterPage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #1b2533;
      height: 100vh;
      box-sizing: border-box;
      padding: 1rem;
    }

    .icon {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .icon img {
      width: 65%;
    }

    .form-container {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
    }

    .form-container h1 {
      text-align: center;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      color: #333;
    }

    .form-container label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: bold;
    }

    .form-container input {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 1rem;
    }

    .form-container button {
      width: 100%;
      padding: 0.75rem;
      background-color: #00baef;
      color: #ffffff;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-bottom: 1rem;
    }

    .form-container button:hover {
      background-color: #333;
    }

    a {
      text-decoration: none;
      color: black;
    }

    .error {
      color: red;
      font-size: 0.85rem;
      margin-top: -0.5rem;
      margin-bottom: 0.5rem;
    }

    .error_msg {
      color: red;
      text-align:center;
      width:100%;
      padding:5px 0;
    }

    .sucess{
      background-color: rgb(15, 212, 15);
      text-align:center;
      width:100%;
      padding:5px 0;
    }
  `;

  constructor() {
    super();
    this.createAccount = new CreateAccount();
    this.errors = {};
    this.notyf = new Notyf({
      duration: 5000,
      position: {
        x: 'right', 
        y: 'top',  
      },
    });
  }

  static get properties() {
    return {
      errors: { type: Object },
      msg: { type: String }
    };
  }

  async onSubmitRegister(e) {
    e.preventDefault();

    this.errors = {};
    this.msg = "";
    this.requestUpdate();

    const formData = this.getInfoUserForm();

    const validationErrors = this.validateFields(formData);
    if (Object.keys(validationErrors).length > 0) {
        this.errors = validationErrors;
        this.requestUpdate();
        return; 
    }

    const { passwordRepeat, ...dataToSend } = formData; 

    try {
        const result = await this.createAccount.postInfo(dataToSend);

        if (result.errors) {
            this.errors = this.processBackendErrors(result.errors);
            this.requestUpdate();
            return;
        }

        if (result.msg=='El usuario ya existe.') {
            this.msg = result.msg;
            this.requestUpdate();
            this.clearInfo(); 
        }else{
          this.showSuccessNotification('Usuario creado exitosamente');
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        this.errors.server = "Error al comunicarse con el servidor.";
        this.requestUpdate();
    }
}

processBackendErrors(backendErrors) {
    return backendErrors.reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
    }, {});
}

getInfoUserForm() {
    return {
        name: this.shadowRoot.querySelector("#name").value.trim(),
        email: this.shadowRoot.querySelector("#email").value.trim(),
        password: this.shadowRoot.querySelector("#password").value.trim(),
        passwordRepeat: this.shadowRoot.querySelector("#password-repit").value.trim(),
        handle: this.shadowRoot.querySelector("#username").value.trim(),
    };
}

validateFields(formData) {
  const errors = {};

  if (!formData.name || formData.name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'El email debe ser válido.';
  }

  if (!formData.password || formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  } else if (!/\d/.test(formData.password)) {
      errors.password = 'La contraseña debe incluir al menos un número.';
  }

  if (!formData.handle || typeof formData.handle !== 'string' || formData.handle.trim() === '') {
      errors.username = 'El handle es obligatorio y debe ser un texto válido.';
  }

  if (formData.password !== formData.passwordRepeat) {
      errors.passwordMatch = 'Las contraseñas no coinciden.';
  }

  return errors;
}

clearInfo() {
    setTimeout(() => {
        this.msg = "";
        this.requestUpdate();
    }, 1200);
}

showSuccessNotification(message) {
  this.notyf.success(message);
}

  render() {
    return html`
      <div class="icon">
        <img src="./src/assets/logo.svg" alt="Logo" />
      </div>
      <div class="form-container">
        <h1>Registro</h1>
        <h2>${this.msg=='Usuario creado con éxito' ? html`<p class="sucess">${this.msg}</p>` :  html`<p class="error_msg">${this.msg}</p>`}</h2>
        <form @submit=${(e) => this.onSubmitRegister(e)}>
          <label for="name">Nombre:</label>
          <input type="text" id="name" placeholder="Ingresa tu nombre" />
          ${this.errors.name ? html`<p class="error">${this.errors.name}</p>` : ''}

          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="Ingresa tu correo" />
          ${this.errors.email ? html`<p class="error">${this.errors.email}</p>` : ''}

          <label for="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            placeholder="Ejemplo: codigoconjuan"
          />
          ${this.errors.username
            ? html`<p class="error">${this.errors.username}</p>`
            : ''}

          <label for="password">Contraseña:</label>
          <input type="password" id="password" placeholder="Crea tu contraseña" />
          ${this.errors.password
            ? html`<p class="error">${this.errors.password}</p>`
            : ''}

          <label for="password-repit">Reptir Contraseña:</label>
          <input type="password" id="password-repit" placeholder="Crea tu contraseña" />
          ${this.errors.passwordMatch
        ? html`<p class="error">${this.errors.passwordMatch}</p>`
        : ''}
          <button type="submit">Registrar</button>

          <a href="/login">Ya tienes Cuenta? Inicia Sesion</a>
        </form>
      </div>
    `;
  }
}

customElements.define('register-page', RegisterPage);
