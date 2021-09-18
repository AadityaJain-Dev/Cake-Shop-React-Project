import axios from "axios"
import { Component } from "react";
import { withRouter } from "react-router"
import { OrderCard } from "./myorder-card";



class placedOrder extends Component {

    constructor() {
        super()
        this.state = {
            myOrders: []
        }
    }

    componentDidMount() {

        axios({
            url: "https://apibyashu.herokuapp.com/api/cakeorders",
            method: "POST",
            data: {
                email: localStorage.getItem("email")
            },
            headers: {
                authtoken: localStorage.getItem("token")
            }
        }).then(
            (resolved) => {
                this.setState({
                    myOrders: resolved.data.cakeorders
                })


            },
            (error) => {
                console.log(error);
            }

        )
    }



    render() {

        return (
            <div className="container mt-5 mb-5">
                <h3 className="text-start mb-2">My Orders</h3>
                <div class="accordion" id="accordionExample">


                    {
                        (
                            (this.state.myOrders.length > 0 &&
                                this.state.myOrders.map(
                                    (item) => {
                                        return <OrderCard data={item} />
                                    }
                                )
                            ) ||
                            <div className="text-center pb-5"><h3>You haven't ordered anything yet :-( </h3></div>
                        )

                    }

                </div>

            </div>
        )
    }
}

export default withRouter(placedOrder)