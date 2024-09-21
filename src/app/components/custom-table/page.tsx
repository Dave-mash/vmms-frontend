import { useEffect } from "react";
import { SlOptions } from "react-icons/sl";

import "./style.css";

interface ITableType {
  headings: string[];
  rows: any[];
  options: boolean;
}

const CustomTable = ({ headings, rows, options }: ITableType) => {
  useEffect(() => {
    if (options) {
      rows.forEach((row) => {
        row["options"] = "sdffgadfg";
      });
    }
  }, []);

  return (
    <div className="w-[90%]">
      <table className="mt-5rem">
        <thead>
          <tr>
            {headings.map((name: string) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headings.map((heading, colIndex) => (
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
