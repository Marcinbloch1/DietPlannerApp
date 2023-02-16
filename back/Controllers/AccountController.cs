using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API_Diet_planner.Data;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using API_Diet_planner.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Diet_planner.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName=registerDto.Username.ToLower(),
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt=hmac.Key
            };


            var macro = new Macro
            {
                Kcal = 2000,
                Proteins = 140,
                Fat = 80,
                Carbs = 220,
            };

            user.Macro=macro;
            macro.AppUser=user;

            _context.Users.Add(user);
            _context.Macros.Add(macro);

            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id=user.Id,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if(user==null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Id=user.Id,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpDelete]
        public async Task<ActionResult<UserDto>> RemoveUser()
        {

            var userId = Int32.Parse(User.FindFirst(ClaimTypes.Name)?.Value);

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == userId);

            // if(user==null) return Unauthorized("Invalid user");

            if(user != null)
                _context.Users.Remove(user);

            await _context.SaveChangesAsync();
            return NoContent();
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}