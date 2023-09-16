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
import { updateProduct } from "api/shopBoat";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as React from "react";

const animatedComponents = makeAnimated();
EditModal.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sale: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    countInStock: PropTypes.number.isRequired,
  }).isRequired,
  updateData: PropTypes.func.isRequired,
};

function AddInformationModal({ addInformation }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

function EditModal({ product, updateData }) {
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    resetForm(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategories, setSelectedCategory] = useState([]);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [sale, setSale] = useState(product.sale);
  const [unit, setUnit] = useState(product.unit);
  const [countInStock, setCountInStock] = useState(product.countInStock);
  const [description, setDescription] = useState(product.description);
  const [information, setInformation] = useState(product.information);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getListCategories();
      if (response) {
        let categories = response.data.data.map((category) => {
          return { value: category.slug, label: category.name };
        });
        setListCategory(categories);
      }
    };

    const initSelectedCategories = () => {
      let categories = product.categories.map((category) => {
        return { value: category.slug, label: category.name };
      });
      setSelectedCategory(categories);
    };

    initSelectedCategories();
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

  const resetForm = (updatedProduct) => {
    setName(updatedProduct.name);
    setPrice(updatedProduct.price);
    setSale(updatedProduct.sale);
    setUnit(updatedProduct.unit);
    setCountInStock(updatedProduct.countInStock);
    setDescription(updatedProduct.description);
    setSelectedCategory(
      updatedProduct.categories.map((category) => {
        return { value: category.slug, label: category.name };
      })
    );
    setInformation(updatedProduct.information);
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
    try {
      const response = await updateProduct(product._id, data);
      if (response.status === 200) {
        updateData(response.data.data);
        resetForm(response.data.data);
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

  return (
    <>
      <Button variant="info text-white" onClick={handleShow}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-[320px]"
                />
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
                  <Form.Control type="file" placeholder="Enter image URL" />
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
                  <div className="flex gap-4 border border-gray-300 p-2 border-b-0 mt-[-1px] relative">
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

export default EditModal;
