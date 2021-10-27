using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class SubjectController : BaseEntityController<Subject>
    {
        #region Declare
        ISubjectService _baseService;
        #endregion
        #region Constructor
        public SubjectController(ISubjectService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
