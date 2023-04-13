using Microsoft.AspNetCore.Identity;

namespace Ecommerceapi.Model
{
    public class ApplicationUser: IdentityUser
    {
        public string Name { get; set; }
        public DateTime Dob { get; set; }
        public string Address { get; set; }
    }
}

