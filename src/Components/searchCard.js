import { withRouter } from "react-router"
import { toast } from "react-toastify"

const SearchCard = (props) => {

    let showDetails = (data) => {
        props.history.push("/cake-details/" + data)
    }

    let temp_img = props.data.image



    let data = {
        cake_Id: props.data.cakeid,
        cake_Name: props.data.name,
        cake_Price: props.data.price,
        cake_Image: temp_img,
        cake_Weight: props.data.weight
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

    if (temp_img === "C:\\fakepath\\image3.jfif") {
        temp_img = "https://res.cloudinary.com/ashudev/image/upload/v1615381479/xeowxf1xf8unbnqlipap.jpg"
    }

    return (
        <div className="row mb-4 border" onClick={() => showDetails(props.data.cakeid)}>
            <div className="col-3">
                <img src={temp_img} alt="" style={{ 'width': '100%', 'height': 'auto', 'maxHeight': '200px' }} />
            </div>
            <div className="col-7 p-3">
                <div className="row">
                    <div className="col-6">
                        <h4>Name: {props.data.name}</h4>
                        <span>Rating <strong>{props.data.ratings} </strong>  </span>
                        <span>Review <strong>{props.data.reviews}</strong> </span>

                        <p><br />
                            Description: {props.data.description}
                        </p>
                        <small>Chief: {props.data.owner.name} </small>

                    </div>
                    <div className="col-6">
                        <p><strong>Price: </strong>{props.data.price}  </p>
                        <p><strong>Flavour: </strong>{props.data.flavour}  </p>
                        <p><strong>Eggless: </strong>{
                            (
                                props.data.eggless && <span> Yes </span>
                            ) ||
                            (
                                !props.data.eggless && <span> Contain Egg </span>
                            )
                        }  </p>
                        <p><strong>Ingredients: </strong>{props.data.ingredients}  </p>

                        <p><strong>Weight: </strong>{props.data.weight} </p>

                    </div>

                </div>

            </div>
            <div className="col-2 ">
                <button className="btn btn-primary mt-5" onClick={() => addToCart()}>Add to cart</button>
            </div>
        </div>
    )

}

export default withRouter(SearchCard)