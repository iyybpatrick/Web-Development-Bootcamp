var request = require("request");

request('http://www.baidu.com', function(error, response, body) {
    // check for an error
    if (!error && response.statusCode == 200) {
        var parsed_data = JSON.parse(body);
        console.log(parsed_data);
    }
});