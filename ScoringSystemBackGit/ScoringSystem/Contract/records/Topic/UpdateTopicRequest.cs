using Contract.records.Label;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.records.Topic
{
    public record UpdateTopicRequest(Guid topicId, string TopicName, List<NewLabelResponse> labels);
}
