using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addddss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Labels_Topic_TopicIdTopic",
                table: "Labels");

            migrationBuilder.DropIndex(
                name: "IX_Labels_TopicIdTopic",
                table: "Labels");

            migrationBuilder.DropColumn(
                name: "TopicIdTopic",
                table: "Labels");

            migrationBuilder.CreateTable(
                name: "newLabel",
                columns: table => new
                {
                    NewLabelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Item = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Score = table.Column<double>(type: "float", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    TopicId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_newLabel", x => x.NewLabelId);
                    table.ForeignKey(
                        name: "FK_newLabel_Topic_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topic",
                        principalColumn: "IdTopic",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_newLabel_TopicId",
                table: "newLabel",
                column: "TopicId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "newLabel");

            migrationBuilder.AddColumn<Guid>(
                name: "TopicIdTopic",
                table: "Labels",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Labels_TopicIdTopic",
                table: "Labels",
                column: "TopicIdTopic");

            migrationBuilder.AddForeignKey(
                name: "FK_Labels_Topic_TopicIdTopic",
                table: "Labels",
                column: "TopicIdTopic",
                principalTable: "Topic",
                principalColumn: "IdTopic");
        }
    }
}
