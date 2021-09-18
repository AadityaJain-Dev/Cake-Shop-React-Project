import axios from "axios";
import { Redirect, withRouter } from "react-router"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const CakeDetails = (props) => {



    let urlData = useParams();
    let cakeId = urlData.cakeid

    console.log(cakeId);











    const [cakedata, setcakedata] = useState({ owner: {} })
    useEffect(() => {
        axios({
            url: "https://apibyashu.herokuapp.com/api/cake/" + cakeId,
            method: "GET",
        }).then(

            (resolved) => {
                setcakedata(resolved.data.data)
            },
            (error) => { }

        )
    }, [])

    let data = {
        cake_Id: cakedata.cakeid,
        cake_Name: cakedata.name,
        cake_Price: cakedata.price,
        cake_Image: cakedata.image,
        cake_Weight: cakedata.weight
    }


    let addToCart = () => {

        if (!localStorage.getItem("token")) {

            toast.error("Please log in first before you add to cart")
            props.history.push("/login")
            return
        } else {
            props.addCart(data)

        }


    }


    let image_url = () => {
        if (cakedata.image === "C:\\fakepath\\image3.jfif") {
            return "https://res.cloudinary.com/ashudev/image/upload/v1615381479/xeowxf1xf8unbnqlipap.jpg"

        } else {
            return cakedata.image

        }
    }

    return (
        <div className="container">

            <div className="row mt-5 mb-5 pb-5">
                <div className="col-3">
                    <img src={image_url()} alt={cakedata.name} style={{ width: '100%' }} />
                </div>
                <div className="col-7">
                    <div className="row">
                        <div className="col-6">
                            <h4>Name: {cakedata.name}</h4>
                            <span>Rating <strong>{cakedata.ratings} </strong>  </span>
                            <span>Review <strong>{cakedata.reviews}</strong> </span>

                            <p><br />
                            Description: {cakedata.description}
                            </p>
                            <small>Chief: {cakedata.owner.name} </small>

                        </div>
                        <div className="col-6">
                            <p><strong>Price: </strong>{cakedata.price}  </p>
                            <p><strong>Flavour: </strong>{cakedata.flavour}  </p>
                            <p><strong>Eggless: </strong>{
                                (
                                    cakedata.eggless && <span> Yes </span>
                                ) ||
                                (
                                    !cakedata.eggless && <span> Contain Egg </span>
                                )
                            }  </p>
                            <p><strong>Ingredients: </strong>{cakedata.ingredients}  </p>

                            <p><strong>Weight: </strong>{cakedata.weight} </p>

                        </div>
                    </div>

                </div>
                <div className="col-2">
                    <button className="btn btn-success" onClick={addToCart}>Add to cart</button>   </div>
            </div>

        </div>
    )



}
export default withRouter(CakeDetails)