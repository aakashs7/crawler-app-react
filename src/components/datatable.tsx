import React from "react";
import { Table } from "reactstrap";

interface tableColumn {
  title: string;
  value: string;
  customRow?: (data: any) => void;
}

interface tableProps {
  columns: Array<tableColumn>;
  data: any;
}

export const Datatable = (props: tableProps) => {
  return (
    <Table bordered striped responsive>
      <thead>
        <tr>
          {props.columns.map((column: tableColumn, index: number) => {
            return <th key={"head" + index}>{column.title}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.data.map((data: any, trIndex: number) => {
          return (
            <tr key={"tr" + trIndex}>
              {props.columns.map((column: tableColumn, tdIndex: number) => {
                return (
                  <td key={"td" + tdIndex}>
                    {column.customRow
                      ? column.customRow(data[column.value])
                      : data[column.value]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
