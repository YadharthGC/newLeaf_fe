import { Avatar, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import ronaldo from "../images/ronPro.jpg";
import "../CSS/entries.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import NestCamWiredStandIcon from "@mui/icons-material/NestCamWiredStand";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { funEdit, funSelectCandidate } from "../reactRedux/action";
import { useDispatch } from "react-redux";

export default function EntriesPage() {
  const dispatch = useDispatch();
  const [blink, setBlink] = useState("Therapists");
  const [showUsers, setShowUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const demo = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6,
  ];
  return (
    <>
      <div className="heading">
        <div className="headTitle">Entries</div>
        <div className="adminSec">
          <span className="adminText">Welcome Admin</span>
          <span className="AvatarIcon">
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </span>
        </div>
      </div>
      <div className="entriesSection">
        <div className="attendanceTitle">
          <span
            className="attendanceTherapists"
            blink={blink}
            onClick={() => {
              setBlink("Therapists");
            }}
          >
            Therapists
          </span>
          <span
            className="attendanceStudents"
            blink={blink}
            onClick={() => {
              setBlink("Students");
            }}
          >
            Students
          </span>
        </div>
        <div className="allTextDiv">
          <div className="userTextField">
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              // value={searchUser}
              onChange={(e) => {
                // setSearchUser(e.target.value);
              }}
              onKeyUp={(e) => {
                console.log(e);
                if (e.code === "Enter") {
                  // handleSearchUser();
                }
              }}
            />
          </div>
        </div>
        <div className="allTableDiv">
          <div className="allTableHead">
            <div className="headA entry">{blink}</div>
            <div className="headB entry">Name</div>
            <div className="headD entry">
              {blink === "Students" ? "Shift" : "EmployeeID"}
            </div>
            <div className="headC entry">Timing</div>
            <div className="headE entry">Actions</div>
          </div>
          <div className="allTableBody">
            <div className="bodyPart">
              <div className="conA entry">
                <img alt="Cindy Baker" src={ronaldo} className="entryUserImg" />
                {blink !== "Therapists" ? (
                  <div className="conAvideocon">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        // handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="conB entry">Hari Yadharth</div>
              <div className="conC entry">123456789</div>
              <div className="conD entry">
                <div>11.15pm</div>
                <div>Jan 6 2000</div>
              </div>

              <div className="conE entry">
                <NestCamWiredStandIcon id="ipIcon" />
                <VideocamIcon id="webIcon" />
                <ModeEditIcon
                  id="editIcon"
                  onClick={() => {
                    dispatch(funEdit(true));
                    // dispatch(funSelectCandidate(data));
                    // navigate("/register");
                  }}
                />
                <DeleteIcon
                  id="delIcon"
                  onClick={() => {
                    // handleDeleteData(data);
                  }}
                />
              </div>
            </div>
            <div className="bodyPart">
              <div className="conA entry">
                <img alt="Cindy Baker" src={ronaldo} className="entryUserImg" />
                {blink !== "Therapists" ? (
                  <div className="conAvideocon">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        // handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="conB entry">Hari Yadharth</div>
              <div className="conC entry">123456789</div>
              <div className="conD entry">
                <div>11.15pm</div>
                <div>Jan 6 2000</div>
              </div>

              <div className="conE entry">
                <NestCamWiredStandIcon id="ipIcon" />
                <VideocamIcon id="webIcon" />
                <ModeEditIcon
                  id="editIcon"
                  onClick={() => {
                    dispatch(funEdit(true));
                    // dispatch(funSelectCandidate(data));
                    // navigate("/register");
                  }}
                />
                <DeleteIcon
                  id="delIcon"
                  onClick={() => {
                    // handleDeleteData(data);
                  }}
                />
              </div>
            </div>
            <div className="bodyPart">
              <div className="conA entry">
                <img alt="Cindy Baker" src={ronaldo} className="entryUserImg" />
                {blink !== "Therapists" ? (
                  <div className="conAvideocon">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        // handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="conB entry">Hari Yadharth</div>
              <div className="conC entry">123456789</div>
              <div className="conD entry">
                <div>11.15pm</div>
                <div>Jan 6 2000</div>
              </div>

              <div className="conE entry">
                <NestCamWiredStandIcon id="ipIcon" />
                <VideocamIcon id="webIcon" />
                <ModeEditIcon
                  id="editIcon"
                  onClick={() => {
                    dispatch(funEdit(true));
                    // dispatch(funSelectCandidate(data));
                    // navigate("/register");
                  }}
                />
                <DeleteIcon
                  id="delIcon"
                  onClick={() => {
                    // handleDeleteData(data);
                  }}
                />
              </div>
            </div>
            <div className="bodyPart">
              <div className="conA entry">
                <img alt="Cindy Baker" src={ronaldo} className="entryUserImg" />
                {blink !== "Therapists" ? (
                  <div className="conAvideocon">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        // handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="conB entry">Hari Yadharth</div>
              <div className="conC entry">123456789</div>
              <div className="conD entry">
                <div>11.15pm</div>
                <div>Jan 6 2000</div>
              </div>

              <div className="conE entry">
                <NestCamWiredStandIcon id="ipIcon" />
                <VideocamIcon id="webIcon" />
                <ModeEditIcon
                  id="editIcon"
                  onClick={() => {
                    dispatch(funEdit(true));
                    // dispatch(funSelectCandidate(data));
                    // navigate("/register");
                  }}
                />
                <DeleteIcon
                  id="delIcon"
                  onClick={() => {
                    // handleDeleteData(data);
                  }}
                />
              </div>
            </div>
            <div className="bodyPart">
              <div className="conA entry">
                <img alt="Cindy Baker" src={ronaldo} className="entryUserImg" />
                {blink !== "Therapists" ? (
                  <div className="conAvideocon">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        // handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="conB entry">Hari Yadharth</div>
              <div className="conC entry">123456789</div>
              <div className="conD entry">
                <div>11.15pm</div>
                <div>Jan 6 2000</div>
              </div>

              <div className="conE entry">
                <NestCamWiredStandIcon id="ipIcon" />
                <VideocamIcon id="webIcon" />
                <ModeEditIcon
                  id="editIcon"
                  onClick={() => {
                    dispatch(funEdit(true));
                    // dispatch(funSelectCandidate(data));
                    // navigate("/register");
                  }}
                />
                <DeleteIcon
                  id="delIcon"
                  onClick={() => {
                    // handleDeleteData(data);
                  }}
                />
              </div>
            </div>
            <div className="bodyPart">
              <div className="conA entry">
                <img alt="Cindy Baker" src={ronaldo} className="entryUserImg" />
                {blink !== "Therapists" ? (
                  <div className="conAvideocon">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        // handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="conB entry">Hari Yadharth</div>
              <div className="conC entry">123456789</div>
              <div className="conD entry">
                <div>11.15pm</div>
                <div>Jan 6 2000</div>
              </div>

              <div className="conE entry">
                <NestCamWiredStandIcon id="ipIcon" />
                <VideocamIcon id="webIcon" />
                <ModeEditIcon
                  id="editIcon"
                  onClick={() => {
                    dispatch(funEdit(true));
                    // dispatch(funSelectCandidate(data));
                    // navigate("/register");
                  }}
                />
                <DeleteIcon
                  id="delIcon"
                  onClick={() => {
                    // handleDeleteData(data);
                  }}
                />
              </div>
            </div>
            <div className="bodyPart">
              <div className="conA entry">
                <img alt="Cindy Baker" src={ronaldo} className="entryUserImg" />
                {blink !== "Therapists" ? (
                  <div className="conAvideocon">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        // handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="conB entry">Hari Yadharth</div>
              <div className="conC entry">123456789</div>
              <div className="conD entry">
                <div>11.15pm</div>
                <div>Jan 6 2000</div>
              </div>

              <div className="conE entry">
                <NestCamWiredStandIcon id="ipIcon" />
                <VideocamIcon id="webIcon" />
                <ModeEditIcon
                  id="editIcon"
                  onClick={() => {
                    dispatch(funEdit(true));
                    // dispatch(funSelectCandidate(data));
                    // navigate("/register");
                  }}
                />
                <DeleteIcon
                  id="delIcon"
                  onClick={() => {
                    // handleDeleteData(data);
                  }}
                />
              </div>
            </div>
            <div className="bodyPart">
              <div className="conA entry">
                <img alt="Cindy Baker" src={ronaldo} className="entryUserImg" />
                {blink !== "Therapists" ? (
                  <div className="conAvideocon">
                    <VideoCameraBackIcon
                      id="adIcon"
                      onClick={() => {
                        // handleOpen();
                        // setShowSrc(data.video);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="conB entry">Hari Yadharth</div>
              <div className="conC entry">123456789</div>
              <div className="conD entry">
                <div>11.15pm</div>
                <div>Jan 6 2000</div>
              </div>

              <div className="conE entry">
                <NestCamWiredStandIcon id="ipIcon" />
                <VideocamIcon id="webIcon" />
                <ModeEditIcon
                  id="editIcon"
                  onClick={() => {
                    dispatch(funEdit(true));
                    // dispatch(funSelectCandidate(data));
                    // navigate("/register");
                  }}
                />
                <DeleteIcon
                  id="delIcon"
                  onClick={() => {
                    // handleDeleteData(data);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="entriesPage">
          <div className="entriesSubPage">
            <Grid container spacing={2}>
              {demo.map(() => {
                return (
                  <Grid item md={4}>
                    <div className="entriesChild">
                      <img
                        src={ronaldo}
                        alt="imagex"
                        className="entryUserImg"
                      />
                      <div className="entryInd">
                        <div className="entA">
                          <span className="entSpanA">Name</span>
                          <span className="entSpanB">
                            : Hari yadharth (male)
                          </span>
                        </div>
                        <div className="entA">
                          <span className="entSpanA">D.O.B</span>
                          <span className="entSpanB">: Jun 06 2000</span>
                        </div>
                        <div className="entA">
                          <span className="entSpanA">ID</span>
                          <span className="entSpanB">: 1234567</span>
                        </div>
                        <div className="entA">
                          <span className="entSpanA">Entry</span>
                          <span className="entSpanB">
                            : Dec 06 2024,11.15pm
                          </span>
                        </div>
                        <div className="entA">
                          <span className="entSpanA">Shift</span>
                          <span className="entSpanB">: Morning</span>
                        </div>
                        <div entryUserImg>Edit</div>
                      </div>
                    </div>
                  </Grid>
                );
              })}

              <Grid item md={4}>
                <div className="entriesChild">
                  <img src={ronaldo} alt="imagex" className="entryUserImg" />
                  <div className="entryInd">
                    <div className="entA">
                      <span className="entSpanA">Name</span>
                      <span className="entSpanB">: Hari yadharth (male)</span>
                    </div>
                    <div className="entA">
                      <span className="entSpanA">D.O.B</span>
                      <span className="entSpanB">: Jun 06 2000</span>
                    </div>
                    <div className="entA">
                      <span className="entSpanA">ID</span>
                      <span className="entSpanB">: 1234567</span>
                    </div>
                    <div className="entA">
                      <span className="entSpanA">Entry</span>
                      <span className="entSpanB">: Dec 06 2024,11.15pm</span>
                    </div>
                    <div className="entA">
                      <span className="entSpanA">Shift</span>
                      <span className="entSpanB">: Morning</span>
                    </div>
                    <div entryUserImg>Edit</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div> */}
      </div>
    </>
  );
}
