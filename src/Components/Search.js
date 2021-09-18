import axios from "axios"
// import queryparser from 'query-string'
import SearchCard from "./searchCard"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const Search = (props) => {


    // let query = queryparser.parse(props.location.search)
    // console.log(props.location);

    const urlParameter = new URLSearchParams(window.location.search);
    const searchString = urlParameter.get('q').replace(/[^a-zA-Z ]/g, "");

    console.log("search query", searchString);


    const [searchResults, setSearchResult] = useState([])

    useEffect(function () {


        axios({
            url: "https://apibyashu.herokuapp.com/api/searchcakes?q=" + searchString,
            method: "GET"
        }).then(
            (resolved) => {

                setSearchResult(resolved.data.data)
            },
            (error) => {
                toast.error(error)
                console.log(error);
            }

        )

    }, [searchString])




    return (
        <div className="container">
            <h1 className="mb-3 mt-3">Search result:</h1>

            {
                searchResults.length <= 0 && <div>
                    no cakes found
                </div>
            }

            {
                searchResults.length > 0 && <div>
                    {searchResults.map((x) => {
                        return <SearchCard data={x} />
                    })}
                </div>
            }


        </div>
    )



}