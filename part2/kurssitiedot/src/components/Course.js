import React from 'react'

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    let sum = parts.reduce((accumulator, current) => {
      return accumulator + current.exercises
    }, 0)
    return(
      <p style={{fontWeight: "bold"}}>Total of {sum} exercises</p>
    ) 
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Course = ({ course }) => {
      return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
  }

  export default Course