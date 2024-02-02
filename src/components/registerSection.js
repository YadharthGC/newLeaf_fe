import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import "../CSS/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { renderhost } from "../nodeLink";
import { useDispatch } from "react-redux";
import { funLoading } from "../reactRedux/action";

export default function RegisterAdmin() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      // console.log(mail, password, port);
      let dataObj = {
        mail: mail,
        password: password,
      };
      dispatch(funLoading(true));
      await axios.post(`${renderhost}/registeradmin`, dataObj).then((res) => {
        console.log(res.data.message);
        dispatch(funLoading(false));
        navigate("/");
      });
    } catch (err) {
      dispatch(funLoading(false));
      console.log(err);
    }
  };

  return (
    <div className="loginSection">
      <Box id="loginBox">
        <div className="heading loginHeading">Register</div>
        <div className="mailSection">
          <input
            type="text"
            id="mailText"
            placeholder="Email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
        </div>
        <div className="passwordSection">
          <input
            type="password"
            id="passwordText"
            placeholder="Password"
            val={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="submitSection">
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
        <div className="registersSection">
          <span
            className="accText"
            onClick={() => {
              navigate("/");
            }}
          >
            Already Have an Account?Login.
          </span>
        </div>
      </Box>
    </div>
  );
}
