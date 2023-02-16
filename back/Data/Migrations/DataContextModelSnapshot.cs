﻿// <auto-generated />
using System;
using API_Diet_planner.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API_Diet_planner.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("API_Diet_planner.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("bytea");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("CategoryName")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.DayPlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("AppUserId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DayDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("DayPlans");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("IngredientName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.IngredientShoppingList", b =>
                {
                    b.Property<int>("IngredientId")
                        .HasColumnType("integer");

                    b.Property<int>("ShoppingListId")
                        .HasColumnType("integer");

                    b.Property<float>("Quantity")
                        .HasColumnType("real");

                    b.Property<int?>("UnitId")
                        .HasColumnType("integer");

                    b.Property<bool>("isChecked")
                        .HasColumnType("boolean");

                    b.HasKey("IngredientId", "ShoppingListId");

                    b.HasIndex("ShoppingListId");

                    b.HasIndex("UnitId");

                    b.ToTable("IngredientShoppingLists");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Macro", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<int>("Carbs")
                        .HasColumnType("integer");

                    b.Property<int>("Fat")
                        .HasColumnType("integer");

                    b.Property<int>("Kcal")
                        .HasColumnType("integer");

                    b.Property<int>("Proteins")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Macros");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Meal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("ImagePath")
                        .HasColumnType("text");

                    b.Property<string>("MealName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Meals");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.MealIngredient", b =>
                {
                    b.Property<int>("MealId")
                        .HasColumnType("integer");

                    b.Property<int>("IngredientId")
                        .HasColumnType("integer");

                    b.Property<float>("Quantity")
                        .HasColumnType("real");

                    b.Property<int?>("UnitId")
                        .HasColumnType("integer");

                    b.HasKey("MealId", "IngredientId");

                    b.HasIndex("IngredientId");

                    b.HasIndex("UnitId");

                    b.ToTable("MealIngredients");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.MealMacro", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<int>("Carbs")
                        .HasColumnType("integer");

                    b.Property<int>("Fat")
                        .HasColumnType("integer");

                    b.Property<int>("Kcal")
                        .HasColumnType("integer");

                    b.Property<int>("Proteins")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("MealMacros");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Photo", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<string>("PublicId")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Photo");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.ShoppingList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("AppUserId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DayDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("ShoppingLists");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Unit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("UnitName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("DayPlanMeal", b =>
                {
                    b.Property<int>("DayPlansId")
                        .HasColumnType("integer");

                    b.Property<int>("MealsId")
                        .HasColumnType("integer");

                    b.HasKey("DayPlansId", "MealsId");

                    b.HasIndex("MealsId");

                    b.ToTable("DayPlanMeal");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.DayPlan", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.AppUser", "AppUser")
                        .WithMany()
                        .HasForeignKey("AppUserId");

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.IngredientShoppingList", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.Ingredient", "Ingredient")
                        .WithMany("IngredientShoppingLists")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_Diet_planner.Entities.ShoppingList", "ShoppingList")
                        .WithMany("IngredientShoppingLists")
                        .HasForeignKey("ShoppingListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_Diet_planner.Entities.Unit", "Unit")
                        .WithMany()
                        .HasForeignKey("UnitId");

                    b.Navigation("Ingredient");

                    b.Navigation("ShoppingList");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Macro", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.AppUser", "AppUser")
                        .WithOne("Macro")
                        .HasForeignKey("API_Diet_planner.Entities.Macro", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Meal", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.MealIngredient", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.Ingredient", "Ingredient")
                        .WithMany("MealIngredients")
                        .HasForeignKey("IngredientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_Diet_planner.Entities.Meal", "Meal")
                        .WithMany("MealIngredients")
                        .HasForeignKey("MealId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_Diet_planner.Entities.Unit", "Unit")
                        .WithMany()
                        .HasForeignKey("UnitId");

                    b.Navigation("Ingredient");

                    b.Navigation("Meal");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.MealMacro", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.Meal", "Meal")
                        .WithOne("MealMacro")
                        .HasForeignKey("API_Diet_planner.Entities.MealMacro", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Meal");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Photo", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.Meal", "Meal")
                        .WithOne("Photo")
                        .HasForeignKey("API_Diet_planner.Entities.Photo", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Meal");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.ShoppingList", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.AppUser", "AppUser")
                        .WithMany()
                        .HasForeignKey("AppUserId");

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("DayPlanMeal", b =>
                {
                    b.HasOne("API_Diet_planner.Entities.DayPlan", null)
                        .WithMany()
                        .HasForeignKey("DayPlansId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_Diet_planner.Entities.Meal", null)
                        .WithMany()
                        .HasForeignKey("MealsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API_Diet_planner.Entities.AppUser", b =>
                {
                    b.Navigation("Macro");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Ingredient", b =>
                {
                    b.Navigation("IngredientShoppingLists");

                    b.Navigation("MealIngredients");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.Meal", b =>
                {
                    b.Navigation("MealIngredients");

                    b.Navigation("MealMacro");

                    b.Navigation("Photo");
                });

            modelBuilder.Entity("API_Diet_planner.Entities.ShoppingList", b =>
                {
                    b.Navigation("IngredientShoppingLists");
                });
#pragma warning restore 612, 618
        }
    }
}
