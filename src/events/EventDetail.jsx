import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import TabBar from "../../components/TabBar";
import { useNavigate, useParams } from "react-router-dom";
import { ProductDetailApi } from "../../apis/products";
import { useStore } from "../../store/useStore";

const BackButton = styled.button`
  margin: 0 1rem;
  font-size: 1rem;
  font-weight: normal;
  color: black;
  border-radius: 0.25rem;
`;

const Image = styled.img`
  object-fit: contain;
  width: 40%;
  margin-right: 2rem;
  height: 18rem;
  border-radius: 1rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyText = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 300;
  color: #718096;
`;

const ProductName = styled.div`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Price = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: right;
  color: #e53e3e;
`;

const BuyButton = styled.button`
  padding: 1rem 2rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #3182ce;
  border: none;
  border-radius: 0.5rem;
`;

const PurchaseModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PurchaseModalContent = styled.div`
  width: 50%;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
`;

const TotalPayment = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  font-size: 1rem;
  color: #3182ce;
  border: 1px solid #3182ce;
  border-radius: 0.25rem;
`;

const ConfirmButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #3182ce;
  border: none;
  border-radius: 0.25rem;
`;

const EventDetail = () => {
  const { mode } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductDetailApi(id);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-12">
      <Navigation />
      <TabBar def={"products"} />
      <BackButton onClick={() => navigate(-1)}> {"< BACK"} </BackButton>
      <div className="flex p-6 mt-8">
        <Image src={productData.imageUrl} alt={productData.productName} />
        <DetailsContainer>
          <CompanyText>{productData.companyName}</CompanyText>
          <ProductName>{productData.productName}</ProductName>
          <Price>{`$${productData.productPrice}`}</Price>
          {mode === "buyer" && <BuyButton onClick={openModal}>BUY</BuyButton>}
          {isModalVisible && (
            <PurchaseModal
              productPrice={productData.productPrice}
              closeModal={closeModal}
            />
          )}
        </DetailsContainer>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: productData.productDesc }}
        className="px-6 m-8 mt-12 text-sm font-light text-gray-700"
      ></div>
    </div>
  );
};

const PurchaseModal = ({ productPrice, closeModal }) => {
  const { userPoints, setPoints, points } = useStore();
  const maxPoint = userPoints;
  const [localPoint, setLocalPoint] = useState(0);
  const [remainingAmount, setRemainAmount] = useState(
    productPrice - userPoints
  );

  useEffect(() => {
    setRemainAmount(productPrice - localPoint);
  }, [localPoint]);

  return (
    <PurchaseModalOverlay>
      <PurchaseModalContent>
        <p className="mb-4 text-xl">
          Product Price:{" "}
          <span className="font-semibold text-blue-500">${productPrice}</span>
        </p>
        <div className="flex mb-4">
          <label className="block pt-2 mb-2 text-gray-700 w-38">
            Points to be used
          </label>
          <input
            className="w-[20%] p-2 border rounded-md bg-gray-100 px-4 mx-3"
            type="number"
            value={localPoint}
            max={maxPoint}
            min="0"
            onChange={(e) => setLocalPoint(e.target.value)}
          />
          <div className="flex items-center justify-center text-center">
            / {maxPoint}p
          </div>
        </div>
        <hr />
        <TotalPayment>
          Total payment amount{" "}
          <span className="pl-2 font-bold text-red-500">
            ${remainingAmount}
          </span>
        </TotalPayment>
        <div className="flex justify-end">
          <CancelButton onClick={closeModal}>Cancel</CancelButton>
          <ConfirmButton
            onClick={() => {
              if (localPoint > maxPoint) {
                alert("You have entered more points than are available.");
              } else {
                alert("Purchase completed");
                closeModal();
                setPoints(points - localPoint);
              }
            }}
          >
            Confirm Purchase
          </ConfirmButton>
        </div>
      </PurchaseModalContent>
    </PurchaseModalOverlay>
  );
};

export default EventDetail;
