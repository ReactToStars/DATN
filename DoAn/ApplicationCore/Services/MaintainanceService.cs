using ApplicationCore.Interface;
using ApplicationCore.Models;

namespace ApplicationCore.Services
{
    public class MaintainanceService : BaseService<Maintainance>, IMaintainanceService
    {
        IMaintainanceRepository _maintainanceRepository;
        public MaintainanceService(IMaintainanceRepository maintainanceRepository):base(maintainanceRepository)
        {
            this._maintainanceRepository = maintainanceRepository;
        }
    }
}
