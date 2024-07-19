namespace Contract.records.Labels
{
    public record UpdateLabelRequest(Guid LabelId, string Item, double Score, int Priority, Guid ArticleId);
}
