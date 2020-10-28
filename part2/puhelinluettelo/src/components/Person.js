import React from 'react'

const Person = ({ name, number }) => {
    return (
        <tr key={name}>
            <td>{name}</td>
            <td>{number}</td>
        </tr>
    )
}

export default Person