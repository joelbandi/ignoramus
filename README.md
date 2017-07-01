# ignoramus
##### An ignoramus' tool for creating `.gitignore` files.

#### Installation

`npm install -g ignoramus`


#### Usage

1. `$ ignoramus create java` -> creates a java `.gitignore` file
2. `$ ignoramus append ruby` -> appends a ruby `.gitignore` file to the exisiting file. Creates new file if it doesnt.

The files are created in the present working directory

#### Command help

```bash
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
```

#### Demo
<img src="screengrab.gif">

#### Development

1. Clone your fork of this repository.
2. `npm test` to run tests.
3. `npm run lint` to run the linter.
