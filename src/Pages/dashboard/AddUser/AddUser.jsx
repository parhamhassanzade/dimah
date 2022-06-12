import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./AddUser.css";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../../../Utils/API";

const AddUser = ({ isOK, reloader }) => {

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      nationalcode: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post(
          `${API}/admin/operator`,
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
          isOK(reloader + 1);
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
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-3 " dir="rtl">
        <div className="col-12">
          <div className="chart d-flex justify-content-center align-items-center flex-wrap chart-input">
            <div className="chartTitle w-100">افزودن اپراتور جدید</div>

            <div className="form-floating mb-3 formInputs formLable">
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                className="form-control"
                placeholder="نام"
                required
              />
              <label for="firstName" className="formLable">
                نام*
              </label>
            </div>
            <div className="form-floating mb-3 formInputs">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="نام خانوادگی"
                required
              />
              <label for="lastName" className="formLable">
                نام خانوادگی*
              </label>
            </div>
            <div className="form-floating mb-3 formInputs">
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                placeholder="شماره موبایل"
                required
              />
              <label for="phoneNumber" className="formLable">
                شماره موبایل*
              </label>
            </div>
            <div className="form-floating mb-3 formInputs">
              <input
                type="text"
                className="form-control"
                id="nationalcode"
                name="nationalcode"
                onChange={formik.handleChange}
                value={formik.values.nationalcode}
                placeholder="کد ملی"
                required
              />
              <label for="nationalcode" className="formLable">
                کد ملی*
              </label>
            </div>
            <div className="form-floating mb-3 formInputs">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="کد ملی"
                required
              />
              <label for="username" className="formLable">
                نام کاربری*
              </label>
            </div>
            <div className="form-floating mb-3 formInputs">
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="کد ملی"
                required
              />
              <label for="password" className="formLable">
                رمز عبور*
              </label>
            </div>
            <button type="submit" className="btn btn-secondary formButtons">
              ثبت
            </button>

            <ToastContainer />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddUser;
