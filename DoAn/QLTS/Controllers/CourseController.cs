using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class CourseController : BaseEntityController<Course>
    {
        #region Declare
        ICourseService _baseService;
        #endregion
        #region Constructor
        public CourseController(ICourseService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
