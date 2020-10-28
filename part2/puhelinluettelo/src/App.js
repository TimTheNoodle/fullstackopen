import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsFilter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('click', event.target)

    const found = persons.some(person => person.name === newName)
    if(found) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
  
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log("filter is:", event.target.value)
    setFilter(event.target.value)
  }

  const contactsToShow = personsFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(personsFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        filter={personsFilter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add new contact</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={contactsToShow} />
    </div>
  )

}

export default App