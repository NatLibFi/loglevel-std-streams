/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * Plugin for loglevel which sends all messages to stderr on Node.js
 *
 * Copyright (c) 2015 University Of Helsinki (The National Library Of Finland)
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
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
	define(['es6-polyfills/lib/object', 'loglevel'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('es6-polyfills/lib/object'), require('loglevel'));
    } else {
	root.loglevelStdStreams = factory(root.log);
    }

}(this, factory));

function factory(Object, log)
{
    
    'use strict';

    return function(loglevel_obj)
    {
	
	function isInstanceOf(obj, proto)
	{
	    return Object.keys(obj).length === Object.keys(
		Object.assign(Object.assign({}, obj), proto)
	    ).length;
	}

	var originalFactory;

	if (!isInstanceOf(loglevel_obj, log)) {
	    throw new Error('Argument is not an instance of loglevel');
	}
	
	originalFactory = log.methodFactory;
	
	log.methodFactory = function (method_name, log_level, logger_name)
	{
	    
	    var rawMethod;
	    
	    if (typeof process !== undefined && process.hasOwnProperty('stderr') && process.hasOwnProperty('stdout') && process.hasOwnProperty('stdin')) {
		method_name = 'error';
	    }
	    
	    rawMethod = originalFactory(method_name, log_level, logger_name);
	    
	    return function (message) {
		rawMethod(message);
	    };

	};

	log.setLevel('warn');

    };

}