using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API_Diet_planner.Interfaces
{
    public interface IDayPlanRepository
    {
        Task<ActionResult<DayPlanDto>> GetDayPlanByUserIdAndDate(int appUserId, string dayDate);
        Task<ActionResult<DayPlan>> CreateDayPlan(CreateDayPlanDto dayPlanDto);
        Task<ActionResult<DayPlanDto>> AddMeal(int mealId, int dayPlanId);
        Task<ActionResult<DayPlanDto>> RemoveMeal(int mealId, int dayPlanId);
        Task<bool> DayPlanExists(CreateDayPlanDto dayPlanDto);
        Task<bool> MealExists(int mealId, int dayPlanId);
        Task<bool> SaveAllAsync();
        void Update(DayPlan dayPlan);
    }
}