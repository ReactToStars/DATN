using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class SemesterController : BaseEntityController<Semester>
    {
        #region Declare
        ISemesterService _baseService;
        #endregion
        #region Constructor
        public SemesterController(ISemesterService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
