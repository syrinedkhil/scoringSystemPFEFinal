using Application.services;
using Contract.records.Label;
using Contract.records.Labels;
using Contract.services;
using Microsoft.AspNetCore.Mvc;

namespace ScoringSystem.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class NewLabelController : ControllerBase
    {
        private readonly IManageNewLabelServices _newManageLabelServices;

        public NewLabelController(IManageNewLabelServices manageLabelServices)
        {
            _newManageLabelServices = manageLabelServices;
        }
        [HttpPost("Add", Name = "AddNewLabel")]
        public NewLabelResponse AddLabel(AddNewLabelRequest request)
        {
            return _newManageLabelServices.AddLabel(request);
        }

        [HttpPost("GetbyId", Name = "GetNewLabelById")]
        public List<NewLabelResponse> GetLabelTopicId(GetLabelByTopicIdRequest request)
        {
            return _newManageLabelServices.GetLabelTopicId(request);
        }

        [HttpPut("Edit", Name = "EditNewLabel")]
        public NewLabelResponse UpdateLabel(UpdateNewLabelRequest request)
        {
            _newManageLabelServices.UpdateLabel(request);
            return new NewLabelResponse(
                request.NewLabelId,
                request.Item,
                request.Score,
                request.Priority,
                request.TopicId
                );
        }
        







    }

}
