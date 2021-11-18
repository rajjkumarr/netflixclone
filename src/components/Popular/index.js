import {Component} from 'react'
// import Slider from 'react-slick'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

export default class Popular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      netflixOriginals: [],
      lengths: 1,
      currentPage: 1,
      isLoading: true,
      showSubmitError: false,
      errorMsg: '',
    }
  }

  componentDidMount() {
    this.fetchNetflixOriginalsData()
  }

  onSubmitFailure = errorMsg => {
    // console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  fetchNetflixOriginalsData = async () => {
    const {currentPage} = this.state

    // console.log(currentPage)
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=c8ca171bf30d57184cb4565966e59b63&language=en-US&page=${currentPage}`,
    )
    const data = await response.json()
    if (response.ok) {
      this.setState({
        netflixOriginals: data.results,
        lengths: data.total_pages,
        isLoading: false,
      })
    } else {
      this.onSubmitFailure(data.error_msg)
    }
    //   .then(response => response.json())

    //   .then(response => {
    //     this.setState({
    //       netflixOriginals: response.results,
    //       lengths: response.total_pages,
    //       isLoading: false,
    //     })
    //   })
  }

  next = () => {
    this.setState(
      prevState => ({currentPage: prevState.currentPage + 1}),
      this.fetchNetflixOriginalsData,
    )
  }

  prev = () => {
    this.setState(
      prevState => ({currentPage: prevState.currentPage - 1, isLoading: true}),
      this.fetchNetflixOriginalsData,
    )
    // console.log(currentPage)
  }

  renderSlider = () => {
    const {netflixOriginals, length} = this.state
    console.log(length)

    return (
      <div className="containers11">
        {netflixOriginals.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          const movieId = movie.id

          return (
            <Link to={`/movieDetails/${movieId}`} className="react-slick-item">
              <div key={movie.id} className="cont">
                <img
                  className="poster11"
                  alt="text"
                  src={movieImage}
                  //   width="100%"
                  //   height="100%"
                />
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
    } = this.state

    // console.log(netflixOriginals)
    // console.log(currentPage)

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
            <div className="headers">
              <Header />
            </div>

            {showSubmitError === true && <p className="not">{errorMsg}</p>}

            {showSubmitError === false && (
              <div className="slick-app-containers">
                {showSubmitError === false && this.renderSlider()}

                <div className="icons11">
                  {currentPage > 1 && (
                    <p className="prev1" onClick={this.prev}>
                      prev
                    </p>
                  )}

                  <p className="prev1">
                    {currentPage}of {lengths}
                  </p>

                  {currentPage < 500 && (
                    <p className="prev1" onClick={this.next}>
                      next
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    )
  }
}
