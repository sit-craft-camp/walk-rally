import React from 'react'
import styled from 'styled-components'
import firebase from './utils/firebase'
import data from './utils/data'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Scanner from './components/Scanner'
import Hint from './components/Hint'
import Home from './components/Home'
import Login from './components/Login'

import './bootstrap.min.css'

const Wrapper = styled.div`
 background: url(https://craft.sitchallenge.com/static/images/backgroud.png) repeat;
 min-height: 100vh;
 color: white;
`

class Index extends React.Component {
  render() {
    return (
      <Wrapper>
        <Router>
          <div className="container">
            <h1 className="text-center pt-4">SIT CRAFT Camp</h1>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route path="/scanner" component={Scanner} />
            <Route path="/hint" component={Hint} />
          </div>
        </Router>
      </Wrapper>
    )
  }
}

export default Index
