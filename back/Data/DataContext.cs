using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.Entities;
using Microsoft.EntityFrameworkCore;

namespace API_Diet_planner.Data
{
    public class DataContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder builder) {
        builder.Entity<MealIngredient>().HasKey(e => new {e.MealId, e.IngredientId});
        builder.Entity<IngredientShoppingList>().HasKey(e => new {e.IngredientId, e.ShoppingListId});
    }
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Meal> Meals {get; set;}
        public DbSet<Category> Categories {get; set;}
        public DbSet<DayPlan> DayPlans {get; set;}
        public DbSet<Macro> Macros {get; set;}
        public DbSet<MealMacro> MealMacros {get; set;}
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<MealIngredient> MealIngredients { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<IngredientShoppingList> IngredientShoppingLists { get; set; }
        public DbSet<Unit> Units { get; set; }

    }
}