# nconf-wacthfile

Add a prototype method `watchFile` to `nconf.Prodiver` for auto-reloading any change in your config file.

## Usage

``` bash
npm i nconf-wacthfile
```

In your node file:
``` js
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
}).defaults({
  host: 'DEFAULT_HOST'
})
console.log(nconf.get())
```

Any change in './test/test-config.json' in occured after `watchFile` calling will be merged to nconf store.

## Options
  1. **file**: refer to https://github.com/indexzero/nconf#file. You can use any options `nconf.file` accepted(`secure`, `format`).
  2. **onChange(store, path)**: A callback notifying the file change. `store` is the parsed value from config file.
  3. **onError(err, path)**: A callback notifying the file change.
  4. **watch**: Chokidar [optinons](https://github.com/paulmillr/chokidar#api) for file change monitoring.
    * I've set `watch.ignoreInitial = true` to ignore the first change event.

## Test
TBD.

#### Author: Rong Shen <rong.shen@gmail.com>
#### License: MIT

