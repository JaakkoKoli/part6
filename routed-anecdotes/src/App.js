import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Form, Button } from 'semantic-ui-react'

const Menu = ({ anecdotes, addnew, notify }) => {
  const style = {
    background: 'green',
    border: 'solid 5px black',
    borderRadius: '20px 50px',
    padding: '20px',
    color: 'red',
    fontSize: '32px',
    textShadow: '2px 2px black'
  }
  return (
    <div>
     <Router>
      <div>
        <div style={style}>
          <NavLink to="/anecdotes" activeStyle={{fontWeight: 'bold',background: 'darkgreen'}}>anecdotes</NavLink> &nbsp;
          <NavLink to="/createnew" activeStyle={{fontWeight: 'bold',background: 'darkgreen'}}>create new</NavLink> &nbsp;
          <NavLink to="/about" activeStyle={{fontWeight: 'bold',background: 'darkgreen'}}>about</NavLink>
        </div>

        <Route exact path="/" render={({ history }) => <AnecdoteList history={history} anecdotes={anecdotes} />} />
        <Route exact path="/anecdotes" render={({ history }) => <AnecdoteList history={history} anecdotes={anecdotes} />} />
        <Route path="/about" render={() => <About />} />
        <Route path="/createnew" render={({ history }) => <CreateNew history={history} addNew={addnew} notify={notify} />} />
        <Route exact path="/anecdotes/:id" render={({match}) =>
          <Anecdote anecdote={anecdotes.find(a => a.id === match.params.id)} />}
        />
      </div>
    </Router>
  </div>
  )
}

const Notification = ({content}) => {
  const style = {
    border: '3px solid green',
    borderRadius: '25px',
    padding: '10px'
  }
  if(content !== ''){
    return (
      <div style={style}>
        {content}
      </div>
    )
  }else{
    return(
      <div></div>
    )
  }
}

const AnecdoteList = ({ anecdotes, history }) => (
  <div>
    <br /><br />
    <Table inverted>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Anecdotes</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {anecdotes.map(anecdote => <Table.Row key={anecdote.id}><Table.Cell><a onClick={() => history.push('/anecdotes/'+anecdote.id)}>{anecdote.content}</a></Table.Cell></Table.Row>)}
    </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content+' by '+anecdote.author}</h2>
    has {anecdote.votes} votes
    <br /><br />
    for more info see <a href={anecdote.info} >{anecdote.info}</a>
  </div>
)

const About = () => {
  const image = require('./hamming.jpg')
  return (
    <div>
      <br />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <h2>About anecdote app</h2>
            <p>According to Wikipedia:</p>
            
            <em>An anecdote is a brief, revealing account of an individual person or an incident. 
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
              An anecdote is "a story with a point."</em>
        
            <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
          </Grid.Column>
        <Grid.Column width={6}>
          <Image src={image} />
        </Grid.Column>
       </Grid.Row>
      </Grid>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.notify('Anecdote '+this.state.content+' saved.')
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content </label>
            <input name='content' value={this.state.content} onChange={this.handleChange} autoComplete="off" />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} autoComplete="off" />
          </Form.Field>
          <Form.Field>
          <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} autoComplete="off" />
          </Form.Field>
          <Button type='submit'>create</Button>
        </Form>
      </div>  
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  notify = (text) => {
    this.setState({notification: text}, () => setTimeout(() => this.setState({notification: ''}),10000))
  }

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Software anecdotes</h1>
            <Notification content={this.state.notification} />
            <br />
            <Menu anecdotes={this.state.anecdotes} addnew={this.addNew} notify={this.notify} />
            <br /><br />
            <Footer />
          </Container>
      </div>
    );
  }
}

export default App;
