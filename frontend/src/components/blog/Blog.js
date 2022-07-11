import React, { useState } from 'react';
import BlogCard from "./BlogCard";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Menu, MenuItem } from '@mui/material'
import axios from 'axios';
import { getJwtToken, getUserId } from '../../localStorage';
import hostUrl from '../../constants';

export default function Blog() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [blogId, setBlogId] = React.useState(null);
  const open = Boolean(anchorEl);

  const renderBlogs = (item) => {
    return (<BlogCard key={item.blog_id} item={item} handleMenu={handleMenu} />)
  }

  const handleMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setBlogId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  }

  const handleDelete = () => {
    console.log(blogId);
    axios({
      method: 'delete',
      url: hostUrl + '/deleteBlog/' + blogId,
      headers: {
        Authorization: getJwtToken()
      }
    }).then((res) => {
      console.log(res);
    })
    setBlogId(null)
    handleClose();
  }

  const [blogs, setBlogs] = useState([])

  React.useEffect(() => {
    axios({
      method: 'get',
      url: hostUrl + '/getAllBlogs',
      headers: {
        Authorization: getJwtToken()
      }
    }).then((res) => {
      console.log('GET Blogs API response: ', res)
      const loggedInUserId = getUserId();
      const parsedBlogs = addFollowStatus(loggedInUserId, res.data.body.Items);
      console.log(parsedBlogs);
      setBlogs(parsedBlogs)
    }).catch(err => {
      console.log(err)
    });
  }, [blogId])

  const addFollowStatus = (loggedInUserId, blogs) => {
    if (!blogs || blogs.length === 0) {
      return blogs;
    }
    return blogs.map(blog => {
      const author = blog.userInformation;
      const authorFollowers = author.followers;
      const blogLikes = blog.likes;
      return {
        ...blog,
        followStatus: (!authorFollowers || authorFollowers.find(follower => follower.user_id === loggedInUserId) === undefined) ? 'Follow' : 'Unfollow',
        liked: (blogLikes && blogLikes.find(blogLike => blogLike.user_id === loggedInUserId) !== undefined)
      }
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="sm" sx={{ py: 1 }}>
        {blogs.map(renderBlogs)}
      </Container>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}
