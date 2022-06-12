import React,{useEffect} from "react";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
// import CancelIcon from "@material-ui/icons/Cancel";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Input,
} from "@mui/material";
import Container from "@mui/material/Container";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";

const theme = createMuiTheme({
  direction: "rtl",
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "5px"
  },
}));

const category = [
  {
    value: "electronics",
    label: "electronics",
  },
  {
    value: "jewelery",
    label: "jewelery",
  },
  {
    value: "men clothing",
    label: "men clothing",
  },
  {
    value: "women clothing",
    label: "women clothing",
  },
];

export default function EditModal({ openEdit, setOpenEdit,data,setData, props}) {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");
  
  //   const [open, setOpen] = React.useState(false);
  //   const [close, setClose] = React.useState(false);
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleAddProduct=()=>{
    setOpenEdit(false);
    console.log('add new pro');
  }
// console.log(product);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openEdit}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          dir="rtl"
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openEdit} dir="rtl">
            <Container maxWidth="sm" dir="rtl">
              <div className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={9}>
                    <Typography>ادیت کالا</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {/* <CancelIcon onClick={handleClose} /> */}
                  </Grid>
                  <Grid container spacing={3}>
                  <Grid item xs={12} sm={9} maxWidth="lg">
                    <Input
                      label="تصویر کالا"
                      type="file"
                      accessKey="image"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  </Grid>
                  <Grid item xs={12} maxWidth="lg">
                    <TextField
                      label="نام کالا"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      fullWidth
                      defaultValue={data.title}
                    />
                  </Grid>

                  <Grid item xs={12} maxWidth="lg">
                    <TextField
                      fullWidth
                      id="sort"
                      select
                      label="دسته بندی"
                      value={currency}
                      onChange={handleChange}
                      helperText="Please select your category"
                      variant="outlined"
                      defaultValue={data.category}
                    >
                      
                    </TextField>
                  </Grid>
                  <Grid item xs={12} maxWidth="lg">
                    <TextField
                      id="outlined-multiline-static"
                      label="توضیحات"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      defaultValue={data.description}
                    />
                  </Grid>
                  <Grid
                    container
                    xs={12}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    
                  >
                    <Button variant="contained" color="primary" fullWidth onClick={handleAddProduct}>
                      ذخیره
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
