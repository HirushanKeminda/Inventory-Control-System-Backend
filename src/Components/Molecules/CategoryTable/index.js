import React, { useState } from "react";
import { BasicTable } from "../../Atoms";
import "./index.css";
import AxiosClient from "../../../services/AxiosClient";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const headerData = [
  { header: "Category Name" },
  { header: "Category Description" },
];

const rowDataModel = (data) => {
  return data.map(row => {
    return {
      Data: [
        { data: row.categoryName },
        { data: row.categoryDescription },
      ],
      id: row.categoryId
    }
  });
}

export const CategoryTableData = (props) => {
  const [tableData, setTableData] = useState([]);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery('getCategoryData', () =>
    AxiosClient.getData('https://localhost:7076/api/ProductCategory').then(res => setTableData(rowDataModel(res.data)))
  )

  const handleDelete = (id) => {
    AxiosClient.delete(`https://localhost:7076/api/ProductCategory/${id}`).then(res => {
      queryClient.invalidateQueries({ queryKey: ['getCategoryData'] });
      toast.success('Category Delete Success!', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }).catch(err => {
      toast.warning('Category Delete failed!', {
        position: 'bottom-right',
        autoClose: 3000,
      })
    })
  }

  const handleEditClick = (data, id) => {
    props.handleEdit({
      categoryId: id,
      categoryName: data[0].data,
      categoryDescription: data[1].data,
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
