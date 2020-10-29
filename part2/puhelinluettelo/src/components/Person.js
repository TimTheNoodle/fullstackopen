import React from 'react'

const Person = ({ name, number, deletePerson }) => {
    return (
        <tr key={name}>
            <td>{name}</td>
            <td>{number}</td>
            <td><button onClick={deletePerson}>delete</button></td>
        </tr>
    )
}

export default Person