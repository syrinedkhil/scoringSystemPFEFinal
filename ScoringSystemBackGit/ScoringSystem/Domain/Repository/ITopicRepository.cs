using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface ITopicRepository
    {
        public Topic? GetTopicById(Guid id);
         List<Topic> GetAll();
        public void Add(Topic topic);
        public void UpdateTopic(Topic topic);
        public void DeleteTopic(Guid id);

    }
}
