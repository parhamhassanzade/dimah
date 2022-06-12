import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API } from "../../../Utils/API";
import { Grid, MenuItem, Select, TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import { Pagination } from "react-bootstrap";

// const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sessionFee",
    numeric: true,
    disablePadding: false,
    label: "هزینه (تومان)",
  },
  {
    id: "laserKind",
    numeric: true,
    disablePadding: false,
    label: "نوع لیزر",
  },
  {
    id: "bodyParts",
    numeric: true,
    disablePadding: false,
    label: "نواحی بدن",
  },
  {
    id: "sessionNumber",
    numeric: true,
    disablePadding: false,
    label: "شماره جلسه",
  },
  {
    id: "serviceTime",
    numeric: true,
    disablePadding: false,
    label: "ساعت",
  },
  {
    id: "serviceDate",
    numeric: true,
    disablePadding: false,
    label: "تاریخ",
  },
  {
    id: "clientNumber",
    numeric: true,
    disablePadding: false,
    label: "شماره مشتری",
  },
  {
    id: "nationalCode",
    numeric: true,
    disablePadding: false,
    label: "کد ملی",
  },
  {
    id: "Gender",
    numeric: true,
    disablePadding: false,
    label: "جنسیت",
  },
  {
    id: "clientLastName",
    numeric: true,
    disablePadding: false,
    label: "نام مشتری",
  },
  {
    id: "operator",
    numeric: true,
    disablePadding: false,
    label: "اپراتور",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            // align={'center'}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          لیست مشتریان
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [searchSelect, setSearchSelect] = useState("0");
  const [searchBox, setSearchBox] = useState("");
  const [dense] = useState(false);
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const [rows, setRow] = useState([]);
  const [page, setPage] = useState(1);
  const [TotalData, setTotalData] = useState();
  const[DataSkip,setDataSkip]=useState(0)
  let dataLimit = 5;
  let TotalPages = Math.ceil(TotalData / dataLimit);
  console.log(TotalPages);
  const [pages, setPages] = useState();
  const match = {};
  const handleSubmit = () => {
    match[searchSelect] = searchBox;
    axios
      .post(
        `${API}/admin/forms`,
        { match },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setRow(res.data);
      });
  };
  const handleSubmitDate = () => {
    match[searchSelect] = selectedDate;
    axios
      .post(
        `${API}/admin/forms`,
        { match },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setRow(res.data);
      });
  };

  useEffect(() => {
    axios
      .post(
        `${API}/admin/forms?skip=${DataSkip}&limit=5`,
        {},
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setRow(res.data[0].forms);
        setTotalData(res.data[0].total);
        setPages(Math.ceil(res.data[0].total / dataLimit));
      });
  }, [page]);
  useEffect(() => {});
  const searchChange = (e) => {
    setSearchSelect(e.target.value);
  };

  let active = page;
  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          setPage(number);
          setDataSkip((number-1)*dataLimit)
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  console.log(items);
  // Avoid a layout jump when reaching the last page with empty rows.
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Grid container xs={12} spacing={1} sx={{ pl: 1 }}>
          <Grid item xs={2}>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchSelect}
              sx={{ width: "100%" }}
              label="نوع سرچ"
              onChange={searchChange}
            >
              <MenuItem value={0}>انتخاب کنید</MenuItem>
              <MenuItem value={"operator"}>اپراتور</MenuItem>
              <MenuItem value={"clientFirstName"}>نام مشتری</MenuItem>
              <MenuItem value={"clientLastName"}>نام خانوادگی مشتری</MenuItem>
              <MenuItem value={"Gender"}>جنسیت</MenuItem>
              <MenuItem value={"nationalCode"}>کد ملی</MenuItem>
              <MenuItem value={"clientNumber"}>شماره مشتری</MenuItem>
              <MenuItem value={"serviceDate"}>تاریخ</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={8}>
            {searchSelect !== "serviceDate" ? (
              <TextField
                disabled={
                  searchSelect !== 0 && searchSelect !== "0" ? false : true
                }
                label={` جستجو ${
                  searchSelect === 0
                    ? "..."
                    : searchSelect === "operator"
                    ? "در اپراتورها"
                    : searchSelect === "clientFirstName" &&
                      searchSelect === "clientLastName"
                    ? "نام مشتریان"
                    : searchSelect === "Gender"
                    ? "جنسیت"
                    : searchSelect === "nationalCode"
                    ? "کد ملی"
                    : searchSelect === "clientNumber"
                    ? "شماره مشتری"
                    : "..."
                }`}
                variant="outlined"
                fullWidth
                size="small"
                value={searchBox}
                onChange={(value) => setSearchBox(value.target.value)}
              />
            ) : (
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
                    <TextField
                      fullWidth
                      size="small"
                      {...params}
                      sx={{ direction: "rtl" }}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          </Grid>
          <Grid item xs={2}>
            {searchSelect !== "serviceDate" ? (
              <Button
                fullWidth
                color="info"
                variant="contained"
                disabled={searchBox === "" ? true : false}
                onClick={handleSubmit}
              >
                جستجو
              </Button>
            ) : (
              <Button
                fullWidth
                color="info"
                variant="contained"
                onClick={handleSubmitDate}
              >
                جستجو
              </Button>
            )}
          </Grid>
        </Grid>
        <TableContainer sx={{ direction: "rtl" }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.name);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell align="center">{row.sessionFee}</TableCell>
                      <TableCell align="center">
                        {row.laserKind === "javansazi"
                          ? "جوانسازی"
                          : row.laserKind === "moo-zaed"
                          ? "موهای زائد"
                          : row.laserKind === "tatoo"
                          ? "رفع تتو"
                          : row.laserKind === "female"
                          ? "زنان"
                          : null}
                      </TableCell>
                      <TableCell align="center">
                        {/* {row.bodyParts.map((body) => (
                          <Box>{body}</Box>
                        ))}{" "} */}
                      </TableCell>
                      <TableCell align="center">{row.sessionNumber}</TableCell>
                      <TableCell align="center">
                        {new Date(row.serviceTime).toLocaleTimeString("fa-IR")}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(row.serviceDate).toLocaleDateString("fa-IR")}
                      </TableCell>
                      <TableCell align="center">{row.clientNumber}</TableCell>
                      <TableCell align="center">{row.nationalCode}</TableCell>
                      <TableCell align="center">
                        {row.Gender === "female" ? "زن" : "مرد"}
                      </TableCell>
                      <TableCell align="center">
                        {row.clientFirstName} {row.clientLastName}
                      </TableCell>
                      <TableCell align="center">{row.operator}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination>{items}</Pagination>
      </Box>
    </Box>
  );
}
