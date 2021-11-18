import {Component} from 'react'

// import Loader from 'react-loader-spinner'
import Header from '../Header'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class MovieListDetails extends Component {
  state = {
    moviesList: {},

    showSubmitError: false,
    errorMsg: '',
    netflixOriginals: [],
  }

  componentDidMount() {
    this.getMovieDetails()
    this.getSimilarProducts()
  }

  onSubmitFailure = errorMsg => {
    // console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=c8ca171bf30d57184cb4565966e59b63&language=en-US`,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        url: data.backdrop_path,
        title: data.title,
        runtime: data.runtime,
        adult: data.adult,
        overView: data.overview,

        genre: data.genres.length !== 0 && data.genres[0].name,
        genre2:
          data.genres.length > 1 &&
          data.genre2 !== false &&
          data.genres[1].name,
        genre3:
          data.genres.length > 2 &&
          data.genre3 !== false &&
          data.genres[2].name,
        ratingCount: data.vote_count,
        ratingAverage: data.vote_average,
        budget: data.budget,
        releaseDate: data.release_date,
        collection: data.revenue,
        popularity: data.popularity,

        language:
          data.spoken_languages.length !== 0 && data.spoken_languages[0].name,

        status: data.status,
      }

      this.setState({
        moviesList: updatedData,
      })
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  getSimilarProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c8ca171bf30d57184cb4565966e59b63&language=en-US&page=1`,
    )
    const data = await response.json()
    // console.log(data.results)
    if (response.ok === true) {
      const update = data.results
      const len = data.total_pages

      this.setState({
        netflixOriginals: update,
        lengths: len,
      })
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderSlider = () => {
    const {netflixOriginals, lengths} = this.state
    // console.log(netflixOriginals)

    return (
      <div className="below-containers">
        {netflixOriginals.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`

          return (
            <div key={movie.id} className="cont">
              {lengths > 0 && (
                <img
                  className="posers"
                  alt="null"
                  src={movieImage}
                  //   width="100%"
                  //   height="100%"
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const {
      moviesList,

      showSubmitError,
      lengths,
    } = this.state
    // console.log(showSubmitError)

    const {
      url,
      title,
      runtime,
      adult,
      overView,
      genre,
      genre2,
      genre3,

      ratingCount,
      ratingAverage,
      budget,
      releaseDate,
      collection,
      popularity,
      language,
      status,
      errorMsg,
    } = moviesList
    console.log(genre)
    // const {genres} = this.state

    const movieImage = `https://image.tmdb.org/t/p/original/${url}`
    console.log(movieImage)

    const sectionStyle = {
      backgroundImage: `url(${movieImage})`,
      backgroundSize: 'cover',

      width: '100%',
      //   height: '100%',
    }

    return (
      <div className="main-container">
        {showSubmitError === true && <p className="not">{errorMsg}</p>}
        {showSubmitError === false && (
          <div className="list-container">
            <Header />
            <div className="bg-containers" style={sectionStyle}>
              <div className="cont">
                <p className="title">{title}</p>
                <div className="span">
                  <p className="runtime">{runtime}mins</p>
                  {adult && <p className="runtime2">U|A</p>}
                </div>

                <p className="overview">{overView}</p>
                <button type="button" className="button">
                  Play
                </button>
              </div>
            </div>

            <div className="footers-containers">
              {genre !== undefined && (
                <div className="rating-container">
                  <p className="rating-avg">Genres</p>

                  <ul className="rating-avg-list">
                    <li>{genre}</li>
                    {genre2 !== undefined && <li>{genre2}</li>}
                    <li>{genre3}</li>
                  </ul>
                </div>
              )}

              <div className="rating-container">
                <p className="rating-avg">Language</p>
                <p className="rating-avg-list">{language}</p>
              </div>
              <div className="rating-container">
                <p className="rating-avg">Rating Count</p>
                <p className="rating-avg-list">{ratingCount}</p>
              </div>
              <div className="rating-container">
                <p className="rating-avg">Rating Average</p>
                <p className="rating-avg-list">{ratingAverage}</p>
              </div>

              <div className="rating-container">
                <p className="rating-avg">Budget</p>
                <p className="rating-avg-list">{budget}Rs</p>
              </div>
              <div className="rating-container">
                <p className="rating-avg">Release Date</p>
                <p className="rating-avg-list">{releaseDate}</p>
              </div>
              <div className="rating-container">
                <p className="rating-avg">Collection</p>
                <p className="rating-avg-list">{collection}</p>
              </div>
              <div className="rating-container">
                <p className="rating-avg">Popularity</p>
                <p className="rating-avg-list">{popularity}</p>
              </div>
              <div className="rating-container">
                <p className="rating-avg">Status</p>
                <p className="rating-avg-list">{status}</p>
              </div>
            </div>

            <div className="more-like-container">
              <h1 className="more">More like this</h1>
              <div>{lengths === 0 && <p className="not">not Found</p>}</div>
              {showSubmitError === true && (
                <p className="not">notFound please try another one</p>
              )}

              <div>{this.renderSlider()}</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default MovieListDetails
