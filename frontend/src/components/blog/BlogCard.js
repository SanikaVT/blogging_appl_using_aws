import { Stack, Typography, IconButton, Button, Paper } from "@mui/material";
import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getUserId } from "../../localStorage";
import axios from "axios";

export default function BlogCard({ handleMenu, item }) {

    const likeBlog = (blogId) => {
        console.log('BlogId:', blogId)
        console.log('UserId:', getUserId())
        axios({
            method: 'put',
            url: 'https://ahulfo14r5.execute-api.us-east-1.amazonaws.com/likeBlog',
            data: {
                blogId: blogId,
                userId: getUserId()
            }
        }).then((res) => {
            console.log(res.message);
        }).catch(err => {
            console.log('Error while calling like blog API: ', err)
        });
    };

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
            <hr />
            <Typography sx={{ fontWeight: "bold" }}>
                {item.title}
            </Typography>
            <br />
            <Typography>
                {item.content}
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <IconButton>
                    <FavoriteIcon sx={{ color: "red" }} onClick={() => likeBlog(item.blog_id)} />
                </IconButton>
                <Typography variant="body2">{item.likes_count}</Typography>
            </Stack>
        </Paper >
    );
}
