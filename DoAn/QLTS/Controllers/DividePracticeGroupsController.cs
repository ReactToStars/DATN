using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DATN.Controllers
{
    public class DividePracticeGroupsController : BaseEntityController<PracticeGroup>
    {
        IPracticeGroupService _service;
        public DividePracticeGroupsController(IPracticeGroupService baseService) : base(baseService)
        {
            this._service = baseService;
        }

        public override string GetRole()
        {
            var role = "Admin";
            var roleAccount = HttpContext.Session.GetString("Role");
            if(roleAccount == "Teacher")
            {
                role = "Teacher";
            }
            if(roleAccount != "Teacher" && roleAccount != "Admin")
            {
                role = "";
            }
            return role;
        }

    }
}
