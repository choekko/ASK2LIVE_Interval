import { useSelector } from "react-redux";
import { useHistory } from "react-router"

import React, {useMemo} from 'react';
import Moment from "react-moment";


import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import "../../App.css"
import "../../styles/style.css"

const useStyles = makeStyles({
  root: {
    minWidth: 270,
    borderRadius: "5px",
    boxShadow: "1px 1px 8px 0px rgb(0, 0, 0, 0.3)",
  },
});

const style = {

  descript2: {
      fontSize: "1.2em",
      color: "#1C418C",
      paddingLeft: "1.2em"
  },

}

const HostConfirmedSessionsCards = ({hostConfirmedSessions}) => {
    const user = useSelector(state => state.user)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>?</span>;
    const history = useHistory();
    return (
      <>
        {hostConfirmedSessions.map((session) => {
          console.log(session.reserve_date)
          let reserve_date = new Date(session.reserve_date)
          return (
            <>
        <div>
            <Card key={session.livehole_id} className={classes.root}>
                <CardContent>
                <div className={classes.cursor} onClick={()=>{
                  if(Object.keys(user.data).length === 0){
                    alert('로그인이 필요합니다.')
                  }else{
                    alert('아직 라이브 Q&A가 시작하지 않았어요')
                  }
                }}>
                    <p style={style.descript2} className="NanumGothic3" variant="h" component="h2">
                        {session.title}
                    </p>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        시작 시간 : {
                            <>
                            <Typography variant="body2">
                            <Moment format="MM.DD hh시 mm분">
                            {session.reserve_date}
                            </Moment>
                            </Typography>
                            </>}
                    </Typography>
                    <Typography className={classes.bullet} color="textSecondary">
                        {session.host_username} <br />
                    </Typography>

                </div>
                </CardContent>
            </Card>
            
        </div>
        <br/>
        </>
          )
        }
        )}
        <br/>
      </>
    );
}

export default HostConfirmedSessionsCards;