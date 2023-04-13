namespace Ecommerceapi.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Available { get; set; }
        public int Price { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }

    }
}
