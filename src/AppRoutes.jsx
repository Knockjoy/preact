import { Routes, Route, BrowserRouter } from "react-router-dom"
import Result from "./pages/result.tsx"
import Home from "./pages/home.tsx";
import Drawing from "./pages/drawing.tsx"
import Battle from "./pages/battle.tsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/result" element={<Result/>} />
            <Route path="/drawing" element={<Drawing/>}/>
            <Route path="/battle" element={<Battle/>}/>
        </Routes>
    )
};