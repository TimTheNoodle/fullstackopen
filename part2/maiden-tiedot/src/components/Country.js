import React from 'react'


const Country = ({ country }) => {

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map((lang) =>
                    <li key={lang.name}>{lang.name}</li>
                )}
            </ul>
            <img src={country.flag} width="300" alt="flag of the country"></img>           
        </div>
    )}

export default Country