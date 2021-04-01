import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default (SpecialComponent, option, adminRoute=null) => {

  /* 
     예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                 true -> 로그인한 유저만 출입이 가능한 페이지
                 false -> 로그인한 유저는 출입이 불가능한 페이지
                 
        false인 페이지로 로그인한 유저가 접속할 수 있게 짜면 안되지만, 혹시나 접속했을 경우면 아래 코드 대로 로그인페지로 가게된다.
        따로 에러 페이지도 만들어야할듯??
  */
  const AuthenticateCheck = (props) => {
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
      if (!isLoggedIn && option) {
        props.history.push({
            pathname : "/login",
            before : props.location.pathname + props.location.search  
        });
      }
    }, []);

    return (
      <SpecialComponent routerInfo={props}/>
    )

  };
  return AuthenticateCheck;
};