using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class PracticeShiftService:BaseService<PracticeShift>, IPracticeShiftService
    {
        protected readonly IPracticeShiftRepository _practiceShiftRepository;
        public PracticeShiftService(IPracticeShiftRepository practiceShiftRepository):base(practiceShiftRepository)
        {
            this._practiceShiftRepository = practiceShiftRepository;
        }
    }
}
