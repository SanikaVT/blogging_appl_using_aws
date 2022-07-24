import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container, Toolbar } from "@mui/material";
import { AuthContext } from "../auth";

// Code Reference: https://mui.com/material-ui/react-app-bar/
export default function DenseAppBar() {

  const { logout } = useContext(AuthContext)

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOGSITE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='Post'
              component="a"
              href='/writeblog'
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Post
            </Button>

            <Button
              key='Logout'
              component="a"
              href='/'
              onClick={logout}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
