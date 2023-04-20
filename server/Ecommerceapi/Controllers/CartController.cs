using Ecommerceapi.Dto;
using Ecommerceapi.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerceapi.Controllers
{

    public class CartController : ControllerBase
    {
        private readonly CartService _service;

        public CartController(CartService service)
        {
            _service = service;
        }

        [HttpGet("CartItems")]
        [ProducesResponseType(typeof(CartViewDto[]), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllCartItems()
        {

            var result = await _service.GetAllCartAsync();
            return Ok(result);
        }
    }
}
