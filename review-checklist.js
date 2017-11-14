var yaml = require('js-yaml');
var fs = require('fs');
var glob = require('glob');

glob.sync('profiles/*', {cwd: __dirname + '/..'})
  .forEach(function(filename) {
    var domain = filename.replace(/^profiles\/([^\/]+)\.yaml$/,'$1');
    var profile = yaml.load(
      fs.readFileSync(filename, 'utf8'), {filename: filename});
    console.log ('- ' +
      (profile.reviewed && profile.reviewed.date ? '[x]' : '[ ]') +
      ' [' + domain +
      '](https://github.com/opws/domainprofiles/blob/master/' +
      filename + ')');
});
