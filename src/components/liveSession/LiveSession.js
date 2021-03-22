import React from 'react'

import "../../styles/style.css"
import "../../index.css"
import InsertField from "./InsertField"
import Avatar from "../Avatar";

import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';


import { Autocomplete } from '@material-ui/lab';
import { CenterFocusStrong } from '@material-ui/icons';

const style = {
    livewrapper: {
        display: "inline-block",
        width: "100%",
        position: "fixed",
        height: "100%",
        // backgroundColor: "rgb(255, 239, 196)"
    },

    livesession: {
        position:"absolute",
        maxWidth: "45em",
        minHeight: "35em",
        width: "100%",
        height: "100%",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        // backgroundColor: "rgb(139, 139, 139)",
    },

    session_top: {
        position: "relative",
        minHeight: "3em",
        height: "5%",
        width: "100%",
    },
    
    
    session_mid: {
        position: "relative",
        height: "30%",
        width: "100%",
    },
    
    session_bottom: {
        position: "relative",
        borderRadius: "30px 30px 0px 0px",
        bottom: "0%",
        height: " 65%",
        width: "100%",
        backgroundColor: "#dfd2df"
        // backgroundColor: "rgb(255, 248, 225)"
    },
    table: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    td1: {
        width: "60%",
        fontSize: "1em",
        padding: "10px 0 0 10px",
    },

    td2: {
        width: "5%",
        padding: "0 0 0 10px",
    },
    lavel : {
        marginLeft: "-12px",
        marginRight: "-0.7em",
    },
    font_size : {
        fontSize : "1rem"
    },
    checkIcon : {
        height: "0.6em"
    },

    tablecell: {
        display: "table-cell",
        verticalAlign: "middle",
        height: "100%",
    },
    follow: {
        marginRight: "3px",
        float: "right",
    },
    Insertfield: {
        position: "absolute",
        bottom:"0%",
        width: "100%",
    }
    
}

const LiveSession = (props) => {

    return (
        <>
        <div style={style.livewrapper}>
            <div style={style.livesession}>
                <div style={style.session_top}>
                    <table style={style.table}>
                        <tr>
                            <td  colspan="2" className="NanumGothic4" style={style.td1} >QNA 타이틀 영역입니어</td>
                            <td  rowspan="2">
                                <div style={style.follow}>

                                     <FormControlLabel style={style.lavel}
                                    control={<Checkbox icon={<FavoriteBorder style={style.checkIcon}/>} checkedIcon={<Favorite style={style.checkIcon}/>} name="checkedH" />}
                                    />
                                    <span style={style.font_size} className="BMDOHYEON">FOLLOW</span>
                                                            
                                </div>
                            </td>      
                        </tr>
                        <tr>
                            <td style={style.td2}>
                                <img className="live_img" src="/static/live.png"/>
                            </td>
                            <td className="NotoSans3">24명</td>
                        </tr>

                    </table>
                    
                </div>
                <div style={style.session_mid}>
                    <div className="horizentalmid" >
                        <div className="verticalmid">
                            <tr>
                                <Avatar hostName={props.hostName} imageLink={props.imageLink} size="large"/>
                            </tr>
                            <tr className="centered">
                                <span className="BMDOHYEON">{props.hostName}</span>
                            </tr>
                        </div>
                    </div>
                </div>
                <div style={style.session_bottom}>
                    <div style={style.Insertfield}>
                        <div className="horizentalmid" >
                            <InsertField className="verticalmid"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default LiveSession