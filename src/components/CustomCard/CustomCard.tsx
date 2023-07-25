import { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

interface SchemaData {
  name?: string;
  key?: string;
  type?: string;
  cardView?: boolean;
  gridView?: boolean;
  search?: boolean;
  sort?: boolean;
}
interface CompanyData {
  name: string;
  noOfEmployees: string;
  industry: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  address: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  location: string;
  employmentType: string;
  age: string;
  jobTitle: string;
}

type props = {
  cardData?: CompanyData[] | UserData[];
  schemaData?: SchemaData[];
};

const CustomCard: FC<props> = ({ schemaData, cardData }): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        style={{ marginLeft: "2rem", marginRight: "2rem" }}
      >
        {cardData?.map((card: CompanyData | UserData | any) => (
          <Grid xs={6} md={4}>
            <Card>
              {schemaData?.map(
                (schema: SchemaData | any) =>
                  schema?.cardView && (
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} variant="h5">
                        <b>{schema?.name} :</b> {card[schema?.key]}
                      </Typography>
                    </CardContent>
                  )
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomCard;
