import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Loader from "./sharedComponent/Loader";
import useDidMountEffect from "./sharedComponent/useDidMountEffect";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const login_token = cookies.get("login-token");
  const navigate = useNavigate();

  const handleDeleteCategory = async (id) => {
    try {
      const result = await axios.delete(
        `http://110.227.208.185/api/practical_2/category/${id}`,
        {
          headers: { Authorization: `Bearer ${login_token}` },
        }
      );
      if (result.status === 200) {
        fetchCategoryList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryList = async () => {
    try {
      const result = await axios.get(
        "http://110.227.208.185/api/practical_2/category",
        {
          headers: { Authorization: `Bearer ${login_token}` },
        }
      );
      const {
        data: {
          data: { data },
        },
      } = result || {};
      setCategoryList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useDidMountEffect(() => {
    fetchCategoryList();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="d-flex justify-content-center mt-5">Categories List</h1>
      <div className="d-flex justify-content-center mt-5">
        <Button
          onClick={() => {
            navigate(`/category/create`);
          }}
        >
          Create New Category
        </Button>
      </div>
      <div className="table-data">
        <table>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Created At</th>
            <th></th>
            <th></th>
          </tr>
          {categoryList.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{`${val.user_detail.first_name} ${val.user_detail.last_name}`}</td>
                <td>{val.created_at}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeleteCategory(val?.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      navigate(`/category/edit?id=${val?.id}`);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Categories;
