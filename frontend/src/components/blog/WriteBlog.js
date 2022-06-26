import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import DenseAppBar from "../Navbar";

export default function WriteBlog() {
  const [open, setOpen] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    console.log("done");
  };
  const gotpage = () => {
    window.location.href = "/blog";
  };
  const handleClose = () => {
    setOpen(false);
  };
  const card_1 = {
    backgroundColor: "white",
    borderRadius: "10px",
    borderWidth: 1,
    margin: "10px",
    padding: "10px",
  };
  // @ts-ignore
  // @ts-ignore
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
                required
                sx={{ marginTop: 1, marginBottom: 2 }}
              />
              <TextField
                fullWidth
                required
                label="Content"
                name={"content"}
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you confirm all details?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By Clicking Submit Your blog will be saved and published.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={gotpage} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}