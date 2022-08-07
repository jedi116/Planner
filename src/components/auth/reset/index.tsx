import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../../firebase/firebase";
import "./index.css";
import { Alert } from "@mui/material";

type formValidation = {
  valid: boolean;
  validationErroMessage: string | null;
}

const defaultFormValidationValues: formValidation = {
  valid: true,
  validationErroMessage: null
}

function Index() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [formValidation, setFormValidation] = useState<formValidation>(defaultFormValidationValues);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const handlePasswordReset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!email) {
      setFormValidation({
        valid: false,
        validationErroMessage: "Email can not be empty"
      })
      return 
    } else if (!email.includes("@")) {
      setFormValidation({
        valid: false,
        validationErroMessage: "Entered value must be an email"
      })
      return
    }
    setFormValidation(defaultFormValidationValues)
    sendPasswordReset(email);
  }
  return (
    <div className="reset">
      <div className="reset__container">
      {
        !formValidation.valid && <Alert severity="error">{formValidation.validationErroMessage}</Alert>
      }
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={handlePasswordReset}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Index;