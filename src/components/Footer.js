import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import * as api from "../api/index";
import { toast } from "react-toastify";

function Footer() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [postData, setPostData] = useState({
    message: "",
    userId: user?.user?.id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.createSupportRecord(postData);
      toast.success("Destek talebiniz başarıyla iletilmiştir.");
      setPostData({
        message: "",
        userId: user?.user?.id,
      });
    } catch (error) {
      toast.error("Talep sırasında bir hata oluştu");
    }
  };

  return (
    <div>
      <Container fluid className="footer text-center bg-danger p-5 text-white">
        <Row>
          <Col md={6}>
            <Row>
              <Col md={4}>
                <img className="Fteethgif" src="/img/teeth.gif" alt="gif"></img>
              </Col>
              <Col md={8}>
                <h4 className="baslik1">
                  <strong>DİŞ SAĞLIĞI TESTİ</strong>
                </h4>
              </Col>
            </Row>
          </Col>
          <Col className="text-center" md={6}>
            <div>
              <Form onSubmit={handleSubmit}>
                <Container className="p-3">
                  <Row className="d-flex justify-content-center">
                    <h3 className="text-center">Öneri, Istek ve Şikayet</h3>
                    <Form.Control
                      className="footer-form"
                      type="text"
                      id="inputMessage"
                      aria-describedby="messageHelpBlock"
                      value={postData.message}
                      onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                      }
                    />
                    <Button
                      variant="info"
                      type="submit"
                      className="justify-content-center mt-3"
                    >
                      Gönder
                    </Button>
                  </Row>
                </Container>
              </Form>
            </div>
          </Col>
        </Row>
        <hr />
        <span className="Designed-By"> Erdem Hacihasanoglu </span>
      </Container>
    </div>
  );
}

export default Footer;
