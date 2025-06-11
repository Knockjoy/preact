import React,{useState,useEffect} from "react";

const useWindowHeight=()=>{
    const [width,setHeight] = useState(window.innerHeight);
    useEffect(()=>{
        const handleResize = ()=>{
            window.addEventListener("resize",handleResize);

            return ()=>{
                window.removeEventListener("resize",handleResize);
            };
        };
    },[]);

    return width
};

export default useWindowHeight;