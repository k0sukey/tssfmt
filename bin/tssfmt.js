#!/usr/bin/env node

var _ = require('lodash'),
	chalk = require('chalk'),
	diff = require('diff'),
	fs = require('fs'),
	meow = require('meow'),
	tssfmt = require('../');

var cli = meow({
	help: [
		'Usage',
		'  $ tssfmt <file>',
		'',
		'Options',
		'  --diff Display the result diff',
		'  --dryrun Display the result',
		'  --help Display this help screen',
		'',
		'Examples',
		'  $ tssfmt path/to/foo.tss --diff'
	].join('\n')
});

if (cli.flags.diff && cli.flags.dryrun) {
	console.error(chalk.red('[ERROR]') + ' Choose either one');
	return;
}

if (!fs.existsSync(cli.input[0])) {
	console.error(chalk.red('[ERROR]') + ' Not exists .tss file ' + chalk.cyan(cli.input[0]));
	return;
}

var source = fs.readFileSync(cli.input[0]).toString(),
	destination = tssfmt(source);

if (cli.flags.diff) {
	_.each(diff.diffCss(source, destination), function(part){
		var color = part.added ? 'green' : part.removed ? 'bgRed' : 'gray';
		process.stdout.write(chalk[color](part.value));
	});
} else if (cli.flags.dryrun) {
	console.log(destination);
} else {
	fs.writeFileSync(cli.input[0], destination);
}