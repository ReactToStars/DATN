﻿using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class PermissionService : BaseService<Permission>, IPermissionService
    {
        #region Declare
        IPermissionRepository _permissionRepository;
        #endregion
        #region Constructor
        public PermissionService(IPermissionRepository permissionRepository) : base(permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }
        #endregion
        #region Method
        /// <summary>
        /// Hàm lấy ra nhân viên theo tiêu chí
        /// </summary>
        /// <param name="codeAndNameAndPhone">Mã hoặc tên hoặc số điện thoại</param>
        /// <param name="departmentId">Khóa chính phòng ban</param>
        /// <param name="positionId">Khóa chính vị trí</param>
        /// <returns>Những nhân viên thỏa mãn tiêu chí</returns>
        /// CreatedBy: NDTUNG (19/1/2021)
        //public IEnumerable<Employee> GetEmployeeByCodeAndNameAndPhone(string codeAndNameAndPhone, Guid? departmentId, Guid? positionId)
        //{
        //    var employees = _employeeReponsitory.GetEmployeeByCodeAndNameAndPhone(codeAndNameAndPhone, departmentId, positionId);
        //    return employees;
        //}
        #endregion
    }
}
