import { Component } from "react"
import { withRouter } from "react-router"
import { CakeList } from "./CakeList"
import { Carousel } from "./Carousel"


class Home extends Component {

    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
                <Carousel />
                <CakeList addToCart={this.props.addCart} />
            </div>
        )
    }

}
export default withRouter(Home)