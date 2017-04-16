var nconf = require('nconf');
var Provider = nconf.Provider,
    chokidar = require('chokidar'),
    omit = require('lodash.omit');

module.exports = nconf;

function onChange(opts, key, path) {
  this.stores[key].load(function(err, store) {
    if (err) {
      if (opts.onError) opts.onError(err, path);
    } else {
      if (opts.onChange) opts.onChange(store, path);
    }
  });
}

Provider.prototype.watchFile = function(key, options) {
  if (arguments.length == 1) {
    options = typeof key === 'string' ? { file: key } : key;
    key = 'file';
  }
  else {
    options = typeof options === 'string'
      ? { file: options }
      : options;
  }

  var watchOption = options.watch || {};
  // We will call this.file to instead of initial change event.
  watchOption.ignoreInitial = true;
  var watcher = chokidar.watch(options.file, watchOption);

  var onFileChange = onChange.bind(this,
    {
      onChange: options.onChange,
      onError: options.onError
    },
    key
  );

  // we only take care oif these two events
  watcher.on('add', onFileChange);
  watcher.on('change', onFileChange);

  // call `this.file` to populate config
  var restOptions = omit(options, ['watch', 'onChange', 'onError']);
  this.file(key, restOptions);
  return this;
}
