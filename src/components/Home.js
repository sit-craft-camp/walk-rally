import React from 'react'
import styled from 'styled-components'
import firebase from '../utils/firebase'

import {
  Link
} from 'react-router-dom'

const Puzzle = styled.div`
  h1 {
    font-size: 92px;
  }

  h2 {
    font-size: 38px;
  }
`

class Home extends React.Component {
  state = {
    puzzle: 0,
    team: ''
  }

  componentWillMount() {
    const teamID = localStorage.getItem('team')
    if (teamID === null) {
      this.props.history.push('/login')
    }
  }

  async componentDidMount() {
    const teamID = localStorage.getItem('team')
    const fb = await firebase()
    let hints = await fb.database().ref(`/team/${teamID}`).once('value').then(function(snapshot) {
      let data = snapshot.val()
      if (data !== null) {
        let hints = Object.keys(data).map(key => data[key])
        console.log(hints)

        return hints
      } else {
        return []
      }
    })
    this.setState({
      puzzle: hints.length,
      team: teamID
    })
  }

  logout = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <Puzzle className="text-center">
          <h2>Puzzle: {this.state.team}</h2>
          <h1>{ this.state.puzzle }</h1>
        </Puzzle>
        <Link to="/scanner" className="btn btn-primary btn-block btn-lg">Scanner</Link>
        <Link to="/hint" className="btn btn-success btn-block btn-lg">Hint</Link>
        <button onClick={this.logout} className="btn btn-danger btn-block btn-sm">Logout</button>
      </div>
    )
  }
}

export default Home
