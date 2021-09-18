import { withRouter } from "react-router"
import { toast } from "react-toastify"

const Cake = (props) => {


    let temp_img = props.data.image


    if (temp_img === "C:\\fakepath\\image3.jfif") {
        temp_img = "https://res.cloudinary.com/ashudev/image/upload/v1615381479/xeowxf1xf8unbnqlipap.jpg"
    }


    let data = {
        cake_Id: props.data.cakeid,
        cake_Name: props.data.name,
        cake_Price: props.data.price,
        cake_Image: temp_img,
        cake_Weight: props.data.weight
    }



    function cakeDetail() {
        console.log(props);
        props.history.push("/cake-details/" + props.data.cakeid)
    }

    let addToCart = () => {
        if (!localStorage.getItem("token")) {
            // alert("Please log in first before you add to cart");
            toast.error("Please log in first before you add to cart")
            props.history.push("/login")
            return
        } else {
            props.addCart(data)
        }

    }



    return (

        <div className="col-xs-12 col-md-3 mt-4 text-start">
            <div className="card">
                <img src={temp_img} className="card-img-top" alt={props.data.name} style={{ 'width': '100%', 'height': '200px' }} onClick={cakeDetail} />
                <div className="card-body">
                    <h5 className="card-title" onClick={cakeDetail} >{props.data.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted " onClick={cakeDetail}>{props.data.price} Rs</h6>
                    <button className="btn btn-primary" onClick={() => addToCart()}>Add to cart</button>
                </div>
            </div>
        </div>



    )



}

export default withRouter(Cake)