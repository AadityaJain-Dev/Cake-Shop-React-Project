import axios from "axios";
import { Component } from "react";
import { toast } from 'react-toastify';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class ForgotPassword extends Component {


    constructor() {
        super()
        this.state = {
            errors: []
        }
    }



    ForgotPassword = (e) => {
        e.preventDefault()
        let email = e.target.elements["recovery-email"].value


        let error = []

        if (!email) {
            error.push("Please enter your registered email address.")
            this.setState({
                errors: error
            })
        }
        else if (!validateEmail(email)) {
            error.push("Please enter a valid email address.")
            this.setState({
                errors: error
            })
        } else {


            error = []
            this.setState({
                errors: error
            })

            axios({
                url: "https://apibyashu.herokuapp.com/api/recoverpassword",
                method: "POST",
                data: { email: email }
            }).then(
                (resolved) => {
                    if (resolved.data.message === "Password Sent to your email") {
                        toast.success("reset link sent to your email")
                    } else {
                        toast.error("Error while resetting password" + resolved.data.message)

                    }

                },
                (error) => {
                    console.error("API call error: ", error)
                    toast.error("API call error: " + error)
                },

            )
        }


    }






    render() {
        return (
            <div className="container mt-5">
                <h3>Password Recovery</h3>

                {
                    this.state.errors
                        .length > 0 &&
                    <div className="alert alert-danger" role="alert">
                        <ul> {this.state.errors.map((x) => { return <li> {x} </li> })} </ul>
                    </div>
                }

                <form onSubmit={this.ForgotPassword}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="text" class="form-control" name="recovery-email" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>
        )
    }
}
export { ForgotPassword }