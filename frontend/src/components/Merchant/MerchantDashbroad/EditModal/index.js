import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { updateShopBoat } from "api/shopBoat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ shopBoat, setShopBoat }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState(shopBoat?.name || "");
  const [description, setDescription] = React.useState(
    shopBoat?.description || ""
  );
  const [address, setAddress] = React.useState(shopBoat?.address || "");
  const [avatar, setAvatar] = React.useState(shopBoat?.avatar || "");

  const handleSubmit = async () => {
    const data = {
      name,
      description,
      address,
      avatar,
    };
    try {
      const response = await updateShopBoat(data);
      setShopBoat(response.data.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setName(shopBoat?.name || "");
    setDescription(shopBoat?.description || "");
    setAddress(shopBoat?.address || "");
    setAvatar(shopBoat?.avatar || "");
  }, [shopBoat]);

  return (
    <div>
      <Button variant="primary" onClick={handleOpen}>
        Chỉnh sửa
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Tên cửa hàng</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Ảnh</Form.Label>
                  <Form.Control
                    type="text"
                    name="avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                  Cập nhật
                </Button>
              </Col>
            </Row>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
