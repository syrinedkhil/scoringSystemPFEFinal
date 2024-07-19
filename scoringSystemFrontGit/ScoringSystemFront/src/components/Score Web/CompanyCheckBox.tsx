import React, {  useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import * as autorest from "../../lib/autorest-library-v1/src";
import CompanyScore from "../../Interfaces/CompanyScore";
import ProjectApi from "../../API/ProjectApi";
import { CompanyResponse } from "../../Lib/autorest-library-v1/src";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CompanyCheckboxProps {
  
  companiesIds: string[];
  companiesScores: number[];
  relatedCompanies :CompanyResponse[];
  handleSelectingCompanies (companies :CompanyResponse[]) :void ;
}

const CompanyCheckbox: React.FC<CompanyCheckboxProps> = ({
  
  companiesIds,
  companiesScores,
  relatedCompanies,
  handleSelectingCompanies,
}) => {
  const [sortedCopanyScores, setSortedCopanyScores] = useState<CompanyScore[]>([]);
  const myAPI = new ProjectApi();
  const accessToken = localStorage.getItem("accessToken");


  useEffect(() => {
    fetchAndSortCompanies();
  }, []);

  const fetchAndSortCompanies = async () => {
    const companies = await myAPI.getAllCompanies({
      requestOptions: { customHeaders: { Authorization: `Bearer ${accessToken}` } },
    });
    const CopanyScores: CompanyScore[] = companiesIds.map((id, index) => {
      const company = companies.find((company) => company.id === id);
      const companyName = company?.name || "Unknown";
      return {
        id,
        score: companiesScores[index],
        name: companyName,
      };
    });
    const sortedCopanyScores = CopanyScores.sort((a, b) => b.score - a.score);
    setSortedCopanyScores(sortedCopanyScores);
  };


  const handleSelectionChange = (event: React.ChangeEvent<{}>,value: CompanyScore[]
  ) => {
    const companies: CompanyResponse[] = value.map((company) => {
      return { id: company.id, name: company.name };
    });

    handleSelectingCompanies(companies);
  };
  
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={sortedCopanyScores}
      limitTags={4}
      onChange={handleSelectionChange}
      disableCloseOnSelect
      getOptionLabel={(option) => `${option.name}`}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div style={{ alignItems: "flex-start", flexGrow: 1 }}>{option.name}</div>
            <div style={{ alignItems: "flex-end" }}>{option.score}</div>

          </div>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Related companies" placeholder="" />}
    />
  );
};


export default CompanyCheckbox;
