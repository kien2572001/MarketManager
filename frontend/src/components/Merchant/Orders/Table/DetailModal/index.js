import Button from "react-bootstrap/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailModal = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="primary" onClick={handleOpen}>
        Detail
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row className="mb-3">
            <Col>
              <Card>
                <Card.Body>
                  <h4>Invoice Details</h4>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {order?.createdAt}
                  </p>
                  <p>
                    <span className="font-semibold">Customer:</span>{" "}
                    {order?.customerName}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {order?.customer?.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {order?.customer?.address}
                  </p>
                  <p>
                    <span className="font-semibold">Total:</span> $
                    {order?.total}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {order?.status === "pending" ? (
                      <Badge pill bg="warning">
                        Pending
                      </Badge>
                    ) : order.status === "accepted" ? (
                      <Badge pill bg="success">
                        Accepted
                      </Badge>
                    ) : (
                      <Badge pill bg="danger">
                        Cancelled
                      </Badge>
                    )}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h4>Items</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.product?.image}
                              alt={item.product?.name}
                              width="50"
                            />
                          </td>
                          <td>{item.product?.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                          <td>{item.sale}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailModal;
