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

define(['chai', 'loglevel', 'es6-polyfills/lib/polyfills/object', '../../lib/main'], function(chai, log, Object, loglevelStdStreams) {

  'use strict';

  var expect = chai.expect;
  
  describe('browser', function() {
    
    it('Should log using console.log', function() {
      
      var logger = log.getLogger('foo'),
      orig_console_info = console.info,
      message = '';
      
      console.info = function(msg)
      {
        message = msg;
      };
      
      logger.setLevel('info');        
      loglevelStdStreams(logger);
      logger.info('foobar');
      
      console.info = orig_console_info;

      expect(message).to.equal('foobar');
      
    });
    
  });

});
