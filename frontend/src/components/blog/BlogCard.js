import { Stack, Typography, IconButton, Button, Paper } from "@mui/material";
import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getJwtToken, getUserId } from "../../localStorage";
import axios from "axios";

export default function BlogCard({ handleMenu, item }) {

    const [itemState, setItemState] = React.useState(item);

    const [followStatus, setFollowStatus] = React.useState('Follow');

    const likeBlog = (blogId) => {
        axios({
            method: 'put',
            url: 'https://5foq5ouxsd.execute-api.us-east-1.amazonaws.com/likeBlog',
            data: {
                blogId: blogId,
                userId: getUserId()
            },
            headers: {
                Authorization: getJwtToken()
            }
        }).then((res) => {
            console.log("Like API response: ",res.data.data);
            setItemState(res.data.data);
        }).catch(err => {
            console.log('Error while calling like blog API: ', err)
        });
    };

    const followOrUnFollow = (referenceUserId) => {
        console.log("Reference user Id:", referenceUserId);
        axios({
            method: 'put',
            url: 'https://5foq5ouxsd.execute-api.us-east-1.amazonaws.com/follow-or-unfollow',
            data: {
                action: followStatus.toLowerCase(),
                currentUserId: getUserId(),
                referenceUserId: referenceUserId
            },
            headers: {
                Authorization: getJwtToken()
            }
        }).then((res) => {
            console.log("Follow or unFollow API response: ", res);
            setFollowStatus((followStatus==='Follow')? 'Unfollow': 'Follow');
        }).catch(err => {
            console.log(`Error occurred while trying to ${followStatus} user ${referenceUserId}`);
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
                        onClick = {() => followOrUnFollow(item.author_id)}
                    >
                        {followStatus}
                    </Button>
                    <IconButton onClick={handleMenu}>
                        <MoreVertIcon />
                    </IconButton>
                </Stack>
            </Stack>
            <hr />
            <Typography sx={{ fontWeight: "bold" }}>
                {itemState.title}
            </Typography>
            <br />
            <Typography>
                {itemState.content}
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <IconButton>
                    <FavoriteIcon sx={{ color: "red" }} onClick={() => likeBlog(itemState.blog_id)} />
                </IconButton>
                <Typography variant="body2">{itemState.likes_count}</Typography>
            </Stack>
        </Paper >
    );
}
