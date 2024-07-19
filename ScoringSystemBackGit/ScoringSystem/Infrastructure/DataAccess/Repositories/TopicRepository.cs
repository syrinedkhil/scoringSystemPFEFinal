using Domain.Entities;
using Domain.Repository;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.DataAccess.Repositories
{
    public class TopicRepository : ITopicRepository
    {
        private readonly DataBaseContext _dbContext;
        public TopicRepository(DataBaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add(Topic topic)
        {
            _dbContext.Topic.Add(topic);
            _dbContext.SaveChanges();
        }

        public void UpdateTopic(Topic topic)
        {
            _dbContext.Update(topic);
            _dbContext.SaveChanges();

        }
        public List<Topic> GetAll()
        {

            var topics = _dbContext.Topic.Include(t => t.Labels).ToList();
            return topics;
        }

        public Topic? GetTopicById(Guid id)
        {

            return _dbContext.Topic.Include(t => t.Labels).SingleOrDefault(x => x.IdTopic == id);
        }
        public void DeleteTopic(Guid id)
        {
            var topic = _dbContext.Topic.FirstOrDefault(u => u.IdTopic == id);
            _dbContext.Topic.Remove(topic);
            _dbContext.SaveChanges();
        }
    }
}

