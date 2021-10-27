using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class PermissionController : BaseEntityController<Permission>
    {
        #region Declare
        IPermissionService _baseService;
        #endregion
        #region Constructor
        public PermissionController(IPermissionService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
