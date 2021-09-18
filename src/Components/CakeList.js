import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cake from "./cake";
import { useState } from "react";
// let dataFetched = true
let cakesList = []

export const CakeList = (props) => {

    let [cakes, setCakes] = useState([])

    if (cakesList.length === 0) {
        axios({
            url: "https://apibyashu.herokuapp.com/api/allcakes",
            method: "GET",
        }).then(
            (resolved) => {
                // dataFetched = true
                cakesList = resolved.data.data;
                setCakes(cakesList)
                toast.success("Received product data (using hooks)")
            },
            (error) => {
                toast.error("Unable to contact API, please try again later.")
            }
        )
    }


    return (
        <div className="container mt-5 text-center mb-5" >

            <h3 id="cakeproducts">Our Products</h3>
            <div className="row">
                {
                    cakesList.length === 0 && <h1> Waiting for data</h1>
                }
                {
                    cakesList.length !== 0 &&
                    cakesList.map(x => {
                        return <Cake data={x} addCart={props.addToCart} />
                    })
                }
            </div>

        </div>
    )

}




