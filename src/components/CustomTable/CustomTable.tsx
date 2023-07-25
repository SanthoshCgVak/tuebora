import { useState, FC, ReactElement } from "react";
import SortIcon from "@mui/icons-material/Sort";
import "./CustomTable.scss";

type props = {
  tHead: any;
  tBody: any;
  handleSort: Function;
};

const CustomTable: FC<props> = ({ tHead, tBody, handleSort }): ReactElement => {
  const [sortByAsc, setSortByAsc] = useState(true);

  return (
    <>
      <table className="center" style={{ width: "60%" }}>
        <thead>
          <tr>
            {tHead?.map((item: any, index: number) => {
              return (
                item?.gridView && (
                  <th key={index}>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.name}
                      {item?.sort && (
                        <SortIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleSort(sortByAsc, item?.key);
                            setSortByAsc(!sortByAsc);
                          }}
                        />
                      )}
                    </span>
                  </th>
                )
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tBody?.map((item: any, index: number) => (
            <tr key={index}>
              {tHead?.map((row: any, index: number) => {
                return row?.gridView && <td key={index}>{item[row.key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomTable;
