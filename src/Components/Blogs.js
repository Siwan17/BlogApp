import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import cookies from "js-cookie";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Loader from "./sharedComponent/Loader";
import useDidMountEffect from "./sharedComponent/useDidMountEffect";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState([]);
  const [viewType, setViewType] = useState("card");
  const [allBlogs, setAllBlogs] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const state = useSelector((state) => state.userDetails);

  const login_token = cookies.get("login-token");

  const fetchBlogsData = async () => {
    try {
      const result = await axios.get(
        "http://110.227.208.185/api/practical_2/blog?per_page=1000",
        {
          headers: { Authorization: `Bearer ${login_token}` },
        }
      );
      if (result.status === 200) {
        const {
          data: {
            data: { data },
          },
        } = result || {};

        const userBlogs = (data || []).filter(
          (itm) => itm?.user_detail?.email === state?.email
        );
        setUserBlogs(userBlogs);
        setBlogsList(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const result = await axios.delete(
        `http://110.227.208.185/api/practical_2/blog/${id}`,
        {
          headers: { Authorization: `Bearer ${login_token}` },
        }
      );
      if (result.status === 200) {
        fetchBlogsData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useDidMountEffect(() => {
    fetchBlogsData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="d-flex mt-2 justify-content-center">
        <Button
          variant={`${viewType === "card" ? "primary" : "secondary"}`}
          onClick={() => setViewType("card")}
        >
          Card View
        </Button>{" "}
        <Button
          variant={`${viewType === "list" ? "primary" : "secondary"}`}
          className="ms-2"
          onClick={() => setViewType("list")}
        >
          List view
        </Button>
      </div>
      <div className="d-flex mt-2 justify-content-center">
        <Button
          variant={`${!allBlogs ? "primary" : "secondary"}`}
          onClick={() => setAllBlogs(false)}
        >
          My Blogs
        </Button>{" "}
        <Button
          variant={`${allBlogs ? "primary" : "secondary"}`}
          className="ms-2"
          onClick={() => setAllBlogs(true)}
        >
          All Blogs
        </Button>
      </div>
      {(allBlogs ? blogsList : userBlogs).length === 0 && (
        <h1 className="d-flex justify-content-center mt-5">No Records Found</h1>
      )}
      {(allBlogs ? blogsList : userBlogs).length !== 0 && (
        <div
          className={`${
            viewType === "card" ? "blog-card-grid" : "blog-card-list"
          } mt-5`}
        >
          {(allBlogs ? blogsList : userBlogs)?.map((item) => (
            <Card style={{ width: "18rem", marginBottom: "16px" }}>
              <Card.Img variant="top" src={item.attachment} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/blog/view?id=${item.id}`)}
                >
                  View Blog
                </Button>
                {!allBlogs && (
                  <Button
                    className="ms-2"
                    variant="danger"
                    onClick={() => handleDeleteBlog(item?.id)}
                  >
                    Delete Blog
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      {!allBlogs && (
        <div className="d-flex justify-content-center">
          <Button onClick={() => navigate("/blog/create")}>Create Blog</Button>
        </div>
      )}
    </>
  );
};

export default Blogs;
