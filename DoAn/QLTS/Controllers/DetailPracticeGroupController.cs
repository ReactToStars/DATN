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
    public class DetailPracticeGroupController : BaseEntityController<DetailPracticeGroup>
    {
        #region Declare
        IDetailPracticeGroupService _baseService;
        #endregion
        #region Constructor
        public DetailPracticeGroupController(IDetailPracticeGroupService baseService) : base(baseService)
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
