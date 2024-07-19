namespace Contract.records.Labels
{
    public record UpdateNewLabelRequest(Guid NewLabelId, string Item, double Score, int Priority, Guid TopicId);
}
