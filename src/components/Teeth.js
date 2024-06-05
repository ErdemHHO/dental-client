import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/tr";
import * as api from "../api/index";

function Teeth() {
  const [lastPrediction, setLastPrediction] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastPrediction = async () => {
      if (user) {
        try {
          const response = await api.getLastPredictionByUserId(user.user.id);
          setLastPrediction(response.data);
        } catch (error) {
          console.error("Error fetching last prediction:", error);
        }
      }
    };

    fetchLastPrediction();
  }, [user]);

  const formatPercentage = (value) => {
    return (value * 100).toFixed(2) + "%";
  };

  const generateReport = () => {
    if (!lastPrediction) return "";

    const { caries, gingivitis, ulcer } = lastPrediction;
    const report = [];

    if (caries > 0.5) {
      report.push("Ağzınızda çürük riski bulunuyor.");
    }
    if (gingivitis > 0.5) {
      report.push("Diş etlerinizde iltihaplanma (gingivitis) riski bulunuyor.");
    }
    if (ulcer > 0.5) {
      report.push("Ağzınızda ülser riski bulunuyor.");
    }

    if (report.length === 0) {
      report.push("Diş sağlığınız genel olarak iyi görünüyor.");
    }

    return report.join(" ");
  };

  return (
    <Container className="prediction">
      {lastPrediction ? (
        <>
          <Row className="prediction-container">
            <Col>
              <h3 className="prediction-title">En Son Tahmin</h3>
              <p className="prediction-text">
                Caries: {formatPercentage(lastPrediction.caries)}
              </p>
              <p className="prediction-text">
                Gingivitis: {formatPercentage(lastPrediction.gingivitis)}
              </p>
              <p className="prediction-text">
                Ulcer: {formatPercentage(lastPrediction.ulcer)}
              </p>
              <img
                src={`http://localhost:4000/${lastPrediction.filePath.replace(
                  /\\/g,
                  "/"
                )}`}
                alt="Last prediction"
                className="prediction-image"
              />
              <p className="prediction-date">
                Oluşturulma Tarihi:{" "}
                {moment(lastPrediction.createdAt).format("LLL")}
              </p>
            </Col>
          </Row>
          <Row className="prediction-report">
            <Col>
              <h4>Rapor</h4>
              <p>{generateReport()}</p>
            </Col>
          </Row>
          <Row className="all-queries">
            <Col>
              <Button variant="primary" onClick={() => navigate("/all-query")}>
                Tüm Sorgu Sonuçlarımı Gör
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </Container>
  );
}

export default Teeth;
