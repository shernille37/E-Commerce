import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../../slices/productApiSlice";

const ProductAddScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const [createProduct, { isLoading: loadingAdd }] = useCreateProductMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success("Product Added");

      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile.type.startsWith("image")) {
      toast.error("Please select a valid image");
      setImage("");
      return;
    }

    setImage(imageFile);
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Product</h1>
        {loadingAdd && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              label="Choose File"
              onChange={uploadFileHandler}
              type="file"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductAddScreen;
