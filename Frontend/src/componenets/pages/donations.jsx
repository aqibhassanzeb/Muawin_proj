import React, { useRef, useState } from "react";
import "../css/don.css";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { useNavigate } from "react-router";
import {
  uploadImageToCloudinary,
  useAddDonationAmountMutation,
  useGetDonationsQuery,
  useUpdateDonationMutation,
} from "../../api/api";
import CustomModal from "../Modal";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import moment from "moment";

function Donations() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.authReducer.activeUser);

  const { data: donations, isLoading } = useGetDonationsQuery();
  const [addAmount] = useAddDonationAmountMutation();
  const [updateDonation, { isLoading: updateLoading }] =
    useUpdateDonationMutation();

  const [openDonation, setOpenDonation] = useState(false);
  const [amount, setAmount] = useState(0);
  const [file, setFile] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [amountLoading, setAmountLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  async function handleDonation(e) {
    e.preventDefault();
    setAmountLoading(true);
    const imageURL = await uploadImageToCloudinary(file);
    addAmount({
      id: selectedId,
      data: { donationBy: user._id, amount, receiptImage: imageURL },
    })
      .then((res) => {
        if (res.data.message) {
          toast.success("Donation Added");
        }
        setAmountLoading(false);
        setAmount(0);
        setOpenDonation(false);
      })
      .catch((err) => {
        setOpenDonation(false);

        toast.error(err.message);
      });
  }

  function handleUpdateDonation() {
    updateDonation({
      id: selectedId,
      data: { collectedAmount: donationAmount },
    })
      .then((res) => {
        if (res.data.message) {
          toast.success("Donation Collected Amount Update");
        }
        setOpenUpdate(false);
      })
      .catch((err) => {
        setOpenUpdate(false);
        toast.error(err.message);
      });
  }

  return (
    <div className="wrapper">
      <Navbar />
      <div style={{ padding: "0 20px", minHeight: "84vh" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Donations</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item ">Donations</li>
                </ol>
              </div>
            </div>
            <div className="row">
              <button
                onClick={() => navigation("/adddonation")}
                className="btn btn-primary"
                style={{ marginLeft: "auto" }}
              >
                Create
              </button>
            </div>
          </div>
        </section>

        <div>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>City</th>
                <th style={{ textAlign: "center" }}>Collection</th>
                <th>Required Cost</th>
                <th>Donate Now</th>
                <th>Donations</th>
              </tr>
            </thead>
            <tbody>
              {donations &&
                donations.length > 0 &&
                donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>
                      <span>{donation.projectName}</span>
                    </td>
                    <td>
                      <span>{donation.location}</span>
                    </td>
                    <td>
                      <span>{donation.city}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center ">
                        <div style={{ width: "5rem" }}>
                          <span>RS</span>{" "}
                          <span>{donation.collectedAmount}</span>
                        </div>
                        <button
                          className="btn-sm"
                          style={{ backgroundColor: "rgb(19, 132, 150)" }}
                          onClick={() => {
                            setSelectedId(donation._id);
                            setDonationAmount(donation.collectedAmount);
                            setOpenUpdate(true);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <CustomModal open={openUpdate} setOpen={setOpenUpdate}>
                          <h6 className="mb-4">Update Collected Amount</h6>
                          <input
                            className="form-control"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                          />
                          <div className="d-flex mt-3 align-items-center">
                            <button
                              onClick={() => setOpenUpdate(false)}
                              className="btn-secondary mr-2"
                            >
                              Cancel
                            </button>
                            {updateLoading ? (
                              <div style={{ display: "inline" }}>
                                <Loader size={30} />
                              </div>
                            ) : (
                              <button onClick={() => handleUpdateDonation()}>
                                Update
                              </button>
                            )}
                          </div>
                        </CustomModal>
                      </div>
                    </td>
                    <td>
                      <span>RS</span> <span>{donation.requiredCost}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => {
                          setSelectedId(donation._id);
                          setOpenDonation(true);
                        }}
                      >
                        Donate Now
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-sm"
                        style={{ backgroundColor: "rgb(92, 99, 106)" }}
                        onClick={() =>
                          navigation("/donorsdetail", {
                            state: {
                              donors: donation.donors,
                              donationId: donation._id,
                            },
                          })
                        }
                      >
                        View Donors
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal open={openDonation} setOpen={setOpenDonation}>
        <form onSubmit={handleDonation}>
          <section className="">
            <div className="row">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="donationAmount">
                    Donation Amount
                    <span style={{ fontSize: 12 }}> (RS)</span>
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    type="number"
                    id="donationAmount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="receipt">
                    Recipet Photo
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    type="file"
                    id="receipt"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row" id="cap">
              <div className="col-12" style={{ padding: "0px 1.5rem" }}>
                {amountLoading ? (
                  <div className="float-right mt-2">
                    <Loader size={20} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-sm btn-success float-right"
                  >
                    Donate
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpenDonation(false)}
                  className="btn btn-sm btn-secondary float-right mr-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        </form>
      </CustomModal>
      <Footer />
    </div>
  );
}

export default Donations;
