using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.Data;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Diet_planner.Controllers
{
    public class UnitController  : BaseApiController
    {
        private readonly DataContext _context;
        public UnitController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Unit>>> GetCategories()
        {
            var units = await _context.Units.ToListAsync();
            return units;
        }

        [HttpPost]
        public async Task<ActionResult<UnitDto>> InsertCategory(UnitDto unitDto)
        {
            if(await CategoryExists(unitDto.UnitName)) return BadRequest("Unit exists");

            var unit = new Unit
            {
                UnitName = unitDto.UnitName
            };

            _context.Units.Add(unit);
            await _context.SaveChangesAsync();

            return new UnitDto
            {
                UnitName = unit.UnitName
            };
        }

        private async Task<bool> CategoryExists(string unitName)
        {
            return await _context.Units.AnyAsync(x => x.UnitName.ToLower() == unitName.ToLower());
        }
    }
}