import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './i18n';
import App from './App';
import { unregister } from './registerServiceWorker';

const mountEl = document.getElementById('root');

const render: Function = () => {
  if (mountEl) {
    // eslint-disable-next-line react/no-render-return-value
    return ReactDOM.render(<App />, mountEl);
  }

  throw new Error('React failed to mount, because mount element is missing');
};

unregister();

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}
