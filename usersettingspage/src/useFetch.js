import { useEffect, useState } from "react";

const useFetch = (url)=>{
    const [data, setData] = useState([])
    const [error, seterror] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('Can not fetch the data')
                }
                return res.json();
            })
            .then(data => {
                setData(data.results);
            })
            .catch(e => {
                seterror(e.message)
            })
    }, [url])
    return{data,error}
}

export default useFetch;