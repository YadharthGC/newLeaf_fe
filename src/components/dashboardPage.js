import { Avatar } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import "../CSS/dashboard.css";

export default function DashboardSection() {
  return (
    <div>
      <div className="heading">
        <div className="headTitle">DashBoard</div>
        <div className="adminSec">
          <span className="adminText">Welcome Admin</span>
          <span className="AvatarIcon">
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </span>
        </div>
      </div>
      <div className="gridA">
        <Grid container columnSpacing={2}>
          <Grid item md={6}>
            <div className="gridItemA">
              <div className="shiftAdmin">Good Morning,Admin</div>
              <div className="prettyText">
                <span className="prettySpan">
                  Welcome to AbleLyf!Manage attendance with ease
                </span>
              </div>
              <div className="accountDiv">
                <span className="accountSpan">Account</span>
              </div>
              <div className="twoBoxes">
                <div className="firstBox">
                  <div className="firstCon">Therapists</div>
                  <div className="secondCon">Under you</div>
                  <div className="thirdCon">500000</div>
                </div>
                <div className="secondBox">
                  <div className="firstCon">Students</div>
                  <div className="secondCon">Under you</div>
                  <div className="thirdCon">700000</div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="gridItemB">
              <div className="showDate">
                <div className="monYr">Jan 2024</div>
                <div className="dashDays">
                  <span className="weekName">
                    <div className="deepOne">SUN</div>
                    <div className="deepTwo">1</div>
                  </span>
                  <span className="weekName">
                    <div className="deepOne">MON</div>
                    <div className="deepTwo">2</div>
                  </span>
                  <span className="weekName">
                    <div className="deepOne">TUE</div>
                    <div className="deepTwo">3</div>
                  </span>
                  <span className="weekName">
                    <div className="deepOne">WED</div>
                    <div className="deepTwo">4</div>
                  </span>
                  <span className="weekName">
                    <div className="deepOne">THU</div>
                    <div className="deepTwo">5</div>
                  </span>
                  <span className="weekName">
                    <div className="deepOne">FRI</div>
                    <div className="deepTwo">6</div>
                  </span>
                  <span className="weekName">
                    <div className="deepOne">SAT</div>
                    <div className="deepTwo">7</div>
                  </span>
                </div>
              </div>
              <div className="boxesTwo">
                <div className="boxesTwoA">
                  <div className="pieceA">
                    <div className="showPercent">
                      <div className="percentSpan">82%</div>
                    </div>
                  </div>
                  <div className="pieceB">
                    <div className="whoType">Therapists</div>
                    <div className="blindAttend">Attendance</div>
                    <div className="noof">475/500</div>
                  </div>
                </div>
                <div className="boxesTwoB">
                  <div className="pieceA">
                    <div className="showPercent">
                      <div className="percentSpan">77%</div>
                    </div>
                  </div>
                  <div className="pieceB">
                    <div className="whoType">Students</div>
                    <div className="blindAttend">Attendance</div>
                    <div className="noof">589/700</div>
                  </div>
                </div>
                <div className="boxesTwoC">
                  <div className="helpSupport">
                    <div className="quesA">&#63;</div>
                    <div className="quesB">&#63;</div>
                    <div className="quesC">&#63;</div>
                    <div className="qhpText">Help and Support</div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="gridB">
        <Grid container columnSpacing={2}>
          <Grid item md={6}>
            <div className="gridBitemA">
              <div className="eventsTitle">Upcoming Events</div>
              <div className="eventsBox">
                <div className="blackBox">
                  <div className="boxA">1</div>
                  <div className="boxB">
                    <div className="subA">Live Camera Feed</div>
                    <div className="subB">Real Time Moitoring</div>
                  </div>
                  <div className="boxC">11.25 - 11.35</div>
                </div>
                <div className="blackBox">
                  <div className="boxA">2</div>
                  <div className="boxB">
                    <div className="subA">Live Camera Feed</div>
                    <div className="subB">Real Time Moitoring</div>
                  </div>
                  <div className="boxC">11.25 - 11.35</div>
                </div>
                <div className="blackBox">
                  <div className="boxA">3</div>
                  <div className="boxB">
                    <div className="subA">Live Camera Feed</div>
                    <div className="subB">Real Time Moitoring</div>
                  </div>
                  <div className="boxC">11.25 - 11.35</div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="gridBitemB">
              <div className="eventsTitle">Recent Entry</div>
              <div className="eventsBox">
                <div className="blackBox">
                  <div className="boxA">1</div>
                  <div className="boxB">
                    <div className="subA">John Michael</div>
                    <div className="subB">Therapist</div>
                  </div>
                  <div className="boxC">11.25 - 11.35</div>
                </div>
                <div className="blackBox">
                  <div className="boxA">2</div>
                  <div className="boxB">
                    <div className="subA">John Adams</div>
                    <div className="subB">Student</div>
                  </div>
                  <div className="boxC">11.25 - 11.35</div>
                </div>
                <div className="blackBox">
                  <div className="boxA">3</div>
                  <div className="boxB">
                    <div className="subA">Ken Adams</div>
                    <div className="subB">Therapist</div>
                  </div>
                  <div className="boxC">11.25 - 11.35</div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
