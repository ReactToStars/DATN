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
    public class MaintainanceController : BaseEntityController<Maintainance>
    {
        IMaintainanceService _maintainanceService;
        public MaintainanceController(IMaintainanceService maintainanceService) : base(maintainanceService)
        {
            this._maintainanceService = maintainanceService;
        }
    }
}
