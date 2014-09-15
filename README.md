# tooly

  General javascript utility functions, many of which shamelessly scraped from stackoverflow or 
  elsewhere. Compatible with node (excluding the `dom` module), amd, and the browser.

## install

    $ npm install git+https://git@github.com/Lokua/tooly.git

## custom build
  
You can create a custom build of particular modules.

    $ cd path_to/node_modules/tooly
    # install dev dependecies
    $ npm install
    # run the custom build script and `include` command, passing as arguments modules you want included 
    $ bin/custom include dom object

Available modules include `core`, `dom`, `xhr`, `object`, and `logger`. None of them are 
dependent on each other and each should be pretty self-explanatory, however `core` is just
another name for random "don't belong anywhere else" functions.
The custom build will be located at `./dist/tooly-custom.js`.

