const express = require('express')
const router = express.Router()

// Simulerad datamodell
const notes = [
    { text: "Köp gräddfil", category: 2 }, 
    { text: "Gym i dag", category: 4 }    
]

// Middleware
const logMethod = (req, res, next) => {
    console.log(req.method)
    next()
}

/**
 * @swagger
 * components:
 *  schemas:
 *      Note:
 *          type: object
 *          properties:
 *              text:
 *                  type: string
 *                  description: The note text
 *                  example: Be nice!
 *              category:
 *                  type: integer
 *                  description: Note category
 *                  example: 1
 */


/**
 * @swagger
 * /notes:
 *  get:
 *      description: List all notes
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Note'
 * 
 */
router.get('/', (req, res) => {
    res.send(notes)
})

/** Vår POST-endpoint
 * 
 * @swagger
 * /notes:
 *  post:
 *      description: Add new note
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *      responses:
 *          200:
 *              description: Note created successfully.
 * 
 */
router.post('/', logMethod, (req, res) => {
    notes.push(req.body)
    res.status(201).json({message: "Note created!"})
})

router.put('/:id', logMethod, (req, res) => {
    console.log(req.params.id);

    try {
        notes[req.params.id] = req.body
        res.json({message: "Note updated!"})

    } catch (error) {
        res.status(500).send(error.message)
    }

})



console.log("notes")

module.exports = router