using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class EquipmentRepository : BaseRepository<Equipment>, IEquipmentRepository
    {
        public EquipmentRepository(IConfiguration configuration):base(configuration)
        {

        }
    }
}
