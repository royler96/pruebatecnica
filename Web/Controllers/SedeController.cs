using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Web.Attribute;
using Web.ClientWebApi;
using Web.Entities;
using Web.Models.Sede;

namespace Web.Controllers
{
    [Authorize]
    public class SedeController : Controller
    {
        // GET: Sede
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Agregar()
        {
            return View();
        }

        [HttpGet]
        public ActionResult getAll(string nombre_sede, int draw)
        {
            var responseError = new { recordsTotal = 0, recordsFiltered = 0, data = new List<ItemSede>(), sesionActiva = false };

            ResponseTokenModel sesionActual = (ResponseTokenModel)Session["sesion"];
            if (sesionActual == null) return Json(responseError, JsonRequestBehavior.AllowGet);


            var sedeCliente = new SedeClient();
            sedeCliente._token = sesionActual.access_token;

            var listado = sedeCliente.getAll(nombre_sede);

            if (listado.codeHTTP == HttpStatusCode.OK)
            {
                Request.RequestContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(new
                {
                    recordsTotal = listado != null ? listado.data.data.Count : 0,
                    recordsFiltered = listado != null ? listado.data.data.Count : 0,
                    data = listado != null && listado.data != null ? listado.data.data : new List<ItemSede>(),
                    draw = draw,
                    sesionActiva = true
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return new JsonHttpStatusResult(new
                {
                    Message = listado.data_badquest_otros.Message
                }, listado.codeHTTP);                
            }
        }

        [HttpPost]
        public JsonResult postSede(PostSedeRequest datos)
        {

            ResponseTokenModel sesionActual = (ResponseTokenModel)Session["sesion"];
            if (sesionActual == null) return Json(JsonRequestBehavior.AllowGet);

            var sedeCliente = new SedeClient();
            sedeCliente._token = sesionActual.access_token;

            var resultadoApi = sedeCliente.postSede(datos);
            if (resultadoApi.codeHTTP == HttpStatusCode.OK || resultadoApi.codeHTTP == HttpStatusCode.Created)
            {
                Request.RequestContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Created;
                return Json(new
                {
                    resultadoApi.data.Message,
                    resultadoApi.data.id_sede
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Request.RequestContext.HttpContext.Response.StatusCode = (int)resultadoApi.codeHTTP;
                return Json(new { Message = resultadoApi.data_badquest_otros.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}