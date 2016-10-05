/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * Plugin for loglevel which sends all messages to stderr on Node.js
 *
 * Copyright (c) 2015-2016 University Of Helsinki (The National Library Of Finland)
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 **/

/* istanbul ignore next: umd wrapper */
(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['es6-polyfills/lib/polyfills/object', 'loglevel'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('es6-polyfills/lib/polyfills/object'), require('loglevel'));
  } else {
    root.loglevelStdStreams = factory(root.log);
  }

}(this, factory));

function factory(Object, log)
{
  
  'use strict';

  function isCloneOf(obj, base)
  {
    return !Object.keys(base).some(function(key) {
      return !(obj.hasOwnProperty(key) && (typeof base[key] !== 'function' || typeof obj[key] === 'function'));
    });
  }

  return function(loglevel_obj, fn_original_factory)
  {

    if (typeof loglevel_obj !== 'object' || !isCloneOf(loglevel_obj, log.getLogger('foo'))) {
      throw new Error('Argument is not a proper loglevel object');
    }

    fn_original_factory = typeof fn_original_factory === 'function' ? fn_original_factory : loglevel_obj.methodFactory;
    
    loglevel_obj.methodFactory = function (method_name, log_level, logger_name)
    {

      var fn_method_raw;

      if (typeof process === 'object' && typeof process.stderr === 'object' && typeof process.stdout === 'object') {
        method_name = 'error';
      }

      fn_method_raw = fn_original_factory(method_name, log_level, logger_name);

      return function () {
        fn_method_raw.apply(undefined, arguments);
      };

    };

    loglevel_obj.setLevel(loglevel_obj.getLevel());

    return loglevel_obj;

  };

}
