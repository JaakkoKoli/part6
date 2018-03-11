import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import Filter from './filter'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  return(
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              props.voteAnecdote(anecdote)
              props.notify('You voted for '+anecdote.content, 5)
            }
            }>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const showAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: showAnecdotes(state.anecdotes, state.filter)
  }
}

export default connect( mapStateToProps, { notify, voteAnecdote } )(AnecdoteList)
