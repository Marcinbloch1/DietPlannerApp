using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API_Diet_planner.Data;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using API_Diet_planner.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Diet_planner.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            // var user = User.FindFirst(ClaimTypes.Name)?.Value;
            var users = await _userRepository.GetUsersAsync();
            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(usersToReturn);
        }

        //api/users/3
        //[Authorize]
        // [HttpGet("{id}")]
        // public async Task<ActionResult<UserDto>> GetUserById(int id)
        // {
        //     var user = await _userRepository.GetUserByIdAsync(id);

        //     return new UserDto
        //     {
        //         Id=user.Id,
        //         Username = user.UserName
        //     };
        // }

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDto>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            return _mapper.Map<UserDto>(user);
        }
    }
}
