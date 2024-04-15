import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ProductRegistrationApi } from "../../apis/products";

const Container = styled.div`
  max-width: 100%;
  padding: 2rem;
  margin-top: 4rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  color: #4a5568;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: transparent;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  border: 1px solid #cbd5e0;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-size: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: #edf2f7;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: #edf2f7;
  margin-bottom: 1rem;
`;

const UploadButton = styled.button`
  width: 100%;
  padding: 1rem;
  color: #ffffff;
  background-color: #4299e1;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const EventUpload = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", parseInt(price));
    formData.append("productDesc", description);
    formData.append("image", image);
    formData.append("companyId", 1);

    try {
      const res = await ProductRegistrationApi(formData);
      if (res === 200) {
        alert("Product registration has been completed");
        setProductName("");
        setPrice("");
        setDescription("");
        setImage(null);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error registering product:", error);
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>{"< BACK"}</BackButton>
      <Title>ADD NEW PRODUCT</Title>
      <Form>
        <Label>Product Name</Label>
        <Input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Label>Price</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Label>Description</Label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label>Image</Label>
        <Input
          type="file"
          accept="image/*"
          required={true}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <UploadButton type="button" onClick={handleSubmit}>
          Add Product
        </UploadButton>
      </Form>
    </Container>
  );
};

export default EventUpload;
