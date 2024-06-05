import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as api from "../api/index";
import "react-toastify/dist/ReactToastify.css";

function SignupCom() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    phoneNumber: "",
    birthDate: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor!");
      return;
    }
    try {
      const response = await api.uyeOl(formData, navigate);
      if (response && response.status == 201) {
        toast.success("Hesabınız başarıyla oluşturuldu.");
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Hata oluştu");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center">
        <img className="teethgif" src="/img/teeth.gif" alt="gif"></img>
        Diş Sağlığı
        <img className="teethgif" src="/img/teeth.gif" alt="gif"></img>
      </h2>

      <h4 className="text-center">Kayıt Ol</h4>

      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Ad-Soyad:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adınızı ve Soyadınızı Giriniz"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>E-Posta</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-Posta Giriniz"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefon Numarası</Form.Label>
          <Form.Control
            type="text"
            placeholder="Telefon Numaranızı Giriniz"
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Doğum Tarihi</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Şifre:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifrenizi Giriniz"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Şifre Tekrar:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifrenizi Tekrar Giriniz"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <div className="d-grid gap-2">
        <Button
          size="lg"
          type="submit"
          disabled={
            !formData.email ||
            !formData.password ||
            !formData.name ||
            !formData.phoneNumber ||
            !formData.birthDate ||
            !confirmPassword
          }
        >
          Üye Ol
        </Button>
        <Form.Text className="text-muted text-end">
          Zaten Bir Hesabın Varsa <Link to="/signin">Giriş Yap</Link>
        </Form.Text>
      </div>
    </Form>
  );
}

export default SignupCom;
