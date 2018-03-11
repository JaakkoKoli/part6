import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE':
    return [...store.filter(a => a.id !== action.id), { ...store.find(a => a.id === action.id), votes: store.find(a => a.id === action.id).votes + 1 }]
  case 'CREATE':
    return [...store, { content: action.content, id: action.id, votes: 0 }]
  case 'INIT':
    return action.data
  default:
    return store
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const id = getId()
    await anecdoteService.createNew(content, id)
    dispatch({
      type: 'CREATE',
      content,
      id
    })
  }
}

export const initAnecdote = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      id: anecdote.id,
      content: anecdote.content
    })
  }
}

export default reducer