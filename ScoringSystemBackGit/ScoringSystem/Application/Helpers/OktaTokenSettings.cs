using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Helpers
{
    public class OktaTokenSettings
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string OktaDomain { get; set; }
        public string AuthorizationServerId { get; set; }
        public string Audience { get; set; }

    }
}
