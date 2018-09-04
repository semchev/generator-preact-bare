'use strict';
const Generator = require('yeoman-generator');
const commandExists = require('command-exists');
const open = require('open');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'version',
        message: 'Project version',
        default: '0.1.0'
      },
      {
        type: 'confirm',
        name: 'runDev',
        message: 'Start dev server after install?',
        default: true
      },
      {
        type: 'confirm',
        name: 'openEditor',
        message: 'Open in default editor?',
        default: true
      },
      {
        type: 'confirm',
        name: 'react',
        message: 'User React instead of Preact?',
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.yarnExists = false;
      commandExists('yarn', (err, exists) => {
        if (exists) {
          this.props.yarnExists = true;
        }
      });
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: this.props.version,
        react: this.props.react
      }
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        name: this.props.name,
        react: this.props.react
      }
    );

    if (!this.props.react) {
      this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
    }

    this.fs.copy(
      this.templatePath('src/styles/app.scss'),
      this.destinationPath('src/styles/app.scss')
    );

    this.fs.copyTpl(
      this.templatePath('src/components/App.js'),
      this.destinationPath('src/components/App.js'),
      {
        react: this.props.react
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js'),
      {
        name: this.props.name,
        react: this.props.react
      }
    );

    this.fs.copy(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      {
        name: this.props.name,
        react: this.props.react
      }
    );
  }

  install() {
    if (this.props.yarnExists) {
      this.yarnInstall();
    } else {
      this.npmInstall();
    }
  }

  end() {
    // Open in editor if requested.
    if (this.props.openEditor) {
      open(this.destinationPath('src/index.js'));
    }

    // Run dev server if requested.
    if (this.props.runDev) {
      let cmd = this.props.yarnExists ? 'yarn' : 'npm';
      let args = this.props.yarnExists
        ? ['dev', '--open']
        : ['run-script', 'dev', '--open'];

      this.spawnCommand(cmd, args);
    }
  }
};
