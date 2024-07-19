using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface ILabelRepository
    {
        List<Label> GetLabelByArticle(Guid id);
        List<List<Label>> GetAllLabelsByArticles();
        void AddLabel(Label label);
        void DeleteLabel(Guid id);
        void UpdateLabel(Label label);

    }
}
