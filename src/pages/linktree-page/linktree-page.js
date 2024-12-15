import { LitElement, html, css } from 'lit';

export class LinktreePage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    h2 {
      color: #333;
    }
  `;

  render() {
    return html`
      <h2>Link</h2>
    `;
  }
}

customElements.define('linktree-page', LinktreePage);
