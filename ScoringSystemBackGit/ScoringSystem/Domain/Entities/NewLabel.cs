using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class NewLabel
    {
        public Guid NewLabelId { get; set; } = Guid.NewGuid();
        public string Item { get; set; } = "";
        public double Score { get; set; }
        public int Priority { get; set; }
        public Guid TopicId { get; set; }
       
    }
}
