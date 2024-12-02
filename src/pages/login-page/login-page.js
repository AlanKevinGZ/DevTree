import { LitElement, html, css } from "lit";

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
  `;

  render() {
    return html`
      <div class="main_header">
        <img src="./src/assets/logo.svg" alt="" />
      </div>
      <div class="container">
        <div class="login_form">
          <form>
            <div class="input_form">
              <label>Email:</label>
              <input type="email" />
            </div>

            <div class="input_form">
              <label>password:</label>
              <input type="password" />
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
