import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      phone: "",
      type: "",
      status: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({
      name: "",
      code: "",
      phone: "",
      type: "",
      status: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Thực hiện tìm kiếm với các giá trị trong state
    const { name, code, phone, type, status } = this.state;
    // Gửi các giá trị tìm kiếm đến phần xử lý tìm kiếm
    // Ví dụ: this.props.performSearch(name, boatNumber, phoneNumber, boatType, status);
    this.props.onSearch({
      name,
      code,
      phone,
      type,
      status,
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="mb-6">
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBoatNumber">
              <Form.Label>Mã số thuyền</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={this.state.code}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBoatType">
              <Form.Label>Kiểu thuyền</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={this.state.type}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formStatus">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option value="">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Ngừng hoạt động</option>
                <option value="banned">Bị cấm</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="d-flex align-items-end">
            <Button variant="primary" type="submit">
              Tìm kiếm
            </Button>
            <Button
              variant="warning"
              className="ms-2"
              type="button"
              onClick={this.resetForm}
            >
              Xóa bộ lọc
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchForm;
