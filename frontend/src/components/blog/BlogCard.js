import { Stack, Typography, IconButton, Button, Paper, ImageListItem } from "@mui/material";
import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from '@mui/icons-material/Comment';
import { getJwtToken, getUserId } from "../../localStorage";
import axios from "axios";
import CommentInput from "../commentInput";
import SingleComment from "../SingleComment";

export default function BlogCard({ handleMenu, item }) {

    const [itemState, setItemState] = React.useState(item);

    const [showCommentInput, setShowCommentInput] = React.useState(false);

    const [commentContent, setCommentContent] = React.useState("");

    const [visibleCommentsCount, setVisibleCommentsCount] = React.useState(5);

    const [visibleComments, setVisibleComments] = React.useState([]);

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
            setItemState({
                ...itemState,
                likes_count: res.data.data.likes_count,
                likes: res.data.data.likes
            })
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
                action: itemState.followStatus.toLowerCase(),
                currentUserId: getUserId(),
                referenceUserId: referenceUserId
            },
            headers: {
                Authorization: getJwtToken()
            }
        }).then((res) => {
            setItemState({
                ...itemState,
                followStatus: (itemState.followStatus === 'Follow') ? 'Unfollow' : 'Follow',
            });
        }).catch(err => {
            console.log(`Error occurred while trying to ${itemState.followStatus} user ${referenceUserId}`);
        });
    };

    const onCommentIconClick = () => {
        const parsedComments = parseAndSortComments(itemState.comments);
        if (!showCommentInput) {
            setItemState({
                ...itemState,
                comments: parsedComments,
            });
        }
        setVisibleComments(parsedComments.slice(0, Math.min(visibleCommentsCount, parsedComments.length)));
        setShowCommentInput(!showCommentInput);
    }

    const onCommentChange = (event) => {
        setCommentContent(event.target.value);
    }

    const onCommentPost = (event) => {
        axios({
            method: 'post',
            url: 'https://ahulfo14r5.execute-api.us-east-1.amazonaws.com/comment/' + itemState.blog_id,
            data: {
                userId: getUserId(),
                comment: commentContent
            },
            headers: {
                Authorization: getJwtToken()
            }
        }).then(res => {
            setCommentContent("");
            const parsedComments = parseAndSortComments(res.data.comments)
            setItemState({
                ...itemState,
                comments_count: res.data.comments_count,
                comments: parsedComments
            });
            setVisibleComments(parsedComments.slice(0, Math.min(visibleCommentsCount, parsedComments.length)));
        }).catch(err => {
            console.error(err);
        });
    }

    function parseAndSortComments(comments) {
        if(!comments || comments.length === 0) {
            return comments;
        }
        const parsedComments = comments.map(comment => {
            console.log(new Date(comment.comment_time));
            return {
                user_id: comment.user_id,
                comment_time: new Date(comment.comment_time),
                comment: comment.comment
            }
        });
        parsedComments.sort((a, b) => new Date(b.comment_time).getTime() - new Date(a.comment_time).getTime());
        return parsedComments;
    }

    function generateCommentsList() {
        return visibleComments.map(comment => {
            return (<SingleComment
                user_id={comment.user_id}
                comment_time={comment.comment_time}
                comment={comment.comment}
                key={comment.comment_time} />);
        });
    }

    function onLoadMoreComments() {
        setVisibleCommentsCount(Math.min(visibleCommentsCount+5, itemState.comments.length));
        setVisibleComments(itemState.comments.slice(0, Math.min(visibleCommentsCount+5, itemState.comments.length)));
    }

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            {/* Blog Header */}
            <Stack
                direction="row"
                sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {itemState.userInformation.user.firstName}
                </Typography>
                <Stack direction="row">
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ margin: "auto", mr: 0.5 }}
                        onClick={() => followOrUnFollow(itemState.author_id)}
                    >
                        {itemState.followStatus}
                    </Button>
                    <IconButton onClick={(event) => handleMenu(event, itemState.blog_id)}>
                        <MoreVertIcon />
                    </IconButton>
                </Stack>
            </Stack>
            <hr />
            {/* Blog Title */}
            <Typography sx={{ fontWeight: "bold" }}>
                {itemState.title}
            </Typography>
            <br />
            {/* Blog Images */}
            <Paper
                sx={{ display: 'flex', justifyContent: 'center' }}
                variant='elevation'>
                {
                    itemState.images.length !== 0 &&
                    itemState.images.map((image, index) => (
                        <ImageListItem sx={{ margin: '5px' }} key={index}>
                            <img
                                src={`${image.url}?fit=crop&auto=format`}
                                loading="lazy"
                            />
                        </ImageListItem>

                    ))
                }
            </Paper>
            <br />
            {/* Blog Content */}
            <Typography>
                {itemState.content}
            </Typography>
            {/* Blog likes and comments count */}
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <IconButton onClick={() => likeBlog(itemState.blog_id)} >
                    {(itemState.liked) ? <FavoriteIcon sx={{ color: "red", mr: "2px" }} variant="contained" /> : <FavoriteBorderIcon />}
                    <Typography variant="body2">{itemState.likes_count}</Typography>
                </IconButton>
                <IconButton onClick={onCommentIconClick}>
                    <CommentIcon sx={{ mr: '2px' }} />
                    <Typography>{itemState.comments_count}</Typography>
                </IconButton>
            </Stack>
            {
                (showCommentInput) ?
                    <>
                        <hr />
                        <CommentInput
                            comment={commentContent}
                            onCommentChange={onCommentChange}
                            onPostComment={onCommentPost} />
                        <Stack sx={{mt: '25px'}} direction="column" spacing={2}>
                            {generateCommentsList()}
                            <Typography onClick={onLoadMoreComments} variant="button">Load more comments</Typography>
                        </Stack>
                    </> :
                    <></>
            }

        </Paper >
    );
}
