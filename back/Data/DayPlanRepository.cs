using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using API_Diet_planner.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Diet_planner.Data.Migrations
{
    public class DayPlanRepository : IDayPlanRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DayPlanRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<ActionResult<DayPlan>> CreateDayPlan(CreateDayPlanDto dayPlanDto)
        {
            var dayPlan = new DayPlan
            {
                DayDate = DateTime.Parse(dayPlanDto.DayDate),
            };

            AppUser appUser = await _context.Users.FindAsync(dayPlanDto.appUserId);

            dayPlan.AppUser = appUser;

            _context.DayPlans.Add(dayPlan);

            await SaveAllAsync();

            return dayPlan;
        }

        public Task<DayPlan> GetDayPlanById(int id)
        {
            throw new NotImplementedException();
        }

        // public async Task<DayPlan> GetDayPlanById(int id)
        // {
        //     var dayPlan = await _context.DayPlans.FindAsync(id);
        //     Update(dayPlan);
        //     return dayPlan;
        // }


        // public async Task<IEnumerable<DayPlanDto>> GetDayPlanByUserId(int appUserId)
        // {
        //     // var dayPlan =  await _context.DayPlans
        //     // .Include(a => a.AppUser)
        //     // .Include(m => m.Meals)
        //     // .ThenInclude(c => c.Category)
        //     // .Where(x => x.AppUser.Id == appUserId)
        //     // .ToListAsync();
        //     // return dayPlan;

        //     return await _context.DayPlans
        //         .Where(x => x.AppUser.Id == appUserId)
        //         .ProjectTo<DayPlanDto>(_mapper.ConfigurationProvider)
        //         .ToListAsync();
        // }

        public async Task<ActionResult<DayPlanDto>> AddMeal(int mealId, int dayPlanId)
        {
            var meal = await _context.Meals.FindAsync(mealId);
            DayPlan dayPlan = await _context.DayPlans
            .Include(a => a.AppUser)
            .Include(m => m.Meals)
            .FirstOrDefaultAsync(x => x.Id == dayPlanId);

            // if(!dayPlan.Meals.Any(x => x.Id == meal.Id))
            // {
                
                dayPlan.Meals.Add(meal);
                await SaveAllAsync();
                
                return new DayPlanDto{
                    Id = dayPlan.Id,
                    DayDate = dayPlan.DayDate.ToString(),
                    appUserId = dayPlan.AppUser.Id,
                };
            // }
            // return false;
        }

        public async Task<ActionResult<DayPlanDto>> RemoveMeal(int mealId, int dayPlanId)
        {
            //var meal = await _context.Meals.FindAsync(mealId);

            DayPlan dayPlan = await _context.DayPlans
            .Include(a => a.AppUser)
            .Include(m => m.Meals)
            .FirstOrDefaultAsync(x => x.Id == dayPlanId);

            var meal = dayPlan.Meals.FirstOrDefault(x => x.Id == mealId);

            dayPlan.Meals.Remove(meal);

            await SaveAllAsync();

            return new DayPlanDto{
                    Id = dayPlan.Id,
                    DayDate = dayPlan.DayDate.ToString(),
                    appUserId = dayPlan.AppUser.Id,
                };
        }



        public async Task<ActionResult<DayPlanDto>> GetDayPlanByUserIdAndDate(int appUserId, string dayDate)
        {
            return await _context.DayPlans
            .Where(x => x.AppUser.Id == appUserId && x.DayDate == DateTime.Parse(dayDate))
            .ProjectTo<DayPlanDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
        }

        public async Task<bool> DayPlanExists(CreateDayPlanDto dayPlanDto)
        {
            return await _context.DayPlans.AnyAsync(x => (x.DayDate == System.DateTime.Parse(dayPlanDto.DayDate) && x.AppUser.Id == dayPlanDto.appUserId));
        }

        public async Task<bool> MealExists(int mealId, int dayPlanId)
        {
            DayPlan dayPlan = await _context.DayPlans
            .Include(m => m.Meals)
            .FirstOrDefaultAsync(x => x.Id == dayPlanId);

            return dayPlan.Meals.Any(x => x.Id == mealId);
        }

        // Task<DayPlanDto> IDayPlanRepository.GetDayPlanById(int id)
        // {
        //     throw new NotImplementedException();
        // }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(DayPlan dayPlan)
        {
            _context.Entry(dayPlan).State = EntityState.Modified;
        }

    }
}