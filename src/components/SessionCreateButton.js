import { useHistory } from 'react-router';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const style = {
    button : {
        position: 'relative',
        width: '80%',
        marginBottom: '20px',
    },
    buttonIcon: {
        fontSize: 30,
        fontColor: 'black',
        backgroundColor: '#C0C0C0',
        borderRadius: '50%',
    },
    buttonText: {
        align: 'left',
        fontSize: '1em',
        margin: '8px',
        fontWeight: 900,
    },
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const SessioinCreateButton = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    // <div className="LiveQnA">
    <>
    <div className={classes.root}>
        <Grid container justify="center">
          <Button
            style={style.button}
            variant="contained"
            color="default"
            endIcon={<AddIcon style={style.buttonIcon} />}
            onClick={() => {
              history.push("/createSession");
            }}
          >
            <div style={style.buttonText} align="left">
              Live Q&A를 통해
              <br></br>
              경험을 함께 나누어보세요
            </div>
          </Button>
        </Grid>
      </div>
      </>
  );
};


export {SessioinCreateButton}
