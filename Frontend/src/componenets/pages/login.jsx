import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/style.css";
import { validateLoginForm } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setToken,
  setRemember,
} from "../../redux/reducers/auth";
import { toast } from "sonner";
import { useLoginMutation, useTraceLogMutation } from "../../api/api";
import { MDBSpinner } from "mdb-react-ui-kit";
import axios from "axios";

const Login = () => {
  const isRemember = useSelector((state) => state.authReducer.isRemember);
  console.log({ isRemember });
  const [checkBox, setCheckBox] = useState(false);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [login, response] = useLoginMutation();
  const [traceLog] = useTraceLogMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const checkBoxChange = (e) => {
    setCheckBox(e.target.checked);
    dispatch(setRemember(e.target.checked));
  };

  function handleSignIn(e) {
    e.preventDefault();
    const newErrors = validateLoginForm(formValue);

    const submitForm = () => {
      login({
        email: formValue.email,
        password: formValue.password,
      }).then((res) => {
        if (res.error) {
          toast.error(res?.error?.data?.error);
        } else if (res.data && res.data.message) {
          if (!res.data.user.is_active) {
            toast.error("Your account has been disabled");
          } else {
            if (checkBox) {
              localStorage.setItem(
                "activeUser",
                JSON.stringify(res?.data?.user)
              );
              localStorage.setItem("token", JSON.stringify(res?.data?.token));
            } else {
              sessionStorage.setItem(
                "activeUser",
                JSON.stringify(res?.data?.user)
              );
              sessionStorage.setItem("token", res?.data?.token);
            }
            dispatch(setActiveUser(res?.data?.user));
            dispatch(setToken(res?.data?.token));
            navigate("/dashboard");
            axios
              .get("https://api.ipify.org?format=json")
              .then((response) =>
                traceLog({ id: res.data.user._id, ip: response.data.ip })
              );
          }
        }
      });
    };

    setTimeout(() => {
      if (Object.values(newErrors).every((error) => !error)) {
        submitForm();
      } else {
        if (newErrors.email) {
          toast.error(newErrors.email);
        } else if (newErrors.password) {
          toast.error(newErrors.password);
        }
      }
    }, 0);
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="login-logo">
            <Link to="/" className="h1">
              <img
                src="dist\img\Muawin-Logo.png"
                alt="Logo"
                className="logo-image"
              />
            </Link>
          </div>
          <div className="c-body">
            <div className="card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <form action="/" method="post">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={onChange}
                    name="email"
                    id="email"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={formValue.password}
                    onChange={onChange}
                    name="password"
                    id="password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="remember"
                        value={checkBox}
                        onChange={checkBoxChange}
                      />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">{/* Remember Me checkbox */}</div>
                  <div className="col-4">
                    {response.isLoading ? (
                      <MDBSpinner
                        color="primary"
                        style={{ marginLeft: 10, marginTop: 3 }}
                      />
                    ) : (
                      <button
                        onClick={handleSignIn}
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </form>
              <p className="mb-1">
                <Link to="/forgot">Forgot password?</Link>
              </p>
              {/* <p className="mb-0">
                <Link to="/register" className="text-center">
                  Register a new member
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
