import React, { useEffect, useState } from "react";
import "../DashHome.css";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { Table } from "react-bootstrap";
import axios from "axios";
import AddUser from "../AddUser/AddUser";
import { API } from "../../../Utils/API";

function Users() {
  const [data, setData] = useState([]);
  const [reloader, setReloader] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/admin/operators`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
  }, [reloader]);

  const handleDesable = (e) => {
    axios
      .post(
        `${API}/admin/operator/${e.target.id}`,
        {
          isEnable: false,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setReloader(reloader + 1);
      });
  };
  const handleEnable = (e) => {
    axios
      .post(
        `${API}/admin/operator/${e.target.id}`,
        {
          isEnable: true,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setReloader(reloader + 1);
      });
  };
  return (
    <div className="text-center dashHome">
      <div className="row p-0 m-0">
        <div className="col-12">
          <AddUser isOK={setReloader} reloader={reloader}/>
          <div className="chart">
            <div className="chartTitle w-100">لیست اپراتورها</div>
            <div
              style={{
                height: 400,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                // margin: "2rem auto",
              }}
            >
              {/* <DataGrid
                rows={rows}
                columns={columns}
                hideFooterPagination={true}
                hideFooter={true}
              /> */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ردیف</TableCell>
                      <TableCell align="center">نام اپراتور</TableCell>
                      <TableCell align="center">نام خانوادگی اپراتور</TableCell>
                      <TableCell align="center">وضعیت اپراتور</TableCell>
                      <TableCell align="center">عملیات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, i) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{row.firstName}</TableCell>
                        <TableCell align="center">{row.lastName}</TableCell>
                        <TableCell align="center">
                          {row.isEnable ? (
                            <Box sx={{color:'#fff' , bgcolor:'green' , borderRadius:'10px' , fontSize :'15px'}}>اپراتور فعال است </Box >
                          ) : (
                            <Box sx={{color:'#fff' , bgcolor:'red' , borderRadius:'10px' , fontSize :'15px'}}> اپراتور غیرفعال است</Box>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.isEnable ? (
                            <Button
                              color="error"
                              onClick={handleDesable}
                              id={row.id}
                            >
                              غیر فعال سازی کاربر
                            </Button>
                          ) : (
                            <Button
                              color="success"
                              onClick={handleEnable}
                              id={row.id}
                              key={row.isEnable}
                            >
                              {" "}
                              فعال سازی کاربر
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
