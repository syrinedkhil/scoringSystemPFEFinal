using Microsoft.AspNetCore.Authorization;
using Contract.records.Label;
using Contract.records.Labels;
using Contract.records.Topic;
using Contract.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Application.services;

namespace ScoringSystem.Controllers
{
    [Route("api/Topic")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Reviewer")]

    public class TopicController : ControllerBase
    {
        private readonly IManageTopicService _manageTopicServices;
        private readonly IManageNewLabelServices _manageNewLabelServices;


        public TopicController(IManageTopicService manageTopicServices, IManageNewLabelServices manageNewLabelServices)
        {
            _manageTopicServices = manageTopicServices;
            _manageNewLabelServices = manageNewLabelServices;
        }

        [HttpPost("Add", Name = "AddTopic")]
        public TopicResponse AddTopic(CreateTopicRequest request)
        {
            return (_manageTopicServices.CreateTopic(request));

        }

        [HttpPost("Update", Name = "UpdateTopic")]
        public void UpdateTopic(UpdateTopicRequest request)
        {
            _manageTopicServices.UpdateTopic(request);

        }

        [HttpGet("All", Name = "GetAllTopics")]
        public List<TopicResponse> GetAllTopics()
        {
            return _manageTopicServices.GetAllTopics();
        }

        [HttpGet("GetTopicById", Name = "GetTopicById")]
        public TopicResponse GetTopicById(Guid topicId)
        {
            return _manageTopicServices.GetTopicById(topicId);
        }

        [HttpDelete("Delete", Name = "DeleteTopic")]
        public void DeleteTopic(Guid id) => _manageTopicServices.DeleteTopic(id);


    }
}
