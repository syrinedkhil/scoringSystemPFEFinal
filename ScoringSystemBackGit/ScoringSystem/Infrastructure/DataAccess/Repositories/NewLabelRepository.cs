using Domain.Entities;
using Domain.Repository;
using Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DataAccess.Repositories
{
    public class NewLabelRepository : INewLabelRepository
    {
        public readonly DataBaseContext _dbContexte;
        public NewLabelRepository(DataBaseContext dbContext)
        {
            _dbContexte = dbContext;
        }


        public void AddLabel(NewLabel label)
        {

            _dbContexte.Add(label);
            _dbContexte.SaveChanges();
        }



        public void DeleteLabel(Guid id)
        {
            var label = _dbContexte.Labels.FirstOrDefault(label => label.LabelId == id);
            if (label != null)
            {
                _dbContexte.Labels.Remove(label);
                _dbContexte.SaveChanges();
            }
        }

        
        

        public List<NewLabel> GetLabelByTopic(Guid id)
        {
            var Labels = _dbContexte.newLabel.Where(label => label.TopicId == id).ToList();
            return Labels;
        }

        public void UpdateLabel(NewLabel label)
        {
            _dbContexte.Update(label);
            _dbContexte.SaveChanges();
        }

        
    }

}
