# tooly


(work in progress)

  javascript utility library covering everything from dom selection and css manipulation,
  object inheritance and extension, logging, event handling, string formatting, etc. Basically everything
  that I usually want/need at my fingertips for any given project.
  Compatible with node, amd, and modern browsers. 
  ~2.25kb minified and gzipped. 

## install

    $ npm install git+https://git@github.com/Lokua/tooly.git

## Documentation
(in progress - see [dist/tooly.js](dist/tooly.js))

## custom build
  
You can create a custom build of particular modules.

    $ cd path_to/node_modules/tooly
    # install dev dependecies
    $ npm install
    # run the custom build script and `include` command, passing as arguments modules you want included 
    $ bin/custom include dom object

Available modules include `core`, `dom`, `xhr`, `object`, `logger`, and `timer`. None of them are 
dependent on each other and each should be pretty self-explanatory (`core` is just
another name for random "don't belong anywhere else" functions).
The custom build will be located at `./dist/tooly-custom.js`.

