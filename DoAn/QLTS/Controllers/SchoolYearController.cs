using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    
    //[Authorize(Roles = "Admin")]

    public class SchoolYearController : BaseEntityController<SchoolYear>
    {
        #region Declare
        ISchoolYearService _baseService;
        #endregion
        #region Constructor
        public SchoolYearController(ISchoolYearService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
