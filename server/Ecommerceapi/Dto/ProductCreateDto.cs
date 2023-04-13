namespace Ecommerceapi.Dto
{
    public class ProductCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int Available { get; set; }
        public int Price { get; set; }
    }
}
