using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateeeeeeeeeeeaaa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Labels_Articles_ArticleId",
                table: "Labels");

            migrationBuilder.DropIndex(
                name: "IX_Labels_ArticleId",
                table: "Labels");

            migrationBuilder.RenameColumn(
                name: "ArticleId",
                table: "Labels",
                newName: "articleId");

            migrationBuilder.AddColumn<string>(
                name: "Companies_Ids",
                table: "NewArticleScore",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Companies_Score",
                table: "NewArticleScore",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "articleSentimet",
                table: "NewArticleScore",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "setimentScore",
                table: "NewArticleScore",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateTable(
                name: "ArticleLabels",
                columns: table => new
                {
                    ArticleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LabelsLabelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleLabels", x => new { x.ArticleId, x.LabelsLabelId });
                    table.ForeignKey(
                        name: "FK_ArticleLabels_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "ArticleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArticleLabels_Labels_LabelsLabelId",
                        column: x => x.LabelsLabelId,
                        principalTable: "Labels",
                        principalColumn: "LabelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleLabels_LabelsLabelId",
                table: "ArticleLabels",
                column: "LabelsLabelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArticleLabels");

            migrationBuilder.DropColumn(
                name: "Companies_Ids",
                table: "NewArticleScore");

            migrationBuilder.DropColumn(
                name: "Companies_Score",
                table: "NewArticleScore");

            migrationBuilder.DropColumn(
                name: "articleSentimet",
                table: "NewArticleScore");

            migrationBuilder.DropColumn(
                name: "setimentScore",
                table: "NewArticleScore");

            migrationBuilder.RenameColumn(
                name: "articleId",
                table: "Labels",
                newName: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_Labels_ArticleId",
                table: "Labels",
                column: "ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Labels_Articles_ArticleId",
                table: "Labels",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "ArticleId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
