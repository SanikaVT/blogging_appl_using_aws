import * as React from "react";
import BlogCard from "./BlogCard";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Menu, MenuItem } from '@mui/material'

export default function Blog() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const renderBlogs = (item) => {
    return (<BlogCard key={item} handleMenu={handleMenu} />)
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="sm" sx={{ py: 1 }}>
        {[1, 2, 3, 4, 5, 6].map(renderBlogs)}
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
