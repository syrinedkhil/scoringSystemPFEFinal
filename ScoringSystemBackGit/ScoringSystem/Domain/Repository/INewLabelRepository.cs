using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface INewLabelRepository
    {
        List<NewLabel> GetLabelByTopic(Guid id);
        
        void AddLabel(NewLabel label);
        void DeleteLabel(Guid id);
        void UpdateLabel(NewLabel label);
    }
}
