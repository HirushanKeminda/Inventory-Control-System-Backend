import React, { useState } from "react";
import { BasicTable } from "../../Atoms";
import { useQuery, useQueryClient } from "react-query";
import AxiosClient from "../../../services/AxiosClient";
import { toast } from "react-toastify";

const headerData = [
  { header: "Category ID" },
  { header: "Category Name" },
  { header: "Product Name" },
  { header: "Product Description" },
  { header: "Product price" },
  { header: "Product Quantity" },
];

const rowDataModel = (data) => {
  return data.map(row => {
    return {
      Data: [
        { data: row.categoryId },
        { data: row.categoryName },
        { data: row.productName },
        { data: row.productDescription },
        { data: row.productPrice },
        { data: row.productQuantity }
      ],
      id : row.productId
    }
  });
}


export const ProductTableData = (props) => {

  const [tableData, setTableData] = useState([]);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery('getProductData', () =>
    AxiosClient.getData('https://localhost:7076/api/Product').then(res => setTableData(rowDataModel(res.data)))
  )

  const handleDelete = (id) => {
    AxiosClient.delete(`https://localhost:7076/api/Product/${id}`).then(res => {
      queryClient.invalidateQueries({ queryKey: ['getProductData'] });
      toast.success('Product Delete Success!', {
        position:'bottom-right',
        autoClose: 3000,
      });
    }).catch(err => {
      toast.warning('Product Delete failed!', {
        position:'bottom-right',
        autoClose: 3000,
      })
    })
  }

  const handleEditClick = (data, id)=>{
    props.handleEdit({
      productId: id,
      categoryId: data[0].data,
      categoryName: data[1].data,
      productName: data[2].data,
      productDescription: data[3].data,
      productPrice: data[4].data,
      productQuantity: data[5].data,
    })
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="d-flex justify-content-center">
      <BasicTable
        styles="table table-striped text-center"
        tabelHeaderdata={headerData}
        tableRowData={tableData}
        handleEdit={handleEditClick}
        handleDelete={handleDelete}
      />
    </div>
  );
};
