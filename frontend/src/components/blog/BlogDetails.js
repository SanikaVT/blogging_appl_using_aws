import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

export default function BlogDetails() {
  const [likeOpen, setlikeOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const confirmdelete = () => {
    setOpen(true);
  };
  const card_border = {
    backgroundColor: "white",
    // borderRadius: "10px",
    borderWidth: 1,
    paddingBottom: 2,
    // alignLeft:20,
  };

  const editblog = () => {
    window.location.href = "/editblog";
  };
  const gotpage = () => {
    window.location.href = "/blog";
  };

  const likeblog = () => {
    setlikeOpen(true);
  };
  const likeblogclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setlikeOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={likeblogclose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12} md={8} marginLeft={2}>
        <Button onClick={editblog}>Edit Blog</Button>
        <Button onClick={confirmdelete}>Delete Blog</Button>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card style={card_border} sx={{ pl: 3, pb: 1, mb: 1 }}>
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            maxWidth={"md"}
          >
            <Grid item xs={12}>
              <Typography variant="h5">Blog</Typography>
            </Grid>

            <Grid item sm={12}>
              <Typography variant="subtitle1" gutterBottom>
                If your enterprise is prioritizing digital transformation
                efforts, then the task of creating and managing a cloud security
                strategy is imminent. This often proves to be a challenge for IT
                teams who lack familiarity with cloud environments.
                <br />
                If your enterprise is prioritizing digital transformation
                efforts, then the task of creating and managing a cloud security
                strategy is imminent. This often proves to be a challenge for IT
                teams who lack familiarity with cloud environments.
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <Grid item sm={12} margin={2}>
          <Typography variant="title"> Total Likes: 1</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4} paddingLeft={2}>
        Like Blog
        <IconButton aria-label="like" onClick={likeblog} color="error">
          <FavoriteIcon />
        </IconButton>
        <Snackbar
          open={likeOpen}
          autoHideDuration={2000}
          message="Blog Liked"
          onClose={likeblogclose}
          action={action}
        />
        <form>
          <TextField
            fullWidth
            label="Write Comment"
            name={"comment"}
            multiline
            required
            sx={{ marginTop: 1, marginBottom: 2, marginRight: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginBottom: 2, bgcolor: "#2E8BC0" }}
          >
            Post
          </Button>
        </form>
        <Divider variant="middle" />
        <Typography variant="h6" component="div" marginBottom="2">
          Comments
        </Typography>
        <Card style={card_border} sx={{ pb: 1, mb: 1 }}>
          <Typography variant="body1">User 1</Typography>
          <Typography color="text.secondary" variant="body2">
            Very Well Explained!
          </Typography>
        </Card>
        <Card style={card_border} sx={{ pb: 1, mb: 1 }}>
          <Typography variant="body1">User 2</Typography>
          <Typography color="text.secondary" variant="body2">
            Nice!
          </Typography>
        </Card>
        <Card style={card_border} sx={{ pb: 1, mb: 1 }}>
          <Typography variant="body1">User 3</Typography>
          <Typography color="text.secondary" variant="body2">
            Very well written!
          </Typography>
        </Card>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this blog?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={gotpage} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
