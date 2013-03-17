module.exports = function (url, cb) {
  getImageAsBase64(url, function (base64) {
    if (!base64) {
      return cb({
        message: 'failed to download file at give url',
        error: 'base64 string is null',
        url: url
      })
    }
    cb(null, base64)
  })
}


function getImageAsBase64(imgAddress, cb) {
  //get from online or from whatever string store
  var req = new XMLHttpRequest()
  req.open("GET", imgAddress, true)
  req.responseType = 'arraybuffer' //this won't work with sync requests in FF
  req.onload = function () {
    cb(arrayBufferToDataUri(req.response))
  }
  req.send(null)
}

function arrayBufferToDataUri(arrayBuffer) {
  var base64 = '',
      encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      bytes = new Uint8Array(arrayBuffer), byteLength = bytes.byteLength,
      byteRemainder = byteLength % 3, mainLength = byteLength - byteRemainder,
      a, b, c, d, chunk

  for (var i = 0; i < mainLength; i = i + 3) {
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    a = (chunk & 16515072) >> 18; b = (chunk & 258048) >> 12;
    c = (chunk & 4032) >> 6; d = chunk & 63;
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  if (byteRemainder == 1) {
    chunk = bytes[mainLength];
    a = (chunk & 252) >> 2;
    b = (chunk & 3) << 4;
    base64 += encodings[a] + encodings[b] + '==';
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
    a = (chunk & 16128) >> 8;
    b = (chunk & 1008) >> 4;
    c = (chunk & 15) << 2;
    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }
  return base64
  // return "data:image/jpeg;base64," + base64;
}
