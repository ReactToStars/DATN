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
    
    public class TechnicalStaffController : BaseEntityController<TechnicalStaff>
    {
        ITechnicalStaffService _technicalStaffService;
        public TechnicalStaffController(ITechnicalStaffService technicalStaffService):base(technicalStaffService)
        {
            this._technicalStaffService = technicalStaffService;
        }
    }
}
