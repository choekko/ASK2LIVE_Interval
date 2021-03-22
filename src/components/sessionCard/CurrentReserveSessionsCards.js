import React, {useEffect} from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "../../styles/style.css"
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: "0 1em 1em 1em",
        width: theme.spacing(22),
        height: theme.spacing(30)
      }
    }
  }));
  


function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress thickness="5" size="10rem" variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="h5"
          component="div"
          color="textSecondary"
        >{props.current}명</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: 10,
  };

const CurrentReserveSessionsCards = ({currentReserveSessions}) => {

    const classes = useStyles();

    CircularProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate variant.
         * Value between 0 and 100.
         */
        value: PropTypes.number.isRequired,
      };

    console.log("Enter : CurrentReserveSessionsCards")

    return (
        <>
        <div className={classes.root}>
            {currentReserveSessions.map((session) => (
                <>
                <Paper elevation={3}>
                    <div className="padding">
                        <CircularProgressWithLabel key={session.roomId} value={Math.ceil(session.reserveUsers.length / session.reserveMax * 100)} current={session.reserveUsers.length} />
                        <div className="call">
                            <Typography variant="h5" component="div" color="textSecondary">
                                {session.hostName}
                            </Typography>
                        </div>
                    </div>
                </Paper>
                <br/>
            </>
            ))
            }
        </div>
        </>
    );
}

export default CurrentReserveSessionsCards;