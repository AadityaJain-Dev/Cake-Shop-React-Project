import { CartItem } from './cart-item'
import { withRouter } from "react-router"
import { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';





let cart_data = []



const Cart = (props) => {

    // let cart_data = props.items // storing cart items locally



    let [cart_items, Setcartitems] = useState([])
    let [item_deleted, setItemDeleted] = useState("")

    useEffect(() => {


        axios({
            url: "https://apibyashu.herokuapp.com/api/cakecart",
            method: "POST",
            data: {
                email: localStorage.getItem("email")
            },
            headers: {
                authtoken: localStorage.getItem("token")
            }

        }).then(
            (resolved) => {
                cart_data = resolved.data.data
                Setcartitems(resolved.data.data)
                console.log("re rendered")
            },
            (error) => {
                console.log("error while using API of get cart", error);
            }

        )

    }, [item_deleted])



    let deleteItem = (cake_id, cake_price) => {

        axios({
            url: "https://apibyashu.herokuapp.com/api/removecakefromcart",
            method: "POST",
            data: {
                cakeid: cake_id,
                email: localStorage.email
            },
            headers: {
                authtoken: localStorage.token
            }
        }).then((response) => {

            toast.success("item removed from cart")

            if (item_deleted === "a") {
                setItemDeleted("")
            } else {
                setItemDeleted("a")
            }


            console.log("remove Item API success: ", response)
        }, (error) => {
            console.log("remove Item API error: ", error)
        })


    }


    let total = 0
    for (const cake of cart_data) {
        total = total + cake.price
    }





    let checkout = () => {
        let data = {
            price: total,
            cakes: cart_data
        }
        props.history.push("/checkout?total=" + total, data)
    }

    return (

        <div className="container mt-5 mb-5">
            {
                cart_data.length > 0 && <div className="text-center"><h2>Cart Contains :</h2></div>
            }

            {
                cart_data.length <= 0 && <div className="text-center"><h2>Cart Is Empty.</h2></div>
            }

            {
                cart_data.length > 0 && cart_data.map((item) => {
                    return <CartItem data={item} cartDelete={deleteItem} />
                })

            }


            {
                cart_data.length > 0 && <div class="row">
                    <div className="col-6 text-start mt-5">
                        <div class="row">
                            <span className="col-6">Total: {total}rs </span>
                            <span className="col-6">Item in cart: {cart_data.length}</span>
                        </div>
                    </div>


                    <div className="col-6 text-end mt-5">
                        {cart_data.length <= 0 && <button name="" id="" className="btn btn-primary" role="button" disabled>  Check Out</button>}
                        {cart_data.length > 0 && <button name="" id="" className="btn btn-primary" role="button" onClick={checkout}> Check Out</button>}

                    </div>
                </div>
            }

        </div>

    );
}

export default withRouter(Cart)