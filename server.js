require('dotenv').config()
const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express()
const PORT = 3000

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Notes API",
            version: "0.1",
            description: "Simple API for notes"
        },
        servers: [
            { url: "http://localhost:" + PORT }
        ]
    },
    apis: [ "./routes/notes.js" ]
}

const swaggerSpecs = swaggerJsdoc(swaggerOptions)
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
)

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Hello Node!"})
})

// Vi importerar vår notes route-modul
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
