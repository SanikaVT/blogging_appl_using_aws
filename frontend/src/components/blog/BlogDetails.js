import * as React from "react";
import { Box, Stack, Typography, IconButton, Divider, Container, Paper } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { grey } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function BlogDetails() {

  const handleMenu = () => {

  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', flex: 1, mr: 1 }}>
            <Stack ml={1}>
              <Typography variant='body1' sx={{ lineHeight: 1.4, }} >
                {'user.name'}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1, color: grey[600] }}>
                {'createdAt'}
              </Typography>
            </Stack>
          </Box>
          {
            // user.id === loggedInUser.id &&
            <IconButton onClick={handleMenu}>
              <MoreHorizIcon />
            </IconButton>
          }
        </Box>
        <Divider sx={{ mb: 1 }} />

        <Typography variant="body2" sx={{ mb: 1 }}>
          If your enterprise is prioritizing digital transformation
          efforts, then the task of creating and managing a cloud security
          strategy is imminent. This often proves to be a challenge for IT
          teams who lack familiarity with cloud environments.
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <IconButton>
            <FavoriteIcon sx={{ color: 'red' }} />
          </IconButton>
          <Typography variant="body2">
            122
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
