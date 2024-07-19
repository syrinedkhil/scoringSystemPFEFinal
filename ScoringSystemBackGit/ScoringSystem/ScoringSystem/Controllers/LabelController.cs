using Contract.records.Article;
using Contract.services;
using Microsoft.AspNetCore.Mvc;

using Domain.Entities;
using Contract.records.Labels;
using Contract.records.Label;
namespace Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabelController : ControllerBase
    {
        private readonly IManageLabelServices _manageLabelServices;

        public LabelController(IManageLabelServices manageLabelServices)
        {
            _manageLabelServices = manageLabelServices;
        }
        [HttpPost("Add", Name = "AddLabel")]
        public LabelResponse AddLabel(AddLabelRequest request)
        {
            return _manageLabelServices.AddLabel(request);
        }

        [HttpPost("GetbyId", Name = "GetLabelbyId")]
        public List<LabelResponse> GetLabelByArticleId(GetLabelByArticleIdRequest request)
        {
            return _manageLabelServices.GetLabelByArticleId(request);
        }

        [HttpGet("GetLabelsByArticles", Name = "GetLabelsByArticles")]
        public List<List<LabelResponse>> GetAllLabelsByArticle()
        {
            return _manageLabelServices.GetAllLabelsByArticle();
        }
        [HttpPut("Edit", Name = "EditLabel")]

        public LabelResponse UpdateLabel(UpdateLabelRequest request)
        {
            _manageLabelServices.UpdateLabel(request);
            return new LabelResponse(
                request.LabelId,
                request.Item,
                request.Score,
                request.Priority,
                request.ArticleId

                );
        }







    }

}
