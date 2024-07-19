namespace Contract.records.Labels
{
    public record AddLabelRequest(string Item, double Score, int Priority, Guid ArticleId);

}
