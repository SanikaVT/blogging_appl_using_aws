import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import DenseAppBar from "../Navbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getJwtToken, getUserId } from "../../localStorage";

export default function WriteBlog() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    axios({
      method: 'post',
      url: 'https://ahulfo14r5.execute-api.us-east-1.amazonaws.com/postBlog',
      data: {
        title: data.get("title"),
        content: data.get("content"),
        author_id: getUserId()
      },
      headers: {
        Authorization: getJwtToken()
      }
    }).then(() => {
      navigate('/home');
    }).catch(err => {
      console.log('Error while calling POST blog API: ', err)
    });
  };

  const card_1 = {
    backgroundColor: "white",
    borderRadius: "10px",
    borderWidth: 1,
    margin: "10px",
    padding: "10px",
  };

  return (
    <>
      <DenseAppBar />
      <Container component="main" maxWidth="md">
        <Card variant="outlined" style={card_1}>
          <Box
            sx={{
              marginTop: 0,
              display: "relative",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" sx={{ texAlign: "center", flexGrow: 1 }}>
                Write
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Blog Title"
                name="title"
                id="title"
                required
                sx={{ marginTop: 1, marginBottom: 2 }}
              />
              <TextField
                fullWidth
                required
                label="Content"
                name={"content"}
                id="content"
                rows={4}
                multiline
                sx={{ marginTop: 1, marginBottom: 2 }}
              />

              <Button
                fullWidth
                variant="contained"
                type={"submit"}
                sx={{ bgcolor: "#2E8BC0" }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Card>
      </Container>
    </>
  );
}
