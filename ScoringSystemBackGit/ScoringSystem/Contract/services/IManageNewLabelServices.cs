using Contract.records.Label;
using Contract.records.Labels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.services
{
    public interface IManageNewLabelServices
    {
        NewLabelResponse AddLabel(AddNewLabelRequest request);
        List<NewLabelResponse> GetLabelTopicId(GetLabelByTopicIdRequest request);

        NewLabelResponse UpdateLabel(UpdateNewLabelRequest request);

    }
}
