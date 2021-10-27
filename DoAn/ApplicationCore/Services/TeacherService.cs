using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class TeacherService : BaseService<Teacher>, ITeacherService
    {
        #region Declare
        ITeacherRepository _TeacherRepository;
        #endregion
        #region Constructor
        public TeacherService(ITeacherRepository TeacherRepository) : base(TeacherRepository)
        {
            _TeacherRepository = TeacherRepository;
        }
        #endregion
   
    }
}
