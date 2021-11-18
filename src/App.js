import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'

// import Products from './components/Products'
// import Cart from './components/Cart'
import NotFound from './components/NotFound'
import Popular from './components/Popular'
import MovieListDetails from './components/MovieListDetails'
import Search from './components/Search'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/account" component={Account} />

      {/* <Route exact path="/products" component={Products} /> */}
      {/* <Route exact path="/cart" component={Cart} /> */}
      <Route path="/movieDetails/:id" component={MovieListDetails} />

      <Route path="/popular/page/:currentPage" component={Popular} />
      <ProtectedRoute exact path="/Search" component={Search} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
