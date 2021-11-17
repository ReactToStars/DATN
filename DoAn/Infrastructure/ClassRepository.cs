using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class ClassRepository : BaseRepository<@Class>, IClassRepository
    {
        public ClassRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
