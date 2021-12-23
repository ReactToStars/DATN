using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class CourseRepository : BaseRepository<Course>, ICourseRepository
    {
        public CourseRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
