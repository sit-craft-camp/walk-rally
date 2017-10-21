import React from 'react'

export default class Login extends React.Component {
  state = {
    team: ''
  }

  onLogin = () => {
    localStorage.setItem('team', this.state.team)
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="">Team:</label>
          <input
            type="text"
            className="form-control"
            onChange={e => this.setState({ team: e.target.value })}
            value={this.state.team}
          />
        </div>
        <button onClick={this.onLogin} className="btn btn-primary btn-block mt-2">Login</button>
      </div>
    )
  }
}
