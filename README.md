# loglevel Standard Streams plugin [![NPM Version](https://img.shields.io/npm/v/@natlibfi/loglevel-std-streams.svg)](https://npmjs.org/package/loglevel-std-streams) [![Build Status](https://travis-ci.org/NatLibFi/loglevel-std-streams.svg)](https://travis-ci.org/NatLibFi/loglevel-std-streams) [![Test Coverage](https://codeclimate.com/github/NatLibFi/loglevel-std-streams/badges/coverage.svg)](https://codeclimate.com/github/NatLibFi/loglevel-std-streams/coverage)

Plugin for [loglevel](https://github.com/pimterry/loglevel) which sends all messages to stderr on Node.js

## Usage

### Installation

Clone the sources and install the package (In the source directory) on command line using `npm`:

```sh
npm install
```

## Testing

Run the following NPM script to lint, test and check coverage of the code:

```javascript

npm run check

```

#### AMD

```javascript

define(['loglevel', 'loglevel-std-streams'], function(log, loglevelStdStreams) {

  loglevelStdStreams(log);

  log.warn('TEST');

});

```

#### Node.js require

```javascript

var log = require('loglevel');
var loglevelStdStreams = require('loglevel-std-streams');

loglevelStdStreams(log);

log.warn('TEST');

```

### Example

```sh
$ node -e 'var log = require("loglevel-std-streams")(require("loglevel"));log.warn("This is a warning");console.log("TEST");' 2>log.txt
TEST
$ cat log.txt
This is a warning
$ 
```

## License and copyright

Copyright (c) 2015-2017 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **MIT License**.
