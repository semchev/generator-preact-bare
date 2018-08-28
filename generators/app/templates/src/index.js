import { h, render } from 'preact';
import App from './components/App';

import './styles/app.scss';

render(<App name="<%= name %>" />, document.body);