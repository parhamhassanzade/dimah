import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

function ConfrimPage() {
    const history = useHistory()
    const handleExit = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('USID')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem("username")
        history.push('/')
    }
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ width: "100%", height: "100%" , bgcolor:'rgb(191, 141, 56)'}}
    >
      <Box
        sx={{
          //   border: "1px solid lightgray",
          boxShadow: "1px 1px 20px lightgray",
          borderRadius: "10px",
          width: "35rem",
          height: "15rem",
          p: 2,
          bgcolor:'#fff'
        }}
        display="flex"
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Box sx={{ width: "100%"}}>
          آیا میخواهید از حساب کاربری خود خارج شوید ؟
          <Divider light />
          <Box sx={{mt:5}}>
            درصورتی که میخواهید از حساب کاربری خود خارج شوید روی دکمه خروج کلیک
            کنید
          </Box>
          <Box display={'flex'} justifyContent={'center'} sx={{mt:5}}>
              <Button variant="contained" color='error' onClick={handleExit}>خروج</Button>
              <Button color='success' onClick={()=>history.push('/dashboard')}>انصراف</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfrimPage;
