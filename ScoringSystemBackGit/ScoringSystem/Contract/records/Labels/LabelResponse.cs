namespace Contract.records.Label
{
    public record LabelResponse
    {
        public Guid LabelId { get; init; }
        public string Item { get; init; }
        public double Score { get; init; }
        public int Priority { get; init; }
        public Guid ArticleId { get; init; }
        public LabelResponse(Guid LabelId, string Item, double Score, int Priority, Guid ArticleId)
        {
            this.LabelId = LabelId;
            this.Item = Item;
            this.Score = Score;
            this.Priority = Priority;
            this.ArticleId = ArticleId;

        }
    }
}
