import React from 'react'
import styled from 'styled-components'
import firebase from '../utils/firebase'

import {
  Link
} from 'react-router-dom'

const Card = styled.div`
 color: black;
`

class Hint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hints: [],
      puzzle: []
    }
  }

  componentWillMount() {
    const teamID = localStorage.getItem('team')
    if (teamID === null) {
      this.props.history.push('/login')
    }
  }

  async componentDidMount () {
    const teamID = localStorage.getItem('team')
    const fb = await firebase()
    let hints = await fb.database().ref('/hint').once('value').then(function(snapshot) {
      let data = snapshot.val()
      let hints = Object.keys(data).map(key => ({ key, ...data[key] }))
      return hints
    })

    let myPuzzle = await fb.database().ref(`/team/${teamID}`).once('value').then(function(snapshot) {
      let data = snapshot.val()
      if (data !== null) {
        let puzzle = Object.keys(data)
        return puzzle
      } else {
        return []
      }
    })

    this.setState({
      hints,
      puzzle: myPuzzle
    })
  }

  render() {
    console.log(this.state)
    let pz = this.state.puzzle
    return (
      <div>
        <div className="row">
          <div className="col-12">
            {
              this.state.hints.map((h, key) => {
                return (pz.find(p => p === h.key))
                ? (
                  <Card className="card mb-2 bg-success" key={key}>
                    <div className="card-body text-center">
                      <h6>{ h.hint }</h6>
                      <h4><i>`{ h.location }`</i></h4>
                    </div>
                  </Card>
                )
                : (
                  <Card className="card mb-2" key={key}>
                    <div className="card-body text-center">
                      <h5>{ h.hint }</h5>
                    </div>
                  </Card>
                )
              })
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Link to="/" className="btn btn-warning btn-block btn-lg mt-4">Back to home</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Hint
