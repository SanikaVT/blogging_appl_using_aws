import { Routes, Route } from "react-router-dom";
import HomePage from "../components/homepage";
import SignIn from "../components/login";
import SignUp from "../components/signup";
import EditBlog from "../components/blog/EditBlog"
import Blog from "../components/blog/Blog"
import BlogDetails from "../components/blog/BlogDetails"
import WriteBlog from "../components/blog/WriteBlog"
import { Auth } from "../components/auth";
import { RequireAuth } from "../components/auth/RequireAuth.js";

const AppRoutes = () => {
    const ProtectedRoutes = () => {
        return (
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/editblog" element={<EditBlog />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blogdetails" element={<BlogDetails />} />
                <Route path="/writeblog" element={<WriteBlog />} />
            </Routes>
        )
    }

    return (
        <Auth>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<SignIn />} />
                <Route
                    path="*"
                    element={
                        <RequireAuth>
                            <ProtectedRoutes />
                        </RequireAuth>
                    }
                />
            </Routes>
        </Auth>
    );
}
export default AppRoutes;