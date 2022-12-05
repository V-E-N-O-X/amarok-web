const express = require('express')
const PORT = process.env.PORT || 3030;
var app = express();

var main = require('./index2');

app.use('/', index2);

app.listen(PORT, () => {
    console.log(`Server Run on port ${PORT}`)
});
