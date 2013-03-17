# download-base64-imacros
Allows iMacros for Firefox scripts to download remote binary resources and encode them as base64 strings. This could be useful for downloading files and then uploading them to other services
```
npm install -S download-base64-imacros
```

# Usage
To use this module you will need to bundle your iMacros javascript source file with browserify. Say you have an imacros script called
**scrape.js** which appears below
```javascript
var downloadBase64 = require('download-base-64-imacros')
var url = 'http://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png'
downloadBase64(url, function(err, base64) {
  if (err) {
    alert('error downloading remote file and encoding to a base64 string: ' + JSON.stringify(err))
    return
  }
  var output = {
    message: 'file downloaded and encoded successfully',
    base64: base64,
    url: url
  }
  alert(JSON.stringify(output))
}
```

To run scrape.js in Firefox execute the command
```bash
browserify scrape.js -o scrape_bundle.js
```
Then open up Firefox and run the **scrape_bundle.js** script. It is very import that you run **scrape_bundle.js**. Trying to execute **scrape.js** directly will not work

-----

## Browserify
Browserify is a command-line tool which bundles js files into a single file so that you can use CommonJS style *require(...)* statements in your code. Get it by installing node and npm and then execute
```bash
[sudo] npm install -g browserify
```
