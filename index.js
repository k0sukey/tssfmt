var _ = require('lodash'),
	diff = require('diff'),
	stringifyObject = require('stringify-object'),
	grammar = require('./lib/grammar'),
	options = require('./lib/options');

module.exports = function(_source, _options){
	_options = options(_options);

	var contents,
		json,
		expr = '__ALLOY_EXPR__--',
		tiRegex = new RegExp('^' + expr + 'Ti\.'),
		titaniumRegex = new RegExp('^' + expr + 'Titanium\.'),
		exprRegex = new RegExp(_options.quote + expr + '(.+?)' + _options.quote, 'g');

	contents = /^\s*\{[\s\S]+\}\s*$/gi.test(_source) ? _source : '{' + _source + '}';
	contents = contents.replace(/(\s)(\\+)(\s)/g, '$1$2$2$3');

	try {
		json = grammar.parse(contents);
	} catch (e) {
		throw e.message + ' line: ' + e.line + ', column: ' + e.column + ', offset: ' + e.offset;
	}

	_.each(json, function(node, name){
		var ordered = [],
			result = {},
			length = _options.order.length;

		_.each(node, function(value, key){
			var index = _.indexOf(_options.order, key);

			if (_.isString(value)) {
				if (_options.titanium_shorthand) {
					value = value.replace(titaniumRegex, expr + 'Ti.');
				} else {
					value = value.replace(tiRegex, expr + 'Titanium.');
				}
			}

			if (index > -1) {
				ordered[index] = {
					key: key,
					value: value
				};
			} else {
				ordered[length] = {
					key: key,
					value: value
				};

				length++;
			}
		});

		_.each(_.without(ordered, undefined), function(node){
			result[node.key] = node.value;
		});

		json[name] = result;
	});

	return _.map(json, function(node, name){
			return _options.quote + name + _options.quote + ': ' +
				stringifyObject(node, {
						indent: _options.indent,
						singleQuotes: _options.quote === '\'' ? true : false
					});
		}).join(_options.concatenation_comma ? ',\n' : '\n').replace(exprRegex, '$1') + _options.eof;
};