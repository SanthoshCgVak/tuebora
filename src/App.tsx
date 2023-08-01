import { useState, useEffect } from "react";
import OrganizationView from "./views/OrganizationView/OrganizationView";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./App.scss";

function App() {
  const [data, setData] = useState<any>([]);
  const [schema, setSchema] = useState<string>("");
  const [dropdownValues, setDropdownValues] = useState<any>([]);

  // Used to get all the Json files from the data folder
  useEffect(() => {
    const fetchData = async () => {
      const dataFiles = await importAll(
        require.context("./data", false, /\.json$/)
      );
      groupDataFiles(dataFiles);
    };
    fetchData();
  }, []);

  // Function to group data files based on the number in the file name
  const groupDataFiles = (files: any) => {
    const groupedData: any = {};
    const dropdownValues = [];
    for (const [key, value] of Object.entries<any>(files)) {
      if (key.includes("Schema")) {
        const fileName = `./${value?.name}Data.json`;
        dropdownValues.push(value?.name);
        groupedData[value?.name] = {
          schema: value?.attributes,
          data: files[fileName],
        };
      }
    }
    setDropdownValues(dropdownValues);
    setData(groupedData);
    setSchema(dropdownValues[0]);
  };

  // Function to import all files from the given context
  const importAll = (r: any) => {
    let files: any = {};
    r.keys().forEach((key: any) => (files[key] = r(key)));
    return files;
  };

  return (
    <>
      <div className="app-header">
        <Box sx={{ minWidth: 240, marginRight: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select the schema
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select the schema"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
            >
              {dropdownValues?.map((dropdown: any) => (
                <MenuItem value={dropdown}>{dropdown}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <OrganizationView
        viewData={data?.[schema]?.data}
        schemaData={data?.[schema]?.schema}
      />
    </>
  );
}

export default App;
