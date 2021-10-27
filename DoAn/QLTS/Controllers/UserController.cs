using ApplicationCore;
using ApplicationCore.Entities;
using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class UserController : BaseEntityController<User>
    {
        #region Declare
        IUserService _baseService;
        #endregion
        #region Constructor
        
        public UserController(IUserService baseService) : base(baseService)
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
            if (roleAcount == "Member")
            {
                role = "Member";
            }
            return role;
        }

    }
}
