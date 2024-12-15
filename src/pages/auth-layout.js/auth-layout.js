import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router'; 
import { NavigationTabs } from '../../components/navegationTabs';
import { LinktreePage } from '../linktree-page/linktree-page';
import { ProfilePage } from '../profile-page/profile-page';

export class AppLayout extends LitElement {
  static styles = css`
    header {
      background-color: #1e293b;
      padding: 1.25rem;
    }

    .container {
      max-width: 80rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    .logo img {
      width: 100%;
    }

    .logout-button {
      background-color: #84cc16;
      color: #1e293b;
      text-transform: uppercase;
      font-weight: 900;
      font-size: 0.75rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
    }

    main {
      background-color: #f3f4f6;
      min-height: 100vh;
      padding: 2.5rem 0;
    }

    .content {
      max-width: 80rem;
      margin: 0 auto;
      padding: 2.5rem;
    }

    .link {
      font-weight: bold;
      text-align: right;
      color: #1e293b;
      font-size: 1.5rem;
      text-decoration: none;
    }

    .profile-container {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .profile-sidebar {
      background-color: #1e293b;
      padding: 2.5rem;
    }
  `;

  constructor() {
    super();
    this.router = null;
    this.activeTab = 'links'; 
  }

 
  handleLogout() {
    console.log('Cerrar sesión');
  }

  handleTabChange(event) {
    this.activeTab = event.detail;
    if (this.activeTab=='links') {
      Router.go('/admin');
    }else{
      Router.go('/admin/perfil');
    }

  }

  render() {
    return html`
      <header>
        <div class="container">
          <div class="logo">
             <img src="./src/assets/logo.svg" alt="" />
          </div>
          <div>
            <button class="logout-button" @click="${this.handleLogout}">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <main>
        <navigation-tabs @tab-changed="${this.handleTabChange}"></navigation-tabs>
        <div class="content">
          <div class="profile-container">
            <div class="flex-1">
                <div id="outlet"></div>
            </div>
            <div class="profile-sidebar"></div>
          </div>
        </div>
      </main>
    `;
  }
}

customElements.define('app-layout', AppLayout);

