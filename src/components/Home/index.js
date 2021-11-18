import {Component} from 'react'
// import {Link} from 'react-router-dom'
import {AiOutlineGoogle} from 'react-icons/ai'

import {FaInstagram, FaYoutube, FaTwitter} from 'react-icons/fa'

import ReactSlider from '../ReactSlider'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TopRated from '../TopRated'
import Original from '../Original'

import './index.css'
import Header from '../Header'

class Home extends Component {
  state = {
    overview: '',
    title: '',
  }

  componentDidMount() {
    this.getHomeDetails()
  }

  getHomeDetails = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/550?api_key=c8ca171bf30d57184cb4565966e59b63',
    )
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({
        imageUrl: data.poster_path,
        title: data.title,
        overview: data.overview,
      })
    }
  }

  render() {
    const {imageUrl, title, overview} = this.state
    console.log(overview)
    console.log(imageUrl)
    const movieImage = `https://image.tmdb.org/t/p/original/${imageUrl}`
    console.log(movieImage)

    const sectionStyle1 = {
      backgroundImage: `url(${movieImage})`,
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
    }

    return (
      <div className="main-container">
        <Header />
        <div className="bg-container1" style={sectionStyle1}>
          <div className="cont">
            <h1 className="heading">{title}</h1>
            <p className="description">{overview}</p>
            <button type="button" className="button3">
              Play
            </button>
          </div>
        </div>

        <div className="footerss">
          <div>
            {/* <p className="trending">Trending Now</p> */}

            <ReactSlider />
          </div>
          <div>
            <TopRated />
          </div>

          <div>
            <Original />
          </div>
          <div className="icons1">
            <AiOutlineGoogle className="icon-color1" />
            <FaTwitter className="icon-color1" />
            <FaInstagram className="icon-color1" />
            <FaYoutube className="icon-color1" />
          </div>
          <div className="icons2">
            <p className="contact-us">Contact Us</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
