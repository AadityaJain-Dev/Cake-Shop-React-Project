import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CakeDetails from './Components/CakeDetails'
import { Footer } from './Components/Footer'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import { NotFound } from "./Components/NotFound"
import { Search } from "./Components/Search"
import Login from "./Components/Login"
import { Register } from "./Components/Register"
import { ForgotPassword } from "./Components/ForgotPassword"
import { AddProduct } from "./Components/AddProduct"
import Cart from "./Components/Cart"
import { Component } from 'react'
import Logout from './Components/Logout'
import axios from 'axios';
import Checkout from './Components/Checkout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import orderPlaced from './Components/orderPlaced'
import placedOrder from './Components/placedOrder'

class App extends Component {

  constructor() {
    super()
    this.state = {
      query: ""
    }
  }

  cartItems = []

  is_Login = (status = false) => {
    this.setState({
      isLogin: status
    })
    console.log('login status', status);
  }


  addToCart = (data) => {
    this.cartItems.push(data)
    console.log('Cart array: ', this.cartItems);


    axios({
      url: "https://apibyashu.herokuapp.com/api/addcaketocart",
      method: "POST",
      data: {
        email: localStorage.getItem("email"),
        cakeid: data.cake_Id,
        name: data.cake_Name,
        price: data.cake_Price,
        weight: data.cake_Weight,
        image: data.cake_Image
      },
      headers: {
        authtoken: localStorage.getItem("token")
      }
    }).then(
      (resolved) => {
        console.log("sent cake to API", data)
        toast.success("Cake added to your cart")
      },
      (error) => {
        console.log("error while check out")
      }

    )



  }


  getQuery = (data) => {
    this.setState({
      query: data,
      isLogin: false,
    })
    this.props.history.push("/search?q=")
    console.log("app component update nav", data);
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar queryUpdate={this.getQuery} LoginData={this.state.isLogin} />
          <Switch >

            <Route exact path="/cake-details/:cakeid" > <CakeDetails addCart={this.addToCart} /></Route>
            <Route exact path="/login"  > <Login LoginData={this.is_Login} /> </Route>
            <Route exact path="/logout"  > <Logout LoginData={this.is_Login} /> </Route>
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/cart"  > <Cart items={this.cartItems} /></Route>
            <Route exact path="/checkout"  > <Checkout /></Route>
            <Route exact path="/add-product" component={AddProduct} />
            <Route exact path="/search" component={Search} LoginData={this.is_Login} />
            <Route exact path="/order-placed" component={orderPlaced} />
            <Route exact path="/my-orders" component={placedOrder} />
            <Route exact path="/"> <Home addCart={this.addToCart} /> </Route>
            <Route exact path="/**" component={NotFound} />
          </Switch>

        </BrowserRouter>
        <Footer />
        <ToastContainer />
      </div >
    )
  }
}

export default App;
