using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class MaintainanceRepository : BaseRepository<Maintainance>, IMaintainanceRepository
    {
        public MaintainanceRepository(IConfiguration configuration):base(configuration)
        {

        }
    }
}
