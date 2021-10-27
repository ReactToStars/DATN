using ApplicationCore.Entities;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Interface
{
    public interface ITeacherService : IBaseService<Teacher>
    {
        

        /// <summary>
        /// Lấy dữ liệu phân trang
        /// </summary>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        /// CreatedBy: NDTUNG (15/1/2021)
        //IEnumerable<Ology> GetCustomerPaging(int limit, int offset);

        /// <summary>
        /// Lấy danh sách khách hàng theo nhóm khách hàng
        /// </summary>
        /// <param name="groupId">Id nhóm khách hàng</param>
        /// <returns></returns>
        /// CreatedBy: NDTUNG (15/1/2021)
        //IEnumerable<Ology> GetCustomerByGroup(Guid groupId);

    }
}
