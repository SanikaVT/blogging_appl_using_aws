import { Routes, Route } from "react-router-dom";
import HomePage from "../components/homepage";
import SignIn from "../components/login";
import SignUp from "../components/signup";
<<<<<<< HEAD
import EditBlog from "../components/blog/EditBlog"
import Blog from "../components/blog/Blog"
import BlogDetails from "../components/blog/BlogDetails"
import WriteBlog from "../components/blog/WriteBlog"
=======
import EditBlog from "../components/blog/EditBlog";
import Blog from "../components/blog/Blog";
import WriteBlog from "../components/blog/WriteBlog";
import BlogDetails from "../components/blog/BlogDetails";
>>>>>>> a2e029b131bc39b85fb66d1a0371bf18d0a2d268

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/editblog" element={<EditBlog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogdetails" element={<BlogDetails />} />
            <Route path="/writeblog" element={<WriteBlog />} />
        </Routes>
    );
}
export default AppRoutes;