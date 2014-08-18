#tooly

  general javascript utility functions compatible with node, amd, and the browser.

## install

    npm install git+https://git@github.com/Lokua/tooly.git

## custom build
  
create a custom build of particular modules using grunt:

    $ cd path/to/node_modules/tooly
    $ grunt custom include dom object

Available modules include `core`, `dom`, and `object`. 
A custom file can be specified with:
    
    -o path/to/dest.js

Otherwise, the custom build will be located at `./dist/tooly-custom.js`.


