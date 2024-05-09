import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { expenseData } from "./data";
import { useEffect } from "react";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddExpense from "./AddExpense";
import AreYouSure from "./AreYouSure";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllExp,
  updateExpenseLoading,
} from "../../redux/reducers/ducks/ExpenseDuck";

const MainBox = styled(Box)(({ theme }) => ({
  //   border: "1px solid #000",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  "&>div:nth-of-type(1)": {
    // border: "1px solid #000",
    width: "calc(100% - 40px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    "&>form": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&>input": {
        padding: "15px 30px",
        width: "400px",
        fontFamily: '"Poppins", sans-serif',
        border: "none",
        outline: "none",
        boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
        borderRadius: "8px 0px 0px 8px",
        [theme.breakpoints.down("sm")]: {
          padding: "10px 15px",
          width: "200px",
        },
        [theme.breakpoints.down("ssm")]: {
          padding: "8px 12px",
          width: "150px",
        },
      },
      "&>button": {
        padding: "15px 30px",
        fontFamily: '"Poppins", sans-serif',
        border: "none",
        outline: "none",
        boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
        borderRadius: "0px 8px 8px 0px",
        backgroundColor: "#02B2AF",
        color: "#fff",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
          padding: "10px 15px",
        },
        [theme.breakpoints.down("ssm")]: {
          padding: "11px 12px",
          fontSize: "10px",
        },
      },
    },
  },
  "&>div:nth-of-type(2)": {
    // border: "1px solid #000",

    width: "calc(100% - 40px)",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#9FA4A8",
    "&>div": {
      "&>p": {
        color: "#010101",
        [theme.breakpoints.down("sm")]: {
          fontSize: "14px",
        },
      },
    },
  },
  "&>div:nth-of-type(3)": {
    // border: "1px solid #000",
    width: "calc(100% - 40px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#fff",
    "&>div": {
      //   border: "1px solid #000",
      width: "calc(100% - 20px)",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
      "&>div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&>p": {
          color: "#010101",
          [theme.breakpoints.down("sm")]: {
            fontSize: "10px",
          },
        },
        "&>button": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "8px 12px",
          border: "none",
          outline: "none",
          margin: "2px",
          cursor: "pointer",
          [theme.breakpoints.down("sm")]: {
            padding: "4px 6px",
          },
          "&>svg": {
            [theme.breakpoints.down("sm")]: {
              fontSize: "10px",
            },
          },

          "&>p": {
            [theme.breakpoints.down("sm")]: {
              fontSize: "10px",
            },
          },
        },
        "&>button:nth-of-type(1)": {
          backgroundColor: "#2E96FF",
          color: "#fff",
        },
        "&>button:nth-of-type(2)": {
          backgroundColor: "#E3604A",
          color: "#fff",
        },
      },
    },
  },
}));

const AddBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#02B2AF",
  color: "#fff",
  position: "absolute",
  top: "calc(100vh - 170px)",
  right: "10px",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "0.4s",
  ":hover": {
    transform: "scale(1.1)",
  },
  ":active": {
    transform: "scale(1)",
  },
}));

const ExpenseLayout = ({ dataType, setDataType }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [itemSet, setItemSet] = useState([...expenseData.Daily]);
  const [removeData, setRemoveData] = useState(null);
  const { expenseResponseData, isLoading } = useSelector(({ expense }) => ({
    expenseResponseData: expense.expenseResponseData,
    isLoading: expense.isLoading,
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenDelete = (data) => {
    setRemoveData(data);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const data =
      dataType === 0
        ? [...expenseData.Daily]
        : dataType === 1
        ? [...expenseData.Monthly]
        : dataType === 2
        ? [...expenseData.Yearly]
        : [];
    setItemSet([...data]);
  }, [dataType]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    dispatch(getAllExp(token));
    dispatch(updateExpenseLoading(true));
  }, []);
  console.log(itemSet, expenseResponseData);
  return (
    <MainBox>
      <Box>
        <form onSubmit={handleSubmit}>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          />
          <button onClick={handleSubmit}>Search</button>
        </form>
      </Box>
      <Box>
        <Box>
          <Typography>Item Name</Typography>
        </Box>
        <Box>
          <Typography>Categorie</Typography>
        </Box>
        <Box>
          <Typography>Amount</Typography>
        </Box>
        <Box>
          <Typography>Action</Typography>
        </Box>
      </Box>

      <Box>
        {expenseResponseData?.map((data, index) => {
          return (
            <Box>
              <Box>
                <Typography>{data.itemName}</Typography>
              </Box>
              <Box>
                <Typography>{data.categorie}</Typography>
              </Box>
              <Box>
                <Typography>{data.amount}</Typography>
              </Box>
              <Box>
                <button>
                  <Typography>Edit</Typography>
                  <DriveFileRenameOutlineRoundedIcon
                    style={{ marginLeft: "5px" }}
                  />
                </button>
                <button onClick={() => handleClickOpenDelete(data)}>
                  <Typography>Remove</Typography>
                  <BackspaceRoundedIcon
                    style={{ transform: "rotate(180deg)", marginLeft: "5px" }}
                  />
                </button>
              </Box>
            </Box>
          );
        })}
      </Box>
      <AddBox onClick={() => handleClickOpen()}>
        <AddRoundedIcon />
      </AddBox>
      <AddExpense
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
      />
      <AreYouSure
        handleClickOpen={handleClickOpenDelete}
        handleClose={handleCloseDelete}
        open={openDelete}
        setOpen={setOpenDelete}
        data={removeData}
      />
    </MainBox>
  );
};

export default ExpenseLayout;
