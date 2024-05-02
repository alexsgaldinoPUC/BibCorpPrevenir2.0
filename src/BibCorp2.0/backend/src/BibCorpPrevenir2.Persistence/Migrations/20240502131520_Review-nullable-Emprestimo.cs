using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibCorpPrevenir2.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ReviewnullableEmprestimo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LocalDeEntrega",
                table: "Emprestimos",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "LocalDeColeta",
                table: "Emprestimos",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Emprestimos",
                keyColumn: "LocalDeEntrega",
                keyValue: null,
                column: "LocalDeEntrega",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "LocalDeEntrega",
                table: "Emprestimos",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Emprestimos",
                keyColumn: "LocalDeColeta",
                keyValue: null,
                column: "LocalDeColeta",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "LocalDeColeta",
                table: "Emprestimos",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
