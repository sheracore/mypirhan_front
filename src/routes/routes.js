import Movies from '../components/movies'
import MovieForm from "../components/movieForm"
import Home from '../components/home'
import Rentals from '../components/rental'
import NotFound from '../components/notFound'
import LoginForm from '../components/loginForm'
import RegisterForm from '../components/registerForm';
import NavBar from '../components/navBar'
import Logout from '../components/logout';
import Create from '../components/create';
import ProtectedRoute from '../components/common/protectedRoute';
import AdminDashboard from '../components/adminDashboard';

{/* <Route path="/register" component={RegisterForm} />
<Route path="/login" component={LoginForm} />
<Route path="/logout" component={Logout} />
<ProtectedRoute path="/movies/:id" component={MovieForm} />
<Route path="/movies" 
    render={props => <Movies {...props} user={this.state.user}/>} />
<Route path="/home" component={Home} />
<Route path="/rental" component={Rentals} />
<Route path="/create" component={Create} />
<Route path="/admin-dashboard" component={AdminDashboard} />
<Route path="/not-found" component={NotFound} />
<Redirect from="/" exact to="/home" />
<Redirect to="/not-found" /> */}

const routes = [
    {path:"/home", name:'Home',component:Home},
    {path:"/register", name:'Register',component:RegisterForm},
    {path:"/login", name:'Login User',component:LoginForm},
    {path:"/logout", name:'Logout',component:Logout},
    {path:"/register", name:'MovieForm',component:MovieForm},
    {path:"/rental", name:'Rentals',component:Rentals},
    {path:"/create", name:'Create',component:Create},
    {path:"/admin-dashboard", name:'AdminDashboard',component:AdminDashboard},
    {path:"/not-found", name:'NotFound',component:NotFound},
]

export default routes