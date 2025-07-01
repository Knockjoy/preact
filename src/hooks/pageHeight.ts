import React,{useState,useEffect} from "react";

const useWindowHeight=()=>{
    const [height,setHeight] = useState(window.innerHeight);
    useEffect(()=>{
        const handleResize = ()=>{
            window.addEventListener("resize",handleResize);

            return ()=>{
                window.removeEventListener("resize",handleResize);
            };
        };
    },[]);

    return height
};

export default useWindowHeight;