namespace Contract.records.Labels
{
    public record AddNewLabelRequest(string Item, double Score, int Priority, Guid TopicId);
}
