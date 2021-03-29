import { useHistory } from "react-router"

import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"

const style = {
  backIcon: {
    position: "absolute",
  },
  title: {
    position: "absolute",
    fontSize: "1.2em",
    padding: "12px",
  },
};

export const MypageNav = ({text}) => {
    const history = useHistory();

  return (
    <>
      <IconButton
        style={style.backIcon}
        aria-label="back"
        onClick={() => history.goBack()}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Grid container justify="center">
        <div className="centered BMDOHYEON" style={style.title}>
          {text}
        </div>
      </Grid>
    </>
  );
};
