using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class BuildingController : BaseEntityController<Building>
    {
        #region Declare
        IBuildingService _baseService;
        #endregion
        #region Constructor
        public BuildingController(IBuildingService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
