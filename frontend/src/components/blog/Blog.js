import * as React from "react";
import BlogCard from "./BlogCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
export default function Blog() {
  function write() {
    window.location.href = "/writeblog";
  }

  const buttonprop = {
    top: 5,
    bgcolor: "#2E8BC0",
    float: "right",
    borderRadius: "15px",
    margin: 3,
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        variant="contained"
        endIcon={<AddCircleIcon />}
        sx={buttonprop}
        onClick={write}
      >
        Write
      </Button>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </Grid>
    </Box>
  );
}
