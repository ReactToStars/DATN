using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class MajorsService : BaseService<Majors>, IMajorsService
    {
        #region Declare
        IMajorsRepository _MajorsRepository;
        #endregion
        #region Constructor
        public MajorsService(IMajorsRepository MajorsRepository) : base(MajorsRepository)
        {
            _MajorsRepository = MajorsRepository;
        }
        #endregion
   
    }
}
