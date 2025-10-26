using EmployeeServer.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeServer.Data
{

    public class EmpDbContext : DbContext
    {
        public EmpDbContext(DbContextOptions<EmpDbContext> options)
        : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EmployeeEntity>().ToTable("Employee");
        }


        public DbSet<EmployeeEntity> Employee { get; set; }
    }
}
