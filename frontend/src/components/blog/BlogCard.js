import { Stack, Typography, IconButton, Button, Paper } from "@mui/material";
import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function getBlogListApi() {
  var request = fetch(
    "https://c8atbntctd.execute-api.us-east-1.amazonaws.com/default/getbloglist",
    {
      method: "GET",
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
    .catch((error) => console.log("Error while fetching:", error));
  return {
    type: ActionTypes.FETCH_TODOLIST,
    payload: request,
  };
}

export default function BlogCard({ handleMenu }) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Stack
        direction="row"
        sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Name
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
        If your enterprise is prioritizing digital transformation efforts, then
        the task of creating and managing a cloud security strategy is imminent.
        This often proves to be a challenge for IT teams who lack familiarity
        with cloud environments.
      </Typography>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <IconButton>
          <FavoriteIcon sx={{ color: "red" }} />
        </IconButton>
        <Typography variant="body2">122</Typography>
      </Stack>
    </Paper>
  );
}
