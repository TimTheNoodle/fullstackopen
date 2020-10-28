import React from 'react'
import Person from './Person'

const Persons = ({ persons }) => {
    return (
        <div>
            <table>
                <tbody>
                    {persons.map((person) =>
                        <Person key={person.name} name={person.name} number={person.number}/>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Persons