using Dapper;
using Microsoft.Extensions.Configuration;
using ApplicationCore;
using ApplicationCore.Interface;
using ApplicationCore.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Infrastructure
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>, IDisposable where TEntity : BaseEntity
    {
        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName;
        #endregion
        #region CONSTRUCTOR
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("ConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(TEntity).Name;
        }
        #endregion
        #region METHOD
        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="entity">object dữ liệu</param>
        /// <returns>Trả về số bản ghi thêm mới được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        public int AddEntity(TEntity entity)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    //Khởi tạo kết nối với DB
                    //Xử lý các kiểu dữ liệu (mapping dataType)
                    var parameters = MappingDbType(entity);
                    //Thực thi commandText:
                    rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
                    transaction.Commit();

                }
                catch (Exception ex)
                {

                    transaction.Rollback();
                }
            }
            _dbConnection.Close();

            //Trả về kết quả (Số bản ghi thêm mới được)
            return rowAffects;
        }

        /// <summary>
        /// Xóa dữ liệu theo khóa chính
        /// </summary>
        /// <param name="entityId">khóa chính dữ liệu</param>
        /// <returns>Trả về số bản ghi xóa được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        public int DeleteEntity(Guid entityId)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var param = new DynamicParameters();
                    param.Add($"@{_tableName}Id", entityId.ToString());
                    rowAffects = _dbConnection.Execute($"Proc_Delete{_tableName}", param, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
                }
                catch (Exception ex)
                {

                    transaction.Rollback();
                }
            }
            _dbConnection.Close();
            return rowAffects;
        }

        /// <summary>
        /// Lấy dữ liệu theo mã khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>object đầu tiên lấy được</returns>
        /// CreatedBy: NDTUNG (11/1/2021)
        public TEntity GetEntityById(Guid entityId)
        {
            var param = new DynamicParameters();
            param.Add($"@{_tableName}Id", entityId.ToString());
            var res = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}ById", param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }
        public TEntity FindById(Guid entityId)
        {
            var param = new DynamicParameters();
            param.Add($"@ID", entityId.ToString());
            var res = _dbConnection.Query<TEntity>($"Proc_Find{_tableName}", param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }
        /// <summary>
        /// Lấy toàn bộ danh sách 
        /// </summary>
        /// <returns>Danh sách dữ liệu</returns>
        /// CreatedBy: NDTUNG (11/1/2021)
        public IEnumerable<TEntity> GetEntities()
        {
            //Kết nối CSDL

            //Khởi tạo các CommandText_
            var entities = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            //Trả về dữ liệu
            return entities;
        }
        
        public IEnumerable<TEntity> GetEntities(Guid entityId)
        {
            var param = new DynamicParameters();
            param.Add($"@ID", entityId.ToString());
            //Kết nối CSDL

            //Khởi tạo các CommandText_
            var entities = _dbConnection.Query<TEntity>($"Proc_Get{_tableName}", param, commandType: CommandType.StoredProcedure);
            //Trả về dữ liệu
            return entities;
        }

        /// <summary>
        /// Cập nhật dữ liệu
        /// </summary>
        /// <param name="entity">object dữ liệu</param>
        /// <returns>Trả về số bản ghi cập nhật được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        public int UpdateEntity(TEntity entity)
        {
            //Khởi tạo kết nối với DB
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    //Xử lý các kiểu dữ liệu (mapping dataType)
                    var parameters = MappingDbType(entity);
                    //Thực thi commandText:
                    rowAffects = _dbConnection.Execute($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
                }
                catch (Exception ex)
                {

                    transaction.Rollback();
                }
            }
            //Trả về kết quả (Số bản ghi thêm mới được)
            _dbConnection.Close();

            return rowAffects;
        }

        /// <summary>
        /// Xử lý dữ liệu Parameter
        /// </summary>
        /// <typeparam name="TEntity">class</typeparam>
        /// <param name="entity">object</param>
        /// <returns>Object Parameter</returns>
        private DynamicParameters MappingDbType(TEntity entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($@"{propertyName}", propertyValue.ToString());
                }
                else
                {
                    parameters.Add($@"{propertyName}", propertyValue);
                }
            }
            return parameters;
        }

        /// <summary>
        /// Lấy thông tin theo property
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="specs"></param>
        /// <returns></returns>
        ///CreatedBy:NDTUNG (16/1/2021)
        public TEntity GetEntityByProperty(TEntity entity, PropertyInfo property)
        {
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var query = string.Empty;
            if (entity.EntityState == EntityState.AddNew)
            {
                query = $"SELECT * FROM {_tableName} WHERE {propertyName}='{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.Update)
            {
                var keyValue = entity.GetType().GetProperty($"{_tableName}ID").GetValue(entity);
                query = $"SELECT * FROM {_tableName} WHERE {propertyName}='{propertyValue}' AND {_tableName}ID <> '{keyValue}' ";
            }
            else
            {
                return null;
            }
            var entityReturn = _dbConnection.Query<TEntity>(query).FirstOrDefault();
            return entityReturn;
        }

        /// <summary>
        /// Đóng cơ sở dữ liệu
        /// </summary>
        /// CreatedBy:NDTUNG (23/1/2021)
        public void Dispose()
        {
            if (_dbConnection.State == ConnectionState.Open)
            {
                _dbConnection.Close();
            }
        }

        #endregion
    }
}
