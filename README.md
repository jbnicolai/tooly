# tooly

> A Javascript utility library covering everything from dom selection and css manipulation,
> object inheritance and extension, logging, event handling, string formatting, execution timing, etc. 
> Basically everything that I usually want/need at my fingertips for any given project.
> Compatible with node, amd, and modern browsers. 
> Just under 4kb minified and gzipped 
> (~3kb without the `logger` and `timer` modules, 
> which shouldn't be used in production anyway - see `dist/tooly-slim.js`). 

## Install

```bash
$ npm install tooly
```

## Overview

Tooly is organized into categories, which are just that - organizational constructs - as opposed to individual modules.
In a few cases the "category" is encompassed by a class. Below is a list of all categories, their related methods, and
a description for the more interesting bits. The method names alone should give you an idea if tooly is something
you'd find useful. Consult the [documentation][0] for a complete reference.

#### Collections
+ `each`
+ `sort` - sort array of objects by key

#### Frankie (class)
jQuery-like dom selection/manipulation
+ `#addClass`
+ `#append`
+ `#attr`
+ `#children`
+ `#css`
+ `#each`
+ `#empty`
+ `#eq`
+ `#find`
+ `#get`
+ `#hasClass`
+ `#html`
+ `#on`
+ `#parent`
+ `#prepend`
+ `#remove`
+ `#removeClass`
+ `#toggleClass`
+ `#zilch`

#### Handler (class)
Tiny "Event Emitter"; Observer pattern
+ `#on`
+ `#register`
+ `#remove`
+ `#removeAll`
+ `#trigger`

#### Logger (class)
Highly configurable, level-based and styled console logging for node and browser
+ `#debug`
+ `#error`
+ `#group`
+ `#groupEnd`
+ `#info`
+ `#log`
+ `#warn`
+ `#trace`

#### Object
+ `construct`
+ `extend`
+ `falsy`
+ `fromPrototype`
+ `inherit`
+ `scale`
+ `truthy`
+ `type` - modified from Angus Croll's wicked-awesome [toType][1]

#### String
Functional versions of ECMAScript 6 stuff and useful formatters
+ `contains`
+ `endsWith`
+ `extension`
+ `format` - printf style string formatting
+ `formatMoney`
+ `formatString` - placeholder ({1}, "I'm #1") style string formatting
+ `formatTime`
+ `leftPad`
+ `repeat`
+ `rightPad`
+ `sliceRel`
+ `startsWith`
+ `stripExtension`
+ `tag` - jade syntax style dom builder

#### Timer (class)
Basic block/function execution timing
+ `#end`
+ `funkyTime` - static method, not part of `Timer` class
+ `#log`
+ `#start`
+ `#stop`
+ `#toString`

#### XHR
+ `get`
+ `getJson`

## Documentation

View online at [lokua.github.io/tooly][0] or locally at `./doc/index.html`

## Custom Build
  
You can create a custom build of any combination of particular categories.

```bash
cd path_to/node_modules/tooly
# from the tooly module root, install dev dependecies
npm install
# run the script and `include` command
# passing as arguments modules (lowercase) you want included 
node bin/build include logger timer string
# run the `grunt build` task to wrap tooly in umd, minify etc.
grunt build
```

By default the custom build will be located at `./dist/tooly-custom.js`, or alternatively, you
can specify a custom output file during the build instruction:

```bash
node bin/build include dom string -o tooly-custom.js && grunt build
```

## Development
"Rough Drafts" are worked out in the `test/_spec` folder, either as .js files for node testing or .html for browser-based 
code, before being transferred to `src`. Testing is done with Mocha and Chai, run with `npm run test`, 
or load `test/client-side/test.html` for dom-related functions. Build with `npm run all`.

## Changelog

__0.7.1__
  + __Breaking Change__: removed `isHash`- use `tooly.type(obj, 'object')` instead
__0.7.0__
  + __Breaking change__: Handler is now only `on`, `register`, `remove`, `removeAll`, and `trigger` (no aliases)
  + __Breaking change__: `Handler#remove(<name>)` now deletes the `<name>` property from the `handlers` object 
    (instead of just emptying that `<name>`'s array)
  + __Breaking change__: tooly.Logger now defaults to level 0, and can be instantiated without arguments
  + added __symbol__ param to `formatMoney`
__0.6.5__
  + `Frankie#find` and `Frankie#attr` bugfix
  + added `Frankie#each`
__0.6.4__ 
  + Logger options `bypassTimestamp` and `bypassLine` now default to true

# License

The MIT License (MIT)

&copy; 2014, 2015 Joshua Kleckner

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

[0]: http://lokua.github.io/tooly
[1]: http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator