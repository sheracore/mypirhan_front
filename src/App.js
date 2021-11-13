import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import histroy from './history'
import { ToastContainer } from 'react-toastify'
import routes from './routes/routes'
import Movies from './components/movies'
import MovieForm from "./components/movieForm"
import Home from './components/home'
import Rentals from './components/rental'
import NotFound from './components/notFound'
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm';
import NavBar from './components/navBar'
import Logout from './components/logout';
import Create from './components/create';
import ProtectedRoute from './components/common/protectedRoute';
import AdminDashboard from './components/adminDashboard';
import auth from './services/authService'
import 'react-toastify/dist/ReactToastify.css'
import './css/main/App.css';
// import './App.css';


class App extends Component {
  state = {}

  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState( { user } )
  }

  render(){
    const { user } = this.state
  return (
  <React.Fragment>
    <Router history={histroy}>
    <ToastContainer />
    <NavBar user={user}/>
    
      <Switch>
        {routes.map((route) => 
          (<Route exact={true} path={route.path} component={route.component}/>)
          )
        }
        <ProtectedRoute path="/movies/:id" component={MovieForm} />
        <Route path="/movies" 
          render={props => <Movies {...props} user={this.state.user}/>} />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  </React.Fragment>
  );
}
}

export default App;
