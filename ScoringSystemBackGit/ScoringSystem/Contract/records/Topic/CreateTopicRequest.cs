using Contract.records.Label;
namespace Contract.records.Topic
{
    public record CreateTopicRequest(string TopicName, List<NewLabelResponse> labels);
}
