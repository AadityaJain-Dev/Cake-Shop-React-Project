import axios from "axios";
import { Component } from "react";
import { toast } from 'react-toastify';


function ValidateMobileNumber(num) {
    const pattern = /^[6-9]\d{9}$/
    return pattern.test(num)
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(userPass) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(userPass);
}


class Register extends Component {


    errors = {
        fname: " ",
        lname: " ",
        email: " ",
        mobile: " ",
        password: " ",
    }


    constructor() {
        super()
        this.state = {
            errors: this.errors,
            userData: {}
        }
    }


    firstNameHandler = (e) => {
        let firstName = e.target.value

        if (!firstName) {
            e.target.style['border-color'] = 'red';

            this.errors.fname = "Please enter first name."
            this.setState({
                errors: this.errors
            })


        } else {
            e.target.style['border-color'] = 'green';

            this.errors.fname = ""
            this.setState({
                errors: this.errors
            })

            this.state.userData.fname = firstName

        }

    }

    lastNameHandler = (e) => {
        let lastName = e.target.value



        if (!lastName) {

            e.target.style['border-color'] = 'red';

            this.errors.lname = "Please enter last name."
            this.setState({
                errors: this.errors
            })


        } else {

            e.target.style['border-color'] = 'green';

            this.errors.lname = ""
            this.setState({
                errors: this.errors
            })

            this.state.userData.lname = lastName


        }
    }

    mobileNumberHandler = (e) => {
        let mobileNumber = e.target.value
        if (!mobileNumber) {

            e.target.style['border-color'] = 'red';


            this.errors.mobile = "Please enter your mobile number."
            this.setState({
                errors: this.errors
            })

        } else if (!ValidateMobileNumber(mobileNumber)) {

            e.target.style['border-color'] = 'red';
            this.errors.mobile = "Please enter a valid mobile number."
            this.setState({
                errors: this.errors
            })

        } else {
            e.target.style['border-color'] = 'green';
            this.errors.mobile = ""
            this.setState({
                errors: this.errors
            })

            this.state.userData.mobileNumber = mobileNumber
        }

    }

    emailHandler = (e) => {

        let email = e.target.value
        if (!email) {
            e.target.style['border-color'] = 'red';

            this.errors.email = "Please enter a email address."
            this.setState({
                errors: this.errors
            })


        } else if (!validateEmail(email)) {
            e.target.style['border-color'] = 'red';

            this.errors.email = "Please enter a valid email address."
            this.setState({
                errors: this.errors
            })
        } else {


            this.errors.email = ""
            this.setState({
                errors: this.errors
            })
            e.target.style['border-color'] = 'green';
            this.state.userData.email = email
        }


    }

    passwordHandler = (e) => {

        let password = e.target.value
        if (!password) {
            e.target.style['border-color'] = 'red';
            this.errors.password = "Please enter a password"
            this.setState({
                errors: this.errors
            })
        } else if (!validatePassword(password)) {
            e.target.style['border-color'] = 'red';

            this.errors.password = "Your password must contain at least an upper case letter, a lower case letter, an special character, a number & must be of at least 8 character "
            this.setState({
                errors: this.errors
            })

        } else {
            e.target.style['border-color'] = 'green';

            this.errors.password = ""
            this.setState({
                errors: this.errors
            })
            this.state.userData.password = password
        }



    }

    formSubmit = (e) => {
        e.preventDefault();
        let userData = {
            "name": this.state.userData.fname + " " + this.state.userData.lname,
            "email": this.state.userData.email,
            "password": this.state.userData.password,
            "mobile": this.state.userData.mobileNumber,
        }
        console.log("hello", userData);

        axios({
            url: "https://apibyashu.herokuapp.com/api/register",
            method: "POST",
            data: userData
        }).then(
            (resolved) => {
                console.log('success');
                if (resolved.data.message === "User Already Exists") {
                    toast.error("User Already Exists")
                } else {
                    toast.success("form submitted to server")
                }

            },
            (error) => {
                console.log('error');
                toast.error("Error encountered", error)

            }
        )

    }








    render() {
        return (
            <div className="container mt-3">
                <h1>Registration Form</h1>

                <form onSubmit={this.formSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3 ">
                                <label for="firstName" className="form-label">First Name</label>
                                <input type="text" name="firstName" className="form-control" id="firstName" onChange={this.firstNameHandler} />
                                {this.state.errors.fname && <div className="form-text text-danger fw-bold">{this.state.errors.fname}</div>}

                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3 ">
                                <label for="lastName" className="form-label">Last Name</label>
                                <input type="text" name="lastName" className="form-control" id="lastName" onChange={this.lastNameHandler} />
                                {this.state.errors.lname && <div className="form-text text-danger fw-bold">{this.state.errors.lname}</div>}
                            </div>
                        </div>
                    </div>


                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={this.emailHandler} />
                        {this.state.errors.email && <div className="form-text text-danger fw-bold">{this.state.errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label for="mobileNumber" className="form-label">Mobile Number</label>
                        <input type="text" name="mobileNumber" className="form-control" id="mobileNumber" aria-describedby="emailHelp" onChange={this.mobileNumberHandler} />
                        {this.state.errors.mobile && <div className="form-text text-danger fw-bold">{this.state.errors.mobile}</div>}
                    </div>


                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={this.passwordHandler} />
                        {this.state.errors.password && <div className="form-text text-danger fw-bold">{this.state.errors.password}</div>}
                    </div>

                    {

                        (
                            (
                                !(
                                    (this.state.errors.fname === "") &&
                                    (this.state.errors.lname === "") &&
                                    (this.state.errors.email === "") &&
                                    (this.state.errors.mobile === "") &&
                                    (this.state.errors.password === "")



                                ) && <button type="submit" className="btn btn-primary disabled" disabled>Submit</button>
                            )
                            ||
                            <button type="submit" className="btn btn-primary" >Submit</button>)

                    }
                </form>

            </div>



        )
    }

}


export { Register }