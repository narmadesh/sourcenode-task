const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port,function(){
    console.log(`App listening at port ${port}`);
});

app.use(function (req, res, next) {
    const url = req.url.split('/');
    app.use(require(`./routes/${url[1]}`));
    next();
});

