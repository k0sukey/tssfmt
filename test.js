/* global describe: true, it: true */

var assert = require('assert'),
	tssfmt = require('./');

describe('tssfmt test', function(){
	it('should does not throw exception', function(){
		assert.doesNotThrow(function(){
			tssfmt('// Comment\n"x": { top: 0, layout: "vertical", test: [1, 2, 3] }, "b[platform=ios]": { bottom: "10%" } "c": { width: Ti.UI.SIZE, height: Alloy.Globals.height }');
		});
	});
});