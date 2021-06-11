import React from "react";
function TableElement({ no, title, writen_by, reporting_time, views, like }) {
  return (
    <tr>
      <td class="d-none d-sm-block text-center">{no} </td>
      <td class="text-left">
        <a
          class="tx-color-01 tx-medium"
          href="/Notice/ViewNotice/109?page=1&amp;key=0"
        >
          {title}
          <span></span>
          <span class="tx-bold tx-blue btn-uppercase"></span>
          <span></span>
        </a>
      </td>
      <td>{writen_by}</td>
      <td class="d-none d-sm-block">{reporting_time}</td>
      <td>{views}</td>
      <td class="d-none d-sm-block">{like}</td>
    </tr>
  );
}
export default TableElement;
