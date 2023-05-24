using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
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
    }
}