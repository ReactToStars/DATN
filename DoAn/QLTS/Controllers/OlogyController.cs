using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class OlogyController : BaseEntityController<Ology>
    {
        #region Declare
        IOlogyService _baseService;
        #endregion
        #region Constructor
        public OlogyController(IOlogyService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
