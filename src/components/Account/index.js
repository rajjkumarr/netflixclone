import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'

const Account = props => {
  const onClickLogout = () => {
    Cookies.remove('request_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div>
      <Header />
      <div className="account-container">
        <h1 className="account">Account</h1>
        <hr className="line" />
        <div className="account-detail">
          <p className="para-details">Membership</p>
          <div className="acc-list">
            <p>rajkumar</p>
            <p>password:*******</p>
          </div>
        </div>
        <div className="account-detail">
          <p className="para-details">Plan Details</p>

          <p className="plan-details">Premium</p>
          <p className="ultra">Ultra HD</p>
        </div>
        <div>
          <button className="buttons" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
export default Account
