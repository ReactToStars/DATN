using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class StudentService : BaseService<Student>, IStudentService
    {
        #region Declare
        IStudentRepository _StudentRepository;
        #endregion
        #region Constructor
        public StudentService(IStudentRepository StudentRepository) : base(StudentRepository)
        {
            _StudentRepository = StudentRepository;
        }
        #endregion
   
    }
}
