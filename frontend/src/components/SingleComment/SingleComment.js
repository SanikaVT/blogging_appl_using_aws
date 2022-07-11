import { Paper, Stack, Typography } from "@mui/material";

const SingleComment = (props) => {
    return (
        <Paper variant='elevation'sx={{backgroundColor: '#edebed'}}>
            <Stack direction="row" sx={{display: 'flex', justifyContent: 'space-between', m: 'auto', w:'inherit'}}>
                <Typography sx={{ mt: '5px', ml:'10px', textTransform: 'uppercase', fontSize: '14px'}} variant="h6">{"Aravind"}</Typography>
                <Typography sx={{ mt: '5px', mr: '10px', fontSize: '12px'}} variant="p">{new Date(props.comment_time).toLocaleString()}</Typography>
            </Stack>
            <Typography sx={{ml: '10px', mt: '3px', fontSize: '14px'}}>{props.comment}</Typography>
        </Paper>
    );
}

export default SingleComment;