import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { AppLayout } from './pages/auth-layout.js/auth-layout.js';

export class AppMain extends LitElement {
  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');

    const router = new Router(outlet);
    router.setRoutes([
      {
        path: '/login',
        action: async () => {
          await import('../src/pages/login-page/login-page.js');
        },
        component: 'login-page',
      },
      {
        path: '/register',
        action: async () => {
          await import('../src/pages/register-page/register-page.js');
        },
        component: 'register-page',
      },
      {
        path: '/admin',
        component: 'app-layout', 
        children: [
          {
            path: '/',
            action: async () => {
              await import('../src/pages/linktree-page/linktree-page.js');
            },
            component: 'linktree-page', 
          },
          {
            path: '/perfil',
            action: async () => {
              await import('../src/pages/profile-page/profile-page.js');
            },
            component: 'profile-page', 
          },
        ],
      }
    ]);
  }

  render() {
    return html`
      <div id="outlet"></div>
    `;
  }
}

customElements.define('app-main', AppMain);
