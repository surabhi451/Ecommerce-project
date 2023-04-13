using Ecommerceapi.Dto;
using Ecommerceapi.Service;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerceapi.Controllers
{


    public class AccountsController : ControllerBase
    {
        private readonly AccountService _accountService;
        public AccountsController(AccountService obj)
        { 
            _accountService = obj;

        }
        [HttpPost("user/registration")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterUser(UserCreateDto obj)
        {
            if(obj == null)
            {
                return BadRequest("data missing");
            }
            var result= await _accountService.UserRegisterAsync(obj);
            if(result == false)
            {
                return BadRequest("user registration failed");
            }
            return Ok("user registration successfull");

        }

        [HttpPost("login/user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> LoginUser([FromBody] LoginDto obj)
        {
            var result = await _accountService.LoginAsync(obj);
            if(result == "user doesn't exist")
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
