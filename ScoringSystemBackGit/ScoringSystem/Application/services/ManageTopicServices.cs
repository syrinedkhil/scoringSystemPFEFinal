using Contract.records.Article;
using Contract.records.Label;
using Contract.records.Topic;
using Contract.services;
using Domain.Entities;
using Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Label = Domain.Entities.Label;

namespace Application.services
{
    public class ManageTopicServices : IManageTopicService
    {
        private readonly ITopicRepository _topicRepositroy;
        private readonly INewLabelRepository _newLabelRepositroy;

        public ManageTopicServices(ITopicRepository topicRepositroy, INewLabelRepository newLabelRepositroy)
        {
            _topicRepositroy = topicRepositroy;
            _newLabelRepositroy = newLabelRepositroy;
        }
        public TopicResponse CreateTopic(CreateTopicRequest request)
        {
            var labels = request.labels.Select(label => new NewLabel
            {
                NewLabelId = Guid.NewGuid(),
                Item = label.Item,
                Priority = label.Priority,
                Score = label.Score,
            }).ToList();
            var topic = new Topic
            {
                IdTopic = Guid.NewGuid(),
                TopicName = request.TopicName,
                Labels = labels
            };
            _topicRepositroy.Add(topic);
            List<NewLabelResponse> labelsList = new List<NewLabelResponse>();
            foreach (var l in topic.Labels)
            {
                NewLabelResponse la = new NewLabelResponse(l.NewLabelId, l.Item, l.Score, l.Priority, topic.IdTopic);
                labelsList.Add(la);
            }
            var response = new TopicResponse(topic.IdTopic, topic.TopicName, labelsList);
            return response;
        }
        public void UpdateTopic(UpdateTopicRequest request)
        {
            Topic topic = _topicRepositroy.GetTopicById(request.topicId);
            topic.TopicName = request.TopicName;

            if (topic.Labels == null)
            {
                topic.Labels = new List<NewLabel>();
            }
            var labels = new List<NewLabel>();
            foreach (var l in request.labels)
            {
                labels.Add(new NewLabel
                {
                    NewLabelId = l.NewLabelId,
                    Item = l.Item,
                    Score = l.Score,
                    Priority = l.Priority,
                    TopicId = request.topicId,
                });

            }
            topic.Labels = labels;
            /*foreach (var updatedLabel in request.labels)
            {
                NewLabel existingLabel = topic.Labels.FirstOrDefault(l => l.NewLabelId == updatedLabel.NewLabelId);

                if (existingLabel != null)
                {

                    existingLabel.Item = updatedLabel.Item;
                    existingLabel.Score = updatedLabel.Score;
                    existingLabel.Priority = updatedLabel.Priority;
                }
                else
                {
                    topic.Labels.Add(new NewLabel
                    {
                        NewLabelId = updatedLabel.NewLabelId,
                        Item = updatedLabel.Item,
                        Score = updatedLabel.Score,
                        Priority = updatedLabel.Priority,
                        TopicId = request.topicId,
                    });
                }
            }*/
            _topicRepositroy.UpdateTopic(topic);
        }

        public void DeleteTopic(Guid id)
        {
            var topic = _topicRepositroy.GetTopicById(id);
            _topicRepositroy.DeleteTopic(id);
            var labelResponse = topic.Labels.Select(label =>
            new NewLabelResponse(
                label.NewLabelId,
                label.Item,
                label.Score,
                label.Priority,
                label.TopicId
                )).ToList();
        }
        public List<TopicResponse> GetAllTopics()
        {
            var topics = _topicRepositroy.GetAll();
            List<TopicResponse> AllTopics = new();
            foreach (var topic in topics)
            {
                var allLabels = topic.Labels;
                List<NewLabelResponse> labelsList = new List<NewLabelResponse>();
                foreach (var label in allLabels)
                {
                    NewLabelResponse labelResponse = new NewLabelResponse(
                        label.NewLabelId,
                        label.Item,
                        label.Score,
                        label.Priority,
                        topic.IdTopic
                        );
                    labelsList.Add(labelResponse);
                }
                var singleTopic = new TopicResponse(
                    topic.IdTopic,
                    topic.TopicName,
                    labelsList
                );
                AllTopics.Add(singleTopic);
            }
            return AllTopics;
        }
        public TopicResponse GetTopicById(Guid id)
        {
            var topic = _topicRepositroy.GetTopicById(id);
            var allLabels = topic.Labels;
            List<NewLabelResponse> labelsList = new List<NewLabelResponse>();
            foreach (var label in allLabels)
            {
                NewLabelResponse labelResponse = new NewLabelResponse(
                    label.NewLabelId,
                    label.Item,
                    label.Score,
                    label.Priority,
                    label.TopicId
                    );
                labelsList.Add(labelResponse);
            }
            return new TopicResponse(
                topic.IdTopic,
                topic.TopicName,
                labelsList
                );
        }
    }
}

