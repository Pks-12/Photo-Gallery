import useFetchPhotos from "../hooks/useFetchPhotos";
import { useState, useCallback, useMemo, useReducer, useEffect } from "react";
import favouriteReducer from "../reducer/favouriteReducer";
function Gallery(){
    const {photo,loading,error} = useFetchPhotos();

    //Search Input
    const[searchTerm, setSearchTerm] = useState("");

    //Favourite 
    const [favourites, dispatch] = useReducer(
        favouriteReducer,
        JSON.parse(localStorage.getItem("favourites")) || []
    );

    useEffect(()=>{
        localStorage.setItem("favourites",JSON.stringify(favourites));
    },[favourites]);

    const handleSearch = useCallback((e)=>{
        setSearchTerm(e.target.value);
    },[]);

    const filteredPhotos = useMemo(()=>{
        return photo.filter((photo)=>photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    },[photo,searchTerm]);
    // Check photo is loading or not
    if(loading){
        return(
            <p className="text-center text-xl mt-10">Loading photos...</p>
        );
    }

    if(error){
        return(
            <p className="text-center text-red-500 mt-10">{error}</p>
        );
    }

    return(
        <div className="p-6">
            <input 
            type="text"
            placeholder="Search by author..."
            className="border p-2 rounded w-full mb-6"
            value={searchTerm}
            onChange={handleSearch}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {filteredPhotos.map(photo=>{
                    const isFav = favourites.find(f=>f.id === photo.id);
                    return(
                        <div key={photo.id} className="border rounded-lg overflow-hidden">
                            <img
                            src={photo.download_url}
                            alt={photo.author}
                            className="w-full h-60 object-cover"
                            />
                        <div className="flex justify-between items-center p-3">
                            <p className="text-sm">
                                {photo.author}
                            </p>
                        <button onClick={()=>
                            dispatch({type:"TOGGLE_FAV",payload:photo})
                        }
                        >
                            {isFav ?"❤️":"🤍"}
                        </button>
                    </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Gallery;
