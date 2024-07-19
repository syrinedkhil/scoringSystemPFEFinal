using Application.services;
using Contract.records.Company;
using Contract.services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ScoringSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CompanyController : ControllerBase
    {
        private readonly IManageCompanyService _managecompanyService;
        public CompanyController(IManageCompanyService manageCompanyServices)
        {
            _managecompanyService = manageCompanyServices;
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]

        [HttpPost("Add", Name = "AddCompanies")]
        public CompanyResponse AddCompany(AddCompanyRequest request)
        {
            return _managecompanyService.CreateCompany(request);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Reviewer")]


        [HttpGet("GetAll", Name = "GetAllCompanies")]
        public List<CompanyResponse> GetAllCompanies()
        {
            return _managecompanyService.GetAllCompanies();
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]

        [HttpDelete("DeleteCompany", Name = "DeleteCompany")]
        public void DeleteCompany(string id) => _managecompanyService.DeleteCompany(id);
    }
}
