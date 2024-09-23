'use client'

import { useEffect } from "react";
import { SlOptions } from "react-icons/sl";

import "./style.css";

interface ITableType {
  headings: string[];
  rows: any[];
  options: boolean;
}

const CustomTable = ({ headings, rows, options }: any) => {
  useEffect(() => {
    if (options) {
      rows?.forEach((row: any) => {
        row["options"] = "sdffgadfg";
      });
    }
  }, []);

  return (
    <div className="w-[90%]">
      <table className="mt-5rem">
        <thead>
          <tr>
            {headings?.map((name: string) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row: any, rowIndex: any) => (
            <tr key={rowIndex}>
              {headings?.map((heading: string, colIndex: number) => (
                <td
                  key={colIndex}
                  className={
                    heading === "Options" ? "w-[5rem] cursor-pointer" : ""
                  }
                >
                  {heading === "Options" ? (
                    <SlOptions />
                  ) : (
                    row[heading.toLowerCase()]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
