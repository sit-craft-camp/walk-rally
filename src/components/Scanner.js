import React from 'react'
import styled from 'styled-components'
import Instascan from 'instascan'
import firebase from '../utils/firebase'
import swal from 'sweetalert'

import {
  VideoContainer as Video,
  Square
} from '../styles'

import {
  Link
} from 'react-router-dom'

class Scanner extends React.Component {
  componentWillMount() {
    const teamID = localStorage.getItem('team')
    if (teamID === null) {
      this.props.history.push('/login')
    }
  }

  async componentDidMount () {
    this.scanner = new Instascan.Scanner({
      video: document.getElementById('checkinCam'),
      mirror: false
    })
    this.scanner.addListener('scan', async content => {
      console.log(content)
      this.checkPuzzle(content)
    })

    const cameras = await Instascan.Camera.getCameras()
    if (cameras.length > 0) {
      await this.scanner.start(cameras[0])
      document.getElementById('square').style.border = 'solid white'
    } else {
      console.log('no camera found')
    }
  }

  async componentWillUnmount () {
    this.scanner.stop()
  }

  async checkPuzzle(id) {
    const fb = await firebase()
    const teamID = localStorage.getItem('team')
    fb.database().ref(`/team/${teamID}/${id}`).set({
      timestamp: fb.database.ServerValue.TIMESTAMP
    })
    console.log(id)
    swal('แสกนเสร็จสิ้น', 'เชคข้อมูลของตัวเอง!', 'success')
  }

  render() {
    return (
      <div>
        <Square id='square'>
          <Video id='checkinCam' />
        </Square>
        <Link to='/' className='btn btn-warning btn-block btn-lg mt-4'>Back to home</Link>
      </div>
    )
  }
}

export default Scanner
