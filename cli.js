#!/usr/bin/env node
'use strict';
const exec = require('child_process');
const meow = require('meow');

// eslint-disable-next-line no-unused-vars
const cli = meow(`
	Usage:

	  $ darkmode

  Flags:

	  -h, --help        Show help message and close
	  -v, --version     View package version
`, {
	flags: {
		help: {
			type: 'boolean',
			alias: 'h'
		},
		version: {
			type: 'boolean',
			alias: 'v'
		}
	}
});

// Simple Apple Script to switch from/to dark mode on macOS
const darkest = `osascript -e 'tell application "System Events"
	tell appearance preferences
		set dark mode to not dark mode
	end tell
end tell'`;

const darkmode = () => {
	exec.exec(darkest, (error, stdout, stderr) => {
		console.log(`${stdout}`);
		console.log(`${stderr}`);
		if (error !== null) {
			console.log(`exec error: ${error}`);
		}
	});
};

const isMacOS = () => {
	return process.platform === 'darwin';
};

// eslint-disable-next-line no-unused-expressions
isMacOS() ? darkmode() : console.log('Papa upgrade to macOS!');
