import React, { useEffect, useState } from "react";
import { styled, Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PImage from "../../../assets/images/hairProfile.jpg";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuthLoading,
  userLogout,
  userPremium,
} from "../../../redux/reducers/ducks/MainDuck";
import useRazorpay from "react-razorpay";
import axios from "axios";
import urls from "../../../api/urls";

const MainBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));
const TopNav = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "50px",
  backgroundColor: "#445760",
  boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
}));
const ProfileContent = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "calc(100% - 100px)",
  padding: "50px",
  minHeight: "calc(100vh - 100px)",
  [theme.breakpoints.down("msm")]: {
    padding: "0px",
    width: "100%",
  },
}));
const ProfileBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "calc(100% - 50px)",
  minHeight: "max-content",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
  [theme.breakpoints.down("msm")]: {
    boxShadow: "none",
  },
  "&>div:nth-of-type(1)": {
    // border: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    "&>p": {
      fontSize: "24px",
      fontWeight: "600",
    },
    "&>button": {
      backgroundColor: "#2C65CE",
      padding: "10px 20px",
      color: "#fff",
      border: "none",
      outline: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
  },
  "&>div:nth-of-type(2)": {
    // border: "1px solid black",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: "30px",
    [theme.breakpoints.down("lsm")]: {
      flexDirection: "column",
    },
    "&>div:nth-of-type(1)": {
      position: "relative",
      "&>img": {
        width: "150px",
        borderRadius: "50%",
        boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
      },
      "&>p": {
        position: "absolute",
        top: "-25px",
        right: "0px",
        fontSize: "36px",
        transform: "rotate(30deg)",
      },
    },
    "&>div:nth-of-type(2)": {
      //   border: "1px solid black",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "100%",
      padding: "10px",
      "&>div:nth-of-type(1)": {
        // border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        padding: "10px",
        [theme.breakpoints.down("lsm")]: {
          padding: "0px",
        },
        "&>p": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "600",
          marginTop: "20px",
          [theme.breakpoints.down("msm")]: {
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          },
          "&>input": {
            border: "none",
            outline: "none",
            padding: "10px 20px",
            boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
            borderRadius: "8px",
            marginLeft: "10px",
            [theme.breakpoints.down("msm")]: {
              marginTop: "10px",
              padding: "10px 20px",
              width: "100%",
            },
            [theme.breakpoints.down("ssm")]: {
              width: "80%",
            },
          },
          "&>button": {
            backgroundColor: "#2C65CE",
            padding: "10px 20px",
            color: "#fff",
            border: "none",
            outline: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginLeft: "10px",
            [theme.breakpoints.down("msm")]: {
              marginTop: "10px",
            },
          },
          "&>p": {
            color: "#445760",
            marginLeft: "10px",
            fontWeight: "600",
            [theme.breakpoints.down("msm")]: {
              marginTop: "10px",
            },
          },
        },
      },
      "&>p": {
        display: "flex",
        fontSize: "16px",
        fontWeight: "600",
        "&>p": {
          color: "#445760",
          marginLeft: "10px",
        },
      },
      "&>button": {
        backgroundColor: "#2C65CE",
        padding: "10px 20px",
        color: "#fff",
        border: "none",
        outline: "none",
        borderRadius: "8px",
        cursor: "pointer",
      },
    },
  },
}));

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Razorpay] = useRazorpay();
  const [income, setIncome] = useState("");
  const emm = "Abhishek11906997dulat@gmail.com";
  const [incomeChange, setIncomeChange] = useState(false);
  const [premiumUser, setPremiumUser] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { loginResponse, isLoading } = useSelector(({ authorization }) => ({
    loginResponse: authorization.loginResponse,
    isLoading: authorization.isLoading,
  }));

  const handleIncomeChange = () => {
    toast.info("currently not available!");
    // setIncomeChange(false);
    // setIncomeChange(!incomeChange);
  };
  const handleAnalysis = () => {
    navigate("/profile/analysis");
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(userLogout());
    navigate("/");
  };
  const handleUnsubscribe = () => {};

  const handleSubscribe = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    try {
      const response = await axios.get(`${urls.auth.premium}`, {
        headers: { Authorization: token },
      });
      let options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
          const data = await axios.post(
            `http://localhost:8001/api/payment/updatepremium`,
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            { headers: { Authorization: token } }
          );
          console.log(data);
          toast.success("you are a Premium User Now!");
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", async function (response) {
        const data = await axios.post(
          `http://localhost:8001/api/payment/updatepremiumfailed`,
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
        toast.error("Something went wrong!");
      });
    } catch (error) {
      toast.error(error.mesage);
    }
    // dispatch(updateAuthLoading(true));
    // dispatch(userPremium(token));
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      setProfileData(decodedPayload);
    }
  }, []);

  console.log(profileData);
  return (
    <MainBox>
      <TopNav>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackRoundedIcon sx={{ color: "#fff" }} />
        </IconButton>
      </TopNav>
      <ProfileContent>
        <ProfileBox>
          <Box>
            <Typography>Profile</Typography>
            <button>Edit</button>
          </Box>
          <Box>
            <Box>
              <img src={PImage} alt="pimage" />
              {profileData !== null && profileData?.isPremium && (
                <Typography>👑</Typography>
              )}
            </Box>
            <Box>
              <Typography>
                Name:{" "}
                <Typography>
                  {profileData !== null && profileData?.name}
                </Typography>
              </Typography>
              <Typography>
                Email:{" "}
                <Typography>
                  {profileData !== null
                    ? profileData?.email.length < 10
                      ? profileData?.email
                      : profileData?.email.slice(0, 10) + "..."
                    : ""}
                </Typography>
              </Typography>
              <Box>
                <Typography>
                  Total Income:{" "}
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Income"
                    disabled={!incomeChange}
                  />
                  {!incomeChange ? (
                    <button onClick={() => handleIncomeChange()}>Edit</button>
                  ) : (
                    <button
                      style={{ backgroundColor: "#66BF46" }}
                      onClick={() => handleIncomeChange()}
                    >
                      Save
                    </button>
                  )}
                  <Typography>💲1000.00</Typography>
                </Typography>
                <Typography>
                  Total Expense:{" "}
                  <Typography>
                    💲{profileData !== null ? profileData?.totalCost : 0}
                  </Typography>
                </Typography>
              </Box>
              {profileData !== null ? (
                profileData?.isPremium ? (
                  <button
                    style={{
                      backgroundColor: "#9FA4A8",
                      color: "#fff",
                      marginTop: "20px",
                    }}
                    onClick={() => handleUnsubscribe()}
                  >
                    <Typography>UnSubscribe</Typography>
                  </button>
                ) : (
                  <button
                    style={{
                      backgroundColor: "#010101",
                      color: "#fff",
                      marginTop: "20px",
                    }}
                    onClick={() => handleSubscribe()}
                  >
                    <Typography>Subscribe now 👑</Typography>
                  </button>
                )
              ) : null}
              <button
                style={{
                  backgroundColor: "#010101",
                  color: "#fff",
                  marginTop: "20px",
                }}
                onClick={() => handleAnalysis()}
              >
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Analysis <InsightsRoundedIcon />
                </Typography>
              </button>
              <button
                style={{
                  backgroundColor: "#C6BFF7",
                  color: "#445760",
                  marginTop: "20px",
                }}
                onClick={() => handleLogout()}
              >
                <Typography> Logout</Typography>
              </button>
            </Box>
          </Box>
        </ProfileBox>
      </ProfileContent>
    </MainBox>
  );
};

export default UserProfile;
