using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API_Diet_planner.Data.Migrations
{
    public partial class Unit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Unit",
                table: "MealIngredients");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "IngredientShoppingLists");

            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "MealIngredients",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "IngredientShoppingLists",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UnitName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MealIngredients_UnitId",
                table: "MealIngredients",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_IngredientShoppingLists_UnitId",
                table: "IngredientShoppingLists",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_IngredientShoppingLists_Units_UnitId",
                table: "IngredientShoppingLists",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MealIngredients_Units_UnitId",
                table: "MealIngredients",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_IngredientShoppingLists_Units_UnitId",
                table: "IngredientShoppingLists");

            migrationBuilder.DropForeignKey(
                name: "FK_MealIngredients_Units_UnitId",
                table: "MealIngredients");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropIndex(
                name: "IX_MealIngredients_UnitId",
                table: "MealIngredients");

            migrationBuilder.DropIndex(
                name: "IX_IngredientShoppingLists_UnitId",
                table: "IngredientShoppingLists");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "MealIngredients");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "IngredientShoppingLists");

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "MealIngredients",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "IngredientShoppingLists",
                type: "text",
                nullable: true);
        }
    }
}
