using Dapper;
using Microsoft.Extensions.Configuration;
using ApplicationCore.Interface;
using ApplicationCore.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Infrastructure
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeReponsitory
    {
        public EmployeeRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #region Method
        /// <summary>
        /// Hàm lấy ra nhân viên theo tiêu chí
        /// </summary>
        /// <param name="codeAndNameAndPhone">Mã hoặc tên hoặc số điện thoại</param>
        /// <param name="departmentId">Khóa chính phòng ban</param>
        /// <param name="positionId">Khóa chính vị trí</param>
        /// <returns>Những nhân viên thỏa mãn tiêu chí</returns>
        /// CreatedBy: NDTUNG (19/1/2021)
        public IEnumerable<Employee> GetEmployeeByCodeAndNameAndPhone(string codeAndNameAndPhone, Guid? departmentId, Guid? positionId)
        {
            var param = new DynamicParameters();
            param.Add("@Code_Name_Phone", codeAndNameAndPhone != null ? codeAndNameAndPhone : string.Empty);
            param.Add("@DepartmentID", departmentId, DbType.String);
            param.Add("@PositionId", positionId, DbType.String);
            var findemployee = _dbConnection.Query<Employee>("Proc_GetEmployeeByCodeAndNameAndPhone", param, commandType: CommandType.StoredProcedure).ToList();
            return findemployee;
        }
        #endregion
    }
}
