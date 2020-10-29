import React from 'react'
import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
    return (
        <div>
            <table>
                <tbody>
                    {persons.map((person) =>
                        <Person 
                            key={person.id} 
                            name={person.name} 
                            number={person.number}
                            deletePerson={() => deletePerson(person.name, person.id)}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Persons