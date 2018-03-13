import * as actionTypes from '../actions/actionTypes';
import axios from 'axios'

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,id)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:id
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const authLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut=(expiresTime)=>{
    return dispatch=>{
        setTimeout(()=>dispatch(authLogout()),expiresTime *1000)
    }
}
export const auth=(email,password, isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCNHFhorZPRxpTe7SudsRhrJjtjvDtP1QI';
        if(!isSignup){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCNHFhorZPRxpTe7SudsRhrJjtjvDtP1QI';
        }

        axios.post(url,authData)
        .then(res=>{
            const expirationDate= new Date(new Date().getTime() + res.data.expiresIn *1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId); 
            localStorage.setItem('expirationDate',expirationDate); 
            dispatch(authSuccess(res.data.idToken,  res.data.localId));
            dispatch(checkAuthTimeOut(res.data.expiresIn));
        })
        .catch(
            err=>{
               // console.log(err);
                dispatch(authFail(err.response.data.error));
            }
        )
         
    }
}
export const authCheckStatus= ()=>{
    const token=  localStorage.getItem('token');
    const userId=localStorage.getItem('userId'); 
    const expireTime=new Date(localStorage.getItem('expirationDate'));   
    return dispatch=>{
        if(!token){
            dispatch(authLogout());
        }
        else{
            if(expireTime <= new Date()){
                dispatch(authLogout());
            }
            else{
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expireTime.getTime() - new Date().getTime()) /1000));
            }
        }
    }
}