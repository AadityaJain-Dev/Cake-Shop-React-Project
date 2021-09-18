import { withRouter } from "react-router"

const orderPlaced = (props) => {

    return (
        <div className="container mt-5 mb-5">
            <div class="alert alert-success text-center" role="alert">
                <h3>Order Successful </h3>
                <h4>Order id #{props.location.state}</h4>
                <p>Your order will be delivered to you in few days.</p>
                <p>Thank you for your purchase </p>
            </div>

        </div>
    )


}
export default withRouter(orderPlaced)