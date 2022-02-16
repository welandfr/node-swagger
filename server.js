require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000

console.log("hello node!")

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Hello Node!"})
})

// Vi importerar vår notes route-modul
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
