import axios from "axios";
import { Component } from "react";
import { toast } from 'react-toastify';


let authCheck = (e) => {
    if (!localStorage.token) {
        toast.error("User not log in");
        window.location.replace("/login");
        return false;
    } else {
        return true;
    }
}

class AddProduct extends Component {

    errors = {
        ingredients: " ",
        description: " ",
        type: " ",
        weight: " ",
        flavour: " ",
        name: " ",
        price: " "
    }

    product = {}

    constructor() {
        super()
        this.state = {
            errors: this.errors
        }
    }







    ProductNameHandler = (e) => {
        let name = e.target.value

        if (!name) {
            e.target.style['border-color'] = 'red';
            this.errors.name = "Please enter product name."
            toast.error("Please enter product name!");
            this.setState({
                errors: this.errors
            })

        } else {
            e.target.style['border-color'] = 'green';
            this.errors.name = ""


            this.setState({
                errors: this.errors
            })

            this.product.name = name

        }
    }

    FlavourHandler = (e) => {
        let flavour = e.target.value

        if (flavour === "default") {
            e.target.style['border-color'] = 'red';
            this.errors.flavour = "Please select a flavour."

            toast.error("Please select a flavour!");
            this.setState({
                errors: this.errors
            })

        } else {
            e.target.style['border-color'] = 'green';
            this.errors.flavour = ""


            this.setState({
                errors: this.errors
            })

            this.product.flavour = flavour
        }
    }


    WeightHandler = (e) => {
        let weight = e.target.value

        if (!weight) {
            e.target.style['border-color'] = 'red';

            toast.error("Please enter the weight.");

            this.errors.weight = "Please enter the weight."


            this.setState({
                errors: this.errors
            })


        } else {
            e.target.style['border-color'] = 'green';

            this.errors.weight = ""


            this.setState({
                errors: this.errors
            })

            this.product.weight = weight
        }
    }

    TypeHandler = (e) => {
        let type = e.target.value

        if (!Number.isInteger(parseInt(type))) {
            e.target.style['border-color'] = 'red';

            this.errors.type = "Please select the type."
            toast.error("Please select the type.");

            this.setState({
                errors: this.errors
            })


        } else {
            e.target.style['border-color'] = 'green';
            this.errors.type = ""


            this.setState({
                errors: this.errors
            })
            // this.product.type = type
        }
    }

    DescriptionHandler = (e) => {
        let description = e.target.value

        if (!description) {
            e.target.style['border-color'] = 'red';
            this.errors.description = "Please enter the description of product"

            toast.error("Please enter the description of product");
            this.setState({
                errors: this.errors
            })




        } else {
            e.target.style['border-color'] = 'green';
            this.errors.description = ""


            this.setState({
                errors: this.errors
            })

            this.product.description = description
        }
    }


    IngredientsHandler = (e) => {
        let ingredients = e.target.value

        if (!ingredients) {
            e.target.style['border-color'] = 'red';
            this.errors.ingredients = "Please enter the ingredients of product"
            toast.error("Please enter the ingredients of product");

            this.setState({
                errors: this.errors
            })
        } else {
            e.target.style['border-color'] = 'green';
            this.errors.ingredients = ""


            this.setState({
                errors: this.errors
            })

            this.product.ingredients = ingredients.split(",");
        }
    }


    ProductPriceHandler = (e) => {
        let price = e.target.value

        if (!price) {
            e.target.style['border-color'] = 'red';
            this.errors.price = "Please set price"
            this.setState({
                errors: this.errors
            })
            toast.error("Please set price");


        } else {
            e.target.style['border-color'] = 'green';
            this.errors.price = "Please set price"
            this.setState({
                errors: this.errors
            })
            this.product.price = price

        }
    }

    IsEgglessHandler = (e) => {
        let IsEggless = e.target.checked

        if (IsEggless) {
            this.product.eggless = true

        } else {
            this.product.eggless = false

        }
    }

    // check this when form is submitted
    ImageHandler = (e) => {
        let file = e.target
        if (file.files.length === 0) {
            console.log("No files selected");
            file.style['border-color'] = 'red';


            this.errors.image = "Please upload Product image"


            this.setState({
                errors: this.errors
            })


        } else {
            console.log("Some file is selected");
            file.style['border-color'] = 'green';

            let formdata = new FormData()
            formdata.append("file", file.files[0])

            axios({
                url: "https://apibyashu.herokuapp.com/api/upload",
                method: "POST",
                data: formdata,
                headers: {
                    authtoken: localStorage.token
                }
            }).then(
                (resolved) => {
                    this.setState({
                        image: resolved.data.imageUrl
                    })
                    this.product.image = resolved.data.imageUrl
                    console.log(this.product.image);

                },
                (error) => {
                    console.log("upload error", error)
                    toast.success("Error while uploading image");
                }
            )

            // this.setState({
            //     image: "url"
            // })

            this.errors.image = ""


            this.setState({
                errors: this.errors
            })


        }
    }

    formSubmit = (e) => {
        e.preventDefault();
        let form_data = e.target

        console.log(this.product)





        axios({
            url: "https://apibyashu.herokuapp.com/api/addcake",
            method: "POST",
            data: this.product,
            headers: {
                authtoken: localStorage.token
            }
        }).then(
            (resolved) => {
                console.log("data sent to API")
                toast.success("Form submitted!");
            },
            (error) => {
                console.log("Error with API")
                toast.success("Error while submitting data to API");
            }
        )



    }





    render() {
        return (
            (
                authCheck()
            ) && (
                <div className="container mt-3">

                    <h1 className="mb-3"> Add Product </h1>
                    <form onSubmit={this.formSubmit}>
                        <div className="mb-3 row">
                            <div className="col-6">
                                <label for="exampleInputEmail1" className="form-label"> Product Name:</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={this.ProductNameHandler} />
                                {this.state.errors.name && <div className="form-text text-danger fw-bold">{this.state.errors.name}</div>}

                            </div>

                            <div className="col-6">
                                <label for="exampleInputEmail1" className="form-label"> Price:</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="price" onChange={this.ProductPriceHandler} />
                                {this.state.errors.price && <div className="form-text text-danger fw-bold">{this.state.errors.price}</div>}

                            </div>

                        </div>


                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Flavour:</label>
                            <select class="form-select" aria-label="Default select example" onChange={this.FlavourHandler}>
                                <option selected value="default">Choose your favorite flavour</option>
                                <option value="Vanilla Cake">Vanilla Cake</option>
                                <option value="Almond Cake">Almond Cake</option>
                                <option value="Hazelnut Cake">Hazelnut Cake</option>
                                <option value="Coconut Cake">Coconut Cake</option>
                                <option value="Lemon Cake">Lemon Cake</option>
                                <option value="Rum Cake">Rum Cake</option>
                                <option value="Plain Cake">Plain Cake (no cream)</option>
                            </select>
                            {this.state.errors.flavour && <div className="form-text text-danger fw-bold">{this.state.errors.flavour}</div>}
                        </div>



                        <div class="row mb-3">

                            <div className="col-4">
                                <label for="exampleInputEmail1" className="form-label">Weight</label>
                                <input type="number" min="1" max="5" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={this.WeightHandler} />
                                {this.state.errors.weight && <div className="form-text text-danger fw-bold">{this.state.errors.weight}</div>}

                            </div>

                            <div className="col-4">
                                <label for="exampleInputEmail1" className="form-label">Type</label>
                                <select class="form-select" aria-label="Default select example" onChange={this.TypeHandler}>
                                    <option selected>select type</option>
                                    <option value="1">Birthday</option>
                                    <option value="2">Anniversary</option>
                                    <option value="3">Photo Cake</option>
                                </select>
                                {this.state.errors.type && <div className="form-text text-danger fw-bold">{this.state.errors.type}</div>}
                            </div>

                            <div className="form-check col-4 mt-4 pt-3">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={this.IsEgglessHandler} />
                                <label className="form-check-label" for="exampleCheck1">Is Eggless</label>
                            </div>
                        </div>


                        {
                            this.state.image && <div className="mb-3">
                                <label class="form-label m-3" for="customFile">Images</label>
                                <img src={this.state.image} style={{ height: '100px' }} />
                            </div>
                        }




                        <div className="mb-3">
                            <label class="form-label" for="customFile">Product Image</label>
                            <input type="file" class="form-control" name="file-uploads" id="customFile" onChange={this.ImageHandler} />
                        </div>


                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Description:</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.DescriptionHandler}></textarea>
                            {this.state.errors.description && <div className="form-text text-danger fw-bold">{this.state.errors.description}</div>}

                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Ingredients:</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.IngredientsHandler}></textarea>
                            {this.state.errors.ingredients && <div className="form-text text-danger fw-bold">{this.state.errors.ingredients}</div>}

                        </div>

                        {

                            (
                                (
                                    !(

                                        (this.state.errors.ingredients === "") &&
                                        (this.state.errors.description === "") &&
                                        (this.state.errors.type === "") &&
                                        (this.state.errors.weight === "") &&
                                        (this.state.errors.flavour === "") &&
                                        (this.state.errors.name === "")



                                    ) && <button type="submit" className="btn btn-primary disabled" disabled>Submit</button>
                                )
                                ||
                                <button type="submit" className="btn btn-primary" >Submit</button>)

                        }










                    </form>




                </div>)

        )
    }

}


export { AddProduct }