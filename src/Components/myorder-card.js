export const OrderCard = (props) => {

    let date = new Date(props.data.orderdate);



    return (



        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#a" + props.data.orderid} aria-expanded="true" aria-controls={"a" + props.data.orderid}>
                    <div className="row">
                        <div className="col-4">   Order id: <small>#{props.data.orderid}</small></div>
                        <div className="col-4">    Total: {props.data.price}rs</div>
                        <div className="col-4">    Purchased on: <small>{date.toLocaleDateString()}</small></div>
                    </div>
                </button>
            </h2>

            <div id={"a" + props.data.orderid} class={"accordion-collapse collapse show"} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="row">
                        <div className="col-6">
                            <p><span className="fw-bold">Order placed by:</span> <span className="">{props.data.name}</span></p>
                            <p><span className="fw-bold">Payment Mode:</span> <span className="">{props.data.mode}</span></p>
                            <p><span className="fw-bold">Status:</span> {(props.data.compeleted && <span className="">Completed</span>) || (props.data.pending && <span className="">Waiting for approval</span>) || (!props.data.pending && <span className="">Preparing</span>)}</p>
                            <p><span className="fw-bold">Address:</span> <span className="">{props.data.address}</span></p>
                            <p><span className="fw-bold">Amount to be paid:</span> <span className="">{props.data.price}</span> rs</p>
                        </div>
                        <div className="col-6">

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Preview</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Weight</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>



                                    {props.data.cakes.map((cake) => {
                                        return <tr>
                                            <td> <img src={cake.image} alt={cake.name} style={{ 'max-height': '50px' }} /></td>
                                            <td>{cake.name}</td>
                                            <td>{cake.price} rs</td>
                                            <td>{cake.weight} kg</td>
                                            <td>{cake.quantity} unit</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>



                </div>
            </div>
        </div>







    )



}