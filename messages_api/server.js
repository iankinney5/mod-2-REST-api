const express = require('express')
const app = express()
const PORT = 3000

const seed = require('./seed')
const { db } = require('./db')
const { Message } = require('./models/index')

seed()

//*************** ROUTES ******************//

// Route to show json of all cards
app.get('/messages', async (req, res) => {
    let allMessages = await Message.findAll()
    res.json({allMessages})
})

app.get('/messages/:id', async (req, res) =>  {
    let messageID = req.params.id;
    let message = await Message.findByPk(messageID)
    res.json({message})
})

app.post('/messages', async (req, res) => {
    let body = json(req.body);
    let message = body.message;
    var sql = `INSERT INTO messages (message) VALUES ("${message}")`;
    db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    req.flash('success', 'Data added successfully!');
  });
})

app.listen( PORT, () => {
    console.log(` Your server is now listening to port ${PORT}`)
})