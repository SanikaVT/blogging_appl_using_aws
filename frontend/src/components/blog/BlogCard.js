import { Box, Stack, Typography, IconButton, Button, Paper } from '@mui/material'
import * as React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function BlogCard({ handleMenu }) {

  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 2, mt: 2 }} >
      <Stack direction="row" sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Name
        </Typography>
        <Stack direction="row">
          <Button variant="contained" size="small" sx={{ margin: 'auto', mr: 0.5 }}>Follow</Button>
          <IconButton onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Typography>
        If your enterprise is prioritizing digital transformation
        efforts, then the task of creating and managing a cloud security
        strategy is imminent. This often proves to be a challenge for IT
        teams who lack familiarity with cloud environments.
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <IconButton>
          <FavoriteIcon sx={{ color: 'red' }} />
        </IconButton>
        <Typography variant="body2">
          122
        </Typography>
      </Stack>
    </Paper>
  );
}
