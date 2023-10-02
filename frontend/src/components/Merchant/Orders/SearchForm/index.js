import { Form, Button, InputGroup, Col, Row } from "react-bootstrap";
import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    startDate: "",
    endDate: "",
    minValue: "",
    maxValue: "",
    address: "",
    status: "all",
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
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      phoneNumber: "",
      startDate: "",
      endDate: "",
      minValue: "",
      maxValue: "",
      address: "",
      status: "all",
    });
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col>
          {/* Tên khách hàng */}
          <Form.Group controlId="customerName">
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên khách hàng"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  customerName: e.target.value,
                });
              }}
              value={formData.customerName}
            />
          </Form.Group>
        </Col>

        <Col>
          {/* Số điện thoại */}
          <Form.Group controlId="phoneNumber">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Nhập số điện thoại"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value,
                });
              }}
              value={formData.phoneNumber}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* Khoảng thời gian từ đến */}
      <Row className="mb-6">
        <Col>
          <Row>
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Từ ngày</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      startDate: e.target.value,
                    });
                  }}
                  value={formData.startDate}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>Đến ngày</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      endDate: e.target.value,
                    });
                  }}
                  value={formData.endDate}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>

        <Col className="d-flex align-items-end">
          <InputGroup>
            <Form.Control
              type="number"
              placeholder="Giá trị từ"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  minValue: e.target.value,
                });
              }}
              value={formData.minValue}
            />
            <InputGroup.Text>đến</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Đến giá trị"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  maxValue: e.target.value,
                });
              }}
              value={formData.maxValue}
            />
          </InputGroup>
        </Col>
      </Row>
      {/* Địa chỉ */}

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="address" className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  address: e.target.value,
                });
              }}
              value={formData.address}
            />
          </Form.Group>
        </Col>
        <Col colSpan={2}>
          {/* Trạng thái */}
          <Form.Group controlId="status">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  status: e.target.value,
                });
              }}
              value={formData.status}
            >
              <option value={"all"}>Tất cả</option>
              <option value={"pending"}>Chờ xác nhận</option>
              <option value={"accepted"}>Đã xác nhận</option>
              <option value={"cancelled"}>Đã hủy</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col colSpan={10} className="d-flex align-items-center mt-3">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Tìm kiếm
          </Button>
          <Button variant="secondary" className="ms-2" onClick={resetForm}>
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
