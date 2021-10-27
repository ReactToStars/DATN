using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class PracticeGroupController : BaseEntityController<PracticeGroup>
    {
        #region Declare
        IPracticeGroupService _baseService;
        #endregion
        #region Constructor
        public PracticeGroupController(IPracticeGroupService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
        public override string GetRole()
        {
            string role = "Admin";
            var roleAcount = HttpContext.Session.GetString("Role");
            if (roleAcount == "Teacher")
            {
                role = "Teacher";
            }
            if (roleAcount != "Teacher" && roleAcount != "Admin")
            {
                role = "";
            }


            return role;
        }
    }
}
