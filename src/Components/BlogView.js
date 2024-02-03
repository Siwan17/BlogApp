import React, { useState } from "react";
import cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./sharedComponent/Loader";
import useDidMountEffect from "./sharedComponent/useDidMountEffect";

const BlogView = () => {
  const navigate = useNavigate();
  const [blogsDetails, setBlogDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogsDetails = async () => {
    const login_token = cookies.get("login-token");
    const searchParams = new URLSearchParams(document.location.search);
    if (!searchParams) {
      navigate("/blogs");
    }
    try {
      const result = await axios.get(
        `http://110.227.208.185/api/practical_2/blog/${searchParams.get("id")}`,
        {
          headers: { Authorization: `Bearer ${login_token}` },
        }
      );
      if (result.status === 200) {
        const {
          data: { data },
        } = result || {};
        setBlogDetails(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useDidMountEffect(() => {
    fetchBlogsDetails();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="d-flex justify-content-start mt-5">
        <div className="blog-img">
          <img src={blogsDetails.attachment} alt="img" className="r" />
        </div>
        <div className="blog-details">
          <div className="row">
            <p>Published on: {blogsDetails?.created_on}</p>
          </div>
          <div className="row">
            <h1>{blogsDetails?.title}</h1>
          </div>
          <div className="row">
            <p>{blogsDetails?.description}</p>
          </div>
          <div className="row">
            <h6>
              AUTHOR: {blogsDetails?.user_detail?.first_name}
              {blogsDetails?.user_detail?.last_name}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogView;
