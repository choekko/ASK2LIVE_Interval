import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserAvatar from '../Avatar';

const style = {
    avatar: {

        position: "relative",
        height: "30%",
        width: "100%",

    }
}

const mypage = () => {

    return (
        <>
        <div style={style.avatar}>
            <UserAvatar hostName="IU" imageLink="/static/live_IU.png"/>

        </div>

        </>
    )

}

export default mypage;