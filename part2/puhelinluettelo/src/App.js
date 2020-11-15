import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsFilter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('click', event.target)

    const foundPerson = persons.find(person => person.name === newName)
    if(foundPerson) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...foundPerson, number: newNumber}
        const id = changedPerson.id

        personService
          .update(id, changedPerson)
          .then(response => {
            console.log(response)
            setPersons(persons.map(p => p.id !== id ? p : response.data))

            setNotificationMessage(
              `Updated number for ${changedPerson.name}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`${changedPerson.name} was already deleted from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== changedPerson.id))
          })

      }
      
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))

          setNotificationMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
 
    }
  }

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        console.log(response)
      })

      setNotificationMessage(
        `${name} was deleted`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
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
    : persons.filter(
        person => person.name.toLowerCase().startsWith(personsFilter.toLowerCase())
      )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
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
      <Persons 
        persons={contactsToShow}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App