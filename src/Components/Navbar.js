import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {

    constructor() {
        super()
        this.state = {}
    }


    searchQuery = ""

    queryUpdate = (e) => {
        this.searchQuery = e.target.value;
    }

    setSearchQuery = (e) => {
        e.preventDefault()
        // this.props.queryUpdate(this.searchQuery)
        document.getElementById("search_input").value = ""
        this.props.history.push("/search?q=" + this.searchQuery)
    }


    render() {
        return (

            <div>

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <Link to="/">
                            <a class="navbar-brand" href="#"><img src="/media/logo.jpg" alt="Cake shop logo" class="cake-shop-logo" /></a>
                        </Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link to="/">
                                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                                    </Link>
                                </li>
                                {/* <li class="nav-item">
                                    <Link to="/#cakeproducts">
                                        <a class="nav-link" href="#">Products</a>
                                    </Link>
                                </li> */}

                                {
                                    (
                                        !(localStorage.getItem("token"))
                                    ) && (
                                        <li class="nav-item">
                                            <Link to="/register">
                                                <a class="nav-link" href="#">Register</a>
                                            </Link>
                                        </li>

                                    )



                                }




                                {/* <li class="nav-item">
                                    <Link to="/login">
                                        <a class="nav-link" href="#">Login</a>
                                    </Link>
                                </li> */}
                                {
                                    (
                                        (
                                            (this.props.LoginData) || (localStorage.getItem("token"))
                                        ) && (


                                            <li className="nav-item">
                                                <Link to="/logout"> <a className="nav-link" >Logout</a></Link>
                                            </li>



                                        )


                                    ) || <li className="nav-item">
                                        <Link to="/login"> <a className="nav-link" >Login</a></Link>
                                    </li>
                                }
                                {
                                    (
                                        (this.props.LoginData) || (localStorage.getItem("token"))
                                    ) && (
                                        <li className="nav-item">
                                            <Link to="/add-product"> <a className="nav-link" >Add Product</a></Link>
                                        </li>

                                    )



                                }
                                {
                                    (
                                        (this.props.LoginData) || (localStorage.getItem("token"))
                                    ) && (
                                        <li class="nav-item">
                                            <Link to="/Cart">
                                                <a class="nav-link" href="#">Cart</a>
                                            </Link>
                                        </li>

                                    )



                                }

                                {
                                    (
                                        (this.props.LoginData) || (localStorage.getItem("token"))
                                    ) && (
                                        <li class="nav-item">
                                            <Link to="/my-orders">
                                                <a class="nav-link" href="#">My Orders</a>
                                            </Link>
                                        </li>


                                    )



                                }


                            </ul>
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search_input" onChange={this.queryUpdate} />
                                <button class="btn btn-outline-success" type="submit" onClick={this.setSearchQuery}>Search</button>
                            </form>
                        </div>
                    </div>
                </nav>


            </div>
        )
    }


}
let navbarComp = withRouter(Navbar)
export default connect((state) => {
    return {
        isLoggedIn: state["isLoggedIn"]
    }
})(navbarComp)