import { Routes, Route } from "react-router-dom";
import HomePage from "../components/homepage";
import SignIn from "../components/login";
import SignUp from "../components/signup";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    );
}
export default AppRoutes;