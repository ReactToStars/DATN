using ApplicationCore.Interface;
using ApplicationCore.Models;

namespace ApplicationCore.Services
{
    public class EquipmentService : BaseService<Equipment>, IEquipmentService
    {
        IEquipmentRepository _equipmentRepository;
        public EquipmentService(IEquipmentRepository equipmentRepository):base(equipmentRepository)
        {
            this._equipmentRepository = equipmentRepository;
        }
    }
}
