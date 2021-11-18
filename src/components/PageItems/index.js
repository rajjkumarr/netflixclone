import {Link} from 'react-router-dom'
import './index.css'

const PageItems = props => {
  const {pageData} = props
  const {id, images} = pageData
  const imageUrl = `https://image.tmdb.org/t/p/original/${images}`

  return (
    <div className="containerr">
      <Link to={`/trending/${id}`} className="react-slick-item">
        <img src={imageUrl} className="poster" alt="text" />
      </Link>
    </div>
  )
}
export default PageItems
