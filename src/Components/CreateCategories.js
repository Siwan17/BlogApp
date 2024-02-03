import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Loader from "./sharedComponent/Loader";
import useDidMountEffect from "./sharedComponent/useDidMountEffect";

const CreateCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const login_token = cookies.get("login-token");

  const isParamInURL = (param) => {
    const URLpath = window.location.pathname.split("/");
    return URLpath.indexOf(param);
  };

  const fetchCategoryDetails = async () => {
    const searchParams = new URLSearchParams(document.location.search);
    setIsLoading(true);
    if (!searchParams) {
      navigate("/blogs/categories");
    }
    try {
      const result = await axios.get(
        `http://110.227.208.185/api/practical_2/category/${searchParams.get(
          "id"
        )}`,
        {
          headers: { Authorization: `Bearer ${login_token}` },
        }
      );
      if (result.status === 200) {
        const {
          data: { data },
        } = result || {};
        setCategoryName(data?.name);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDetails = async () => {
    const categoryData = { name: categoryName };
    try {
      const result = await axios.post(
        "http://110.227.208.185/api/practical_2/category",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${login_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result?.status === 200) {
        console.log(result, "result");
        navigate("/blogs/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCategory = async () => {
    const categoryData = {
      name: categoryName,
    };
    try {
      const result = await axios.post(
        "http://110.227.208.185/api/practical_2/category",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${login_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status === 200) {
        navigate("/blogs/categories");
      }
    } catch (error) {}
  };

  useDidMountEffect(() => {
    if (isParamInURL("edit") !== -1) {
      setIsEdit(true);
      fetchCategoryDetails();
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="category-input">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Group>
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            if (isEdit) {
              handleUpdateDetails();
            } else {
              handleCreateCategory();
            }
          }}
        >
          {isEdit ? "Update Category" : "Create Category"}
        </button>
      </Form>
    </div>
  );
};

export default CreateCategories;
