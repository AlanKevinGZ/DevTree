import { LitElement, html, css } from "lit";
import { LoginService } from "../../services/login-service/login-services";
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css';

export class LoginPage extends LitElement {
  static styles = css`
    :host {
      background-color: #1b2533;
      display: flex;
      flex-direction: column; /* Aseguramos que los elementos estén apilados */
      align-items: center;
      justify-content: center;
      height: 100vh;
      box-sizing: border-box;
    }

    label {
      color: white;
      display: block;
      margin-bottom: 0.5rem;
    }

    .main_header {
      width: 100%;
      max-width: 400px; 
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem; 
    }

    .main_header img {
      width: 60%; 
    }

    .container {
      width: 100%;
      max-width: 400px; 
      margin: 0 auto;
      padding: 1rem;
      box-sizing: border-box;
    }

    .login_form {
      display: flex;
      flex-direction: column; 
      gap: 1rem; 
    }

    .input_form input {
      width: 100%;
      padding: 0.75rem; 
      margin:1rem 0;
      border: none;
      border-radius: 5px;
      box-sizing: border-box;
    }

    .input_form input[type="submit"] {
        cursor:pointer;
        background-color:#8fcc33;
        font-weight:bold;
        font-size:1.1rem;
    }

    a{
        text-decoration:none;
        color:white;
    }

    .error {
      color: red;
      font-size: 0.85rem;
      margin-top: -0.5rem;
      margin-bottom: 0.5rem;
    }
  `;


  constructor() {
    super();
    this.loginAccout = new LoginService();
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


  async onSubmitLogin(e) {
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

    try {
        const result = await this.loginAccout.postLogin(formData);

        if (result.errors) {
            this.errors = this.processBackendErrors(result.errors);
            this.requestUpdate();
            return;
        }

        if (result.msg) {
            this.msg = result.msg;
            this.showErrorNotification(this.msg);
            return;
        }
        localStorage.setItem('AUTH_TOKEN',result.response)
       this.showSuccessNotification('Bienvenido...')

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
        email: this.shadowRoot.querySelector("#email").value.trim(),
        password: this.shadowRoot.querySelector("#password").value.trim(),
    };
}

validateFields(formData) {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'El email debe ser válido.';
  }

  if (!formData.password || formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  } else if (!/\d/.test(formData.password)) {
      errors.password = 'La contraseña debe incluir al menos un número.';
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

showErrorNotification(message) {
  this.notyf.error(message);
}


  render() {
    return html`
      <div class="main_header">
        <img src="./src/assets/logo.svg" alt="" />
      </div>
      <div class="container">
        <div class="login_form">
          <form  @submit=${(e) => this.onSubmitLogin(e)}>
            <div class="input_form">
              <label for="email">Email:</label>
              <input type="email" id="email" placeholder="Ingresa tu correo" />
              ${this.errors.email ? html`<p class="error">${this.errors.email}</p>` : ''}
            </div>

            
            <div class="input_form">
                <label for="password">Contraseña:</label>
              <input type="password" id="password" placeholder="Crea tu contraseña" />
              ${this.errors.password
                ? html`<p class="error">${this.errors.password}</p>`
                : ''}
            </div>

            <div class="input_form">
              <input type="submit"  value="Acceder"/>
            </div>

            <div class="options_form">
               <a href="/register">No tienes una cuenta? Crea una</a>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("login-page", LoginPage);
