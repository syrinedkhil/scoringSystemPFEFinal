using Contract.records.Company;
using Contract.services;
using Domain.Entities;
using Domain.Repository;


namespace Application.services
{
    public class ManageCompanyServices : IManageCompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        public ManageCompanyServices(ICompanyRepository companyRepository) { _companyRepository = companyRepository;}
        public CompanyResponse CreateCompany(AddCompanyRequest request)
        {
            var company = new Company {Id = new Guid(),Name = request.Name};
            _companyRepository.AddCompany(company);
            return new CompanyResponse(company.Id, company.Name);
        }
        public List<CompanyResponse> GetAllCompanies()
        {
            var companies = _companyRepository.GetAllCompanies();
            var listCompanies = new List<CompanyResponse>();
            CompanyResponse singleResponse;
            foreach (var company in companies)
            {
                singleResponse = new CompanyResponse( company.Id,company.Name);
                listCompanies.Add(singleResponse);
            }
            return listCompanies;
        }
        public void DeleteCompany(string Id){ _companyRepository.DeleteCompany(new Guid(Id));}
    }


}
