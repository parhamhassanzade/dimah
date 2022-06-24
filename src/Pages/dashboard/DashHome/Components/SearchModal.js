import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import { useFormik } from "formik";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
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

export default function SearchModal(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const searchPro = (values) => {
    // console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      operator: "",
      clientFirstName: "",
      clientLastName: "",
      Gender: "",
      nationalCode: "",
      clientNumber: "",
      serviceDate: selectedDate,
      laserKind: {
        kind: "",
      },
    },

    onSubmit: (values, action) => {
      // searchPro(values);
      props.onSearch(values);
      action.resetForm();
      handleClose();
    },
  });

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
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
          >
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <TextField
                    name="operator"
                    id="operator"
                    label="اپراتور"
                    value={formik.values.operator}
                    onChange={formik.handleChange}
                  />

                  <TextField
                    name="clientFirstName"
                    id="clientFirstName"
                    value={formik.values.clientFirstName}
                    onChange={formik.handleChange}
                    label="نام مشتری"
                  />
                  <TextField
                    name="clientLastName"
                    id="clientLastName"
                    label="نام خانوادگی مشتری"
                    value={formik.values.clientLastName}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    name="nationalCode"
                    id="nationalCode"
                    label="کد ملی"
                    value={formik.values.nationalCode}
                    onChange={formik.handleChange}
                  />
                  <div>
                    <TextField
                      name="clientNumber"
                      id="clientNumber"
                      label="شماره مشتری"
                      value={formik.values.clientNumber}
                      onChange={formik.handleChange}
                    />

                    <LocalizationProvider dateAdapter={AdapterJalali}>
                      <DatePicker
                        fullWidth
                        size="small"
                        label="تاریخ مراجعه"
                        name="serviceDate"
                        id="serviceDate"
                        value={selectedDate}
                        mask="____/__/__"
                        onChange={(newValue) => {
                          handleDateChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} sx={{ direction: "rtl" }} />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <FormControl
                    sx={{
                      m: 1,
                      borderRadius: "3px 3px 0 0",
                      borderBottom: "0.75px solid black",
                      pl: 1,
                    }}
                    fullWidth
                  >
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      sx={{ mr: 2 }}
                    >
                      جنسیت
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="Gender"
                    >
                      <FormControlLabel
                        value="female"
                        control={
                          <Radio
                            id="Gender"
                            name="Gender"
                            value="female"
                            onChange={formik.handleChange}
                          />
                        }
                        label="زن"
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        value="male"
                        control={
                          <Radio
                            id="Gender"
                            name="Gender"
                            value="male"
                            onChange={formik.handleChange}
                          />
                        }
                        label="مرد"
                        onChange={formik.handleChange}
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    fullWidth
                    sx={{
                      m: 1,
                      borderRadius: "3px 3px 0 0",
                      borderBottom: "0.75px solid black",
                      pl: 1,
                    }}
                  >
                    <FormLabel
                      id="laserKind"
                      sx={{ fontFamily: "Yekan", mr: 2 }}
                    >
                      نوع لیزر
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="laserKind"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        name="laserKind.kind"
                        id="laserKind"
                        value="javansazi"
                        control={<Radio />}
                        label="جوانسازی"
                        sx={{ fontFamily: "Yekan" }}
                        // onClick={handleChange}
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        name="laserKind.kind"
                        id="laserKind"
                        value="moo-zaed"
                        control={<Radio />}
                        label="موهای زائد"
                        sx={{ fontFamily: "Yekan" }}
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        name="laserKind.kind"
                        id="laserKind"
                        value="tatoo"
                        control={<Radio />}
                        label="رفع تتو"
                        sx={{ fontFamily: "Yekan" }}
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        name="laserKind.kind"
                        id="laserKind"
                        value="female"
                        control={<Radio />}
                        label="زنان"
                        sx={{ fontFamily: "Yekan" }}
                        onChange={formik.handleChange}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <Button
                  sx={{ margin: "10px 0px" }}
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  جستجو
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
