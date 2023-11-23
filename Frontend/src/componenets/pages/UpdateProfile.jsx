import React, { useEffect, useState } from "react";
import "../css/style.css";
import Navbar from "../common/navbar";
import Countries from "../../constants/Countries.json";
import States from "../../constants/States.json";
import Footer from "../common/footer";
import { Link } from "react-router-dom";
import { baseURL, useUpdateMemberMutation } from "../../api/api";
import Loader from "../Loader";
import { toast } from "sonner";
import { deepEqual } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { setActiveUser } from "../../redux/reducers/auth";

const UpdateMember = () => {
  const [update, updateResp] = useUpdateMemberMutation();
  const activeUser = useSelector((state) => state.authReducer.activeUser);

  const dispatch = useDispatch();

  const initialValues = {
    firstName: activeUser?.firstName,
    lastName: activeUser?.lastName,
    address: activeUser?.address,
    blood: activeUser?.blood,
    city: activeUser?.city,
    dob: activeUser?.dob?.split("T")[0],
    email: activeUser?.email,
    gender: activeUser?.gender,
    height: activeUser?.height,
    maritalStatus: activeUser?.maritalStatus,
    medicalCondition: activeUser?.medicalCondition,
    nationality: activeUser?.nationality,
    phone: activeUser?.phone,
    province: activeUser?.province,
    religion: activeUser?.religion,
    weight: activeUser?.weight,
    zip: activeUser?.zip,
    emergencyContact: activeUser?.emergencyContact,
    fatherName: activeUser?.fatherName,
    motherName: activeUser?.motherName,
    spouseName: activeUser?.spouseName,
    dependents: activeUser?.dependents,
    siblings: activeUser?.siblings,
    familyContact: activeUser?.familyContact,
    educationLevel: activeUser?.educationLevel,
    institute: activeUser?.institute,
    major: activeUser?.major,
    graduationYear: activeUser?.graduationYear,
    certificates: activeUser?.certificates,
    gpa: activeUser?.gpa,
    awards: activeUser?.awards,
    jobTitle: activeUser?.jobTitle,
    industry: activeUser?.industry,
    responsibilities: activeUser?.responsibilities,
    skills: activeUser?.skills,
    references: activeUser?.references,
    company: activeUser?.company,
    licenses: activeUser?.licenses,
    positions: activeUser?.positions,
    workHistory: activeUser?.workHistory,
    workExperience: activeUser?.workExperience,
    interests: activeUser?.interests,
    languages: activeUser?.languages,
    socialMediaProfiles: activeUser?.socialMediaProfiles,
    volunteerWork: activeUser?.volunteerWork,
    militaryServices: activeUser?.militaryServices,
  };

  const [data, setData] = useState(initialValues);
  const [cities, setCities] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    function getCities() {
      fetch(`${baseURL}/cities/${data.nationality}/${data.province}`)
        .then((response) => response.json())
        .then((result) => setCities(result))
        .catch((error) => console.log("error", error));
    }
    getCities();
  }, [data.province]);

  useEffect(() => {
    const dataHasChanged = !deepEqual(data, initialValues);
    setHasChanged(dataHasChanged);
  }, [data, initialValues]);

  function handleUpdate() {
    update({ id: activeUser._id, data }).then((res) => {
      if (res?.data?.message) {
        dispatch(setActiveUser(res.data.user));
        toast.success("Profile Updated Successfully!");
      }
    });
  }
  return (
    <div className="wrapper">
      <div style={{ padding: "0 5px" }}>
        <section className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Personal Info</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      id="firstName"
                      className="form-control"
                      value={data?.firstName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      id="lastName"
                      className="form-control"
                      value={data?.lastName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date Of Birth :</label>
                    <input
                      name="dob"
                      type="date"
                      id="dob"
                      className="form-control"
                      value={data?.dob}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.gender}
                      onChange={onChange}
                    >
                      <option value="" selected defaultValue disabled>
                        {" "}
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Contact</label>
                    <input
                      name="phone"
                      type="text"
                      id="phone"
                      className="form-control"
                      value={data?.phone}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="text"
                      id="email"
                      className="form-control"
                      value={data?.email}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nationality</label>
                    <select
                      name="nationality"
                      id="nationality"
                      value={data.nationality}
                      name="nationality"
                      className="form-control"
                      style={{ width: "100%" }}
                      onChange={onChange}
                    >
                      <option selected="selected" disabled>
                        {" "}
                      </option>
                      {Countries.map((country) => (
                        <option>{country.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Province / activeUser </label>
                    <select
                      value={data.province}
                      name="province"
                      id="province"
                      className="form-control"
                      style={{ width: "100%" }}
                      onChange={onChange}
                    >
                      <option selected disabled value={null}></option>
                      {States.map((activeUser) => {
                        if (activeUser.country_name === data.nationality) {
                          return <option>{activeUser.name}</option>;
                        }
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <select
                      name="city"
                      id="city"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.city}
                      onChange={onChange}
                    >
                      <option value="" selected defaultValue disabled>
                        {" "}
                      </option>
                      {cities.map((city) => (
                        <option>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">ZIP</label>
                    <input
                      name="zip"
                      type="text"
                      id="zip"
                      className="form-control"
                      value={data?.zip}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      name="address"
                      type="text"
                      id="address"
                      className="form-control"
                      value={data?.address}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select
                      name="blood"
                      id="blood"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.blood}
                      onChange={onChange}
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="religion">Religion</label>
                    <input
                      name="religion"
                      type="text"
                      id="religion"
                      className="form-control"
                      value={data?.religion}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      name="weight"
                      type="text"
                      id="weight"
                      className="form-control"
                      value={data?.weight}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="height">Height (cm)</label>
                    <input
                      name="height"
                      type="text"
                      id="height"
                      className="form-control"
                      value={data?.height}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Marital Status</label>
                    <select
                      name="maritalStatus"
                      id="maritalStatus"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.maritalStatus}
                      onChange={onChange}
                    >
                      <option value="" selected defaultValue disabled>
                        {" "}
                      </option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="medicalCondition">Medical Condition</label>
                    <input
                      name="medicalCondition"
                      type="text"
                      id="medicalCondition"
                      className="form-control"
                      value={data?.medicalCondition}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emergencyContact">Emergency Contact</label>
                    <input
                      name="emergencyContact"
                      type="text"
                      id="emergencyContact"
                      className="form-control"
                      value={data?.emergencyContact}
                      onChange={onChange}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Family Info</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Father's Full Name</label>
                    <input
                      name="fatherName"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.fatherName}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mother's Full Name</label>
                    <input
                      name="motherName"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.motherName}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Spouse's Full Name{" "}
                      <span style={{ fontWeight: 400, fontSize: 13 }}>
                        (if applicable){" "}
                      </span>
                    </label>
                    <input
                      name="spouseName"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.spouseName}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Siblings' Names and Ages</label>
                    <textarea
                      name="siblings"
                      className="form-control"
                      style={{ width: "100%" }}
                      rows="4"
                      value={data?.siblings}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Number of Dependents </label>
                    <input
                      name="dependents"
                      type="number"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.dependents}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Family Contact Information </label>
                    <input
                      name="familyContact"
                      type="tel"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.familyContact}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Professional Info</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="jobTitle">Current Job Title</label>
                    <input
                      name="jobTitle"
                      type="text"
                      id="jobTitle"
                      className="form-control"
                      value={data?.jobTitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">
                      Company / Organization Name :
                    </label>
                    <input
                      name="company"
                      type="text"
                      id="company"
                      className="form-control"
                      value={data?.company}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <input
                      name="industry"
                      type="text"
                      id="industry"
                      className="form-control"
                      value={data?.industry}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="responsibilities">
                      Job Responsibilities
                    </label>
                    <textarea
                      name="responsibilities"
                      type="text"
                      id="responsibilities"
                      className="form-control"
                      value={data?.responsibilities}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="skills">Professional Skills</label>
                    <textarea
                      name="skills"
                      type="text"
                      id="skills"
                      className="form-control"
                      value={data?.skills}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="references">Work-related References</label>
                    <textarea
                      name="references"
                      type="text"
                      id="references"
                      className="form-control"
                      value={data?.references}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="licenses">Certifications or Licenses</label>
                    <textarea
                      name="licenses"
                      type="text"
                      id="licenses"
                      className="form-control"
                      value={data?.licenses}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="positions">
                      Previous Employers and Positions :
                    </label>
                    <textarea
                      name="positions"
                      type="text"
                      id="positions"
                      className="form-control"
                      value={data?.positions}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="workHistory">Work History</label>
                    <textarea
                      name="workHistory"
                      type="text"
                      id="workHistory"
                      className="form-control"
                      value={data?.workHistory}
                      onChange={onChange}
                      rows={2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="workExperience">Work Experience</label>
                    <input
                      name="workExperience"
                      type="number"
                      id="workExperience"
                      className="form-control"
                      value={data?.workExperience}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Educational Info</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body pt-1 px-4">
                  <div className="form-group">
                    <label>Education Level</label>
                    <select
                      name="educationLevel"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.educationLevel}
                      onChange={onChange}
                    >
                      <option value="" selected defaultValue disabled>
                        {" "}
                      </option>
                      <option value="ssc">SSC</option>
                      <option value="hssc">HSSC</option>
                      <option value="graduation">Graduation</option>
                      <option value="post-graduation">Post Graduation</option>
                      <option value="doctorate">Doctorate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Major / Field Of Study </label>
                    <input
                      name="major"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.major}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>GPA or Academic Achievements</label>
                    <textarea
                      name="gpa"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      rows="2"
                      value={data.gpa}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Academic Honors/Awards</label>
                    <textarea
                      name="awards"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.awards}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Name of School / College / University </label>
                    <input
                      name="institute"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.institute}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Graduation Year</label>
                    <input
                      name="graduationYear"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.graduationYear}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Certifications or Degrees Earned </label>
                    <textarea
                      name="certificates"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data.certificates}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Other Info</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body pt-1 px-4">
                  <div className="form-group">
                    <label>Interests/Hobbies</label>
                    <textarea
                      name="interests"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      rows="2"
                      value={data?.interests}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Social Media Profiles
                      <span style={{ color: "red" }}> *</span>
                    </label>
                    <textarea
                      name="socialMediaProfiles"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.socialMediaProfiles}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Military Service{" "}
                      <span style={{ fontSize: 10, fontWeight: 400 }}>
                        (if applicable)
                      </span>
                    </label>
                    <textarea
                      name="militaryServices"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.militaryServices}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Languages Spoken</label>
                    <textarea
                      name="languages"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.languages}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Volunteer Work</label>
                    <textarea
                      name="volunteerWork"
                      type="text"
                      className="form-control"
                      style={{ width: "100%" }}
                      value={data?.volunteerWork}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row mt-2 mb-2 " id="cap">
            <div className="col-12 d-flex justify-content-center align-items-center">
              {updateResp.isLoading ? (
                <div style={{ marginRight: 15 }}>
                  <Loader size={30} />
                </div>
              ) : (
                <button
                  disabled={!hasChanged}
                  onClick={handleUpdate}
                  type="button"
                  className="btn btn-success "
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default UpdateMember;
