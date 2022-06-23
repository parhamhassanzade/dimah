import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "white",
  padding: "15px",
  boxShadow: 24,
  border: "2px solid white",
  borderRadius: "25px",
};

export default function SearchModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        sx={{ margin: "0px 3px" }}
        fullWidth
        color="info"
        variant="contained"
        onClick={handleOpen}
      >
        جستجو پیشرفته
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField id="outlined-required" label="اپراتور" />
              <TextField id="outlined-required" label="نام مشتری" />
              <TextField id="outlined-required" label="نام خانوادگی مشتری" />
            </div>
            <div>
              <TextField id="outlined-required" label="جنسیت" />
              <TextField id="outlined-required" label="کد ملی" />
            </div>
            <div>
              <TextField id="outlined-required" label="شماره مشتری" />
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  fullWidth
                  size="small"
                  label="تاریخ مراجعه"
                  name="serviceDate"
                  id="serviceDate"
                  // value={selectedDate}
                  mask="____/__/__"
                  onChange={(newValue) => {
                    //   handleDateChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      // fullWidth
                      // size="small"
                      {...params}
                      sx={{ direction: "rtl" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "10px" }}
            >
              <Button fullWidth variant="contained">
                جستجو
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
