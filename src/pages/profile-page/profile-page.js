import { LitElement, html, css } from 'lit';

export class ProfilePage extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                font-family: Arial, sans-serif;
                padding: 16px;
                background-color: #f4f4f4;
                border-radius: 8px;
                max-width: 500px;
                margin: auto;
            }

            h2 {
                text-align: center;
                font-size: 24px;
                color: #333;
            }

            .form-container {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            label {
                font-size: 16px;
                color: #555;
            }

            input[type="text"], textarea {
                padding: 8px;
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 4px;
                width: 100%;
            }

            textarea {
                resize: vertical;
                min-height: 100px;
            }

            input[type="file"] {
                margin-top: 8px;
            }

            button {
                background-color: #007bff;
                color: white;
                padding: 10px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #0056b3;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
        `
    ];

    constructor(){
        super();
        console.log("autenticando...");
        
    }

    render() {
        return html`
            <h2>Mi Perfil</h2>
            <div class="form-container">
                <div class="form-group">
                    <label for="username">Nombre de Usuario</label>
                    <input id="username" type="text" placeholder="Ingresa tu nombre de usuario" />
                </div>
                
                <div class="form-group">
                    <label for="description">Tu Descripción</label>
                    <textarea id="description" placeholder="Cuéntanos sobre ti"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="image">Sube tu Imagen</label>
                    <input id="image" type="file" />
                </div>

                <button @click="${this.handleSubmit}">Guardar</button>
            </div>
        `;
    }

    handleSubmit() {
        console.log('Formulario enviado');
    }
}

customElements.define('profile-page', ProfilePage);
