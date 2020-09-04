var sanitize = require("sanitize-filename");
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/get-link', (req, res) => {
    let code = req.body.data
    let name = req.body.name
    let time = `${(new Date()).getTime()}`
    let fileName = sanitize(time+name)
    fs.writeFile(`public/${fileName}`, code, function(err) {
        if (err) {
            res.send(err)
        }
        res.status(200).json({data: `${fileName}`});
       
    })
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})