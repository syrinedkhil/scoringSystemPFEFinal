import { ChangeEvent, useEffect, useState } from "react";
import DataTable from "../components/Dashboard/DataTable";
import CompanyListEditor from "../components/Dashboard/CompanyListEditor";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Grid,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ProjectApi from "../API/ProjectApi";
import { CompanyResponse } from "../Lib/autorest-library-v1/src";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [companies, setCompanies] = useState<CompanyResponse[]>([]);
  const [newCompany, setNewCompany] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");
  const myAPI = new ProjectApi();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    checkUserRole();

    fetchCompanies();
  }, []);
  const checkUserRole = () => {
    if (accessToken) {
      const DecodeToken = jwtDecode(accessToken);

      if (DecodeToken) {
        let clientRole = false;
        let reviewerRole = false;
        let adminRole = false;

        for (const key in DecodeToken) {
          
          if (key === "Client") {
            clientRole = true;
            break;
          } else if (key === "Admin") {
            adminRole = true;
            break;
          } else if (key === "Reviewer") {
            break;
            reviewerRole = true;
          }
        }

        if (clientRole) {
          setUserRole("client");
        } else if (adminRole) {
          setUserRole("Admin");
        } else {
          if (reviewerRole) {
            setUserRole("Reviewer");
          }
        }
      }
    }
  };

  const fetchCompanies = async () => {
    try {
      const Companies = await myAPI.getAllCompanies({
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
      });
      setCompanies(Companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  const handleDeleteCompany = async (id: string) => {
    try {
      await myAPI.deleteCompany({
        id,
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
      });
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:");
    }
    fetchCompanies();
  };

  const handleAddCompany = async () => {
    try {
      await myAPI.addCompanies({
        body: { name: newCompany },
        requestOptions: {
          customHeaders: { Authorization: `Bearer ${accessToken}` },
        },
      });
      setNewCompany("");
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:");
    }
  };

  const handleCompanyNameAdd = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCompany(event.target.value);
  };
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {userRole === "Admin" && (
            <>
              <Grid item xs={12} gap={10}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Companies
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "15px",
                        paddingLeft: "5px",
                        width: "400px",
                      }}
                    >
                      <Typography>Add Company :</Typography>
                      <TextField
                        id="outlined-basic"
                        label="Company"
                        variant="standard"
                        value={newCompany}
                        onChange={handleCompanyNameAdd}
                        style={{ marginBottom: "12px" }}
                      />
                      <Button variant="text" onClick={handleAddCompany}>
                        <span>Add</span>
                      </Button>
                    </div>

                    <CompanyListEditor
                      companies={companies}
                      handleDelete={handleDeleteCompany}
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </>
          )}

          {/* Rated articles */}
          <Grid item xs={12} gap={10}>
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "10px",
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                style={{ marginLeft: "10px", marginTop: "10px" }}
              >
                Rated articles
              </Typography>
              <DataTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default Dashboard;
