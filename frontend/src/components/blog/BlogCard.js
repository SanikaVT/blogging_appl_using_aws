import { ButtonBase, CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import Grid from "@mui/material/Grid";

export default function BlogCard() {
  function openblog() {
    window.location.href = "/blogdetails";
    console.log("hello ji");
  }

  const card_border = {
    backgroundColor: "white",
    borderRadius: "10px",
    borderWidth: 1,
  };

  return (
    <Grid item xs={6} md={3}>
      <Card sx={{ maxWidth: 345 }} style={card_border}>
        <ButtonBase onClick={openblog}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Blog
              </Typography>
              <Typography variant="body2" color="text.secondary">
                If your enterprise is prioritizing digital transformation
                efforts, then the task of creating and managing a cloud security
                strategy is imminent. This often proves to be a challenge for IT
                teams who lack familiarity with cloud environments.{" "}
              </Typography>
            </CardContent>
          </CardActionArea>
        </ButtonBase>
      </Card>
    </Grid>
  );
}
