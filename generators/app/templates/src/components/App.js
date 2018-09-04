<% if(react) { %>import React, { Component } from 'react';<% } else {%>import { h, render, Component } from 'preact';<% } %>

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>{this.props.name}</div>
        );
    }
}

export default App;
