import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const ProductSearchForm = ({ onSearch, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    priceMin: "",
    priceMax: "",
    inStock: false,
    category_id: "all",
    discount: 0,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi các giá trị tìm kiếm đến hàm xử lý tìm kiếm
    onSearch(formData);
    console.log("formData", formData);
  };

  const clearForm = () => {
    setFormData({
      name: "",
      priceMin: "",
      priceMax: "",
      inStock: false,
      category: "all",
      discount: 0,
    });
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="name">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="priceMin">
            <Form.Label>Giá tối thiểu</Form.Label>
            <Form.Control
              type="number"
              name="priceMin"
              value={formData.priceMin}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="priceMax">
            <Form.Label>Giá tối đa</Form.Label>
            <Form.Control
              type="number"
              name="priceMax"
              value={formData.priceMax}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Form.Group controlId="inStock">
            <Form.Check
              type="checkbox"
              name="inStock"
              label="Còn hàng"
              checked={formData.inStock}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="category">
            <Form.Label>Danh mục</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category_id}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  category_id: event.target.value,
                });
              }}
            >
              <option value="all">Tất cả</option>
              {categories?.map((category) => {
                return (
                  <option key={uuidv4()} value={category.value}>
                    {category.label}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="discount">
            <Form.Label>Giảm giá từ</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Tìm kiếm
          </Button>
          <Button variant="secondary" className="ms-2" onClick={clearForm}>
            Xóa bộ lọc
          </Button>
          <Button variant="success" className="ms-2">
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductSearchForm;
