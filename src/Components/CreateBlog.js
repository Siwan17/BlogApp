import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useDidMountEffect from "./sharedComponent/useDidMountEffect";

const CreateBlog = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState("");
  const [attachmentImg, setAttachmentImg] = useState("");
  const navigate = useNavigate();
  const login_token = cookies.get("login-token");

  const handleInputChange = (newInputValue, test) => {
    if (test.action === "menu-close") {
      if (categoryValue) {
        setCategoryValue(categoryValue);
      }
      return;
    }
    setCategoryValue(newInputValue);
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
      setCategoryList(
        data.map((itm) => {
          return { value: itm?.id, label: itm?.name };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBlog = async () => {
    const blogData = {
      description,
      title,
      attachment,
      category_id: categoryList?.map((itm) => itm.value),
    };

    try {
      const result = await axios.post(
        "http://110.227.208.185/api/practical_2/blog",
        blogData,
        {
          headers: {
            Authorization: `Bearer ${login_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status === 200) {
        navigate("/blogs");
      }
    } catch (error) {}
  };

  useDidMountEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <>
      <h3 className="d-flex justify-content-center mt-5">Write Your Blog</h3>
      <div className="blog-create-container">
        <form
          class="row g-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateBlog();
          }}
        >
          <div class="col-md-6">
            <label for="title" class="form-label">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <label for="attachment" class="form-label">
              Attachment
            </label>
            <input
              type="file"
              class="form-control"
              id="attachment"
              onChange={(e) => {
                setAttachment(e.target.files[0]);
                setAttachmentImg(e.target.value);
              }}
              value={attachmentImg}
            />
          </div>
          <div class="col-12">
            <label for="description" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              placeholder="Write here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <div class="col-12">
            <label for="inputAddress2" class="form-label">
              Category
            </label>
            <Select
              defaultValue={[]}
              isMulti
              name="colors"
              options={categoryList}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleInputChange}
            />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
