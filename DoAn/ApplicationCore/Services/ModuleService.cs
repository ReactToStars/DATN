using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class ModuleService : BaseService<Module>, IModuleService

    {
        #region Declare
        IModuleRepository _moduleRepository;
        #endregion
        #region Constructor
        public ModuleService(IModuleRepository moduleRepository) : base(moduleRepository)
        {
            _moduleRepository = moduleRepository;
        }
        #endregion
   
    }
}
