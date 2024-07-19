namespace Contract.records.Label
{
    public record NewLabelResponse(Guid NewLabelId, string Item, double Score, int Priority, Guid TopicId);
}
