import React, { useEffect } from "react";
import "./Form.css";
import logo from "../../assets/img/dimah.jpeg";
import {
  TextField,
  Box,
  FormControl,
  FilledInput,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  Button,
  Autocomplete,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { men } from "../../data/areaData.js";
import { women } from "../../data/areaData.js";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../../Utils/API";

function Form(props) {
  const [kind, setKind] = React.useState("");
  const [sexual, setSexual] = React.useState("");
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [selectedTime, setTime] = React.useState(new Date());
  const [selectedDate, handleDateChange] = React.useState(new Date());

  function separate(Number) {
    Number += "";
    Number = Number.replace(",", "");
    let x = Number.split(".");
    let y = x[0];
    let z = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
    return y + z;
  }

  const formik = useFormik({
    initialValues: {
      creatorId: localStorage.getItem("USID"),
      clientFirstName: "",
      clientLastName: "",
      nationalCode: "",
      serviceDate: Date.now(),
      serviceTime: selectedTime,
      Gender: "",
      laserKind: {
        kind: "",
        Jkind: undefined,
        Jpower: undefined,
        JdwellTime: undefined,
        Jspacing: undefined,
        Jstak: undefined,
        JspotSize: undefined,
        moZaeedKind: undefined,
        MZpowerFluence: undefined,
        MZpw: undefined,
        MZpr: undefined,
        MZspotSize: undefined,
        tatooKind: undefined,
        Tenergy: undefined,
        TspotSize: undefined,
        Thz: undefined,
        femaleKind: undefined,
        Fpower: undefined,
        FdwellTime: undefined,
        Fspacing: undefined,
        Fstak: undefined,
        FspotSize: undefined,
      },
      bodyParts: [],
      sessionNumber: 0,
      sessionFee: 0,
      clientNumber:0
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post(
          `${API}/form`,
          {
            values,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toast.success("اطلاعات با موفقیت ثبت شد", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      resetForm();
    },
  });
  const spotSize = [
    { title: "single" },
    { title: 6 },
    { title: 8 },
    { title: 10 },
    { title: 12 },
    { title: 15 },
    { title: 18 },
    { title: 20 },
    { title: 24 },
    { title: 25 },
    { title: 30 },
  ];
  const defaultSizeProps = {
    options: spotSize,
    getOptionLabel: (option) => option.title,
  };
  // ================= Power Fluence options ===========
  const powerFluenceOpt = [
    { title: 6 },
    { title: 7 },
    { title: 8 },
    { title: 9 },
    { title: 10 },
    { title: 12 },
    { title: 14 },
    { title: 16 },
    { title: 18 },
  ];
  const defaultPowerFluenceOpt = {
    options: powerFluenceOpt,
    getOptionLabel: (option) => option.title,
  };
  // ================= P.W options ===========
  const PWOpt = [{ title: 3 }, { title: 5 }, { title: 10 }];
  const defaultPWOpt = {
    options: PWOpt,
    getOptionLabel: (option) => option.title,
  };
  // ================= P.R options ===========
  const PROpt = [
    { title: "single" },
    { title: 0.5 },
    { title: 1 },
    { title: 1.5 },
    { title: 2 },
    { title: 2.5 },
    { title: 3 },
  ];
  const defaultPROpt = {
    options: PROpt,
    getOptionLabel: (option) => option.title,
  };

  const handleChange = (event) => {
    setKind(event.target.value);
  };
  const handleSexualChange = (event) => {
    setSexual(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("USID");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    history.push("/");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTimeChange = (val) => {
    const hours = new Date(val).getHours();
    const minutes = new Date(val).getMinutes();
    setTime(val);
  };
  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <div className="w-100 d-flex justify-content-center align-items-center flex-wrap ">
          <span className="brandName form-title w-100 text-center mt-5 h2 ">
            مرکز لیزر دیماه
          </span>
          {/* <img src={logo} width="80px" className="logo " alt='' /> */}
        </div>
      </Grid>
      <Grid item md={2} xs={0} />
      <Grid item md={8} xs={12} sx={{ mb: 5, mt: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
            className="form-main"
          >
            :: شما با نام کاربری .: {localStorage.getItem("username")} :. وارد
            شده اید ::
            <Button
              variant="contained"
              color="error"
              sx={{ m: 1, fontFamily: "Yekan" }}
              onClick={handleClickOpen}
            >
              خروج از حساب کاربری
            </Button>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                  <InputLabel htmlFor="clientFirstName">نام مشتری</InputLabel>
                  <FilledInput
                    id="clientFirstName"
                    name="clientFirstName"
                    type={"text"}
                    label="customerName"
                    onChange={formik.handleChange}
                    value={formik.values.clientFirstName}
                  />
                </FormControl>
              </Grid>

              {/* ====================================== =================== ===================  */}
              <Grid item xs={12} md={6}>
                <FormControl sx={{ m: 1 }} variant="filled" fullWidth>
                  <InputLabel htmlFor="clientLastName">
                    نام خانوادگی مشتری
                  </InputLabel>
                  <FilledInput
                    id="clientLastName"
                    name="clientLastName"
                    type={"text"}
                    label="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.clientLastName}
                  />
                </FormControl>
              </Grid>
              {/* ====================================== =================== ===================  */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="nationalCode">کد ملی</InputLabel>
                  <FilledInput
                    id="nationalCode"
                    name="nationalCode"
                    type={"text"}
                    label="customerId"
                    onChange={formik.handleChange}
                    value={formik.values.nationalCode}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="clientNumber">شماره مشتری</InputLabel>
                  <FilledInput
                    id="clientNumber"
                    name="clientNumber"
                    type={"text"}
                    label="customerId"
                    onChange={formik.handleChange}
                    value={formik.values.clientNumber}
                  />
                </FormControl>
              </Grid>
              {/* ====================================== =================== ===================  */}
              <Grid item xs={12} md={6}>
                <FormControl
                  sx={{
                    m: 1,
                    direction: "ltr",
                    bgcolor: "rgb(240,240,240)",
                  }}
                  variant="filled"
                  fullWidth
                >
                  <LocalizationProvider dateAdapter={AdapterJalali}>
                    <DatePicker
                      label="تاریخ مراجعه"
                      name="serviceDate"
                      id="serviceDate"
                      value={selectedDate}
                      mask="____/__/__"
                      onChange={(newValue) => {
                        handleDateChange(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              {/* ====================================== =================== ===================  */}
              <Grid item xs={12} md={6}>
                <FormControl
                  sx={{
                    m: 1,
                    direction: "ltr",
                    bgcolor: "rgb(240,240,240)",
                  }}
                  fullWidth
                  variant="filled"
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="ساعت مراجعه"
                      ampm={false}
                      value={selectedTime}
                      onChange={handleTimeChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              {/* ====================================== =================== ===================  */}
              <Grid item xs={12}>
                <FormControl
                  sx={{
                    m: 1,
                    bgcolor: "rgb(240,240,240)",
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
                      onClick={handleSexualChange}
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
                      onClick={handleSexualChange}
                      onChange={formik.handleChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* ====================================== =================== ===================  */}
              {sexual === "female" ? (
                <>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        bgcolor: "rgb(240,240,240)",
                        borderRadius: "3px 3px 0 0",
                        borderBottom: "0.75px solid black",
                        pl: 1,
                      }}
                    >
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ mr: 2 }}
                      >
                        {" "}
                        نواحی بدن
                      </FormLabel>
                      <FormGroup fullWidth row>
                        <Grid container xs={12}>
                          {women?.map((item) => (
                            <Grid item md={3} xs={6}>
                              <FormControlLabel
                                control={<Checkbox />}
                                label={item.name}
                                name="bodyParts"
                                onChange={formik.handleChange}
                                value={item.name}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </>
              ) : sexual === "male" ? (
                <>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        bgcolor: "rgb(240,240,240)",
                        borderRadius: "3px 3px 0 0",
                        borderBottom: "0.75px solid black",
                        pl: 1,
                      }}
                    >
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ mr: 2 }}
                      >
                        {" "}
                        نواحی بدن
                      </FormLabel>
                      <FormGroup fullWidth row>
                        <Grid container xs={12}>
                          {men?.map((item) => (
                            <Grid item md={3} xs={6}>
                              <FormControlLabel
                                control={<Checkbox />}
                                label={item.name}
                                name="bodyParts"
                                value={item.name}
                                onChange={formik.handleChange}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </>
              ) : null}
              {/* ====================================== =================== ===================  */}
              <Grid item xs={12}>
                <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                  <InputLabel
                    htmlFor="sessionNumber"
                    sx={{ fontFamily: "Yekan" }}
                  >
                    شماره جلسه
                  </InputLabel>
                  <FilledInput
                    id="sessionNumber"
                    type={"text"}
                    name="sessionNumber"
                    label="Password"
                    sx={{ fontFamily: "Yekan" }}
                    onChange={formik.handleChange}
                    value={formik.values.sessionNumber}
                  />
                </FormControl>
              </Grid>
              {/* ====================================== =================== ===================  */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  sx={{
                    m: 1,
                    bgcolor: "rgb(240,240,240)",
                    borderRadius: "3px 3px 0 0",
                    borderBottom: "0.75px solid black",
                    pl: 1,
                  }}
                >
                  <FormLabel id="laserKind" sx={{ fontFamily: "Yekan", mr: 2 }}>
                    نوع لیزر*
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
                      onClick={handleChange}
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      name="laserKind.kind"
                      id="laserKind"
                      value="moo-zaed"
                      control={<Radio />}
                      label="موهای زائد"
                      sx={{ fontFamily: "Yekan" }}
                      onClick={handleChange}
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      name="laserKind.kind"
                      id="laserKind"
                      value="tatoo"
                      control={<Radio />}
                      label="رفع تتو"
                      sx={{ fontFamily: "Yekan" }}
                      onClick={handleChange}
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      name="laserKind.kind"
                      id="laserKind"
                      value="female"
                      control={<Radio />}
                      label="زنان"
                      sx={{ fontFamily: "Yekan" }}
                      onClick={handleChange}
                      onChange={formik.handleChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* ============================================================================  */}
              {kind === "javansazi" ? (
                <>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        bgcolor: "rgb(240,240,240)",
                        borderRadius: "3px 3px 0 0",
                        borderBottom: "0.75px solid black",
                      }}
                    >
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ mr: 2 }}
                      >
                        نوع لیزر جوانسازی
                      </FormLabel>
                      <FormGroup fullWidth row>
                        <Grid container xs={12}>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked
                                  name="laserKind.Jkind"
                                  value="CO2"
                                  onChange={formik.handleChange}
                                />
                              }
                              label="CO2"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="laserKind.Jkind"
                                  value="RF"
                                  onChange={formik.handleChange}
                                />
                              }
                              label="RF"
                            />
                          </Grid>
                        </Grid>
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  {/* ***************** */}
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel htmlFor="filled-adornment-power">
                        Power(حداقل :۱ حداکثر:۱۰)
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-power"
                        type={"text"}
                        label="power"
                        name="laserKind.Jpower"
                        value={formik.values.laserKind.Jpower}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  {/* ***************** */}
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel htmlFor="filled-user-dwellTime">
                        Dwell Time(حداقل :100 حداکثر:1000)
                      </InputLabel>
                      <FilledInput
                        id="filled-user-dwellTime"
                        type={"text"}
                        label="dwellTime"
                        name="laserKind.JdwellTime"
                        value={formik.values.laserKind.JdwellTime}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  {/* ***************** */}
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel htmlFor="filled-adornment-spacing">
                        Spacing(حداقل :100 حداکثر:1000)
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-spacing"
                        type={"text"}
                        label="spacing"
                        name="laserKind.Jspacing"
                        value={formik.values.laserKind.Jspacing}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  {/* ***************** */}
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel htmlFor="filled-user-stak">
                        Stak(حداقل :1 حداکثر:6)
                      </InputLabel>
                      <FilledInput
                        id="filled-user-stak"
                        type={"text"}
                        label="stak"
                        name="laserKind.Jstak"
                        value={formik.values.laserKind.Jstak}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  {/* ***************** */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor="disable-clearable" sx={{ mr: 2 }}>
                      Spot Size
                    </InputLabel>
                    <Autocomplete
                      sx={{
                        bgcolor: "rgb(240,240,240)",
                        borderRadius: "3px 3px 0 0",
                        m: 1,
                      }}
                      fullWidth
                      name="laserKind.JspotSize"
                      value={formik.values.laserKind.JspotSize}
                      onChange={formik.handleChange}
                      {...defaultSizeProps}
                      id="disable-clearable"
                      clearOnEscape
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="برای انتخاب کلیک کنید"
                          sx={{ direction: "ltr" }}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                </>
              ) : //================================== MOO ZAED ========================================================
              kind === "moo-zaed" ? (
                <>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        bgcolor: "rgb(240,240,240)",
                        borderRadius: "3px 3px 0 0",
                        borderBottom: "0.75px solid black",
                      }}
                    >
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ fontFamily: "Yekan", mr: 2 }}
                      >
                        نوع لیزر رفع موهای زائد
                      </FormLabel>
                      <FormGroup fullWidth row>
                        <Grid container xs={12}>
                          <Grid item xs={12} sm={6} lg={3}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="laserKind.moZaeedKind"
                                  value={"ALEX755"}
                                  onChange={formik.handleChange}
                                />
                              }
                              label="ALEX 755"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={3}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="laserKind.moZaeedKind"
                                  value={"ND-YAG1064"}
                                  onChange={formik.handleChange}
                                />
                              }
                              label="ND-YAG 1064"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={3}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="laserKind.moZaeedKind"
                                  value={"DIOD810"}
                                  onChange={formik.handleChange}
                                />
                              }
                              label="DIOD 810"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} lg={3}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="laserKind.moZaeedKind"
                                  value={"IPL580"}
                                  onChange={formik.handleChange}
                                />
                              }
                              label="IPL 580"
                            />
                          </Grid>
                        </Grid>
                      </FormGroup>
                    </FormControl>
                  </Grid>

                  {/* ***************** */}
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        mt: 0,
                        direction: "ltr",
                      }}
                    >
                      <InputLabel htmlFor="disable-clearable1">
                        Power Fluence
                      </InputLabel>
                      <Autocomplete
                        sx={{ mt: 1 }}
                        {...defaultPowerFluenceOpt}
                        id="disable-clearable1"
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            name="laserKind.MZpowerFluence"
                            value={formik.values.laserKind.MZpowerFluence}
                            onChange={formik.handleChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  {/* ***************** */}
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        mt: 0,
                        direction: "ltr",
                      }}
                    >
                      <InputLabel htmlFor="disable-clearable">P.W</InputLabel>
                      <Autocomplete
                        sx={{ mt: 1 }}
                        {...defaultPWOpt}
                        id="disable-clearable"
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            name="laserKind.MZpw"
                            value={formik.values.laserKind.MZpw}
                            onChange={formik.handleChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  {/* ***************** */}
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        mt: 0,
                        direction: "ltr",
                      }}
                    >
                      <InputLabel htmlFor="disable-clearable">
                        Spot Size
                      </InputLabel>
                      <Autocomplete
                        sx={{ mt: 1 }}
                        {...defaultSizeProps}
                        id="disable-clearable"
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            name="laserKind.MZspotSize"
                            value={formik.values.laserKind.MZspotSize}
                            onChange={formik.handleChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  {/* ***************** */}
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        mt: 0,
                        direction: "ltr",
                      }}
                    >
                      <InputLabel htmlFor="disable-clearable">P.R</InputLabel>
                      <Autocomplete
                        sx={{ mt: 1 }}
                        {...defaultPROpt}
                        id="disable-clearable"
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            name="laserKind.MZpr"
                            value={formik.values.laserKind.MZpr}
                            onChange={formik.handleChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </>
              ) : //================================== TATOO ========================================================
              kind === "tatoo" ? (
                <>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        bgcolor: "rgb(240,240,240)",
                        borderRadius: "3px 3px 0 0",
                        borderBottom: "0.75px solid black",
                      }}
                    >
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ fontFamily: "Yekan", mr: 2 }}
                      >
                        نوع لیزر رفع تتو
                      </FormLabel>
                      <FormGroup fullWidth row>
                        <Grid container xs={12}>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="laserKind.tatooKind"
                                  value={"QSWITCHND-YAG"}
                                  onChange={formik.handleChange}
                                />
                              }
                              label="QSWITCH ND-YAG"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="laserKind.tatooKind"
                                  value={"QSWITCHKTP"}
                                  onChange={formik.handleChange}
                                />
                              }
                              label="QSWITCH KTP"
                            />
                          </Grid>
                        </Grid>
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel htmlFor="filled-adornment-energy">
                        Energy(حداقل :800 حداکثر:1000)
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-energy"
                        type={"text"}
                        label="energy"
                        name="laserKind.Tenergy"
                        value={formik.values.laserKind.Tenergy}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        mt: 0,
                      }}
                    >
                      <InputLabel htmlFor="disable-clearable">
                        Spot Size
                      </InputLabel>
                      <Autocomplete
                        sx={{ m: 1 }}
                        {...defaultSizeProps}
                        id="disable-clearable"
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            name="laserKind.TspotSize"
                            value={formik.values.laserKind.TspotSize}
                            onChange={formik.handleChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel
                        htmlFor="filled-adornment-password"
                        sx={{ fontFamily: "Yekan" }}
                      >
                        HZ(حداقل :1 حداکثر:6)
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={"text"}
                        label="Password"
                        sx={{ fontFamily: "Yekan" }}
                        name="laserKind.Thz"
                        value={formik.values.laserKind.Thz}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                </>
              ) : kind === "female" ? (
                <>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        bgcolor: "rgb(240,240,240)",
                        borderRadius: "3px 3px 0 0",
                        borderBottom: "0.75px solid black",
                      }}
                    >
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ fontFamily: "Yekan", mr: 2 }}
                      >
                        نوع لیزر زنان
                      </FormLabel>
                      <FormGroup fullWidth row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              name="laserKind.femaleKind"
                              value="CO2"
                              onChange={formik.handleChange}
                            />
                          }
                          label="CO2"
                          sx={{ fontFamily: "Yekan" }}
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel htmlFor="filled-adornment-power">
                        Power(حداقل :۱ حداکثر:۱۰)
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-power"
                        type={"text"}
                        label="power"
                        name="laserKind.Fpower"
                        value={formik.values.laserKind.Fpower}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                      <InputLabel htmlFor="filled-user-dwellTime">
                        Dwell Time(حداقل :100 حداکثر:1000)
                      </InputLabel>
                      <FilledInput
                        id="filled-user-dwellTime"
                        type={"text"}
                        label="dwellTime"
                        name="laserKind.FdwellTime"
                        value={formik.values.laserKind.FdwellTime}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel htmlFor="filled-adornment-spacing">
                        Spacing(حداقل :100 حداکثر:1000)
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-spacing"
                        type={"text"}
                        label="spacing"
                        name="laserKind.Fspacing"
                        value={formik.values.laserKind.Fspacing}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                      <InputLabel htmlFor="filled-user-stak">
                        Stak(حداقل :1 حداکثر:6)
                      </InputLabel>
                      <FilledInput
                        id="filled-user-stak"
                        type={"text"}
                        label="stak"
                        name="laserKind.Fstak"
                        value={formik.values.laserKind.Fstak}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        mt: 0,
                      }}
                    >
                      <InputLabel htmlFor="disable-clearable">
                        Spot Size
                      </InputLabel>
                      <Autocomplete
                        sx={{ m: 1 }}
                        {...defaultSizeProps}
                        id="disable-clearable"
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            name="laserKind.FspotSize"
                            value={formik.values.laserKind.FspotSize}
                            onChange={formik.handleChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </>
              ) : null}
              {/* ====================================== =================== ===================  */}
              <Grid item xs={12}>
                <FormControl sx={{ m: 1 }} fullWidth variant="filled">
                  <InputLabel htmlFor="sessionFee" sx={{ fontFamily: "Yekan" }}>
                    هزینه جلسه(تومان)
                  </InputLabel>
                  <FilledInput
                    id="sessionFee"
                    type={"text"}
                    name="sessionFee"
                    label="هزینه جلسه(تومان)"
                    sx={{ fontFamily: "Yekan" }}
                    onChange={formik.handleChange}
                    value={separate(formik.values.sessionFee)}
                  />
                </FormControl>
              </Grid>
              {/* ====================================== =================== ===================  */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  sx={{ m: 1, fontFamily: "Yekan" }}
                  type="submit"
                >
                  ثبت
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
      <Grid item md={2} xs={0} />
      <ToastContainer />
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"آیا میخواهید خارج شوید ؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            برای خروج از حساب کاربری روی دکمه خروج کلیک کنید درغیر اینصورت دکمه
            انصراف را بزنید
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExit} variant="contained" color="error">
            خروج
          </Button>
          <Button onClick={handleClose}>انصراف</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Form;
