using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class ClassService : BaseService<@Class>, IClassService
    {
        #region Declare
        IClassRepository _classRepository;
        #endregion
        #region Constructor
        public ClassService(IClassRepository classRepository) : base(classRepository)
        {
            _classRepository = classRepository;
        }
        #endregion
   
    }
}
