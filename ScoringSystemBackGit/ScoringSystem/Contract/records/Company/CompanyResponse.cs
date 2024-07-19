using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.records.Company
{
    public record CompanyResponse
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public CompanyResponse(Guid Id, string Name)
        {
            this.Id = Id;
            this.Name = Name;
        }
    }
}
