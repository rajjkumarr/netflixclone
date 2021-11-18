import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="notFound-containers">
    <h1 className="notFound-heading">Lost Your Way?</h1>
    <p className="notFound-paragraph">
      Sorry we Can not Find that Page . You will find lots to explore on the
      Home Page
    </p>

    <Link to="/" className="home">
      Home
    </Link>
    <p className="notFound-paragraph">Error Code NSES-404</p>
  </div>
)

export default NotFound
