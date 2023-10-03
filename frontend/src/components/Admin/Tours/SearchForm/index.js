import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import AddModal from "../AddModal";
const SearchForm = ({ onSearch, setTours }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Gửi các giá trị tìm kiếm đến hàm onSearch
    onSearch(searchTerm, minPrice, maxPrice);
  };

  const resetForm = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <Form className="mb-6">
      <Row>
        <Col>
          <Form.Group controlId="searchTerm">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tìm theo tên"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="minPrice">
            <Form.Label>Giá tối thiểu</Form.Label>
            <Form.Control
              type="number"
              placeholder="Giá tối thiểu"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="maxPrice">
            <Form.Label>Giá tối đa</Form.Label>
            <Form.Control
              type="number"
              placeholder="Giá tối đa"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button variant="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
          <AddModal setTours={setTours} />
          <IconButton className="ms-2" onClick={resetForm}>
            <DeleteIcon />
          </IconButton>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
