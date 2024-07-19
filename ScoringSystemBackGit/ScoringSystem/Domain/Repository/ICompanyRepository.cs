using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface ICompanyRepository
    {
        public void AddCompany(Company company);
        public List<Company> GetAllCompanies();
        public Company GetCompanyById(Guid id);
        public void DeleteCompany(Guid id);

    }
}
