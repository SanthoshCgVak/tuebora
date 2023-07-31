import { useState, useEffect } from "react";
import OrganizationView from "./views/OrganizationView/OrganizationView";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CompanySchema from "./data/SampleCompanySchema.json";
import UserSchema from "./data/SampleUserSchema.json";
import CompanyData from "./data/SampleCompanyData.json";
import UserData from "./data/SampleUserDataExamples.json";
import "./App.scss";

function App() {
  const [data, setData] = useState<any>([]);
  const [schema, setSchema] = useState<string>("Company");
  const [schemaData, setSchemaData] = useState<any>();

  useEffect(() => {
    if (schema === "Company") {
      setSchemaData(CompanySchema?.attributes);
      setData(CompanyData);
    } else {
      setSchemaData(UserSchema?.attributes);
      setData(UserData);
    }
  }, [schema]);

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
              <MenuItem value={"Company"}>Company</MenuItem>
              <MenuItem value={"User"}>User</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <OrganizationView viewData={data} schemaData={schemaData} />
    </>
  );
}

export default App;
