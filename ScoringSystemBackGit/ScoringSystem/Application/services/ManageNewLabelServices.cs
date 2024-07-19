using Contract.records.Label;
using Contract.records.Labels;
using Contract.services;
using Domain.Entities;
using Domain.Repository;


namespace Application.services
{
    public class ManageNewLabelServices : IManageNewLabelServices
    {
        private readonly INewLabelRepository _newlabelRepository;
        private readonly ITopicRepository _TopicRepository;
        public ManageNewLabelServices(INewLabelRepository labelRepository, ITopicRepository topicRepository)
        {
            _newlabelRepository = labelRepository;
            _TopicRepository = topicRepository;
        }
        public NewLabelResponse AddLabel(AddNewLabelRequest request)
        {
            var label = new NewLabel
            {
                NewLabelId = Guid.NewGuid(),
                Item = request.Item,
                Score = request.Score,
                Priority = request.Priority,
                TopicId = request.TopicId,
            };
            _newlabelRepository.AddLabel(label);
            return new NewLabelResponse(
                label.NewLabelId,
                request.Item,
                request.Score,
                request.Priority,
                label.TopicId

                );
        }
        public List<NewLabelResponse> GetLabelTopicId(GetLabelByTopicIdRequest request)
        {
            var topic = _TopicRepository.GetTopicById(request.TopicId);
            if (topic == null)
            {
                return new List<NewLabelResponse>();
            }
            List<NewLabel> labels = _newlabelRepository.GetLabelByTopic(topic.IdTopic);
            if (labels == null || labels.Count == 0)
            {
                return new List<NewLabelResponse>();
            }
            List<NewLabelResponse> AllLabelsForCurrentArticle = new List<NewLabelResponse>();
            foreach (var label in labels)
            {
                var singleLabel = new NewLabelResponse(
                    label.NewLabelId,
                    label.Item,
                    label.Score,
                    label.Priority,
                    label.TopicId
                );
                AllLabelsForCurrentArticle.Add(singleLabel);
            }
            return AllLabelsForCurrentArticle;
        }
        public NewLabelResponse UpdateLabel(UpdateNewLabelRequest request)
        {
            NewLabel newLabel = new NewLabel()
            {
                NewLabelId = request.NewLabelId,
                Item = request.Item,
                Score = request.Score,
                Priority = request.Priority,
                TopicId = request.TopicId,
            };
            _newlabelRepository.UpdateLabel(newLabel);
            return new NewLabelResponse(
                newLabel.NewLabelId,
                newLabel.Item,
                newLabel.Score,
                newLabel.Priority,
                newLabel.TopicId
                );
        }
    }
}
