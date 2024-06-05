import React, { useState, useEffect } from "react";
import { Table, Container, Modal, Button, Pagination } from "react-bootstrap";
import * as api from "../api/index";
import moment from "moment";
import "moment/locale/tr";

function QueryResults() {
  const [predictions, setPredictions] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [show, setShow] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [predictionsPerPage] = useState(5);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (user) {
        try {
          const response = await api.getAllPredictionsByUserId(user.user.id);
          setPredictions(response.data);
        } catch (error) {
          console.error("Error fetching predictions:", error);
        }
      }
    };

    fetchPredictions();
  }, [user]);

  const handleShow = (prediction) => {
    setSelectedPrediction(prediction);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedPrediction(null);
  };

  const generateReport = (prediction) => {
    if (!prediction) return "";

    const { caries, gingivitis, ulcer } = prediction;
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

  const formatPercentage = (value) => {
    return (value * 100).toFixed(2) + "%";
  };

  const indexOfLastPrediction = currentPage * predictionsPerPage;
  const indexOfFirstPrediction = indexOfLastPrediction - predictionsPerPage;
  const currentPredictions = predictions.slice(
    indexOfFirstPrediction,
    indexOfLastPrediction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h2>Kullanıcının Daha Önceki Sorgu Sonuçları</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Caries</th>
            <th>Gingivitis</th>
            <th>Ulcer</th>
            <th>Tarih</th>
            <th>Fotoğraf</th>
          </tr>
        </thead>
        <tbody>
          {currentPredictions.map((prediction, index) => (
            <tr key={prediction.id}>
              <td>{indexOfFirstPrediction + index + 1}</td>
              <td>{formatPercentage(prediction.caries)}</td>
              <td>{formatPercentage(prediction.gingivitis)}</td>
              <td>{formatPercentage(prediction.ulcer)}</td>
              <td>{moment(prediction.createdAt).format("LLL")}</td>
              <td>
                <img
                  src={`http://localhost:4000/${prediction.filePath.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt="Prediction"
                  className="prediction-images"
                  onClick={() => handleShow(prediction)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination-container">
        <Pagination>
          {Array.from(
            { length: Math.ceil(predictions.length / predictionsPerPage) },
            (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detaylı Rapor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPrediction && (
            <>
              <div className="modal-image-containers">
                <img
                  src={`http://localhost:4000/${selectedPrediction.filePath.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt="Prediction"
                  className="modal-images"
                />
              </div>
              <p>Caries: {formatPercentage(selectedPrediction.caries)}</p>
              <p>
                Gingivitis: {formatPercentage(selectedPrediction.gingivitis)}
              </p>
              <p>Ulcer: {formatPercentage(selectedPrediction.ulcer)}</p>
              <p>{generateReport(selectedPrediction)}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default QueryResults;
