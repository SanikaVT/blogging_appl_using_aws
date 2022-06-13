import { Routes, Route } from "react-router-dom";
import SignIn from "../components/login";
import SignUp from "../components/signup";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
        </Routes>
    );
}
export default AppRoutes;