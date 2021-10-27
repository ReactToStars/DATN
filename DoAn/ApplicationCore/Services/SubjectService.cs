using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class SubjectService : BaseService<Subject>, ISubjectService
    {
        #region Declare
        ISubjectRepository _subjectRepository;
        #endregion
        #region Constructor
        public SubjectService(ISubjectRepository subjectRepository) : base(subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }
        #endregion
   
    }
}
