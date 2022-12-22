import React, {useState, useEffect}  from "react";
import { requestLogin } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from "../history";
import '../style.css';
import ErrorIcon from '@mui/icons-material/Error';

const Login = props =>{
    const [errorMessages, setErrorMessages] = useState("");

    const dispatch = useDispatch();
    const user  = useSelector((state) => state.user);
    const loginError  = useSelector((state) => state.loginError);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        dispatch(requestLogin({email, password}));
    };
    useEffect(()=>{
        let pathnew ="";
        if(loginError){
            setErrorMessages(loginError);
        }else if(user.userName){

            switch(user.role){
                case "user":
                  pathnew = "/home";
                  break
                case "admin":
                  pathnew = "/publish";
                  break
                default:
                  pathnew = "/home";
            }
            history.push({
                pathname:pathnew
            }, ()=>{});

      }
  }, [user, loginError]);

    const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>User Email </label>
          <input type="text" name="username" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password"  required />
        </div>
        {errorMessages && <div className="error-msg"><ErrorIcon/>{errorMessages}</div>}
        <input type="submit" className="login-submit" value="Submit" />  
      </form>
      
    </div>
  );

  return (
      <div className="login-form">
        <div className="modal-title">Sign In</div>
        {renderForm}
      </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return (
    bindActionCreators(
      {
        requestLogin
      }, dispatch
    )
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user  ,
    isAuthenticated: state.isAuthenticated,
    loginError: state.loginError  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);