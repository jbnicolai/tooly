# tooly

> javascript utility library covering everything from dom selection and css manipulation,
> object inheritance and extension, logging, event handling, string formatting, etc. 
> Basically everything that I usually want/need at my fingertips for any given project.
> Compatible with node, amd, and modern browsers. 
> Just under 4kb minified and gzipped 
> (~3kb without the `logger` and `timer` modules, 
> which shouldn't be used in production anyway - see `dist/tooly-slim.js`). 

## Install

```bash
$ npm install tooly
```

## Documentation

[lokua.github.io/tooly](http://lokua.github.io/tooly)

## Custom Build
  
You can create a custom build of particular categories.

```bash
cd path_to/node_modules/tooly
# from the tooly module root, install dev dependecies
npm install
# run the script and `include` command
# passing as arguments modules you want included 
# this will also run related Grunt umd and uglify tasks
node bin/build include logger timer string
# run the `grunt build` task to wrap tooly in umd, minify etc.
grunt build
```

Available categories include:
+ `collections`
+ `frankie` (jQuery-like dom selection)
+ `logger`
+ `object` 
+ `string`
+ `timer` 
+ `xhr`

By default the custom build will be located at `./dist/tooly-custom.js`, or alternatively, you
can specify a custom output file during the build instruction:

```bash
node bin/build include dom string -o my-custom-tooly-build.js && grunt build
```

This should be preferred.

## Changelog

+ 0.6.4 Logger options `bypassTimestamp` and `bypassLine` now default to true
+ 0.6.5 Fixed Frankie.find; added Frankie.each

# License

The MIT License (MIT)

&copy; 2014 Joshua Kleckner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.