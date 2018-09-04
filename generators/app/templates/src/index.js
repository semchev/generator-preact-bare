<% if(react) { %>import React from 'react';<% } else { %>import { h, render } from 'preact';<% } %><% if(react) { %>
import ReactDOM from 'react-dom';<% } %>
import App from './components/App';

import './styles/app.scss';
<% if(react) { %>
ReactDOM.render(<App name="<%= name %>" />, document.getElementById('root'));
<% } else {%>
render(<App name="<%= name %>" />, document.body);
<% } %>
