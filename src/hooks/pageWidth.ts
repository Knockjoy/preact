import React,{useState,useEffect} from "react";

const useWindowWidth=()=>{
    const [width,setWidth] = useState(window.innerWidth);
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

export default useWindowWidth;