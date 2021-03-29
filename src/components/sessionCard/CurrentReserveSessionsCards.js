import React, {useEffect} from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "../../styles/style.css"
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: "0 1em 1em 1em",
        width: theme.spacing(22),
        height: theme.spacing(35)
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

const onClickWish = (sessionId) => {
  console.log('Click')
}

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
        <h2>오픈 신청 중인 라이브 Q&A</h2>
        <div className={classes.root} >
            {currentReserveSessions.map((session) => (
              
                <>
                {console.log(session)}
                <Paper elevation={3}>
                    <div className="padding">
                        <CircularProgressWithLabel 
                          key={session.id} 
                          value={(session.hole_reservations.length) ? Math.ceil(session.hole_reservations[0].guests.length / session.hole_reservations[0].target_demand * 100) : 0} 
                          current={(session.hole_reservations.length) ? session.hole_reservations[0].guests.length  : 0 }/>
                        <div className="call">
                            <Typography variant="h7" component="div" color="textSecondary">
                                {session.title}
                            </Typography>
                            <p>{session.host_nickname} | {session.host_work_field}</p>
                        </div>
                        <Grid container justify="center">
                          <Button onClick={onClickWish(session.id)}>찜하기</Button>
                          </Grid>
                        <div>
                          
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