using ApplicationCore.Interface;
using ApplicationCore.Models;
using DATN.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class PracticeShiftController : BaseEntityController<PracticeShift>
    {
        protected readonly IPracticeShiftService _practiceShiftService;
        public PracticeShiftController(IPracticeShiftService practiceShiftService):base(practiceShiftService)
        {
            this._practiceShiftService = practiceShiftService;
        }
    }
}
