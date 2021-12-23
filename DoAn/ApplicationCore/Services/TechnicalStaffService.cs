using ApplicationCore.Interface;
using ApplicationCore.Models;

namespace ApplicationCore.Services
{
    public class TechnicalStaffService : BaseService<TechnicalStaff>, ITechnicalStaffService
    {
        ITechnicalStaffRepository _technicalStaffRepository;
        public TechnicalStaffService(ITechnicalStaffRepository technicalStaffRepository):base(technicalStaffRepository)
        {
            this._technicalStaffRepository = technicalStaffRepository;
        }
    }
}
