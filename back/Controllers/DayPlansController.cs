using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using API_Diet_planner.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API_Diet_planner.Controllers
{
    public class DayPlansController : BaseApiController
    {
        private readonly IDayPlanRepository _dayPlanRepository;
        private readonly IMapper _mapper;
        public DayPlansController(IDayPlanRepository dayPlanRepository, IMapper mapper)
        {
            _mapper = mapper;
            _dayPlanRepository = dayPlanRepository;
        }

        // [HttpGet("{appUserId}")]
        // public async Task<IEnumerable<DayPlanDto>> GetDayPlan(int appUserId)
        // {
        //     var dayPlans = await _dayPlanRepository.GetDayPlanByUserId(appUserId);
        //     var dayPlansToReturn = _mapper.Map<IEnumerable<DayPlanDto>>(dayPlans);
        //     return dayPlansToReturn;
        // }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<DayPlan>> GetDayPlan(int id)
        // {
        //     return await _dayPlanRepository.GetDayPlanById(id);
        // }

        [HttpPost]
        public async Task<ActionResult<DayPlan>> CreateDayPlan(CreateDayPlanDto dayPlanDto)
        {
            if(await _dayPlanRepository.DayPlanExists(dayPlanDto)) return BadRequest("This day plan already exists");
            return await _dayPlanRepository.CreateDayPlan(dayPlanDto);
        }

        [HttpPut]
        public async Task<ActionResult<DayPlanDto>> AddMeal(int mealId, int dayPlanId)
        {
            if(await _dayPlanRepository.MealExists(mealId, dayPlanId)) return BadRequest("This meal exists");
            return await _dayPlanRepository.AddMeal(mealId, dayPlanId);
        }

        [HttpDelete]
        public async Task<ActionResult<DayPlanDto>> RemoveMeal(int mealId, int dayPlanId)
        {
            return await _dayPlanRepository.RemoveMeal(mealId, dayPlanId);
        }

        [HttpGet("{appUserId}/{dayDate}")]
        public async Task<ActionResult<DayPlanDto>> GetDayPlanByDay(int appUserId, string dayDate)
        {
            var dayPlans = await _dayPlanRepository.GetDayPlanByUserIdAndDate(appUserId, dayDate);
            if(dayPlans == null) return BadRequest("No dayplan in that day");
            else return dayPlans;
            //return BadRequest("No dayplan in that day");
        }
    }
}