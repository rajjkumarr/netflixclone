import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    requestToken: '',
    showSubmitError: false,
    errorMsg: '',
  }

  componentDidMount() {
    this.getRequestToken()
  }

  getRequestToken = async () => {
    const url =
      'https://api.themoviedb.org/3/authentication/token/new?api_key=c8ca171bf30d57184cb4565966e59b63'
    const responses = await fetch(url)
    const data = await responses.json()
    // console.log(data)
    const updatedData = data.request_token
    this.setState({requestToken: updatedData})
  }

  onSubmitSuccess = requestToken => {
    const {history} = this.props

    Cookies.set('request_token', requestToken, {
      expires: 40,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    const {username, password, requestToken} = this.state
    console.log(username)
    console.log(password)
    console.log(requestToken)

    event.preventDefault()

    const baseUrl =
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=c8ca171bf30d57184cb4565966e59b63'

    const options = {
      method: 'POST',
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
        request_token: `${requestToken}`,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(baseUrl, options)

    const datas = await response.json()
    // console.log(datas)
    if (response.ok === true) {
      this.onSubmitSuccess(datas.request_token)
    } else {
      this.onSubmitFailure(datas.status_message)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const requestToken = Cookies.get('request_token')
    if (requestToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="sign-in">Sign In</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message1">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
