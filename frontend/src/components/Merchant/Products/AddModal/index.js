import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Form from "react-bootstrap/Form";
import { getListCategories } from "api/category";
import Select from "react-select";
import PropTypes from "prop-types";
import makeAnimated from "react-select/animated";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createProduct } from "api/shopBoat";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadImage, deleteImage } from "api/image";

const animatedComponents = makeAnimated();
AddModal.propTypes = {
  updateData: PropTypes.func.isRequired,
};

function AddInformationModal({ addInformation }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFieldName("");
    setValue("");
  };

  const [fieldName, setFieldName] = useState("");
  const [value, setValue] = useState("");

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

  const handleSave = () => {
    addInformation({ key: fieldName, value: value });
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="add"
        size="small"
        sx={{
          mr: 0.5,
        }}
        onClick={handleOpen}
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <Form.Group controlId="fieldName" className="mb-3">
            <Form.Label>Field Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Field Name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="value" className="mb-3">
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="mr-2"
              variant="success"
              disabled={fieldName === "" || value === ""}
            >
              Add
            </Button>
            <Button onClick={handleClose} variant="primary">
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const defaultImage =
  "https://researchcoach.co.uk/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png";

function AddModal({ updateData, addProduct }) {
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    resetForm();
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategories, setSelectedCategory] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(0);
  const [unit, setUnit] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [information, setInformation] = useState([]);
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getListCategories();
      if (response?.status === 200) {
        let categories = response?.data.data.map((category) => {
          return { value: category.slug, label: category.name };
        });
        setListCategory(categories);
      }
    };

    fetchCategories();
  }, []);

  const style = {
    position: "absolute",
    top: "500px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    pt: 2,
    overflowY: "auto",
    maxHeight: "80vh",
  };

  const resetForm = () => {
    setName("");
    setPrice(0);
    setSale(0);
    setUnit("");
    setCountInStock(0);
    setDescription("");
    setSelectedCategory([]);
    setInformation([]);
    setImage(defaultImage);
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("sale", sale);
    data.append("unit", unit);
    data.append("countInStock", countInStock);
    data.append("description", description);
    data.append(
      "categories",
      selectedCategories.map((category) => category.value)
    );
    data.append("information", JSON.stringify(information));
    data.append("image", image);
    try {
      const response = await createProduct(data);
      if (response?.status === 200) {
        addProduct(response.data.data);
        resetForm();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteInformation = (index) => {
    let newInformation = information.filter((info, i) => i !== index);
    setInformation(newInformation);
  };

  const handleAddInformation = (information) => {
    setInformation((newInformation) => [...newInformation, information]);
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
          setImage(res.data.url);
        }

        // Trong trường hợp bạn muốn gửi tệp lên máy chủ, bạn có thể sử dụng XMLHttpRequest, Fetch API, hoặc các thư viện khác để thực hiện tải lên.
      } else {
        // Tệp không hợp lệ, hiển thị thông báo hoặc thực hiện xử lý khác theo nhu cầu của bạn.
        console.error("Invalid file type. Please select a valid image file.");
      }
    }
  };

  return (
    <>
      <Button variant="success" className="ms-2" onClick={handleShow}>
        Thêm sản phẩm
      </Button>
      <Modal
        open={open}
        onClose={async () => {
          if (image !== defaultImage) {
            await deleteImage(image);
          }
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="relative">
            <h2 className="text-center font-bold text-2xl mb-4 border-b-2 pb-2">
              Edit Product
            </h2>
            <div className="flex absolute right-0 bottom-2">
              <Button variant="success mr-2" onClick={handleSave}>
                Save
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
          <Form>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-1">
                <img src={image} alt="product" className="max-w-[320px]" />
              </div>
              <div className="flex col-span-1 flex-col">
                <Form.Group className="mb-3 w-full" controlId="name">
                  <Form.Label className="font-medium">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <div className="flex gap-4">
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter discount percentage"
                      value={sale}
                      onChange={(e) => setSale(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="flex gap-4">
                  <Form.Group className="mb-3" controlId="stock">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter stock quantity"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="unit">
                    <Form.Label>Unit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Enter image URL"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageUpload}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Select
                isMulti
                options={listCategory}
                value={selectedCategories}
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={(value) => setSelectedCategory([...value])}
              />
            </Form.Group>
            <Form.Group className="mb-3 w-full" controlId="name">
              <div className="flex justify-between">
                <Form.Label className="font-medium mb-[1px]">
                  Information
                </Form.Label>
                <AddInformationModal addInformation={handleAddInformation} />
              </div>

              <div className="flex flex-col">
                {information.map((info, index) => (
                  <div
                    className="flex gap-4 border border-gray-300 p-2 border-b-0 mt-[-1px] relative"
                    key={uuidv4()}
                  >
                    <span className="min-w-[200px] font-semibold">
                      {info.key}
                    </span>
                    <span className="text-gray-400">{info.value}</span>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: "1px",
                        right: "2px",
                      }}
                      onClick={() => handleDeleteInformation(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  //console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  //console.log({ event, editor, data });
                  setDescription(data);
                }}
                onBlur={(event, editor) => {
                  //console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  //console.log("Focus.", editor);
                }}
              />
            </Form.Group>
          </Form>
        </Box>
      </Modal>
    </>
  );
}

export default AddModal;
