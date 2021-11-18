import {Link, withRouter} from 'react-router-dom'
// import NavBar from 'react-responsive-menubar/lib/NavBar'
import {Component} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'

import './index.css'

import {BiSearch} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'

class Header extends Component {
  state = {
    isMobile: false,
  }

  changeState = () => {
    this.setState(prevState => ({isMobile: !prevState.isMobile}))
  }

  render() {
    const {isMobile} = this.state
    return (
      <nav className="nav-header">
        <div>
          {/* <p className="movies">MOVIES</p> */}
          <ul className="nav-menu1">
            <div className="lists">
              <Link to="/" className="moviez">
                <li>Movies</li>
              </Link>
              <Link to="/" className="homes">
                <li>home</li>
              </Link>
              <Link to="/popular" className="populars">
                <li>Popular</li>
              </Link>
            </div>
            <div className="lists">
              <Link to="/search" className="searching">
                {/* <div className="search"></div> */}
                <BiSearch className="search-icons1" />
              </Link>
              {/* <input type="search" className="search2" /> */}

              <Link to="/account">
                <CgProfile className="profiles11" />
              </Link>
              <button
                type="button"
                onClick={this.changeState}
                className="buttonss"
              >
                <AiOutlineMenu className="menus-icon1" />
              </button>
            </div>
          </ul>

          {isMobile && (
            <ul className="nav-responsive">
              <Link to="/" className="popular2">
                <li>Home</li>
              </Link>
              <Link to="/popular" className="popular2">
                <li>Popular</li>
              </Link>
              <Link to="/account" className="popular2">
                <li>Account</li>
              </Link>
            </ul>
          )}
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
