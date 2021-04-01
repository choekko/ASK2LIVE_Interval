import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';



const style = {
    alert : {
        boxShadow: "2px 2px 2px 2px #D95032",    // 섀도우 색
        border: "solid 1px white",    // 테두리 색
        backgroundColor:"black"      // 배경색
    }
}


// 여는 함수, onClick에 해당 함수 넣으면 클릭시 등장
const handleClick = () => {       
    setOpen(true);
};


// 닫는 함수. 이미 아래에 자동적으로 사용되고 있음.
const handleClose = (event, reason) => { 
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
};


// 넣어야 할 것
<Snackbar style={{position: "fixed", bottom:"50%"}} open={open} autoHideDuration={6000} onClose={handleClose}>
<Alert onClose={handleClose} style={style.alert} severity="success">
    <span style={{color:"white"}}>질문 등록 성공!</span>
</Alert>
</Snackbar>
