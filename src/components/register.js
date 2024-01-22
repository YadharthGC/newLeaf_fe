import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "../CSS/register.css";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fireBase";
import dayjs from "dayjs";
import blankProfile from "../images/blankProfile.jpg";
import axios from "axios";
import { renderhost } from "../nodeLink";
import { useSelector } from "react-redux";

export default function Register() {
  // const [type, setType] = useState("");
  const [blink, setBlink] = useState("Therapists");
  const [showCam, setShowCam] = useState(false);
  const webcamRef = useRef(null);
  const [videoUpload, setVideoUpload] = useState("");
  const [encode, setEncode] = useState([]);
  const [status, setStatus] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [shift, setShift] = useState("");
  const selector = useSelector((state) => state?.candidateReducer);
  const { candidate, edit } = selector;
  const navigate = useNavigate();

  useEffect(() => {
    if (edit) {
      setBlink(candidate?.role === "Therapists" ? "Therapists" : "Students");
      setName(candidate.name);
      setGender(candidate.gender);
      setDob(candidate.dob);
      setEmployeeID(candidate.employeeID);
      setShift(candidate.shift);
      setEncode(candidate.images);
      setVideoUpload(candidate.video);
    }
  }, []);

  useEffect(() => {
    setStatus(false);
  }, [status]);

  useEffect(() => {
    if (!edit) {
      setName("");
      setGender("");
      setDob("");
      setEmployeeID("");
      setShift("");
      setEncode([]);
      setVideoUpload("");
    }
  }, [blink]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleShowCam = () => {
    try {
      if (showCam) {
        setShowCam(false);
      } else {
        setShowCam(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTakePhoto = () => {
    try {
      let imgUrl = webcamRef.current.getScreenshot({});
      console.log(encode);
      let imgArr = encode;

      if (imgArr.length === 3) {
        imgArr.shift();
      }
      imgArr.push(imgUrl);
      setEncode(imgArr);
      setStatus(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async (dataObj) => {
    try {
      if (!videoUpload) {
        alert("please Insert a video");
        return;
      }
      const fileRef = ref(storage, `videos/${videoUpload.name}`);
      const uploadTask = uploadBytesResumable(fileRef, videoUpload);
      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytestransferred / snapshot.totalbytes) * 100;
          console.log(progress);
        },
        (er) => {
          console.log(er);
        },
        () => {
          console.log("success");
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (uri) => {
              console.log(uri);
              dataObj.video = uri;
              await handleSubmitApi(dataObj);
            })
            .catch((er) => console.log(er));
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!name || !dob || !gender || encode.length !== 3) {
        alert("Fill all the neccessary fields");
        return;
      }

      let dataObj = {
        ...candidate,
        name: name,
        dob: dob,
        gender: gender,
        images: encode,
        role: blink,
      };

      if (blink === "Therapists") {
        if (!employeeID) {
          alert("Fill all the neccessary fields");
          return;
        }
        dataObj.employeeID = employeeID;
        await handleSubmitApi(dataObj, edit ? "Edit" : "");
      } else {
        if (!shift) {
          alert("Fill all the neccessary fields");
          return;
        }

        dataObj.shift = shift;
        if (!edit) {
          dataObj.employeeID = Math.random(10);
        }

        if (edit && candidate.video === videoUpload) {
          console.log("samevideo");
          dataObj.video = videoUpload;
          await handleSubmitApi(dataObj);
        } else {
          console.log("newVideo");
          await handleUpload(dataObj);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleSubmitApi = async (dataObj) => {
    try {
      await axios
        .post(`${renderhost}/add`, {
          dataObj: dataObj,
          actions: edit ? "Edit" : "",
        })
        .then((res) => {
          console.log(res);
          navigate("people");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const videoConstraints = {
    width: 600,
    height: 440,
    facingMode: "user",
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="heading">
        <div className="headTitle">{edit ? "Edit" : "Register"} </div>
        <div className="adminSec">
          <span className="adminText">Welcome Admin</span>
          <span className="AvatarIcon">
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </span>
        </div>
      </div>
      <div className="registerSection">
        <div className="attendanceTitle">
          {!edit ? (
            <span
              className="attendanceTherapists"
              blink={blink}
              onClick={() => {
                setBlink("Therapists");
              }}
            >
              Therapists
            </span>
          ) : (
            ""
          )}
          {!edit ? (
            <span
              className="attendanceStudents"
              blink={blink}
              onClick={() => {
                setBlink("Students");
              }}
            >
              Students
            </span>
          ) : (
            ""
          )}
          {edit && candidate.role && candidate.role === "Students" ? (
            <span
              className="attendanceStudents"
              style={{ marginLeft: "0%" }}
              blink={blink}
              onClick={() => {
                setBlink("Students");
              }}
            >
              Students
            </span>
          ) : (
            ""
          )}
          {edit && candidate.role && candidate.role === "Therapists" ? (
            <span
              className="attendanceTherapists"
              blink={blink}
              onClick={() => {
                setBlink("Therapists");
              }}
            >
              Therapists
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="titleNew">
          {edit ? (
            <span className="titleNewText">
              {blink === "Therapists"
                ? "Edit Therapists Details"
                : "Edit Students Details"}
            </span>
          ) : (
            <span className="titleNewText">
              {blink === "Therapists"
                ? "Include New Therapists"
                : "Add New Students"}
            </span>
          )}
        </div>
        <div className="webCamDiv">
          <div className="webCamDivA">
            <div className="cameraDiv">
              {showCam ? (
                <Webcam
                  id="photoWeb"
                  audio={false}
                  screenshotFormat="image/jpeg"
                  ref={webcamRef}
                  {...videoConstraints}
                />
              ) : (
                <div className="blankImg">Turn on Camera</div>
              )}
            </div>
            <div className="buttonDivs">
              <div className="hideBtn">
                <NoPhotographyOutlinedIcon
                  id="hideCamIcon"
                  onClick={() => {
                    handleShowCam();
                  }}
                />
              </div>
              <div className="TakeBtn">
                <span
                  className="redBtn"
                  onClick={() => {
                    handleTakePhoto();
                  }}
                >
                  &#9673;
                </span>
              </div>
            </div>
          </div>
          <div className="webCamDivB">
            <div className="regisTitle">{blink} details</div>
            <div className="regisImgs">
              <div className="imgA">
                {encode?.length && encode[0] ? (
                  <img className="demoImg" src={encode[0]} alt="demo" />
                ) : (
                  <img className="demoImg" src={blankProfile} alt="demo" />
                )}
              </div>
              <div className="imgB">
                {encode?.length && encode[1] ? (
                  <img className="demoImg" src={encode[1]} alt="demo" />
                ) : (
                  <img className="demoImg" src={blankProfile} alt="demo" />
                )}
              </div>
              <div className="imgC">
                {encode?.length && encode[2] ? (
                  <img className="demoImg" src={encode[2]} alt="demo" />
                ) : (
                  <img className="demoImg" src={blankProfile} alt="demo" />
                )}
              </div>
            </div>
            <div className="regisName">
              <div className="regisNameA">Full Name</div>
              <div className="regisNameB">
                <TextField
                  id="nameOutline"
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="regisGender">
              <div className="regisGenderA">Gender</div>
              <div className="regisGenderB">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-genderBox"
                    value={gender}
                    label="Age"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="regisBirth">
              <div className="regisBirthA">DateOfBirth</div>
              <div className="regisBirthB">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  sx={{ width: "200px" }}
                  // onChange={(e) => {
                  //   console.log("ss");
                  //   // setDob(e.target.value);
                  // }}
                  // defaultValue={dayjs(dob)}
                >
                  <DatePicker
                    label="DateOfBirth"
                    sx={{ width: "230px" }}
                    value={dayjs(dob ? dob : new Date())}
                    onChange={(e) => {
                      if (e && e["$d"]) {
                        let today = e["$d"];

                        let yr = today.getFullYear();
                        let mm = today.getMonth() + 1;
                        let dd = today.getDate();

                        let todayStr =
                          yr +
                          "-" +
                          ("0" + mm).slice(-2) +
                          "-" +
                          ("0" + dd).slice(-2);

                        setDob(todayStr);
                      }
                      ////////
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="regisShift">
              <div className="regisShiftA">
                {blink === "Therapists" ? "EmployeeID" : "Shift"}
              </div>
              <div className="regisShiftB">
                <div className="regisSubLoop">
                  {blink === "Students" ? (
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Shift
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-shift"
                        value={shift}
                        label="Shift"
                        onChange={(e) => {
                          setShift(e.target.value);
                        }}
                      >
                        <MenuItem value="Morning">Morning</MenuItem>
                        <MenuItem value="Evening">Evening</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      id="nameOutline"
                      label="EmployeeID"
                      variant="outlined"
                      value={employeeID}
                      onChange={(e) => {
                        setEmployeeID(e.target.value);
                      }}
                    />
                  )}
                  {blink === "Students" ? (
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      id={videoUpload ? "uploadingBtnTrue" : "uploadingBtn"}
                      // setVideo={videoUpload ? true : false}
                    >
                      Upload Video
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                          setVideoUpload(e.target?.files[0]);
                        }}
                      />
                    </Button>
                  ) : (
                    ""
                  )}
                  <Button
                    variant="contained"
                    id="stuSub"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    SUBMIT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}