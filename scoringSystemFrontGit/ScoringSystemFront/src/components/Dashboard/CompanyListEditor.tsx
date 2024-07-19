import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as autorest from '../../lib/autorest-library-v1/src'
import { Delete } from "@mui/icons-material";

interface Props {
  companies: autorest.CompanyResponse[];
  handleDelete (id: string): void ;
}

const CompanyListEditor: React.FC<Props> = ({ companies, handleDelete }) => {


  const columns: GridColDef<(typeof companies)[number]>[] = [
    
    {
      field: "companyname",
      headerName: "Companies",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography style={{flexGrow:"1"}}>{params.row.name}</Typography>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={companies}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5,10]}
      />
    </Box>
  );
};

export default CompanyListEditor;
