using Contract.records.Feedback;
using Contract.records.NewArticle;
using Contract.services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ScoringSystem.Controllers
{

    namespace FirstProject.Api.Controllers
    {
        [Route("api/Feedback")]
        [ApiController]
        public class FeedbackController : ControllerBase
        {
            private readonly IManageFeedbackServices _manageFeedbackServices;
            public FeedbackController(IManageFeedbackServices manageFeedbackServices)
            {
                _manageFeedbackServices = manageFeedbackServices;
            }

            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Reviewer")]

            [HttpPost("Add", Name = "AddFeedback")]
            public IActionResult AddFeedback(FeedbackRequest request)
            {
                _manageFeedbackServices.AddFeedback(request);
                return Ok();
            }
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Reviewer")]

            [HttpPost("GetById", Name = "GetFeedbackById")]
            public FeedbackResponse GetFeedbackById(string id)
            {
                var feedback = _manageFeedbackServices.GetFeedbackById(id);
                return feedback;
            }


            [HttpGet("GetAll", Name = "GetAllFeedback")]
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Reviewer")]
            // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]
            public List<FeedbackResponse> GetAll()
            {
                return _manageFeedbackServices.GetAll();
            }

            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Client")]

            [HttpGet("GetAllFeedbackByCompanyName", Name = "GetAllFeedbackByCompanyName")]

            public List<NewArticleResponse> GetFeedBackByPolicyName()

            {

                var user = HttpContext.User;

                string claimValue = null;

                List<NewArticleResponse> feedbacks = new List<NewArticleResponse>();

                foreach (var claim in user.Claims)

                {

                    if (claim.Type == "Client")

                    {

                        claimValue = claim.Value;
                        string[] parts = claimValue.Split('_');
                        if (parts.Length == 2)
                        {
                            claimValue = parts[1];
                        }
                        else
                        {
                            claimValue = parts[0];
                        }

                    }

                }

                if (claimValue != null)

                {

                    feedbacks = _manageFeedbackServices.GetFeedbackByCompanyName(claimValue);

                }

                else

                {

                    feedbacks = null;

                }

                return feedbacks;

            }
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Reviewer")]

            [HttpDelete("Delete", Name = "DeleteFeedback")]
            public void DeleteFeedback(string id)
            {
                _manageFeedbackServices.DeleteFeedback(id);
            }
        }
    }
}
