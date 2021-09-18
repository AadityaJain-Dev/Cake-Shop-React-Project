import { Link } from "react-router-dom"

export const NotFound = () => {

    return (
        <div className="text-center">
            <img src="/media/404.jpg" alt=" 404 not found" srcset="" style={{ 'max-height': '350px' }} />
            <h1> 404 Not Found</h1>
            <p>It seems like we are out of pages :/</p>
            <p>But we are not out of cakes, <Link to="/"><strong>Order Now!!</strong></Link></p>
        </div>
    )
}

