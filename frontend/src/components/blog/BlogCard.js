import { Stack, Typography, IconButton, Button, Paper, ImageListItem } from "@mui/material";
import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getJwtToken, getUserId } from "../../localStorage";
import axios from "axios";

export default function BlogCard({ handleMenu, item }) {

    const [itemState, setItemState] = React.useState(item);

    const [followStatus, setFollowStatus] = React.useState(item.followStatus);

    const [isLiked, setIsLiked] = React.useState(item.liked);

    const [showCommentInput, setShowCommentInput] = React.useState(false);

    const likeBlog = (blogId) => {
        axios({
            method: 'put',
            url: 'https://ahulfo14r5.execute-api.us-east-1.amazonaws.com/likeBlog',
            data: {
                blogId: blogId,
                userId: getUserId()
            },
            headers: {
                Authorization: getJwtToken()
            }
        }).then((res) => {
            console.log("Like API response: ", res.data.data);
            setItemState(res.data.data);
            setIsLiked(true);
        }).catch(err => {
            console.log('Error while calling like blog API: ', err)
        });
    };

    const followOrUnFollow = (referenceUserId) => {
        console.log("Reference user Id:", referenceUserId);
        axios({
            method: 'put',
            url: 'https://ahulfo14r5.execute-api.us-east-1.amazonaws.com/follow-or-unfollow',
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
            setFollowStatus((followStatus === 'Follow') ? 'Unfollow' : 'Follow');
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
                    {item.userInformation.user.firstName}
                </Typography>
                <Stack direction="row">
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ margin: "auto", mr: 0.5 }}
                        onClick={() => followOrUnFollow(item.author_id)}
                    >
                        {followStatus}
                    </Button>
                    <IconButton onClick={(event) => handleMenu(event, item.blog_id)}>
                        <MoreVertIcon />
                    </IconButton>
                </Stack>
            </Stack>
            <hr />
            <Typography sx={{ fontWeight: "bold" }}>
                {itemState.title}
            </Typography>
            <Paper
                sx={{ display: 'flex', justifyContent: 'center' }}
                variant='elevation'>
                {
                    item.images.length != 0 &&
                    item.images.map((image, index) => (
                        <>
                            <br />
                            <ImageListItem sx={{ margin: '5px' }} key={index}>
                                <img
                                    src={`${image.url}?fit=crop&auto=format`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </>
                    ))
                }
            </Paper>
            <br />
            <Typography>
                {itemState.content}
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <IconButton onClick={() => likeBlog(itemState.blog_id)} >
                    {(isLiked) ? <FavoriteIcon sx={{ color: "red", mr: "2px" }} variant="contained" /> : <FavoriteBorderIcon />}
                    <Typography variant="body2">{itemState.likes_count}</Typography>
                </IconButton>
            </Stack>
        </Paper >
    );
}
