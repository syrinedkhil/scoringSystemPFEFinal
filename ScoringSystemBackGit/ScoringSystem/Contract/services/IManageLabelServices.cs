using Contract.records.Label;
using Contract.records.Labels;


namespace Contract.services
{
    public interface IManageLabelServices
    {
        LabelResponse AddLabel(AddLabelRequest request);
        List<LabelResponse> GetLabelByArticleId(GetLabelByArticleIdRequest request);
        List<List<LabelResponse>> GetAllLabelsByArticle();

        LabelResponse UpdateLabel(UpdateLabelRequest request);

    }
}
