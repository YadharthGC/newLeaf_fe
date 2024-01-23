import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
// import * as faceapi from "face-api.js";
// import {} from "../../public/models"

export default function Register() {
  // const [type, setType] = useState("");
  const [blink, setBlink] = useState("Therapists");
  const [showCam, setShowCam] = useState(false);
  const webcamRef = useRef(null);
  const [videoUpload, setVideoUpload] = useState("");
  // const [encode, setEncode] = useState([]);
  const [photoA, setPhotoA] = useState("");
  const [photoB, setPhotoB] = useState("");
  const [photoC, setPhotoC] = useState("");

  const [status, setStatus] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [shift, setShift] = useState("");
  const selector = useSelector((state) => state);
  const { candidate, edit, admin, adminID } = selector.candidateReducer;
  const navigate = useNavigate();

  useEffect(() => {
    if (edit) {
      setBlink(candidate?.role === "Therapists" ? "Therapists" : "Students");
      setName(candidate.name);
      setGender(candidate.gender);
      setDob(candidate.dob);
      setEmployeeID(candidate.employeeID);
      setShift(candidate.shift);
      setPhotoA(candidate.photoa);
      setPhotoB(candidate.photob);
      setPhotoC(candidate.photoc);
      setVideoUpload(candidate.video);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setPhotoA("");
      setPhotoB("");
      setPhotoC("");
      setVideoUpload("");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (photoA === "") {
        setPhotoA(imgUrl);
      } else if (photoB === "") {
        setPhotoB(imgUrl);
      } else if (photoC === "") {
        setPhotoC(imgUrl);
      } else {
        alert("Got three images");
      }
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
      if (!name || !dob || !gender || !photoA || !photoB || !photoC) {
        alert("Fill all the neccessary fields");
        return;
      }

      let dataObj = {
        ...candidate,
        name: name,
        dob: dob,
        admin: admin,
        adminID: adminID,
        gender: gender,
        role: blink,
        created: new Date(),
        photoa: photoA,
        photob: photoB,
        photoc: photoC,
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
          navigate("../people");
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

  let handleRemoveImage = (ind) => {
    try {
      console.log(ind);
      if (ind === 1) {
        setPhotoA("");
      } else if (ind === 2) {
        setPhotoB("");
      } else if (ind === 3) {
        setPhotoC("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  ///////////////////////////////
  //////////////////////////////
  // useEffect(() => {
  //   const loadModels = async () => {
  //     await faceapi.nets.tinyFaceDetector.loadFromUri("../models");
  //     // await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  //     // await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  //   };

  //   const captureWithFaceDetection = async () => {
  //     const video = webcamRef.current.video;

  //     // Perform face detection
  //     const detections = await faceapi
  //       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withFaceDescriptors();

  //     // Check if a face is detected
  //     if (detections.length > 0) {
  //       // Perform actions like taking a photo when a face is detected
  //       const canvas = faceapi.createCanvasFromMedia(video);
  //       faceapi.draw.drawDetections(canvas, detections);
  //       document.body.append(canvas);

  //       // Capture the photo (you can use a library like html2canvas)
  //       // const photoDataUrl = canvas.toDataURL('image/jpeg');
  //       // Perform actions with the captured photo data
  //     }
  //   };

  //   // Load face-api.js models and start capturing with face detection
  //   loadModels().then(() => setInterval(captureWithFaceDetection, 1000));

  //   return () => {
  //     // Cleanup (e.g., stop capturing)
  //   };
  // }, []);
  //////////////////////////////////////////
  /////////////////////////////////////////////

  return (
    <div style={{ height: "100%" }}>
      <div className="heading">
        <div className="headTitle">{edit ? "Edit" : "Register"} </div>
        <div className="adminSec">
          <span className="adminText">Welcome {admin}</span>
          <span className="AvatarIcon">
            <Avatar alt={admin} src="/static/images/avatar/3.jpg" />
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
                <>
                  <Webcam
                    crossOrigin="anonymous"
                    id="photoWeb"
                    audio={false}
                    screenshotFormat="image/jpeg"
                    ref={webcamRef}
                    {...videoConstraints}
                  />
                  {/* <div
                    id="displayCanvas"
                    style={{ position: "absolute" }}
                  ></div> */}
                  {/* <canvas ref={canvasRef} {...videoConstraints} /> */}
                </>
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
                {photoA ? (
                  <img className="demoImg presentImg" src={photoA} alt="demo" />
                ) : (
                  <img className="demoImg" src={blankProfile} alt="demo" />
                )}
                {photoA ? (
                  <div className="closeImgDiv">
                    <div className="closeImg">
                      <CloseSharpIcon
                        id="closeSharpIcon"
                        onClick={() => {
                          handleRemoveImage(1);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="imgB">
                {photoB ? (
                  <img className="demoImg presentImg" src={photoB} alt="demo" />
                ) : (
                  <img className="demoImg" src={blankProfile} alt="demo" />
                )}
                {photoB ? (
                  <div className="closeImgDiv">
                    <div className="closeImg">
                      <CloseSharpIcon
                        id="closeSharpIcon"
                        onClick={() => {
                          handleRemoveImage(2);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="imgC">
                {photoC ? (
                  <img className="demoImg presentImg" src={photoC} alt="demo" />
                ) : (
                  <img className="demoImg" src={blankProfile} alt="demo" />
                )}
                {photoC ? (
                  <div className="closeImgDiv">
                    <div className="closeImg">
                      <CloseSharpIcon
                        id="closeSharpIcon"
                        onClick={() => {
                          handleRemoveImage(3);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  ""
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
