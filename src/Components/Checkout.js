import { withRouter } from "react-router"
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";


function ValidateMobileNumber(num) {
    const pattern = /^[6-9]\d{9}$/
    return pattern.test(num)
}

function validateZip(data) {
    return true
}

class Checkout extends Component {

    constructor() {
        super()
        this.state = {
            errors: []
        }
    }

    error = []


    formSubmit = (e) => {
        e.preventDefault();
        let name = e.target.elements["name"].value
        let mobileNumber = e.target.elements["mobileNumber"].value
        let city = e.target.elements["city"].value
        let state = e.target.elements["state"].value
        let zipCode = e.target.elements["zipCode"].value
        let address = e.target.elements["address"].value
        let total = this.props.location.state.price
        let cakes = this.props.location.state.cakes

        if (!name) {

            e.target.elements["name"].style['border-color'] = 'red'

            // this.error = []
            this.error.push("Please Enter your name")
            this.setState({
                errors: this.error
            })

        } else if (!mobileNumber) {
            e.target.elements["mobileNumber"].style['border-color'] = 'red'
            e.target.elements["name"].style['border-color'] = 'green'
            this.error = []
            this.error.push("please enter your mobile number")
            this.setState({
                errors: this.error
            })

        } else if (!ValidateMobileNumber(mobileNumber)) {
            e.target.elements["mobileNumber"].style['border-color'] = 'red'
            e.target.elements["name"].style['border-color'] = 'green'
            this.error = []
            this.error.push("please enter a valid mobile number")
            this.setState({
                errors: this.error
            })
        } else if (!city) {
            e.target.elements["city"].style['border-color'] = 'red'
            e.target.elements["name"].style['border-color'] = 'green'
            e.target.elements["mobileNumber"].style['border-color'] = 'green'
            this.error = []
            this.error.push("please select your city")
            this.setState({
                errors: this.error
            })
        } else if (!state) {
            e.target.elements["state"].style['border-color'] = 'red'
            e.target.elements["city"].style['border-color'] = 'green'
            e.target.elements["name"].style['border-color'] = 'green'
            e.target.elements["mobileNumber"].style['border-color'] = 'green'
            this.error = []
            this.error.push("please select your state")
            this.setState({
                errors: this.error
            })
        } else if (!zipCode) {
            e.target.elements["state"].style['border-color'] = 'green'
            e.target.elements["city"].style['border-color'] = 'green'
            e.target.elements["name"].style['border-color'] = 'green'
            e.target.elements["mobileNumber"].style['border-color'] = 'green'
            e.target.elements["zipCode"].style['border-color'] = 'red'
            this.error = []
            this.error.push("please enter your zip code")
            this.setState({
                errors: this.error
            })
        } else if (!validateZip(zipCode)) {
            e.target.elements["zipCode"].style['border-color'] = 'red'
            e.target.elements["state"].style['border-color'] = 'green'
            e.target.elements["city"].style['border-color'] = 'green'
            e.target.elements["name"].style['border-color'] = 'green'
            e.target.elements["mobileNumber"].style['border-color'] = 'green'
            this.error = []
            this.error.push("please enter a valid zip code")
            this.setState({
                errors: this.error
            })
        } else if (!address) {
            e.target.elements["zipCode"].style['border-color'] = 'green'
            e.target.elements["state"].style['border-color'] = 'green'
            e.target.elements["city"].style['border-color'] = 'green'
            e.target.elements["name"].style['border-color'] = 'green'
            e.target.elements["mobileNumber"].style['border-color'] = 'green'
            e.target.elements["address"].style['border-color'] = 'red'
            this.error = []
            this.error.push("please enter your address")
            this.setState({
                errors: this.error
            })
        } else {
            // everything is valid

            e.target.elements["name"].style['border-color'] = 'green'
            e.target.elements["mobileNumber"].style['border-color'] = 'green'
            e.target.elements["city"].style['border-color'] = 'green'
            e.target.elements["state"].style['border-color'] = 'green'
            e.target.elements["zipCode"].style['border-color'] = 'green'
            e.target.elements["address"].style['border-color'] = 'green'

            // let data = {
            //     address: address,
            //     city: city,
            //     phone: mobileNumber,
            //     pincode: zipCode,
            //     name: name,
            //     cakes: cakes,
            //     email: localStorage.getItem("email"),
            //     price: total,

            // }
            // console.log(data);
            axios({
                url: "https://apibyashu.herokuapp.com/api/addcakeorder",
                method: "POST",
                data: {
                    address: address,
                    city: city,
                    phone: mobileNumber,
                    pincode: zipCode,
                    name: name,
                    cakes: cakes,
                    email: localStorage.getItem("email"),
                    price: total,

                },
                headers: {
                    authtoken: localStorage.getItem("token")
                }
            }).then(
                (response) => {
                    console.log(response)
                    if (response.data.order.orderid) {
                        toast.success("order placed successfully")
                        this.props.history.push("/order-placed", response.data.order.orderid)
                    } else {
                        toast.error("error while sending data to API")
                    }

                },
                (error) => {
                    console.log(error);
                }
            )

        }

    }

    render() {
        return (
            <div className="container mt-3 mb-5 text-center">
                <h3 className="mt-5 mb-5">Place Order</h3>

                { this.state.errors.length > 0 &&
                    <div className="alert alert-danger" role="alert">
                        <ul className="text-start">
                            {console.log(this.state.errors)}
                            {this.state.errors.map(
                                (x) => {
                                    return <li>{x}</li>
                                }
                            )}
                        </ul>
                    </div>
                }


                <form class="row g-3 text-start" onSubmit={this.formSubmit}>
                    <div class="col-xs-12 col-md-6">
                        <label for="validationDefault01" class="form-label">Name</label>
                        <input type="text" class="form-control" name="name" />
                    </div>
                    <div class="col-xs-12  col-md-6">
                        <label for="validationDefault02" class="form-label">Mobile Number</label>
                        <input type="text" class="form-control" name="mobileNumber" />
                    </div>
                    <div class="col-md-6">
                        <label for="validationDefault03" class="form-label">City</label>
                        <input type="text" class="form-control" name="city" />
                    </div>
                    <div class="col-md-3">
                        <label for="validationDefault04" class="form-label">State</label>
                        <select class="form-select" name="state"  >
                            <option selected disabled value="">Choose...</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="validationDefault05" class="form-label">Zip</label>
                        <input type="text" class="form-control" name="zipCode" />
                    </div>

                    <div class="mb-3 col-12" >
                        <label for="exampleFormControlTextarea1" class="form-label">Address</label>
                        <textarea class="form-control" name="address" rows="3"></textarea>
                    </div>




                    {/* <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" />
                            <label class="form-check-label" for="invalidCheck2">
                                Agree to terms and conditions
      </label>
                        </div>
                    </div> */}
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>



            </div >



        )

    }


}

export default withRouter(Checkout)