import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Movies from './components/movies'
import MovieForm from "./components/movieForm"
import Customers from './components/customers'
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
    <ToastContainer />
    <NavBar user={user}/>
    <main className="container">
      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <ProtectedRoute path="/movies/:id" component={MovieForm} />
        <Route path="/movies" 
          render={props => <Movies {...props} user={this.state.user}/>} />
        <Route path="/customers" component={Customers} />
        <Route path="/rental" component={Rentals} />
        <Route path="/create" component={Create} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/customers" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  </React.Fragment>
  );
}
}

export default App;
