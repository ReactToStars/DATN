using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class DetailModuleClassService : BaseService<DetailModuleClass>, IDetailModuleClassService
    {
        #region Declare
        IDetailModuleClassRepository _detailModuleClassRepository;
        #endregion
        #region Constructor
        public DetailModuleClassService(IDetailModuleClassRepository detailModuleClassRepository) : base(detailModuleClassRepository)
        {
            _detailModuleClassRepository = detailModuleClassRepository;
        }
        #endregion
   
    }
}
