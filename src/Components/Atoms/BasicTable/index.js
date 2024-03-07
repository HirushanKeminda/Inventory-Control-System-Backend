import React from 'react'
import { Button } from '../Button'
import "./index.css"

export const BasicTable = (props) => {
  return (
    <div className='wrap-table'>
      <table className={props.styles}>
        <thead>
          <tr>
            {props.tabelHeaderdata.map((item, index) => (
              <th key={index}>{item.header}</th>
            ))}
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.tableRowData.map((item, index) => (
            <tr key={index}>
              {item.Data.map((item, index) => (
                <td key={index}>{item.data}</td>
              ))}

              <td><Button type="warning" label="Edit" onClick={() => props.handleEdit(item.Data, item.id)} /></td>
              <td><Button type="danger" label="Delete" onClick={() => props.handleDelete(item.id)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
