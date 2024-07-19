using Application.Helpers;
using Contract.records.Okta;
using Contract.services;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.services
{
    public class ManageTokenService : IManageTokenServices
    {
        private readonly IOptions<OktaTokenSettings> _oktaTokenSettings;
        public ManageTokenService(IOptions<OktaTokenSettings> oktaTokenSettings)
        {
            _oktaTokenSettings = oktaTokenSettings;
        }
        public async Task<OktaResponse> GetToken(OktaRequest request)
        {
            var token = new OktaResponse();
            var client = new HttpClient();
            var client_id = _oktaTokenSettings.Value.ClientId;
            var client_secret = _oktaTokenSettings.Value.ClientSecret;
            var clientCreds = System.Text.Encoding.UTF8.GetBytes($"{client_id}:{client_secret}");
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", System.Convert.ToBase64String(clientCreds));
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            var postMessage = new Dictionary<string, string>();
            postMessage.Add("grant_type", "password");
            postMessage.Add("username", request.username);
            postMessage.Add("password", request.password);
            postMessage.Add("scope", "openid");
            var request_okta = new HttpRequestMessage(HttpMethod.Post, $"{_oktaTokenSettings.Value.OktaDomain}/oauth2/default/v1/token")
            {
                Content = new FormUrlEncodedContent(postMessage)
            };
            var response = await client.SendAsync(request_okta);
            if (response.IsSuccessStatusCode)
            {
                var jsonSerializerSetting = new JsonSerializerSettings();
                var json = await response.Content.ReadAsStringAsync();
                token = JsonConvert.DeserializeObject<OktaResponse>(json, jsonSerializerSetting);
                token.ExpiresAt = DateTime.UtcNow.AddSeconds(token.ExpiresIn);
            }
            else
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new ApplicationException(error);
            }
            return token;

        }
    }
}
