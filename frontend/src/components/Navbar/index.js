import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Code Reference: https://mui.com/material-ui/react-app-bar/
export default function DenseAppBar() {
  function home() {
    window.location.href = "/blog";
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          style={{ height: "60px", backgroundColor: "#2E8BC0" }}
        >
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            onClick={home}
          >
            BLog
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
