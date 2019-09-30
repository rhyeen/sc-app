import { html, fixture, expect } from '@open-wc/testing';

import '../sc-app.js';

describe('ScApp', () => {
  it('has 404 page by default', async () => {
    const el = await fixture(html`
      <sc-app></sc-app>
    `);

    expect(el._page).to.equal(undefined);
  });
});
