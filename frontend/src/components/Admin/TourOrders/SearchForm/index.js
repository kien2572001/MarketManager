import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    email: "",
    tourName: "",
    departureStartDate: "",
    departureEndDate: "",
    totalBillMin: "",
    totalBillMax: "",
    orderStatus: "",
    bookingStartDate: "",
    bookingEndDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi thông tin tìm kiếm đi đâu đó (ví dụ: API hoặc xử lý ở phía máy chủ)
    onSearch(formData);
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="email">
            <Form.Label>Email khách hàng</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tourName">
            <Form.Label>Tên tour</Form.Label>
            <Form.Control
              type="text"
              name="tourName"
              primary
              value={formData.tourName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="departureStartDate">
            <Form.Label>Thời gian khởi hành (Từ)</Form.Label>
            <Form.Control
              type="date"
              name="departureStartDate"
              value={formData.departureStartDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="departureEndDate">
            <Form.Label>Thời gian khởi hành (Đến)</Form.Label>
            <Form.Control
              type="date"
              name="departureEndDate"
              value={formData.departureEndDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="totalBillMin">
            <Form.Label>Tổng hóa đơn (Từ)</Form.Label>
            <Form.Control
              type="number"
              name="totalBillMin"
              value={formData.totalBillMin}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="totalBillMax">
            <Form.Label>Tổng hóa đơn (Đến)</Form.Label>
            <Form.Control
              type="number"
              name="totalBillMax"
              value={formData.totalBillMax}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="orderStatus">
            <Form.Label>Trạng thái đơn</Form.Label>
            <Form.Control
              as="select"
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleChange}
            >
              <option value="all">Chọn trạng thái</option>
              <option value="pending">Chưa xử lý</option>
              <option value="accepted">Đã xác nhận</option>
              <option value="cancelled">Đã hủy</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="bookingStartDate">
            <Form.Label>Thời gian đặt tour (Từ)</Form.Label>
            <Form.Control
              type="date"
              name="bookingStartDate"
              value={formData.bookingStartDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="bookingEndDate">
            <Form.Label>Thời gian đặt tour (Đến)</Form.Label>
            <Form.Control
              type="date"
              name="bookingEndDate"
              value={formData.bookingEndDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button variant="primary" type="submit" className="me-2">
            Tìm kiếm
          </Button>
          <Button variant="warning" type="reset">
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;
