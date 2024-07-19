using Contract.records.Okta;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.services
{
    public interface IManageTokenServices
    {
        public Task<OktaResponse> GetToken(OktaRequest request);

    }
}
