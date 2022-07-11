import { Paper, Stack, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './SingleComment.css';

const SingleComment = ({ comment }) => {
    return (
        <div className="commentRow">
            <AccountCircleIcon fontSize="large" variant="contained" sx={{ color: "#1976d2", mr: '10px' }} />
            <Paper variant='elevation' sx={{ backgroundColor: '#edebed', flexGrow: 1 }}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', m: 'auto', w: 'inherit' }}>
                    <Typography sx={{ mt: '5px', ml: '10px', textTransform: 'uppercase', fontSize: '14px' }} variant="h6">{comment.user_name}</Typography>
                    <Typography sx={{ mt: '5px', mr: '10px', fontSize: '12px' }} variant="p">{new Date(comment.comment_time).toLocaleString()}</Typography>
                </Stack>
                <Typography sx={{ ml: '10px', mt: '3px', mb: '2px', fontSize: '13px' }}>{comment.comment}</Typography>
            </Paper>
        </div>
    );
}

export default SingleComment;