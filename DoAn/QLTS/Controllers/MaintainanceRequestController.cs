using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DATN.Controllers
{
    public class MaintainanceRequestController : BaseEntityController<Maintainance>
    {
        IMaintainanceService _service;
        public MaintainanceRequestController(IMaintainanceService baseService) : base(baseService)
        {
            _service = baseService;
        }

        public override string GetRole()
        {
            string role = "Admin";
            var roleAccount = HttpContext.Session.GetString("Role");
            if(roleAccount == "Teacher")
            {
                role = roleAccount;
            }
            if(roleAccount != "Teacher" && roleAccount != role)
            {
                role = "";
            }
            return role;
        }
    }
}
