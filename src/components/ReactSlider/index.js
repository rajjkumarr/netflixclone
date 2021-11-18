import {Component} from 'react'
import Slider from 'react-slick'

import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

export default class ReactSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {netflixOriginals: []}
  }

  componentDidMount() {
    this.fetchNetflixOriginalsData()
  }

  fetchNetflixOriginalsData = () => {
    fetch(
      'https://api.themoviedb.org/3/trending/all/week?api_key=521230044599bb08045f4e9ff35fbad8&language=en-US',
    )
      .then(response => response.json())

      .then(response => {
        this.setState({netflixOriginals: response.results})
      })
  }

  renderSlider = () => {
    const {netflixOriginals} = this.state

    return (
      <Slider {...settings}>
        {netflixOriginals.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          const movieId = movie.id
          return (
            <Link to={`/movieDetails/${movieId}`} className="react-slick-item">
              <div key={movie.id}>
                <img
                  className="poster1"
                  src={movieImage}
                  //   width="100%"
                  //   height="100%"
                  alt="text"
                />
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {netflixOriginals} = this.state
    console.log(netflixOriginals)

    return (
      <>
        <h1 className="headings">Trending</h1>
        <div className="slick-app-container">
          <div style={{width: '80%'}}>
            {netflixOriginals.length ? (
              this.renderSlider()
            ) : (
              <p style={{textAlign: 'center'}}>Loading...................</p>
            )}
          </div>
        </div>
      </>
    )
  }
}
