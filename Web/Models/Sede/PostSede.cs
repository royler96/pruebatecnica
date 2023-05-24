using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Web.Models.Sede
{
    public class PostSedeResponse
    {
        public HttpStatusCode codeHTTP { get; set; }
        public string messageHTTP { get; set; }
        public PostSedeResponse_Ok data { get; set; }
        public PostSedeResponse_BadRequestYOtros data_badquest_otros { get; set; }
    }
    public class PostSedeResponse_Ok
    {
        public string Message { get; set; }
        public int id_sede { get; set; }

    }
    public class PostSedeResponse_BadRequestYOtros
    {
        public string Message { get; set; }
    }
    public class PostSedeRequest
    {
        public string nombre_sede { get; set; }
        public int numero_complejos { get; set; }
        public decimal presupuesto { get; set; }
        public bool estado { get; set; }
    }
}