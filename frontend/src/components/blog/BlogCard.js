import { Stack, Typography, IconButton, Button, Paper } from "@mui/material";
import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function BlogCard({ handleMenu, item }) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Stack
        direction="row"
        sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {item.author_id}
        </Typography>
        <Stack direction="row">
          <Button
            variant="contained"
            size="small"
            sx={{ margin: "auto", mr: 0.5 }}
          >
            Follow
          </Button>
          <IconButton onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Typography>
        {item.content}
      </Typography>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <IconButton>
          <FavoriteIcon sx={{ color: "red" }} />
        </IconButton>
        <Typography variant="body2">{item.likes_count}</Typography>
      </Stack>
    </Paper>
  );
}
