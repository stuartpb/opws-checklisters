var yaml = require('js-yaml');
var fs = require('fs');
var glob = require('glob');

glob.sync('profiles/*')
  .forEach(function(filename) {
    var domain = filename.replace(/^profiles\/([^\/]+)\.yaml$/,'$1');
    var profile = yaml.load(
      fs.readFileSync(filename, 'utf8'), {filename: filename});

  var notes = [];
  function checkKeys(prefix, obj) {
    var keys = Object.keys(obj);
    for (var i=0; i < keys.length; i++) {
      var key = keys[i];
      var path = prefix + key;
      var val = obj[key];

      // if this is one of the types we expect to be documented,
      if (key == 'notes') {
        notes.push(path+': '+JSON.stringify(val)+'');
      // otherwise, if this is an object
      } else if (typeof(val) == 'object') {
        // recurse into it
        checkKeys(path + '.', val);
      }
    }
  }
  checkKeys('', profile);
  if (notes.length != 0)
    console.log(domain + ': \n- ' + notes.join('\n- '));
});

