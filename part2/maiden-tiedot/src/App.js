import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setFilter ] = useState('')
  const [ countriesDisplayed, setCountriesDisplayed ] = useState([])
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log(countryFilter)
    filterCountries(countryFilter)
  }

  const filterCountries = (countryFilter) => {
    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(countryFilter.toLowerCase()))

    setCountriesDisplayed(filtered)
  }

  const showSingleCountry = (country) => {
    console.log(country)
    setCountriesDisplayed([country])
  }

  return (
    <div>
      <div>
        Find countries
          <input
            value={countryFilter}
            onChange={handleFilterChange}
          />
      </div>
      
      <Countries 
        countries={countriesDisplayed}
        showSingleCountry={showSingleCountry}  
      />
    </div>
  )
}

export default App;
