import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Form, Row, Col } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { uploadImage, deleteImage } from "api/image";
import TourInformation from "./TourInformation";
import { addTour } from "api/tour";
import { successToast, errorToast } from "utilities/toast";
import StatTimePicker from "../Table/EditModal/StatTimePicker";

const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddModal = ({ setTours }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };
  const [tourData, setTourData] = useState({
    name: "",
    image:
      "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
    startTime: "7:00 t2",
    scheduleType: "daily",
    tourDuration: "",
    startLocation: "",
    transportation: "",
    price: 0,
    tourInformation: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTourData({
      ...tourData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await addTour(tourData);
      if (res?.code === 200) {
        successToast("Thêm tour thành công");
        setTours((prev) => [res.data, ...prev]);
        handleClose();
        resetForm();
      }
    } catch (error) {
      errorToast("Cập nhật tour thất bại");
      console.log(error);
    }
  };

  const handleImageUpload = async (event) => {
    const selectedFile = event.target.files[0]; // Lấy tệp được chọn (chỉ lấy tệp đầu tiên nếu người dùng chọn nhiều tệp)

    if (selectedFile) {
      // Kiểm tra xem người dùng đã chọn một tệp hợp lệ hay không
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (allowedTypes.includes(selectedFile.type)) {
        // Tệp hợp lệ, bạn có thể tiếp tục xử lý tệp ở đây
        let data = new FormData();
        //append image to files
        data.append("image", selectedFile);
        data.append("model", "Product");
        const res = await uploadImage(data);
        if (res?.status === 200) {
          setTourData({
            ...tourData,
            image: res.data.url,
          });
        }

        // Trong trường hợp bạn muốn gửi tệp lên máy chủ, bạn có thể sử dụng XMLHttpRequest, Fetch API, hoặc các thư viện khác để thực hiện tải lên.
      } else {
        // Tệp không hợp lệ, hiển thị thông báo hoặc thực hiện xử lý khác theo nhu cầu của bạn.
        console.error("Invalid file type. Please select a valid image file.");
      }
    }
  };

  const resetForm = (data = {}) => {
    setTourData({
      name: data?.name || "",
      image:
        data?.image ||
        "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
      startTime: data?.startTime || "7:00 t2",
      scheduleType: data?.scheduleType || "daily",
      tourTime: data?.tourTime || "",
      startLocation: data?.startLocation || "",
      transportation: data?.transportation || "",
      price: data?.price || 0,
      tourInformation: data?.tourInformation || [],
      tourDuration: data?.tourDuration || "",
    });
  };

  return (
    <div>
      <Button variant="success" className="ms-2" onClick={handleOpen}>
        Thêm mới
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="relative">
              <h2 className="text-center font-bold text-2xl mb-4 border-b-2 pb-2">
                Thêm Tour
              </h2>
              <div className="flex absolute right-0 bottom-2">
                <Button variant="success mr-2" onClick={handleSubmit}>
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    resetForm();
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <img src={tourData.image} alt="" />
                </Col>
                <Col className="d-flex flex-column">
                  {" "}
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Tên Tour</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={tourData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="startTime" className="mb-3">
                    <Form.Label>Thời Gian Bắt Đầu</Form.Label>
                    <StatTimePicker
                      tourData={tourData}
                      setTourData={setTourData}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Anh</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Enter image URL"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImageUpload}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="price">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={tourData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="tourDuration">
                    <Form.Label>Thời Gian Tour</Form.Label>
                    <Form.Control
                      type="text"
                      name="tourDuration"
                      value={tourData.tourDuration}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="startLocation">
                    <Form.Label>Nơi Khởi Hành</Form.Label>
                    <Form.Control
                      type="text"
                      name="startLocation"
                      value={tourData.startLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="transportation">
                    <Form.Label>Phương Tiện</Form.Label>
                    <Form.Control
                      type="text"
                      name="transportation"
                      value={tourData.transportation}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <TourInformation
                tourInformation={tourData.tourInformation}
                setTourData={setTourData}
              />
            </Form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddModal;
