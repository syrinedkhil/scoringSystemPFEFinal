using Contract.records.Topic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.services
{
    public interface IManageTopicService
    {
        public TopicResponse CreateTopic(CreateTopicRequest request);
        public void UpdateTopic(UpdateTopicRequest request);
        public TopicResponse GetTopicById(Guid id);
        public List<TopicResponse> GetAllTopics();
        public void DeleteTopic(Guid id);
    }
}
