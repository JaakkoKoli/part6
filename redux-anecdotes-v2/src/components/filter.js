import React from 'react'
import { connect } from 'react-redux'
import { change } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (action) => {
      this.props.change(action.target.value)
    }
    render(){
      return (
        <div>
         filter <input type="text" onChange={this.handleChange} value={this.props.filter} ></input>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const ConnectedFilter = connect( mapStateToProps, { change } )(Filter)

export default ConnectedFilter