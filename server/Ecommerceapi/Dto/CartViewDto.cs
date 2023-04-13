namespace Ecommerceapi.Dto
{
    public class CartViewDto
    {
        public int Id { get; set; }
        public ProductViewDto Product { get; set; }

        public UserViewDto ApplicationUser { get; set; }
       
}
}
