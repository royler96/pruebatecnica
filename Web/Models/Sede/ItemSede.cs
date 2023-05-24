using System;
using System.Collections.Generic;
using System.Net;

namespace Web.Models.Sede
{
    public class DataItemSedeUnicoResponse
    {
        public HttpStatusCode codeHTTP { get; set; }
        public string messageHTTP { get; set; }
        public ItemSedeUnicoResponse_Ok data { get; set; }
        public ItemSedeResponse_BadRequestYOtros data_badquest_otros { get; set; }
    }
    public class DataItemSedeResponse
    {
        public HttpStatusCode codeHTTP { get; set; }
        public string messageHTTP { get; set; }
        public ItemSedeResponse_Ok data { get; set; }
        public ItemSedeResponse_BadRequestYOtros data_badquest_otros { get; set; }
    }
    public class ItemSedeResponse_Ok
    {        
        public string Message { get; set; }
        public List<ItemSede> data { get; set; }
    }
    public class ItemSedeUnicoResponse_Ok
    {
        public string Message { get; set; }
        public ItemSede data { get; set; }
    }
    public class ItemSede
    {
        public int id_sede { get; set; }
        public string cod_sede { get; set; }
        public string nombre_sede { get; set; }
        public Nullable<int> numero_complejos { get; set; }
        public Nullable<decimal> presupuesto { get; set; }
        public Nullable<bool> estado { get; set; }
        public string fecha_actualizacion { get; set; }
    }

    public class ItemSedeResponse_BadRequestYOtros
    {
        public string Message { get; set; }
    }
}