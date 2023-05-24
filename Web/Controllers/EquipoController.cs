using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class EquipoController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Agregar()
        {
            return View();
        }
        public ActionResult Editar(int id)
        {
            ViewBag.id = id;
            return View();
        }
    }
}