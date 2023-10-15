import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Countries from "../constants/Countries.json";
import States from "../constants/States.json";
import FormHeader from "./FormHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { baseURL, useRegisterMutation } from "../api/api";
import "./css/style.css";
import { toast } from "sonner";
import {
  educationInfoValidation,
  familyInfoValidation,
  personalInfoValidation,
  professionalInfoValidation,
  otherInfoValidation,
} from "../utils/validations";

const MemberForm = () => {
  const [register, response] = useRegisterMutation();

  const {
    register: pregister,
    handleSubmit: phandleSubmit,
    setValue: psetValue,
    formState: { errors: perrors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(personalInfoValidation),
  });

  const {
    register: fregister,
    handleSubmit: fhandleSubmit,
    formState: { errors: ferrors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(familyInfoValidation),
  });

  const {
    register: eregister,
    handleSubmit: ehandleSubmit,
    formState: { errors: eerrors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(educationInfoValidation),
  });

  const {
    register: prregister,
    handleSubmit: prhandleSubmit,
    formState: { errors: prerrors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(professionalInfoValidation),
  });

  const {
    register: oregister,
    handleSubmit: ohandleSubmit,
    formState: { errors: oerrors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(otherInfoValidation),
  });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);

  function onCountryChange(e) {
    setCountry(e.target.value);
    psetValue("nationality", e.target.value);
  }

  function onProvinceChange(e) {
    psetValue("province", e.target.value);
    fetch(`${baseURL}/cities/${country}/${e.target.value}`)
      .then((response) => response.json())
      .then((result) => setCities(result))
      .catch((error) => console.log("error", error));
  }

  function onPersonalSubmit(data) {
    setFormData({ ...formData, ...data });
    setStep(2);
  }

  function onFamilySubmit(data) {
    setFormData({ ...formData, ...data });
    setStep(3);
  }

  function onEducationSubmit(data) {
    console.log(data);
    setFormData({ ...formData, ...data });
    setStep(4);
  }

  function onProfessionalSubmit(data) {
    setFormData({ ...formData, ...data });
    setStep(5);
  }

  function onOtherSubmit(data) {
    register({ ...formData, ...data, role: "member" })
      .then((res) => {
        console.log(res);
        if (res?.data?.message) {
          toast.success(res?.data?.message);
        } else if (res?.error?.data?.error) {
          toast.error(res?.error?.data?.error);
        }
      })
      .catch((err) => toast.error(err.message));
  }

  console.log(eerrors);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Register New Member</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            {/*/.card-header */}
            <div className="card-body">
              {step === 1 && (
                <div className="px-3">
                  <FormHeader text="Personal Information" />
                  <form onSubmit={phandleSubmit(onPersonalSubmit)}>
                    <div className="row">
                      <div className="col-md-6">
                        {/* /.form-group */}
                        <div className="form-group">
                          <label>
                            First Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("firstName")}
                          />
                          {perrors.firstName && (
                            <p className="validation-error">
                              {perrors.firstName?.message}
                            </p>
                          )}
                        </div>

                        <div
                          // className="form-group"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: perrors?.dob ? "0rem" : "1rem",
                          }}
                        >
                          <label>
                            Date Of Birth{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <Datetime
                            timeFormat={false}
                            onChange={(data) => psetValue("dob", data._d)}
                          />
                          {perrors.dob && (
                            <p className="validation-error">
                              {perrors.dob?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Address <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="textarea"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("address")}
                          />
                          {perrors.address && (
                            <p className="validation-error">
                              {perrors.address?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Province / State{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="province"
                            className="form-control"
                            style={{ width: "100%" }}
                            onChange={onProvinceChange}
                          >
                            <option selected disabled value={null}>
                              {" "}
                            </option>
                            {States.map((state) => {
                              if (state.country_name === country) {
                                return <option>{state.name}</option>;
                              }
                            })}
                          </select>
                          {perrors.province && (
                            <p className="validation-error">
                              {perrors.province?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Postal / ZIP Code</label>
                          <input
                            type="tel"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("zip")}
                          />
                          {perrors.zip && (
                            <p className="validation-error">
                              {perrors.zip?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Phone Number <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("phone")}
                          />
                          {perrors.phone && (
                            <p className="validation-error">
                              {perrors.phone?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Email <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("email")}
                          />
                          {perrors.email && (
                            <p className="validation-error">
                              {perrors.email?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Height{" "}
                            <span style={{ fontSize: 12, fontWeight: 400 }}>
                              (cm){" "}
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("height")}
                          />
                          {perrors.height && (
                            <p className="validation-error">
                              {perrors.height?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Blood Group <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="blood"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("blood")}
                          >
                            <option value="" selected defaultValue disabled>
                              {" "}
                            </option>
                            <option value="a+">A+</option>
                            <option value="a-">A-</option>
                            <option value="b+">B+</option>
                            <option value="b-">B-</option>
                            <option value="ab+">AB+</option>
                            <option value="ab-">AB-</option>
                            <option value="o+">O+</option>
                            <option value="o-">O-</option>
                          </select>
                          {perrors.blood && (
                            <p className="validation-error">
                              {perrors.blood?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* /.col */}
                      <div className="col-md-6">
                        {/* /.form-group */}
                        <div className="form-group">
                          <label>
                            Last Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("lastName")}
                          />
                          {perrors.lastName && (
                            <p className="validation-error">
                              {perrors.lastName?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Gender <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="country"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("gender")}
                          >
                            <option value="" selected defaultValue disabled>
                              {" "}
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {perrors.gender && (
                            <p className="validation-error">
                              {perrors.gender?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Nationality <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="country"
                            className="form-control"
                            style={{ width: "100%" }}
                            onChange={onCountryChange}
                          >
                            <option selected="selected" disabled>
                              {" "}
                            </option>
                            {Countries.map((country) => (
                              <option>{country.name}</option>
                            ))}
                          </select>
                          {perrors.nationality && (
                            <p className="validation-error">
                              {perrors.nationality?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            City <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="city"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("city")}
                          >
                            <option value="" selected defaultValue disabled>
                              {" "}
                            </option>
                            {cities.map((city) => (
                              <option>{city.name}</option>
                            ))}
                          </select>
                          {perrors.city && (
                            <p className="validation-error">
                              {perrors.city?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Religion <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("religion")}
                          />
                          {perrors.religion && (
                            <p className="validation-error">
                              {perrors.religion?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Marital Status{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="marital"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("maritalStatus")}
                          >
                            <option value="" selected defaultValue disabled>
                              {" "}
                            </option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                          </select>
                          {perrors.maritalStatus && (
                            <p className="validation-error">
                              {perrors.maritalStatus?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Emergency Contact Info{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("emergencyContact")}
                          />
                          {perrors.emergencyContact && (
                            <p className="validation-error">
                              {perrors.emergencyContact?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Weight{" "}
                            <span style={{ fontSize: 12, fontWeight: 400 }}>
                              (kg){" "}
                            </span>{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("weight")}
                          />
                          {perrors.weight && (
                            <p className="validation-error">
                              {perrors.weight?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Any Medical Conditions or Allergies{" "}
                            <span style={{ fontWeight: 400, fontSize: 12 }}>
                              (optional)
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...pregister("medicalCondition")}
                          />
                          {perrors.medicalCondition && (
                            <p className="validation-error">
                              {perrors.medicalCondition?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div
                      className="d-flex gap-5 justify-content-center align-items-center"
                      style={{ gap: 10 }}
                    >
                      <button className="btn  btn-outline-secondary disabled">
                        Previous
                      </button>
                      <div style={{ fontSize: 16 }}>
                        <span>{step}</span>
                        <span>/</span>
                        <span>{5}</span>
                      </div>
                      <button
                        type="submit"
                        className="btn  btn-outline-primary"
                        // onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="px-3">
                  <FormHeader text="Family Information" />
                  <form onSubmit={fhandleSubmit(onFamilySubmit)}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Father's Full Name{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...fregister("fatherName")}
                          />
                          {ferrors.fatherName && (
                            <p className="validation-error">
                              {ferrors.fatherName?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Spouse's Full Name{" "}
                            <span style={{ fontWeight: 400, fontSize: 13 }}>
                              (if applicable){" "}
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...fregister("spouseName")}
                          />
                          {ferrors.spouseName && (
                            <p className="validation-error">
                              {ferrors.spouseName?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Siblings' Names and Ages</label>
                          <textarea
                            type="tel"
                            className="form-control"
                            style={{ width: "100%" }}
                            rows="4"
                            placeholder="Eg: Brother Ali 20"
                            {...fregister("siblings")}
                          />
                          {ferrors.siblings && (
                            <p className="validation-error">
                              {ferrors.siblings?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* /.col */}
                      <div className="col-md-6">
                        {/* /.form-group */}
                        <div className="form-group">
                          <label>
                            Mother's Full Name{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...fregister("motherName")}
                          />
                          {ferrors.motherName && (
                            <p className="validation-error">
                              {ferrors.motherName?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Number of Dependents{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...fregister("dependents")}
                          />
                          {ferrors.dependents && (
                            <p className="validation-error">
                              {ferrors.dependents?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Family Contact Information{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...fregister("familyContact")}
                          />
                          {ferrors.familyContact && (
                            <p className="validation-error">
                              {ferrors.familyContact?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div
                      className="d-flex gap-5 justify-content-center align-items-center"
                      style={{ gap: 10 }}
                    >
                      <button
                        className="btn  btn-outline-secondary "
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        Previous
                      </button>
                      <div style={{ fontSize: 16 }}>
                        <span>{step}</span>
                        <span>/</span>
                        <span>{5}</span>
                      </div>
                      <button
                        type="submit"
                        className="btn  btn-outline-primary"
                        // onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="px-3">
                  <FormHeader text="Educationl Information" />
                  <form onSubmit={ehandleSubmit(onEducationSubmit)}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Education Level{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="educationLevel"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...eregister("educationLevel")}
                          >
                            <option value="" selected defaultValue disabled>
                              {" "}
                            </option>
                            <option value="ssc">SSC</option>
                            <option value="hssc">HSSC</option>
                            <option value="graduation">Graduation</option>
                            <option value="post-graduation">
                              Post Graduation
                            </option>
                            <option value="doctorate">Doctorate</option>
                          </select>
                          {eerrors.educationLevel && (
                            <p className="validation-error">
                              {eerrors.educationLevel?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Major / Field Of Study{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...eregister("major")}
                          />
                          {eerrors.major && (
                            <p className="validation-error">
                              {eerrors.major?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>GPA or Academic Achievements</label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            rows="2"
                            {...eregister("gpa")}
                          />
                          {eerrors.gpa && (
                            <p className="validation-error">
                              {eerrors.gpa?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Academic Honors/Awards</label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...eregister("awards")}
                          />
                          {eerrors.awards && (
                            <p className="validation-error">
                              {eerrors.awards?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* /.col */}
                      <div className="col-md-6">
                        {/* /.form-group */}
                        <div className="form-group">
                          <label>
                            Name of School / College / University{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...eregister("institue")}
                          />
                          {eerrors.institue && (
                            <p className="validation-error">
                              {eerrors.institue?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Graduation Year</label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...eregister("graduationYear")}
                          />
                          {eerrors.graduationYear && (
                            <p className="validation-error">
                              {eerrors.graduationYear?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Certifications or Degrees Earned </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...eregister("certificates")}
                          />
                          {eerrors.certificates && (
                            <p className="validation-error">
                              {eerrors.certificates?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div
                      className="d-flex gap-5 justify-content-center align-items-center"
                      style={{ gap: 10 }}
                    >
                      <button
                        className="btn  btn-outline-secondary "
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        Previous
                      </button>
                      <div style={{ fontSize: 16 }}>
                        <span>{step}</span>
                        <span>/</span>
                        <span>{5}</span>
                      </div>
                      <button
                        type="submit"
                        className="btn  btn-outline-primary"
                        // onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 4 && (
                <div className="px-3">
                  <FormHeader text="Professional Information" />
                  <form onSubmit={prhandleSubmit(onProfessionalSubmit)}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Current Job Title{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("jobTitle")}
                          />
                          {prerrors.jobTitle && (
                            <p className="validation-error">
                              {prerrors.jobTitle?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Industry <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("industry")}
                          />
                          {prerrors.industry && (
                            <p className="validation-error">
                              {prerrors.industry?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Job Responsibilities{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            rows="2"
                            {...prregister("responsibilites")}
                          />
                          {prerrors.responsibilites && (
                            <p className="validation-error">
                              {prerrors.responsibilites?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Professional Skills
                            <span style={{ color: "red" }}> *</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("skills")}
                          />
                          {prerrors.skills && (
                            <p className="validation-error">
                              {prerrors.skills?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Work-related References{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("references")}
                          />
                          {prerrors.references && (
                            <p className="validation-error">
                              {prerrors.references?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* /.col */}
                      <div className="col-md-6">
                        {/* /.form-group */}
                        <div className="form-group">
                          <label>
                            Company / Organization Name{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("company")}
                          />
                          {prerrors.company && (
                            <p className="validation-error">
                              {prerrors.company?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Work Experience
                            <span style={{ color: "red" }}> * </span>
                            <span style={{ fontSize: 14, fontWeight: 400 }}>
                              (Years)
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("workExperience")}
                          />
                          {prerrors.workExperience && (
                            <p className="validation-error">
                              {prerrors.workExperience?.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label>
                            Previous Employers and Positions{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("posititions")}
                          />
                          {prerrors.posititions && (
                            <p className="validation-error">
                              {prerrors.posititions?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Certifications or Licenses{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("licenses")}
                          />
                          {prerrors.licenses && (
                            <p className="validation-error">
                              {prerrors.licenses?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Work History <span style={{ color: "red" }}>*</span>
                            <span style={{ fontSize: 14, fontWeight: 400 }}>
                              (including start and end dates)
                            </span>{" "}
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...prregister("workHistory")}
                            placeholder="Eg: Job Organization 01/01/2023 - 01/03/2023"
                          />
                          {prerrors.workHistory && (
                            <p className="validation-error">
                              {prerrors.workHistory?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div
                      className="d-flex gap-5 justify-content-center align-items-center"
                      style={{ gap: 10 }}
                    >
                      <button
                        className="btn  btn-outline-secondary"
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        Previous
                      </button>
                      <div style={{ fontSize: 16 }}>
                        <span>{step}</span>
                        <span>/</span>
                        <span>{5}</span>
                      </div>
                      <button
                        type="submit"
                        className="btn  btn-outline-primary"
                        // onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 5 && (
                <div className="px-3">
                  <FormHeader text="Other Information" />
                  <form onSubmit={ohandleSubmit(onOtherSubmit)}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Interests/Hobbies{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            rows="2"
                            {...oregister("interests")}
                          />
                          {oerrors.interests && (
                            <p className="validation-error">
                              {oerrors.interests?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Social Media Profiles
                            <span style={{ color: "red" }}> *</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...oregister("socialMediaProfiles")}
                          />
                          {oerrors.socialMediaProfiles && (
                            <p className="validation-error">
                              {oerrors.socialMediaProfiles?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Military Service{" "}
                            <span style={{ fontSize: 10, fontWeight: 400 }}>
                              (if applicable)
                            </span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...oregister("militaryServices")}
                          />
                          {oerrors.militaryServices && (
                            <p className="validation-error">
                              {oerrors.militaryServices?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* /.col */}
                      <div className="col-md-6">
                        {/* /.form-group */}
                        <div className="form-group">
                          <label>
                            Languages Spoken{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...oregister("languages")}
                          />
                          {oerrors.languages && (
                            <p className="validation-error">
                              {oerrors.languages?.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Volunteer Work{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            style={{ width: "100%" }}
                            {...oregister("volunteerWork")}
                          />
                          {oerrors.volunteerWork && (
                            <p className="validation-error">
                              {oerrors.volunteerWork?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div
                      className="d-flex gap-5 justify-content-center align-items-center"
                      style={{ gap: 10 }}
                    >
                      <button
                        className="btn  btn-outline-secondary "
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        Previous
                      </button>
                      <div style={{ fontSize: 16 }}>
                        <span>{step}</span>
                        <span>/</span>
                        <span>{5}</span>
                      </div>
                      <button
                        type="submit"
                        className="btn  btn-outline-primary"
                        // onClick={nextStep}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
    </>
  );
};

export default MemberForm;
