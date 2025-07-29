#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
process.stdout.on('error', process.exit);

var packpath = path.join(process.cwd(), 'package.json');
var pkg = require(packpath);
var tplpath = path.join(process.cwd(), args[0]);
var tplstr = fs.readFileSync(tplpath, 'utf8');

try {
    // Use a safer alternative to eval for template processing
    value = tplstr.replace(/\${(.*?)}/g, (match, p1) => {
        try {
            return new Function('pkg', `return ${p1}`)(pkg);
        } catch (e) {
            return '';
        }
    });
    process.stdout.write(value || '');
} catch(e) {
    process.stdout.write('');
    process.exit(1);
}
