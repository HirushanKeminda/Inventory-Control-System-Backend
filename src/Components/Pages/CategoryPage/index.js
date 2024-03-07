import { useState } from "react";
import { InputLabel, CategoryTableData } from "../../Molecules";
import { Button } from "../../Atoms";
import Modal from "react-modal";
import "./index.css";
import AxiosClient from "../../../services/AxiosClient";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryNameValidation, setCategoryNameValidation] = useState("");
  const [categoryDescriptionValidation, setCategoryDescriptionValidation] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const handleOnClick = () => {
    validations();
    if (isUpdate) {
      AxiosClient.updateData(`https://localhost:7076/api/ProductCategory/${categoryId}`, {
        categoryId,
        categoryName,
        categoryDescription
      }).then(res => {
        queryClient.invalidateQueries({ queryKey: ['getCategoryData'] });
        toast.success('Category Update Success!', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }).catch(err => toast.warning('Category Update failed!', {
        position: 'bottom-right',
        autoClose: 3000,
      }));
      setIsModalOpen(false);
    } else {
      AxiosClient.postData('https://localhost:7076/api/ProductCategory', {
        categoryName,
        categoryDescription
      }).then(res => {
        queryClient.invalidateQueries({ queryKey: ['getCategoryData'] });
        toast.success('Category Adding Success!', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }).catch(err => toast.warning('Category Adding failed!', {
        position: 'bottom-right',
        autoClose: 3000,
      }));
      setIsModalOpen(false);
    }
  };

  const validations = () => {
    const nameValid = categoryName.trim() !== "";
    const descriptionValid = categoryDescription.trim() !== "";

    if (!nameValid) {
      setCategoryNameValidation("Category Name is required");
    } else {
      setCategoryNameValidation("");
    }

    if (!descriptionValid) {
      setCategoryDescriptionValidation("Category Description is required");
    } else {
      setCategoryDescriptionValidation("");
    }
  };

  const clearForm = () => {
    setCategoryName("");
    setCategoryDescription("");
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
    setCategoryId(data.categoryId);
    setCategoryName(data.categoryName);
    setCategoryDescription(data.categoryDescription);
    setIsUpdate(true);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end">
          <div className="btn-container d-flex object-fit-contain">
            <div className="first-btn p-3">
              <Button
                label="Add Category"
                type="primary"
                onClick={handleToggleModal}
              />
            </div>
            <div className="second-btn p-3">
              <Button
                label="Switch to products page"
                type="info"
                onClick={()=>navigate('/product-page')}
              />
            </div>
          </div>
        </div>
        <div className="table-container">
          <CategoryTableData handleEdit={handleEdit} />
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
                <InputLabel
                  typographyLabel="Category Name"
                  InputFieldPlaceHolder="Enter category name"
                  setValue={setCategoryName}
                  value={categoryName}
                />
                {categoryNameValidation !== "" && <p>{categoryNameValidation}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputLabel
                  typographyLabel="Category Description"
                  InputFieldPlaceHolder="Enter category description"
                  setValue={setCategoryDescription}
                  value={categoryDescription}
                />
                {categoryDescriptionValidation !== "" && <p>{categoryDescriptionValidation}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col btn-container">
                <Button
                  label={isUpdate ? "Update Category" : "Add Category"}
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
