import axios from "axios";
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import { connect } from "react-redux";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(userPass) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(userPass);
}

let error = []



class Login extends Component {

    constructor() {
        super()
        this.state = {
            errors: []
        }

    }


    componentDidMount() {
        if (localStorage.getItem("token")) {
            this.props.history.push("/")
        }
    }


    formSubmit = (e) => {
        e.preventDefault();
        let email = e.target.elements["email"].value
        let password = e.target.elements["password"].value
        error = []

        if (!email) {
            e.target.elements["email"].style['border-color'] = 'red'
            error.push("Please enter your registered email")
            this.setState({
                errors: error
            })
        } else if (!validateEmail(email)) {
            e.target.elements["email"].style['border-color'] = 'red'
            error.push("Please enter a valid email")
            this.setState({
                errors: error
            })

        } else if (!password) {
            e.target.elements["email"].style['border-color'] = 'green'
            e.target.elements["password"].style['border-color'] = 'red'
            error.push("Please enter your password")
            this.setState({
                errors: error
            })
        } else if (!validatePassword(password)) {
            e.target.elements["email"].style['border-color'] = 'green'
            e.target.elements["password"].style['border-color'] = 'red'
            error.push("password is not valid")
            this.setState({
                errors: error
            })
        } else {
            e.target.elements["password"].style['border-color'] = 'green'
            e.target.elements["email"].style['border-color'] = 'green'
            error = []
            this.setState({
                errors: error
            })



            let userData = {
                email: email,
                password: password
            }

            axios({
                url: "https://apibyashu.herokuapp.com/api/login",
                method: "POST",
                data: userData
            }).then(
                (resolved) => {

                    if (resolved.data.message === "Invalid Credentials") {
                        toast.error("Invalid Credentials")
                    } else if (resolved.data.token) {
                        // console.log("logged in");
                        this.props.LoginData(true)
                        localStorage.setItem("token", resolved.data.token)
                        localStorage.setItem("name", resolved.data.name)
                        localStorage.setItem("email", resolved.data.email)
                        localStorage.setItem("role", resolved.data.role)
                        this.props.dispatch({
                            type: "LOGIN"
                        })
                        toast.success("Welcome " + resolved.data.name)
                        this.props.history.push("/")



                    }


                },
                (error) => {
                    console.log("some error", error);
                    this.props.LoginData(false)
                    toast.error("API error" + error)
                }
            )


        }
    }


    render() {
        return (
            <div className="container mt-3">

                {
                    this.state.errors
                        .length > 0 &&
                    <div className="alert alert-danger" role="alert">
                        <ul> {this.state.errors.map((x) => { return <li> {x} </li> })} </ul>
                    </div>
                }

                <form onSubmit={this.formSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" aria-describedby="emailHelp" name="email" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" name="password" />
                    </div>
                    <div className="row">
                        <div className="mb-3 form-check col-md-6 col-xs-12">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                        </div>

                        <div className="mb-3 form-check col-md-6 col-xs-12">
                            <Link to="Forgot-Password">
                                <label className="form-check-label">Need Help?</label></Link>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>
        )
    }
}
let temp_var = withRouter(Login)
export default connect()(temp_var)