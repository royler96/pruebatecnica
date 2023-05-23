using System;
using System.Collections.Generic;
using System.Configuration;
using Web.ClientWebApi.PeticionesHttpClient;
using Web.Entities;

namespace Web.ClientWebApi
{
    public class AccountClient
    {
        private string _urlApi = ConfigurationManager.AppSettings["WEBAPI_URL"];

        public string _token { get; set; }
        public bool _isAuthenticated { get; set; }
        readonly int _Timeout = Convert.ToInt32(ConfigurationManager.AppSettings["TIMEOUT"]);
        readonly string _webApiUrl = ConfigurationManager.AppSettings["WEBAPI_URL"];
        private readonly string _webApiToken = ConfigurationManager.AppSettings["WEBAPI_TOKEN"];

        public ResponseTokenModel IniciarSesion(string usuario, string password)
        {
            string webApiUrl = "Token";
            var values = new Dictionary<string, string>
                  {
                     { "grant_type", "password" },
                     { "username", usuario},
                     { "password", password}
                  };

            try
            {
                IWebApiClient<ResponseTokenModel> _WebAPICliente = new WebApiClient<ResponseTokenModel>();
                _WebAPICliente._token = "token";
                var lista = _WebAPICliente.postReturnClassEncoded(webApiUrl, values);
                return lista;
            }
            catch (Exception)
            {

            }

            return new ResponseTokenModel();
        }

    }

}