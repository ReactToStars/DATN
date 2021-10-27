using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class MajorsController : BaseEntityController<Majors>
    {
        #region Declare
        IMajorsService _baseService;
        #endregion
        #region Constructor
        public MajorsController(IMajorsService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
