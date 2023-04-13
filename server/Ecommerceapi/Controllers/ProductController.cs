using Ecommerceapi.Dto;
using Ecommerceapi.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerceapi.Controllers
{
    public class ProductController : ControllerBase
    {
        private readonly ProductService _service;

        public ProductController(ProductService service)
        {
            _service = service;
        }

        [HttpPost("CreateProduct")]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> Post(ProductCreateDto dto)
        {
            var result = await _service.CreateProductAsync(dto);
            return Ok(result);
        }


        [HttpGet("AllProduct")]
        [ProducesResponseType(typeof(ProductViewDto[]), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {

            var result = await _service.GetAllProductAsync();
            return Ok(result);
        }

        [HttpGet("GetProductById")]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetOne(int id)
        {
            var result = await _service.GetIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }


        [HttpPut("UpdateProduct")]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Put(int id, ProductCreateDto obj)
        {
            var result = await _service.UpdatesProductAsync(id, obj);

            if (result)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [HttpDelete("DeleteProduct")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _service.DeleteProductAsync(id);
            return result == null ? NotFound() : Ok(result);

        }

        [HttpGet("categoryId/{id}")]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByCategoryId(int id)
        {
            var result = await _service.GetByCategoryIdasync(id);
            return result == null ? NotFound() : Ok(result);
        }
    }
}
