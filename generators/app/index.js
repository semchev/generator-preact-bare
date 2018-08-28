'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname
    }, {
      type: 'input',
      name: 'version',
      message: 'Project version',
      default: '0.1.0'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: this.props.version
      }
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        name: this.props.name
      }
    );

    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('src/styles/app.scss'),
      this.destinationPath('src/styles/app.scss')
    );

    this.fs.copy(
      this.templatePath('src/components/App.js'),
      this.destinationPath('src/components/App.js')
    );

    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js'),
      {
        name: this.props.name
      }
    );

    this.fs.copy(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      {
        name: this.props.name
      }
    );
  }

  install() {
    this.yarnInstall();
  }
};
