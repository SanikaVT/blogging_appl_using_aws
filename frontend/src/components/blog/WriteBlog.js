import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import DenseAppBar from "../Navbar";
import UserPool from "../auth/UserPool";
import { ActionTypes } from "@mui/base";
export default function WriteBlog() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = UserPool.getCurrentUser();
    postApi(
      data.get("title"),
      data.get("content"),
      user.getUsername().toString()
    );
    // console.log(user);
    window.location.href = "/blog";
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
function postApi(title, content, author_id) {
  var request = fetch(
    `https://c8atbntctd.execute-api.us-east-1.amazonaws.com/default/postblog?title=${title}&content=${content}&author_id=${author_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "SXrshRqN2w6h65IoQRHio4jgQ3hzpGRw260VPHw0",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("Error while adding:", error));
  return {
    type: ActionTypes.ADD_TODO,
    payload: request,
  };
}
