using ApplicationCore;
using ApplicationCore.Entities;
using ApplicationCore.Interface;
using ApplicationCore.Models;
using DATN.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyThucHanh.Controllers
{

    public class AccountController : BaseEntityController<User>
    {
        #region Declare
        IUserService _baseService;
        #endregion
        #region Constructor

        public AccountController(IUserService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
        [HttpPost("Login")]
        public IActionResult Login([FromBody] User user)
        {
            ServiceResult _serviceResult = new ServiceResult();

            var accounts = _baseService.GetEntities();
            var account = new User();

            account = accounts.Where(x => x.UserName == user.UserName && x.PassWord == user.PassWord).FirstOrDefault();
            if (account != null)
            {
                _serviceResult.Code = Code.Success;
                _serviceResult.Data = "https://" + Request.Host.Value + ("/view/home.html");
                _serviceResult.Messenger = "Đăng nhập thành công!";
                HttpContext.Session.SetString("Role", account.PermissionName);
                HttpContext.Session.SetString("AcountID", account.UserID.ToString());
             
            }
            else
            {
                _serviceResult.Code = Code.NotValid;
                _serviceResult.Messenger = "Vui lòng kiểm tra lại Tên đăng nhập hoặc Mật khẩu của bạn!";
            }
            return Ok(_serviceResult);
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            ServiceResult _serviceResult = new ServiceResult();
            _serviceResult.Code = Code.Success;
            _serviceResult.Data = "https://" + Request.Host.Value + ("/view/login.html");
            _serviceResult.Messenger = "Đăng xuất thành công!";
            HttpContext.Session.SetString("Role", "");
            HttpContext.Session.SetString("AcountID", "");
            return Ok(_serviceResult);
        }
    }
}
