import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },

  }));   

const style = {
    circle : {
        border : "solid 1px rgba(0, 0, 0, .3)",
        borderRadius : "100%",
    }
}

const UserAvatar = (props) => {
    const classes = useStyles();

    return (
        <>
        <div style={style.circle}>
            <div className={classes.root}>
                <Avatar alt={props.hostName} src={props.imageLink} className={classes.large}/>
            </div>
        </div>
        </>
    )

}

export default UserAvatar



