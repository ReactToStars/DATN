using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class ModuleClassService : BaseService<ModuleClass>, IModuleClassService

    {
        #region Declare
        IModuleClassRepository _moduleClassRepository;
        #endregion
        #region Constructor
        public ModuleClassService(IModuleClassRepository moduleClassRepository) : base(moduleClassRepository)
        {
            _moduleClassRepository = moduleClassRepository;
        }
        #endregion
   
    }
}
