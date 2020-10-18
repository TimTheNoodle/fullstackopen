import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdotes, selected, points }) => (
  <div>
    <p>
      {anecdotes[selected]}
    </p>
    <p>
      has {points[selected]} points
    </p>
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length - 1).fill(0))

  const handleNext = () => setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length - 1)))

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} points={points} />
      <Button onClick={handleVote} text={"vote"} />
      <Button onClick={handleNext} text={"next anecdote"} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} selected={points.indexOf(Math.max(...points))} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
