import React, { useState } from "react";
import * as api from "../api/index";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import * as actionType from "../constants/actionTypes.js";

const PhotoForm = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("user", user);

  // Correctly set creator using user.user.id
  const [postData, setPostData] = useState({
    fileName: null,
    creator: `${user?.user?.id}`,
  });

  const handlePhotoChange = (event) => {
    setPostData({ ...postData, fileName: event.target.files[0] });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/signin");
    setUser(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    console.log(postData);
    formData.append("file", postData.fileName);
    formData.append("creator", postData.creator);

    try {
      const response = await api.createTeeth(formData);
      toast.success(response.data.msg);
      navigate("/homepage");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container className="bg-light p-3 border border-1 rounded-3 border-dark">
          <Row className="d-flex justify-content-center">
            <h3 className="text-center">Diş Sağlığını Test Et</h3>
            <hr />
            <Form.Group className="mb-3" controlId="fileInput">
              <div>
                <Form.Control
                  placeholder="Bir Fotoğraf Seç"
                  type="file"
                  className="form-control-file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
            </Form.Group>
            <Button
              variant="info"
              type="submit"
              className="justify-content-center"
              disabled={!postData.fileName}
            >
              Oluştur
            </Button>
            <Form.Text className="text-muted text-end">
              Vaz Mı Geçtin{" "}
              <strong className="text-black" onClick={logout} to="/signin">
                Çıkış Yap
              </strong>
            </Form.Text>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default PhotoForm;
