const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    id: 1,
    name: 'Arto Hellas', 
    number: '040-123456' 
  },
  { 
    id: 2,
    name: 'Ada Lovelace', 
    number: '39-44-5323523' 
  },
  { 
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345' 
  },
  { 
    id: 4,
    name: 'Mary Poppendieck', 
    number: '39-23-6423122' 
  }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req,res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  if(!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  }

  if(!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }

  const isDuplicateName = persons.find(({ name }) => name === body.name)

  if(isDuplicateName) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000000)
  }

  persons = persons.concat(person)

  response.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
