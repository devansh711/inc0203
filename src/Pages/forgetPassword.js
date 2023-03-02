import React from "react";
import { Footer } from "../Components/footer";
import Navbarr from "../Components/navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/forgetPassword.css";
import { useState } from "react";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  
      setValidated(true);
    
    
  };

  const ForgotPassword = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      setValidated(true);
    };

    let values = {
      "email": email,
    };

    try {
      fetch("https://localhost:7061/api/User/Advisor-Forgot-password-without-login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          "Access-Control-Max-Age": 86400,
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status == 200) {
            window.location = '/ResetPassword';

            return res.text();
          }
          return res.text();
        })
        .then((data) => {
          console.log(data);
          alert(data);
          
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  }
  return (
    <>
      <Navbarr />
      <div className="forgetPassword">
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ borderRadius: "20px", boxShadow: "6px 6px 4px rgba(0, 0, 0, 0.2)" }}
          className="forgetPasswordForm"
          id="forgetPasswordForm">
          <h3 className="forgetPasswordHeader">Forgot Password</h3>
          <center> <p>
            Enter email to which reset link will be sent
          </p></center>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control required type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Control.Feedback type="invalid">Enter the Email-id</Form.Control.Feedback>
          </Form.Group>
          <center><Button style={{ fontFamily: "Arial", borderRadius: "14px", width: "50%", borderTop: "0px" }}
            variant="primary"
            type="submit"
            onClick={ForgotPassword}
          >
            Submit
          </Button></center>
        </Form>
      </div>
      <Footer />
    </>
  );

}
