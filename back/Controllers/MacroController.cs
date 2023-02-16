using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.Data;
using API_Diet_planner.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Security.Claims;
using AutoMapper;
using API_Diet_planner.DTOs;

namespace API_Diet_planner.Controllers
{
    public class MacroController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MacroController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<MacroDto>> GetMacroByUserId()
        {
            //var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var macro = await _context.Macros.SingleOrDefaultAsync(x => x.AppUser.Id == userId);
            var macroDto = new MacroDto 
            {
                Kcal = macro.Kcal,
                Proteins = macro.Proteins,
                Fat = macro.Fat,
                Carbs = macro.Carbs
            };
           
            return macroDto;
        }

        [HttpPut]
        public async Task<ActionResult<Macro>> UpdateUserMacro(MacroUpdateDto macroUpdateDto)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            var macro = await _context.Macros.SingleOrDefaultAsync(x => x.AppUser.Id == userId);
            
            _mapper.Map(macroUpdateDto, macro);

            // Update(macro);
            _context.Entry(macro).State = EntityState.Modified;
            // if(await SaveAllAsync()) return NoContent();
            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return BadRequest("Failed to update user's macro");
        }

        // public void Update(Macro macro)
        // {
        //     _context.Entry(macro).State = EntityState.Modified;
        // }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0;
        // }
    }
}