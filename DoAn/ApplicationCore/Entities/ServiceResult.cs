using ApplicationCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Entities
{
    public class ServiceResult
    {
        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object Data { get; set; }
        /// <summary>
        /// Câu thông báo
        /// </summary>
        public string Messenger { get; set; }
        /// <summary>
        /// Mã kết quả
        /// </summary>
        public Code Code { get; set; }
    }
}
