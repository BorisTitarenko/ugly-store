import React from 'react';
import {Paper} from "@material-ui/core";

function Comment({comment}) {
    console.log(comment);
    return (
        <Paper>
            <b>{comment.date}</b>
            <p>{comment.description}</p>
        </Paper>
    )
}

export default Comment;
