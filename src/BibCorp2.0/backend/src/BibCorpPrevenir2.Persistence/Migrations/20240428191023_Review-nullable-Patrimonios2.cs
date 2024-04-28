using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibCorpPrevenir2.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ReviewnullablePatrimonios2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Sala",
                table: "Patrimonios",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Prateleira",
                table: "Patrimonios",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Posicao",
                table: "Patrimonios",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Localizacao",
                table: "Patrimonios",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "DataIndisponibilidade",
                table: "Patrimonios",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Coluna",
                table: "Patrimonios",
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
                table: "Patrimonios",
                keyColumn: "Sala",
                keyValue: null,
                column: "Sala",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Sala",
                table: "Patrimonios",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Patrimonios",
                keyColumn: "Prateleira",
                keyValue: null,
                column: "Prateleira",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Prateleira",
                table: "Patrimonios",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Patrimonios",
                keyColumn: "Posicao",
                keyValue: null,
                column: "Posicao",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Posicao",
                table: "Patrimonios",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Patrimonios",
                keyColumn: "Localizacao",
                keyValue: null,
                column: "Localizacao",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Localizacao",
                table: "Patrimonios",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Patrimonios",
                keyColumn: "DataIndisponibilidade",
                keyValue: null,
                column: "DataIndisponibilidade",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "DataIndisponibilidade",
                table: "Patrimonios",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Patrimonios",
                keyColumn: "Coluna",
                keyValue: null,
                column: "Coluna",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Coluna",
                table: "Patrimonios",
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
