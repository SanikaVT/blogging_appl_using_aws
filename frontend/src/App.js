import "./App.css";
import { Route, Routes } from "react-router-dom";
import EditBlog from "./components/blog/EditBlog";
import Blog from "./components/blog/Blog";
import WriteBlog from "./components/blog/WriteBlog";
import BlogDetails from "./components/blog/BlogDetails";

function App() {
  return (
    <Routes>
      <Route path="/editblog" element={<EditBlog />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blogdetails" element={<BlogDetails />} />
      <Route path="/writeblog" element={<WriteBlog />} />
    </Routes>
  );
}
export default App;
