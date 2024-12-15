import { LitElement, html, css } from 'lit';

export class NavigationTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tabs {
      display: flex;
      justify-content: space-around;
      background-color: #1e293b;
      padding: 10px;
      border-radius: 8px;
    }

    .tab {
      padding: 10px 20px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      text-transform: uppercase;
      border: none;
      background-color: transparent;
    }

    .tab:hover {
      background-color: #3b4d63;
      border-radius: 4px;
    }

    .active {
      background-color: #84cc16;
      color: #1e293b;
      border-radius: 4px;
    }
  `;

  static properties = {
    activeTab: { type: String },
  };

  constructor() {
    super();
    this.activeTab = 'links'; // Default active tab
  }

  handleTabChange(tab) {
    this.activeTab = tab;
    this.dispatchEvent(new CustomEvent('tab-changed', { detail: tab, bubbles: true }));
  }

  render() {
    return html`
      <div class="tabs">
        <button
          class="tab ${this.activeTab === 'links' ? 'active' : ''}"
          @click="${() => this.handleTabChange('links')}"
        >
          Links
        </button>
        <button
          class="tab ${this.activeTab === 'profile' ? 'active' : ''}"
          @click="${() => this.handleTabChange('profile')}"
        >
          Perfil
        </button>
      </div>
    `;
  }
}

customElements.define('navigation-tabs', NavigationTabs);
