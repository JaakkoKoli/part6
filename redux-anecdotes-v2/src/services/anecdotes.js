import axios from 'axios'

const url = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content, id) => {
  const response = await axios.post(url, { content, id, votes: 0 })
  return response.data
}

const vote = async(anecdote) => {
  const response = await axios.put(url+anecdote.id, { content: anecdote.content, id: anecdote.id, votes: anecdote.votes+1 })
  return response.data
}

export default {
  getAll, createNew, vote
}