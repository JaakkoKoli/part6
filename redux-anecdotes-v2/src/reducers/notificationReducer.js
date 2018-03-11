const reducer = (store = '', action) => {
  if (action.type === 'NEW') {
    return action.content
  }else if(action.type === 'RESET'){
    return ''
  }
  return store
}

export const reset = () => {
  return{
    type: 'RESET'
  }
}

export const notify = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW',
      content: content
    })
    window.setTimeout(() => dispatch(reset()), time*1000)
  }
}

export default reducer