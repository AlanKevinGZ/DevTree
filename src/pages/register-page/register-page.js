import { LitElement, html, css } from 'lit';

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
      width: 65%; /* Tamaño del ícono */
    }

    .form-container {
      width: 100%;
      max-width: 400px; /* Limitar el ancho máximo del formulario */
      padding: 2rem;
      border: 1px solid #ddd; /* Borde ligero */
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil */
      background-color: #ffffff;
    }

    .form-container h1 {
      text-align: center;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      color: #333; /* Color del texto */
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
      margin-bottom: 1rem;
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
      margin-bottom:1rem;
    }

    .form-container button:hover {
      background-color: #333;
    }

    a{
        text-decoration:none;
        color:black;
    }
  `;

  render() {
    return html`
      <div class="icon">
        <img src="./src/assets/logo.svg" alt="Logo" />
      </div>
      <div class="form-container">
        <h1>Registro</h1>
        <form>
          <label for="name">Nombre:</label>
          <input type="text" id="name" placeholder="Ingresa tu nombre" />

          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="Ingresa tu correo" />

          <label for="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            placeholder="Ejemplo: codigoconjuan"
          />

          <label for="password">Contraseña:</label>
          <input type="password" id="password" placeholder="Crea tu contraseña" />

          <button type="submit">Registrar</button>

          <a href="/login">Ya tienes Cuenta? Inicia Sesion</a>
        </form>
      </div>
    `;
  }
  
}

customElements.define('register-page', RegisterPage);
