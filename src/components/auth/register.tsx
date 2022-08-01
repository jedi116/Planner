import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate} from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import { BoxesLoaderComponent } from "../common/boxeLoader";
import { Alert } from "@mui/material";

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase";
import "./Register.css";


interface formValidation {
  fullNameValid: Boolean;
  fullNameErrorMessage: string | null;
  emailValid: boolean;
  emailValidationErrorMessage: string | null;
  passwordValid: boolean;
  passwordValidationErrorMessage: string | null;  
}

const defaultFormValidationValues: formValidation = {
  fullNameValid: true,
  fullNameErrorMessage: null ,
 emailValid: true,
 emailValidationErrorMessage: null,
 passwordValid: true,
 passwordValidationErrorMessage: null,
}


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [formValidation, setFormValidation] = useState<formValidation>(defaultFormValidationValues)
  const navigate = useNavigate();

  const validateForm = () => {
    setFormValidation(defaultFormValidationValues)
    if (email.length !== 0 && password.length!== 0) {
      if (email.includes("@") && !password.includes(email) && !password.includes(email.split("@")[0]) ) {
        return true
      }
    }
    const validationTemp = {
      ...defaultFormValidationValues
    } 
    if (email.length === 0) {
      validationTemp.emailValid = false;
      validationTemp.emailValidationErrorMessage = "Email can not be empty";
    } else if (!email.includes("@")) {
      validationTemp.emailValid = false;
      validationTemp.emailValidationErrorMessage = "Enter correct email format";
    }

    if (name.length === 0) {
      validationTemp.fullNameValid = false;
      validationTemp.fullNameErrorMessage = "Name can not be empty"
    } 

    if (password.length === 0) {
      validationTemp.passwordValid = false;
      validationTemp.passwordValidationErrorMessage = "Password can not be empty"
    } else if (password.includes(email)) {
      validationTemp.passwordValid = false;
      validationTemp.passwordValidationErrorMessage = "Password can not contain email"
    } else if (password.includes(email.split("@")[0]) ) {
      validationTemp.passwordValid = false;
      validationTemp.passwordValidationErrorMessage = "Password can not contain part of the email"
    }
    setFormValidation({
      ...validationTemp
    })
     return false
  }
  const register = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    validateForm() && registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);
  return (

    <div>
      {
        loading ? <BoxesLoaderComponent /> 
        : 
        (
          <div className="register">
      <div className="form">
      {
        !formValidation.fullNameValid && <Alert severity="error">{formValidation.fullNameErrorMessage}</Alert>
      }
        <input
          type="text"
          className="form__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        {
          !formValidation.emailValid &&  <Alert severity="error">{formValidation.emailValidationErrorMessage}</Alert>
        }
        <input
          type="text"
          className="form__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        {
          !formValidation.passwordValid && <Alert severity="error">{formValidation.passwordValidationErrorMessage}</Alert>
        }
        <input
          type="password"
          className="form__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="form__button" onClick={register}>
          Register
        </button>
        <span>- or - </span>
        <button
          className="form__button"
          onClick={signInWithGoogle}
        >
          <GoogleIcon style={{marginRight: "20px"}}/> Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
        )
      }
    </div>
  );
}
export default Register;