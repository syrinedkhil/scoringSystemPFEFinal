using Contract.records.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.services
{
    public interface IManageCompanyService
    {
        public CompanyResponse CreateCompany(AddCompanyRequest request);
        public List<CompanyResponse> GetAllCompanies();
        public void DeleteCompany(string id);
    }
}
