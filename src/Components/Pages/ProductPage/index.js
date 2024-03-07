import { useState } from "react";
import Modal from "react-modal";
import validator from 'validator';
import { DropDownLabel, InputLabel, ProductTableData } from "../../Molecules";
import { Button, DropDown } from "../../Atoms";
import AxiosClient from "../../../services/AxiosClient";
import { useQuery, useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [categoryNameValidation, setCategoryNameValidation] = useState("");
  const [productNameValidation, setProductNameValidation] = useState("");
  const [productDescriptionValidation, setProductDescriptionValidation] = useState("");
  const [productPriceValidation, setProductPriceValidation] = useState("");
  const [productQuantityValidation, setProductQuantityValidation] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const { isLoading, error, data } = useQuery('getCategoryData', () =>
    AxiosClient.getData('https://localhost:7076/api/ProductCategory').then(res => res.data)
  )

  const handleOnClick = () => {
    validations();
    if (isUpdate) {
      AxiosClient.updateData(`https://localhost:7076/api/Product/${productId}`, {
        productId,
        categoryId,
        productName,
        productDescription,
        productPrice,
        productQuantity
      }).then(res => {
        queryClient.invalidateQueries({ queryKey: ['getProductData'] });
        toast.success('Product Update Success!', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }).catch(err => toast.warning('Product Update failed!', {
        position: 'bottom-right',
        autoClose: 3000,
      }));
      setIsModalOpen(false);
    } else {
      AxiosClient.postData('https://localhost:7076/api/Product', {
        categoryId,
        productName,
        productDescription,
        productPrice,
        productQuantity
      }).then(res => {
        queryClient.invalidateQueries({ queryKey: ['getProductData'] });
        toast.success('Product Adding Success!', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      })
        .catch(err => toast.warning('Product Adding failed!', {
          position: 'bottom-right',
          autoClose: 3000,
        }));
      setIsModalOpen(false);
    }
  };

  const validations = () => {
    const categoryValid = categoryId !== "";
    const nameValid = productName.trim() !== "";
    const descriptionValid = productDescription.trim() !== "";
    const priceValid = validator.isNumeric(productPrice) && parseFloat(productPrice) > 0;
    const quantityValid = validator.isNumeric(productQuantity) && parseInt(productQuantity) > 0;

    if (!categoryValid) {
      setCategoryNameValidation("Category Name is required");
    } else {
      setCategoryNameValidation("");
    }

    if (!nameValid) {
      setProductNameValidation("Product Name is required");
    } else {
      setProductNameValidation("");
    }

    if (!descriptionValid) {
      setProductDescriptionValidation("Product Description is required");
    } else {
      setProductDescriptionValidation("");
    }

    if (!priceValid) {
      setProductPriceValidation("Product Price must be a valid number greater than 0");
    } else {
      setProductPriceValidation("");
    }

    if (!quantityValid) {
      setProductQuantityValidation("Product Quantity must be a valid number greater than 0");
    } else {
      setProductQuantityValidation("");
    }
  };

  const clearForm = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductQuantity("");
  }

  const handleToggleModal = (event) => {
    event.preventDefault();
    clearForm();
    setIsUpdate(false);
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (data) => {
    setProductId(data.productId)
    setCategoryId(data.categoryId);
    setProductName(data.productName);
    setProductDescription(data.productDescription);
    setProductPrice(data.productPrice.toString());
    setProductQuantity(data.productQuantity.toString());
    setIsUpdate(true);
    setIsModalOpen(true);
  }

  if (isLoading) {
    return "Loading..."
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end">
          <div className="btn-container d-flex object-fit-contain">
            <div className="first-btn p-3">
              <Button
                label="Add Product"
                type="primary"
                onClick={handleToggleModal}
              />
            </div>
            <div className="second-btn p-3">
              <Button
                label="Switch to product category page"
                type="info"
                onClick={()=>navigate('/')}
              />
            </div>
          </div>
        </div>
        <div className="table-container">
          <ProductTableData handleEdit={handleEdit} />
        </div>
      </div>
      <div className="modal-wrapper">
        <Modal isOpen={isModalOpen} className="Modal">
          <div className="d-flex justify-content-end">
            <Button type="close" onClick={handleModalClose} />
          </div>
          <div className="form-wrapper d-flex flex-column justify-content-center">
            <div className="row">
              <div className="col">
                <DropDownLabel
                  typographyLabel="Category Name"
                  InputFieldPlaceHolder="Enter category name"
                  setValue={setCategoryId}
                  value={categoryId}
                  data={data}
                />
                {categoryNameValidation !== "" && <p>{categoryNameValidation}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputLabel
                  typographyLabel="Product Name"
                  InputFieldPlaceHolder="Enter product name"
                  setValue={setProductName}
                  value={productName}
                />
                {productNameValidation !== "" && <p>{productNameValidation}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputLabel
                  typographyLabel="Product Description"
                  InputFieldPlaceHolder="Enter product description"
                  setValue={setProductDescription}
                  value={productDescription}
                />
                {productDescriptionValidation !== "" && <p>{productDescriptionValidation}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputLabel
                  typographyLabel="Product Price"
                  InputFieldPlaceHolder="Enter product price"
                  setValue={setProductPrice}
                  value={productPrice}
                />
                {productPriceValidation !== "" && <p>{productPriceValidation}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputLabel
                  typographyLabel="Product Quantity"
                  InputFieldPlaceHolder="Enter product quantity"
                  setValue={setProductQuantity}
                  value={productQuantity}
                />
                {productQuantityValidation !== "" && <p>{productQuantityValidation}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col btn-container">
                <Button
                  label={isUpdate ? "Update Product" : "Add Product"}
                  onClick={handleOnClick}
                  type="primary"
                  style="w-100"
                />
              </div>
              <div className="col btn-container">
                <Button
                  label="Cancel"
                  onClick={handleModalClose}
                  type="danger"
                  style="w-100"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
