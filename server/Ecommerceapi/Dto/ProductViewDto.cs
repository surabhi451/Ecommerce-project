namespace Ecommerceapi.Dto
{
    public class ProductViewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Available { get; set; }
        public int Price { get; set; }
        public CategoryViewDto Category { get; set; }

    }
}
