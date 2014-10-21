# tooly

(work in progress)

> javascript utility library covering everything from dom selection and css manipulation,
> object inheritance and extension, logging, event handling, string formatting, etc. Basically everything
> that I usually want/need at my fingertips for any given project.
> Compatible with node, amd, and modern browsers. 
> Just under 4kb minified and gzipped (~3kb without the `logger` and `timer` modules, which should not be used in production anyway - see `dist/tooly-slim.js`). 

## Install

```bash
$ npm install git+https://git@github.com/Lokua/tooly.git
```

## Documentation

(in progress - see [dist/tooly.js](dist/tooly.js))

## Custom Build
  
You can create a custom build of particular categories.

Bash:

```bash
> cd path_to/node_modules/tooly
# from the tooly module root, install dev dependecies
> npm install
# run the script and `include` command
# passing as arguments modules you want included 
# this will also run related Grunt umd and uglify tasks
> bin/custom include logger timer string
```

Alternatively, if not using bash you can run the 
build script and Grunt tasks in two steps:

```bat
> cd path_to/node_modules/tooly
:: from the tooly module root, install dev dependecies
> npm install
:: run the node builder script and `include` command
:: passing as arguments modules you want included. 
> bin/builder include string collections logger
:: run grunt tasks
> grunt custom
```

Available categories include:
+ `object`
+ `dom`
+ `collections`
+ `xhr`
+ `string`
+ `logger`
+ `timer` 

The custom build will be located at `./dist/tooly-custom.js`. 
None of the categories are dependent on each other.

