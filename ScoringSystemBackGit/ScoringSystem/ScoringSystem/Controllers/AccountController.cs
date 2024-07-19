using Contract.records.Okta;
using Contract.services;
using Microsoft.AspNetCore.Mvc;

namespace ScoringSystem.Controllers
{
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IManageTokenServices _tokenServices;
        public AccountController(IManageTokenServices tokenServices)
        {
            _tokenServices = tokenServices;
        }
        [HttpGet("SignIn", Name = "SignIn")]
        public async Task<IActionResult> SignInAndGetToken([FromQuery] OktaRequest request)
        {
            var oktaToken = await _tokenServices.GetToken(request);
            if (oktaToken != null)
            {
                return Ok(oktaToken);
            }
            return null;
        }
    }
}
