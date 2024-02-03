import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useDispatch } from "react-redux";
import useDidMountEffect from "./sharedComponent/useDidMountEffect";
import { setUserDetails } from "../slices/userDetails";
import Loader from "./sharedComponent/Loader";

const Users = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicFile, setProfilePicFile] = useState("");
  const [isDetailsApiCalled, setIsDetailsApiCalled] = useState(false);
  // const [previousDetails, setPreviousDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const login_token = cookies.get("login-token");
    setIsDetailsApiCalled(true);

    setIsLoading(true);
    try {
      const result = await axios.get(
        "http://110.227.208.185/api/practical_2/user",
        {
          headers: { Authorization: `Bearer ${login_token}` },
        }
      );
      if (result?.status === 200) {
        const {
          data: { data },
        } = result || {};
        const { city, email, first_name, last_name, phone, profile_image } =
          data || {};
        dispatch(setUserDetails({ email, first_name, last_name }));
        // setPreviousDetails(data);
        setEmail(email);
        setCity(city);
        setFirstName(first_name);
        setLastName(last_name);
        setPhoneNumber(phone);
        setProfilePic(profilePic);
        setProfilePicFile(profile_image);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUserDetails = async () => {
    const login_token = cookies.get("login-token");

    const profileData = {
      first_name: firstName,
      last_name: lastName,
      city,
      phone: phoneNumber,
      email,
      profile_image: profilePicFile,
      password,
    };

    try {
      const result = await axios.post(
        "http://110.227.208.185/api/practical_2/user",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${login_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result?.status === 200) {
        console.log(result, "result");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useDidMountEffect(() => {
    if (!isDetailsApiCalled) {
      fetchUserDetails();
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="profile-box">
        <h3>Profiles Details</h3>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label>last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3">
            <label>Profile Picture</label>
            <input
              type="file"
              className="form-control"
              placeholder="Select Profile Picture"
              onChange={(e) => {
                setProfilePic(e.target.value);
                setProfilePicFile(e.target.files[0]);
              }}
              value={profilePic}
            />
          </div>
        </div>
        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => handleUpdateUserDetails()}
          >
            Update Profiles
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;
