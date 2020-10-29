import React from 'react'
import Country from './Country'

const Countries = ({ countries, showSingleCountry }) => {

    if (countries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    } else if (countries.length > 1) {
      return (
        <div>
          {countries.map((country) => 
            <div key={country.alpha3Code}>
            <span>{country.name}</span>
            <button
                onClick={() => showSingleCountry(country)}>
                show
            </button>
          </div>           
          )}
        </div>
      )
    } else if (countries.length === 1){
      return (
        <Country 
          key={countries[0].alpha3code} 
          country={countries[0]} 
        />
      )
    } else {
        return (
        <div>
          <p>No matches found, specify another filter</p>
        </div>
        )
    }
    
  }

  export default Countries