using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class BuildingService : BaseService<Building>, IBuildingService
    {
        #region Declare
        IBuildingRepository _buildingsRepository;
        #endregion
        #region Constructor
        public BuildingService(IBuildingRepository buildingsRepository) : base(buildingsRepository)
        {
            _buildingsRepository = buildingsRepository;
        }
        #endregion
   
    }
}
