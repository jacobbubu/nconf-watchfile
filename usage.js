var nconf = require('./lib/nconf-watchfile');

nconf.env({
  whitelist: ['host']
}).watchFile({
  file: './test/test-config.json',
  onChange: function(/* store, path*/) {
    console.log(nconf.get());
  },
  onError: function(err, path) {
    console.error(err, path);
  }
});

console.log(nconf.get())
