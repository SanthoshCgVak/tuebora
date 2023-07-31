import { useState, useEffect, FC, ReactElement } from "react";
import Fuse from "fuse.js";
import CustomTable from "../../components/CustomTable/CustomTable";
import CustomCard from "../../components/CustomCard/CustomCard";
import "./OrganizationView.scss";
// @ts-ignore
import { orderBy } from "lodash";

import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch/Switch";

interface SchemaData {
  name?: string;
  key?: string;
  type?: string;
  cardView?: boolean;
  gridView?: boolean;
  search?: boolean;
  sort?: boolean;
}

type props = {
  viewData: any;
  schemaData: SchemaData[];
};

const OrganizationView: FC<props> = ({
  viewData,
  schemaData,
}): ReactElement => {
  const [viewType, setViewType] = useState<string>("Grid");
  const [searchItems, setSearchItems] = useState<[]>();
  const [searchItemsPlaceholder, setSearchItemsPlaceholder] = useState<[]>();
  const [data, setData] = useState<any>(viewData);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => setData(viewData), [viewData]);

  useEffect(() => {
    setSearchItems(
      schemaData?.reduce((op: any, data: SchemaData) => {
        if (data?.search) op.push(data?.key);
        return op;
      }, [])
    );
    setSearchItemsPlaceholder(
      schemaData?.reduce((op: any, data: SchemaData) => {
        if (data?.search) op.push(data?.name);
        return op;
      }, [])
    );
  }, [data]);

  useEffect(() => {
    if (inputValue) {
      const fuse = new Fuse(data as [], {
        keys: searchItems,
      });
      setData(fuse.search(inputValue).map((value) => value.item));
    } else {
      setData(viewData);
    }
  }, [inputValue]);

  const handleSort = (value: boolean, key: string) => {
    setData(orderBy(data, [key], value ? "asc" : "desc"));
  };

  return (
    <>
      <div className="header">
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              onChange={(e) => {
                setInputValue("");
                e.target.checked ? setViewType("Grid") : setViewType("Card");
              }}
            />
          }
          label={viewType}
        />
      </div>
      {viewType === "Grid" && (
        <div className="input-class">
          <input
            type="text"
            placeholder={`Search by ${searchItemsPlaceholder?.toString()}`}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
      )}
      {viewType === "Grid" ? (
        <CustomTable
          tHead={schemaData}
          tBody={data}
          handleSort={(value: boolean, key: string) => handleSort(value, key)}
        />
      ) : (
        <CustomCard schemaData={schemaData} cardData={data} />
      )}
    </>
  );
};

export default OrganizationView;
