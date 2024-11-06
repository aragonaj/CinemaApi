using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUsersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApiUser",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    UserEmail = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ApìUser__389F25F609", x => x.id);
                });

            //migrationBuilder.CreateTable(
            //    name: "Country",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        CountryName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Country__3213E83FEB099251", x => x.id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Movie",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Title = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
            //        MovieYear = table.Column<int>(type: "int", nullable: true),
            //        RunningTime = table.Column<int>(type: "int", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Movie__3213E83FA7FE69AD", x => x.id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Director",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        DirectorName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
            //        Born = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
            //        Country = table.Column<int>(type: "int", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Director__3213E83FD686AF27", x => x.id);
            //        table.ForeignKey(
            //            name: "FK__Director__Countr__5FB337D6",
            //            column: x => x.Country,
            //            principalTable: "Country",
            //            principalColumn: "id");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Music",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        MusicName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
            //        Born = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
            //        Country = table.Column<int>(type: "int", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__Music__3213E83F1F25F609", x => x.id);
            //        table.ForeignKey(
            //            name: "FK__Music__Country__628FA481",
            //            column: x => x.Country,
            //            principalTable: "Country",
            //            principalColumn: "id");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "MovieDirector",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Movie = table.Column<int>(type: "int", nullable: true),
            //        Director = table.Column<int>(type: "int", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__MovieDir__3213E83F45BB5D7F", x => x.id);
            //        table.ForeignKey(
            //            name: "FK__MovieDire__Direc__66603565",
            //            column: x => x.Director,
            //            principalTable: "Director",
            //            principalColumn: "id");
            //        table.ForeignKey(
            //            name: "FK__MovieDire__Movie__656C112C",
            //            column: x => x.Movie,
            //            principalTable: "Movie",
            //            principalColumn: "id");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "MovieMusic",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Movie = table.Column<int>(type: "int", nullable: true),
            //        Music = table.Column<int>(type: "int", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK__MovieMus__3213E83F0025C639", x => x.id);
            //        table.ForeignKey(
            //            name: "FK__MovieMusi__Movie__693CA210",
            //            column: x => x.Movie,
            //            principalTable: "Movie",
            //            principalColumn: "id");
            //        table.ForeignKey(
            //            name: "FK__MovieMusi__Music__6A30C649",
            //            column: x => x.Music,
            //            principalTable: "Music",
            //            principalColumn: "id");
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_Director_Country",
            //    table: "Director",
            //    column: "Country");

            //migrationBuilder.CreateIndex(
            //    name: "IX_MovieDirector_Director",
            //    table: "MovieDirector",
            //    column: "Director");

            //migrationBuilder.CreateIndex(
            //    name: "IX_MovieDirector_Movie",
            //    table: "MovieDirector",
            //    column: "Movie");

            //migrationBuilder.CreateIndex(
            //    name: "IX_MovieMusic_Movie",
            //    table: "MovieMusic",
            //    column: "Movie");

            //migrationBuilder.CreateIndex(
            //    name: "IX_MovieMusic_Music",
            //    table: "MovieMusic",
            //    column: "Music");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Music_Country",
            //    table: "Music",
            //    column: "Country");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "ApiUser");

            //migrationBuilder.DropTable(
            //    name: "MovieDirector");

            //migrationBuilder.DropTable(
            //    name: "MovieMusic");

            //migrationBuilder.DropTable(
            //    name: "Director");

            //migrationBuilder.DropTable(
            //    name: "Movie");

            //migrationBuilder.DropTable(
            //    name: "Music");

            //migrationBuilder.DropTable(
            //    name: "Country");
        }
    }
}
