namespace Domain.Entities
{
    public class Label
    {
        public Guid LabelId { get; set; } = Guid.NewGuid();
        public string Item { get; set; } = "";
        public double Score { get; set; }
        public int Priority { get; set; }   
        public Guid articleId {  get; set; }

    }
}
