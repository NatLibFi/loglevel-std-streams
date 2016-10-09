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


(function () {

  'use strict';

  var chai = require('chai'),
  log = require('loglevel'),
  Object = require('es6-polyfills/lib/polyfills/object'),
  loglevelStdStreams = require('../../lib/main'),
  expect = chai.expect;
  
  module.exports = function() {
    
    describe('nodejs', function() {
      
      it('Should log using console.error', function() {
        
        var logger = log.getLogger('foo'),
        orig_console_error = console.error,
        message = '';
        
        console.error = function(msg)
        {
          message = msg;
        };
        
        logger.setLevel('debug');       
        loglevelStdStreams(logger);
        logger.debug('foobar');
        
        console.error = orig_console_error;
        
        expect(message).to.equal('foobar');
        
      });

    });

  }();

})();
