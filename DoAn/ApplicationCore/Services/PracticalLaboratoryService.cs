using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class PracticalLaboratoryService : BaseService<PracticalLaboratory>, IPracticalLaboratoryService
    {
        #region Declare
        IPracticalLaboratoryRepository _PracticalLaboratoryRepository;
        #endregion
        #region Constructor
        public PracticalLaboratoryService(IPracticalLaboratoryRepository PracticalLaboratoryRepository) : base(PracticalLaboratoryRepository)
        {
            _PracticalLaboratoryRepository = PracticalLaboratoryRepository;
        }
        #endregion
   
    }
}
