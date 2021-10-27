using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class PracticeGroupService : BaseService<PracticeGroup>, IPracticeGroupService
    {
        #region Declare
        IPracticeGroupRepository _PracticeGroupRepository;
        #endregion
        #region Constructor
        public PracticeGroupService(IPracticeGroupRepository PracticeGroupRepository) : base(PracticeGroupRepository)
        {
            _PracticeGroupRepository = PracticeGroupRepository;
        }
        #endregion
   
    }
}
