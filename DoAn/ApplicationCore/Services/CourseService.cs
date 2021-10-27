using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class CourseService : BaseService<Course>, ICourseService
    {
        #region Declare
        ICourseRepository _courseRepository;
        #endregion
        #region Constructor
        public CourseService(ICourseRepository courseRepository) : base(courseRepository)
        {
            _courseRepository = courseRepository;
        }
        #endregion
   
    }
}
