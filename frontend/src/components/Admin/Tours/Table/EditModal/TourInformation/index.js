import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import parse from "html-react-parser";
import TextEditor from "components/Common/TextEditor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const AddEditModal = ({ infoData, setTourData, type = "edit" }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const [info, setInfo] = useState({
    key: infoData.key || "",
    value: infoData.value || "",
  });
  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setInfo(infoData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "edit") {
      setTourData((prev) => ({
        ...prev,
        tourInformation: prev.tourInformation.map((item) =>
          item._id === infoData._id ? info : item
        ),
      }));
    } else {
      setTourData((prev) => ({
        ...prev,
        tourInformation: [...prev.tourInformation, info],
      }));
    }
    handleClose();
    //console.log(info);
  };

  return (
    <React.Fragment>
      {
        <IconButton onClick={handleOpen}>
          {type === "edit" ? <EditIcon /> : <AddCircleOutlineIcon />}
        </IconButton>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 800,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex justify-between items-center mb-4 border-b-2 pb-2">
            <h2 className="text-center font-bold text-2xl ">
              Chỉnh sửa thông tin tours
            </h2>
            <div className="flex right-0 bottom-2">
              <Button variant="success mr-2" onClick={handleSubmit}>
                Lưu
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
              >
                Thoát
              </Button>
            </div>
          </div>
          <Form.Group controlId="key" className="mb-3">
            <Form.Label>Tên mục</Form.Label>
            <Form.Control
              type="text"
              name="key"
              value={info.key}
              onChange={(e) => setInfo({ ...info, key: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Nội dung</Form.Label>
            <TextEditor
              value={info.value}
              setValue={(value) =>
                setInfo((prev) => ({
                  ...prev,
                  value: value,
                }))
              }
            />
          </Form.Group>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

const TourInformation = ({ tourInformation, setTourData }) => {
  const handleDelete = (index) => {
    const newTourInformation = [...tourInformation];
    newTourInformation.splice(index, 1);
    setTourData((prev) => ({
      ...prev,
      tourInformation: newTourInformation,
    }));
  };

  return (
    <div className="overflow-y-auto" style={{ height: "500px" }}>
      <h5 className="border-bottom pb-2 mb-3 mt-3">
        <strong>Thông Tin Tour</strong>
        <AddEditModal infoData={{}} setTourData={setTourData} type="add" />
      </h5>
      {tourInformation?.map((item, index) => (
        <div key={uuidv4()} className="mb-3">
          <div className="font-semibold flex text-4xl justify-between underline">
            {item.key}
            <div>
              <AddEditModal infoData={item} setTourData={setTourData} />
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <span>{parse(item.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default TourInformation;
