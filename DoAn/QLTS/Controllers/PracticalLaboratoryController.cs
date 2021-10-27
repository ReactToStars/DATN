using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class PracticalLaboratoryController : BaseEntityController<PracticalLaboratory>
    {
        #region Declare
        IPracticalLaboratoryService _baseService;
        #endregion
        #region Constructor
        public PracticalLaboratoryController(IPracticalLaboratoryService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
