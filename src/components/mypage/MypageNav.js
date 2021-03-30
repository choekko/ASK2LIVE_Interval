import { useHistory } from "react-router";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const style = {
  title: {
    top: 0,
    display: "flex",
    position: "fixed",
    fontSize: "1.2em",
    // margin: "auto",
    height: "5%",
    width: "100%",
    maxWidth: "66em",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff8ef",
    borderBottom: "solid",
    // backgroundColor: 'blue',
    zIndex: "1",
  },
};

const MypageNav = ({ text }) => {
  const history = useHistory();

  return (
    <>
      <Grid container justify="center">
        <div className="BMDOHYEON" style={style.title}>
          <IconButton
            style={{position: "absolute", left:0}}
            aria-label="back"
            onClick={() => history.goBack()}
          >
            <ArrowBackIosIcon />
          </IconButton>
          {text}
        </div>
      </Grid>
    </>
  );
};


export default MypageNav
