const reducer = (store = '', action) => {
  if (action.type === 'CHANGE') {
    return action.filter
  }
  return store
}

export const change = (filter) => {
  return{
    type: 'CHANGE',
    filter
  }
}

export default reducer