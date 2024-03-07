import React from "react";

export const DropDown = (props) => {
  console.log(props)
  return (    
      <select name="cars" id="cars" className="form-select form-select-sm p-2" onChange={(e)=>props.setValue(e.target.value)} value={props.value} >
        <option className="form-select form-select-sm p-2" value={0}>Select Product Category</option>
        {
            props.data?.map((item,index)=>(
                <option className="form-select form-select-sm p-2" key={index} value={item.categoryId}>{item.categoryName}</option>
            ))
        }
      </select>
   
  );
};