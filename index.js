var url = 'file:///users/noah/src/node/docparse/scrapers/imacros/files/test/config.json'
var request = new XMLHttpRequest()
var async = false
request.open('GET', url, async)
request.send()
var response = request.response
alert('response: ' + response)
