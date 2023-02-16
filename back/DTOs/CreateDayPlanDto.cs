using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class CreateDayPlanDto
    {
        public string DayDate { get; set; }
        public int appUserId { get; set; }
    }
}