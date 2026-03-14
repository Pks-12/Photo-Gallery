import { useEffect, useState } from "react";

function useFetchPhotos(){

const[photo,setPhoto] = useState([]);
const[loading,setLoading] = useState(true);
const[error,setError] = useState(null);

useEffect(()=>   {
    const fetchPhotos = async() => {
        try{
            const response = await fetch("https://picsum.photos/v2/list?limit=30");

            if(!response.ok){
                throw new Error("Failed to fetch photos");
            }

            const data = await response.json();
            setPhoto(data);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    };

    fetchPhotos();
}, []);

return {photo, loading, error};

}
export default useFetchPhotos;
