using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace ApplicationCore.Interface
{
     public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Lấy toàn bộ danh sách 
        /// </summary>
        /// <returns>Danh sách dữ liệu</returns>
        /// CreatedBy: NDTUNG (11/1/2021)
        IEnumerable<TEntity> GetEntities();

        IEnumerable<TEntity> GetEntities(Guid entityId);

        /// <summary>
        /// Lấy dữ liệu theo mã khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>object đầu tiên lấy được</returns>
        /// CreatedBy: NDTUNG (11/1/2021)
        TEntity GetEntityById(Guid entityId);

        TEntity FindById(Guid entityId);

        ///// <summary>
        ///// Lấy dữ liệu theo mã
        ///// </summary>
        ///// <param name="entityCode">Mã dữ liệu</param>
        ///// <returns>object đầu tiên lấy được</returns>
        ///// CreatedBy: NDTUNG (11/1/2021)
        //TEntity GetEntityByCode(string entityCode);

        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="entity">object dữ liệu</param>
        /// <returns>Trả về số bản ghi thêm mới được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        int AddEntity(TEntity entity);

        /// <summary>
        /// Cập nhật dữ liệu
        /// </summary>
        /// <param name="entity">object dữ liệu</param>
        /// <returns>Trả về số bản ghi cập nhật được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        int UpdateEntity(TEntity entity);

        /// <summary>
        /// Xóa dữ liệu theo khóa chính
        /// </summary>
        /// <param name="entityId">khóa chính dữ liệu</param>
        /// <returns>Trả về số bản ghi xóa được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        int DeleteEntity(Guid entityId);

        /// <summary>
        /// Lấy thông tin theo property
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="specs"></param>
        /// <returns></returns>
        ///CreatedBy:NDTUNG (16/1/2021)
        TEntity GetEntityByProperty( TEntity entity, PropertyInfo property);
    }
}
