using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Web.ClientWebApi;
using Web.Entities;

namespace Web.Controllers
{
    [OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
    public class AccountController : Controller
    {
        private readonly AccountClient _AccountClient = new AccountClient();
        // GET: Account
        public ActionResult Login()
        {
            if (Session["sesion"] != null)
            {
                return Redirect(FormsAuthentication.DefaultUrl);
            }
            clearSession();
            Session.Abandon();
            FormsAuthentication.SignOut();
            return View();
        }
        private void clearSession()
        {
            Session["sesion"] = null;
            Session["modulos"] = null;

            Session.RemoveAll();
            Session.Remove(FormsAuthentication.FormsCookieName);
            if (Response.Cookies[FormsAuthentication.FormsCookieName] != null)
            {
                HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName);
                cookie.Expires = DateTime.Now.AddDays(-1d);
                Response.Cookies.Add(cookie);
            }

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var response = _AccountClient.IniciarSesion(model.username, model.Password);
            if (response != null && String.IsNullOrEmpty(response.error) && !String.IsNullOrEmpty(response.access_token) && !String.IsNullOrEmpty(response.token_type))
            {
                DateTime expires = DateTime.Now.AddDays(30);
                var authTicket = new FormsAuthenticationTicket(1, model.username, DateTime.Now, expires, false, "", "/");
                HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, FormsAuthentication.Encrypt(authTicket));
                Response.Cookies.Add(cookie);
                
                Session["sesion"] = response;
                return Redirect(FormsAuthentication.DefaultUrl);
            }
            else
            {
                if (response != null && response.error == "invalid_grant")
                {
                    model.Error = "El usuario y/o contraseña son incorrectos.";
                }
                else
                {
                    model.Error = "Error al iniciar sesión.";
                }
                //invalid_grant
                return View(model);
            }
        }

        public ActionResult CerrarSesion()
        {
            clearSession();
            Session.Abandon();
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }
    }

}