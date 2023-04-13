namespace Ecommerceapi.Model
{
    public class Cart
    {
        public int Id { get; set; }
        public string ApplicationUserId {get; set;}
        public ApplicationUser ApplicationUser { get; set;}
        public int ProductId { get; set; }
        public Product product { get; set; }

    }
}
