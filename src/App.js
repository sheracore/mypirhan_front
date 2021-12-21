import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import histroy from './history'
import { ToastContainer } from 'react-toastify'
import routes from './routes/routes'
import Movies from './components/movies'
import MovieForm from "./components/movieForm"
import NavBar from './components/navBar'
import ProtectedRoute from './components/common/protectedRoute';
import auth from './services/authService'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../src/redux/store/store'
import 'react-toastify/dist/ReactToastify.css'
import './css/main/App.css';
// import './App.css';


class App extends Component {
  state = {}

  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <React.Fragment>
          <Router history={histroy}>
            <ToastContainer />
            <NavBar user={user} />

            <Switch>
              {routes.map((route) =>
                (<Route key={route.path} exact={true} path={route.path} component={route.component} />)
              )
              }
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route path="/movies"
                render={props => <Movies {...props} user={this.state.user} />} />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
          </Router>
        </React.Fragment>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
