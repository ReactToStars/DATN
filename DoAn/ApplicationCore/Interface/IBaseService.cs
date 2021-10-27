using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Interface
{
    public interface IBaseService<TEntity>
    {
        //Lấy danh sách dữ liệu
        /// <summary>
        /// Lấy toàn bộ danh sách dữ liệu 
        /// </summary>
        /// <returns>Danh sách dữ liệu</returns>
        /// CreatedBy: NDTUNG (11/1/2021)
        IEnumerable<TEntity> GetEntities();
        IEnumerable<TEntity> GetEntities(Guid entityId);

        /// <summary>
        /// Lấy dữ liệu theo mã khóa chính
        /// </summary>
        /// <param name="entityID">Khóa chính</param>
        /// <returns>object dữ liệu đầu tiên lấy được</returns>
        /// CreatedBy: NDTUNG (11/1/2021)
        TEntity GetEntityById(Guid entityId);

        TEntity FindById(Guid entityId);

        ///// <summary>
        ///// Lấy dữ liệu theo mã dữ liệu
        ///// </summary>
        ///// <param name="entityCode">Mã dữ liệu</param>
        ///// <returns>object dữ liệu đầu tiên lấy được</returns>
        ///// CreatedBy: NDTUNG (11/1/2021)
        //TEntity GetEntityByCode(string entityCode);

        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="entity">object dữ liệu</param>
        /// <returns>Trả về số bản ghi thêm mới được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        ServiceResult AddEntity(TEntity entity);

        /// <summary>
        /// Cập nhật dữ liệu
        /// </summary>
        /// <param name="entity">object dữ liệu</param>
        /// <returns>Trả về số bản ghi cập nhật được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        ServiceResult UpdateEntity(TEntity entity);

        /// <summary>
        /// Xóa dữ liệu
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Trả về số bản ghi xóa được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        ServiceResult DeleteEntity(Guid entityId);
    }
}
