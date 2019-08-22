require('express-async-error')
const express = require('express')
const app = express()
// require('../server')
require('./startUp/routes')(app)
require('./startUp/error')()

require("@babel/register")({
  presets: ["es2015"]
});



const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`listening to port ${port}`))