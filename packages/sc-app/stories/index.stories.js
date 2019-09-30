import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { ScApp } from '../src/ScApp.js';
import '../sc-app.js';

storiesOf('sc-app', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(ScApp))
  .add(
    'Sharded Cards',
    () => html`
      <sc-app></sc-app>
    `,
  );
