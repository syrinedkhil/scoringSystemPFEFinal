using Domain.Entities;
using Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DataBaseContext _dbContext;
        public CompanyRepository(DataBaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddCompany(Company company)
        {
            _dbContext.Companies.Add(company);
            _dbContext.SaveChanges();
        }

        public List<Company> GetAllCompanies()
        {
            var companies = _dbContext.Companies.ToList();
            return companies;
        }

        public Company GetCompanyById(Guid id)
        {
            var companie = _dbContext.Companies.SingleOrDefault(u => u.Id == id);
            return companie;
        }
        public void DeleteCompany(Guid id)
        {
            var company = _dbContext.Companies.FirstOrDefault(u => u.Id == id);
            _dbContext.Companies.Remove(company);
            _dbContext.SaveChanges();
        }
    }

}
