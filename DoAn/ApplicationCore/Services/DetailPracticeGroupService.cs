using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class DetailPracticeGroupService : BaseService<DetailPracticeGroup>, IDetailPracticeGroupService
    {
        #region Declare
        IDetailPracticeGroupRepository _detailPracticeGroupRepository;
        #endregion
        #region Constructor
        public DetailPracticeGroupService(IDetailPracticeGroupRepository detailPracticeGroupRepository) : base(detailPracticeGroupRepository)
        {
            _detailPracticeGroupRepository = detailPracticeGroupRepository;
        }
        #endregion
   
    }
}
