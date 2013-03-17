var files = require('../index')

var url = 'http://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png'

files(url, function (err, base64) {
  if (err) {
    alert('error getting base64 data: ' + JSON.stringify(err, null, ' '))
  }
  // check the beginning of the base64 response
  var pattern = /^iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt/;

  if (!pattern.test(base64)) {
    alert('test fails: incorrect base64 string returned')
    return
  }
  iimDisplay('test passes')
})
