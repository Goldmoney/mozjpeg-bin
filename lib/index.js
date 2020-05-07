'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

function getBinaryUrl(version) {
	const site =
		process.env.MOZJPEG_BINARY_SITE ||
		process.env.npm_config_mozjpeg_binary_site ||
		'https://raw.githubusercontent.com/imagemin/mozjpeg-bin';

	return [site, 'v' + version, 'vendor/'].join('/');
}

const url = getBinaryUrl(pkg.version);

module.exports = new BinWrapper()
	.src(`${url}macos/cjpeg`, 'darwin')
	.src(`${url}linux/cjpeg`, 'linux')
	.src(`${url}freebsd/cjpeg`, 'freebsd')
	.src(`${url}win/cjpeg.exe`, 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'cjpeg.exe' : 'cjpeg');
