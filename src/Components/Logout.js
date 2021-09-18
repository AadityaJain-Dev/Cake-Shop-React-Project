import { Component } from "react"
import { Redirect, withRouter } from "react-router-dom";


class Logout extends Component {

    componentDidMount() {
        { this.props.LoginData(false) }
    }

    render() {
        return (
            <div>
                {localStorage.removeItem("token")}
                {localStorage.removeItem("email")}
                {localStorage.removeItem("name")}
                {localStorage.removeItem("role")}
                {<Redirect to="/" />}

            </div>
        )
    }

}

export default withRouter(Logout)