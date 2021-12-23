using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class TechnicalStaffRepository : BaseRepository<TechnicalStaff>, ITechnicalStaffRepository
    {
        public TechnicalStaffRepository(IConfiguration configuration):base(configuration)
        {

        }
    }
}
