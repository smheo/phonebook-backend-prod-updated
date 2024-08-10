const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

let people = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

const app = express()
//relatively new ES6 method - object.keys
const arrFromObj = Object.keys(people);
const total = arrFromObj.length

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('dev'))
app.use(cors())


app.get('/', (request, response) => {
  response.send('<h1>Hello World :)</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(people)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${total} people <br> ${Date()}`
    )
})

// This response handler returns a single person by ID
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = people.find(person => person.id === id)
    response.json(person)

    if (person) {
    response.json(person)
// 404 handling if no person with ID is found
  } else {
    response.status(404).end()
        console.log('person not found')
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  people = people.filter(person => person.id !== id)

  response.status(204).end()
})

const randomID=()=>{
    const maxID = people.length > 0 ? Math.floor(Math.random() * (200 - 5 + 1) + 5) : 0
    return maxID + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    body.id = randomID()
    people = people.concat(body)
    response.status(201).send(people)

 // TODO: Fix error handling for: no name or number entered, name duplication error

    if (people) {
        people = people.concat(body)
    } else {
        response.status(400).end()
        console.log('Error: Name must be entered')
    }

})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)





