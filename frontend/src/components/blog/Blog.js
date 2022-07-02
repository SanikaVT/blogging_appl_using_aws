import React, { useEffect, useState } from 'react';
import BlogCard from "./BlogCard";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Menu, MenuItem } from '@mui/material'
import axios from 'axios';

export default function Blog() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const renderBlogs = (item) => {
    return (<BlogCard key={item} item={item} handleMenu={handleMenu} />)
  }

  const handleMenu = (event, post) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  }

  const handleDelete = () => {
    handleClose();
  }

  const [blogs, setBlogs] = useState([])

  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'https://5foq5ouxsd.execute-api.us-east-1.amazonaws.com/getAllBlogs',
    }).then((res) => {
      console.log('GET Blogs API response: ', res)
      setBlogs(res.data.body.Items)
    }).catch(err => {
      console.log(err)
    });
  }, [])

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
