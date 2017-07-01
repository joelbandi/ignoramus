#!/usr/bin/env node
'use strict';
const meow = require('meow');
const dns = require('dns');
const chalk = require('chalk');
const got = require('got');
const fs = require('fs');
const ora = require('ora');

const DOMAIN = 'gitignore.io';
const URL = 'https://www.'+DOMAIN+'/api/';


const cli = meow(`
        Usage
          $ ignoramus create [language/stack/editor]
          $ ignoramus add [language/stack/editor]

        Commands
          create - creates .gitignore file
          add - appends to the .gitignore file

        Options
          --version, -v displays version
          --help, -h displays help

        Example
          $ ignoramus create node
          $ ignoramus add ruby
          $ ignoramus create atom
          $ ignoramus add lamp
          $ ignoramus create java,ruby,atom
`,{
  alias: {
    v: 'version',
    h: 'help',
  }
});

if(cli.input.length < 2) {
  cli.showHelp();
}

if(!(cli.input[0] === 'create' || cli.input[0] === 'append')){
  cli.showHelp();
}

const spinner = ora('downloading gitignore data...');

// Check connection
dns.lookup(DOMAIN, err => {
	if (err && err.code === 'ENOTFOUND') {
    console.error(chalk.bold.red(` Please check your internet connection :(`));
    process.exit(1);
	}else{
    spinner.start();
  }
});

// generate URL
const urlGen = lang => URL+lang;

// make the request
got(urlGen(cli.input[1])).then(response => {
  if(response.body.includes('ERROR')) {
    spinner.fail(chalk.red(` The .gitignore file for ${cli.input[1]} does not exist.`));
    cli.showHelp();
  }else {

    if(cli.input[0] === 'append') {
      fs.appendFile('.gitignore', response.body, (err) => {
        if (err) {
          spinner.fail(chalk.bold.red(` Error creating and writing a file.`));
        }
        spinner.succeed(chalk.bold.green(` The .gitignore for ${cli.input[1]} has been added.`));
      });
    }

    if(cli.input[0] === 'create') {
      fs.writeFile('.gitignore', response.body, (err) => {
        if (err) {
          spinner.fail(chalk.bold.red(` Error creating and writing a file.`));
        }
        spinner.succeed(chalk.bold.green(` The .gitignore for ${cli.input[1]} has been created.`));
      });
    }

  }
}).catch(error => {
		spinner.fail(chalk.bold.red(` Please check your internet connection.\n Encountered Error: ${error.response.body}.`));
})
