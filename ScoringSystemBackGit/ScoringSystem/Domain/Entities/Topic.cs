
namespace Domain.Entities
{
    public class Topic
    {
        public Guid IdTopic { get; set; }
        public required string TopicName { get; set; }
        public List<NewLabel> Labels { get; set; } = new List<NewLabel>();
    }
}
