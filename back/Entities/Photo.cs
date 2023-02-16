using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.Entities
{
    public class Photo
    {
        [ForeignKey("Meal")]
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public virtual Meal Meal { get; set; }
    }
}