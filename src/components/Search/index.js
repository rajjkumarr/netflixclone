import {Component} from 'react'
// import Slider from 'react-slick'
// import {BiSearch} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import {AiOutlineMenu} from 'react-icons/ai'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      netflixOriginals: [],
      lengths: 1,
      currentPage: 1,
      searchInput: null,
      isLoading: false,
      showSubmitError: false,
      errorMsg: '',
      isMobiles: false,
    }
  }

  //   componentDidMount() {
  //     this.fetchNetflixOriginalsData()
  //   }
  onSubmitFailure = errorMsg => {
    // console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  changesStates = () => {
    this.setState(prevState => ({isMobiles: !prevState.isMobiles}))
  }

  fetchNetflixOriginalsData = async () => {
    const {currentPage, searchInput} = this.state

    console.log(currentPage)

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c8ca171bf30d57184cb4565966e59b63&language=en-US&query=${searchInput}&page=${currentPage}`,
    )
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      console.log(data)
      const update = data.results
      const len = data.total_pages

      this.setState({
        netflixOriginals: update,
        lengths: len,

        isLoading: false,
      })
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  next = () => {
    const {isLoading} = this.state
    this.setState(
      prevState => ({currentPage: prevState.currentPage + 1}),
      this.fetchNetflixOriginalsData,
      (isLoading: false),
    )
  }

  prev = () => {
    const {isLoading} = this.state
    this.setState(
      prevState => ({currentPage: prevState.currentPage - 1, isLoading: false}),
      this.fetchNetflixOriginalsData,
      (isLoading: false),
    )
    // console.log(currentPage)
  }

  enterSearchInput = event => {
    console.log(event)
    const {isLoading} = this.state

    this.setState(
      {searchInput: event.target.value},
      this.fetchNetflixOriginalsData,
      (isLoading: true),
    )
  }

  Header = () => {
    const {searchInput, isMobiles, isLoading} = this.state
    return (
      <nav className="nav-header1">
        <div>
          {/* <p className="movies">MOVIES</p> */}
          <div className="nav-menu1">
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
            <div>
              <div>
                <Link to="/search" className="search">
                  <div>
                    {isLoading ? (
                      <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={50}
                        width={50}
                        className="spinner"
                      />
                    ) : (
                      <input
                        type="search"
                        value={searchInput}
                        className="input"
                        onChange={this.enterSearchInput}
                        onKeyDown={this.onEnterSearchInput}
                      />
                    )}
                  </div>
                </Link>

                {/* <input type="search" className="search2" /> */}
              </div>
              {/* <input type="search" className="search2" /> */}

              <Link to="/account">
                <CgProfile className="profiles12" />
              </Link>
              <button
                type="button"
                onClick={this.changesStates}
                className="buttons1"
              >
                <AiOutlineMenu className="menus-icon1" />
              </button>
            </div>
          </div>

          {isMobiles && (
            <div className="nav-responsive1">
              <Link to="/" className="popular2">
                <li>Home</li>
              </Link>
              <Link to="/popular" className="popular2">
                <li>Popular</li>
              </Link>
              <Link to="/account" className="popular2">
                <li>Account</li>
              </Link>
            </div>
          )}
        </div>
      </nav>
    )
  }

  renderSlider = () => {
    const {netflixOriginals, lengths} = this.state
    console.log(netflixOriginals)

    return (
      <div className="containers11">
        {netflixOriginals.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          const movieId = movie.id

          return (
            <Link to={`/movieDetails/${movieId}`}>
              <div key={movie.id} className="cont">
                {lengths > 0 && (
                  <img
                    className="poster11"
                    alt="null"
                    src={movieImage}
                    //   width="100%"
                    //   height="100%"
                  />
                )}
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  render() {
    const {
      currentPage,
      isLoading,
      lengths,

      showSubmitError,
      errorMsg,
      searchInput,
    } = this.state
    console.log(errorMsg)
    // console.log(netflixOriginals)
    console.log(currentPage)

    return (
      <>
        {isLoading ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={50}
            width={50}
            className="spinner"
          />
        ) : (
          <div>
            <div>{this.Header()}</div>

            <div className="slick-app-containers">
              {showSubmitError === true && (
                <p className="not">notFound please try another one</p>
              )}
              <div>
                {lengths === 0 && (
                  <p className="not">
                    Your search for {searchInput} didnot find any results
                  </p>
                )}
              </div>

              {showSubmitError === false && (
                <div className="slider">{this.renderSlider()}</div>
              )}

              {lengths !== 0 && (
                <div className="icons11">
                  {isLoading ? (
                    <Loader
                      type="TailSpin"
                      color="#00BFFF"
                      height={50}
                      width={50}
                      className="spinner"
                    />
                  ) : (
                    currentPage > 1 && (
                      <p className="prev1" onClick={this.prev}>
                        prev
                      </p>
                    )
                  )}

                  <p className="prev1">
                    {currentPage}of {lengths}
                  </p>
                  {isLoading ? (
                    <Loader
                      type="TailSpin"
                      color="#00BFFF"
                      height={50}
                      width={50}
                      className="spinner"
                    />
                  ) : (
                    currentPage < lengths && (
                      <p className="prev1" onClick={this.next}>
                        next
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    )
  }
}
