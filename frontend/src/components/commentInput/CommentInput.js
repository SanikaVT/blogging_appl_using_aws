import { Button, Stack, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const CommentInput = (props) => {
    return (<Stack direction="row" sx={{display: "flex", justifyContent: "space-around", alignItems: 'center'}}>
        <AccountCircleIcon fontSize="large" variant="contained" sx={{color: "#1976d2"}}/>
        <TextField
            label="Add a comment"
            value={props.comment}
            onChange={props.onCommentChange}
            sx={{m: 'auto', flexGrow: 0.75, h: 'inherit'}}
            multiline>
        </TextField>
        <Button variant="contained" sx={{m: 'auto'}} onClick={props.onPostComment}>Post</Button>
    </Stack>);
}

export default CommentInput;