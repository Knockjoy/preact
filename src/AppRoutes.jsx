import { Routes, Route, BrowserRouter } from "react-router-dom"
import Result from "./pages/result.tsx"
import Home from "./pages/home.tsx";
import Drawing from "./pages/drawing.tsx"
import Battle from "./pages/battle.tsx"
import UserSettings from "./pages/userSetting.tsx";
import Rules from "./pages/rules.tsx";
import { WebSocketProvider } from "./components/WebSocketManager.tsx";
import { BattleManagerProvider } from "./components/BattleManager.tsx";
import Waiting from "./pages/maching_wait.tsx";
import OpenSourceLicence from "./pages/OpenSouceLicence.tsx"

export const AppRoutes = () => {
    return (
        <WebSocketProvider>
            <BattleManagerProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/usersettings" element={<UserSettings />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/loading" element={<Waiting />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/drawing" element={<Drawing />} />
                    <Route path="/battle" element={<Battle />} />
                    <Route path="/licences" element={<OpenSourceLicence />}></Route>
                </Routes>
            </BattleManagerProvider>
        </WebSocketProvider>
    )
};