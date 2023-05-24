using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Web.Models.Sede;

namespace Web.ClientWebApi
{
    public class SedeClient
    {
        public string _token { get; set; }
        public bool _isAuthenticated { get; set; }
        readonly int _Timeout = Convert.ToInt32(ConfigurationManager.AppSettings["TIMEOUT"]);
        readonly string _webApiUrl = ConfigurationManager.AppSettings["WEBAPI_URL"];

        public DataItemSedeResponse getAll(string nombre_sede)
        {
            DataItemSedeResponse responseMethod = new DataItemSedeResponse();
            try
            {
                string urlService = $"api/sede?nombre_sede={nombre_sede}";

                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.Timeout = new TimeSpan(0, _Timeout, 0);
                    if (!String.IsNullOrEmpty(_token))
                    {
                        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",
                                            _token);
                    }

                    var responseService = httpClient.GetAsync(_webApiUrl + urlService).Result;
                    getAll_GetDataService(responseService, responseMethod);
                }
            }
            catch (Exception)
            {
                responseMethod.codeHTTP = HttpStatusCode.InternalServerError;
                responseMethod.messageHTTP = "Error en el listado de sedes.";
            }
            return responseMethod;
        }


        private void getAll_GetDataService(HttpResponseMessage responseService, DataItemSedeResponse responseMethod)
        {
            if (responseService.StatusCode == HttpStatusCode.OK)
            {
                using (Stream stream = responseService.Content.ReadAsStreamAsync().Result)
                {
                    using (StreamReader re = new StreamReader(stream))
                    {
                        String json = re.ReadToEnd();
                        responseMethod.data = (ItemSedeResponse_Ok)JsonConvert.DeserializeObject(json, typeof(ItemSedeResponse_Ok));
                    }
                }
                responseMethod.codeHTTP = responseService.StatusCode;
            }
            else
            {
                responseMethod.codeHTTP = responseService.StatusCode;
                if (responseService.StatusCode != HttpStatusCode.NoContent)
                {
                    using (Stream stream = responseService.Content.ReadAsStreamAsync().Result)
                    {
                        using (StreamReader re = new StreamReader(stream))
                        {
                            String json = re.ReadToEnd();
                            var dataBadRequest = (ItemSedeResponse_BadRequestYOtros)JsonConvert.DeserializeObject(json, typeof(ItemSedeResponse_BadRequestYOtros));
                            responseMethod.data_badquest_otros = dataBadRequest;
                        }
                    }
                }
                else
                {
                    responseMethod.codeHTTP = HttpStatusCode.NotFound;
                    responseMethod.data_badquest_otros = new ItemSedeResponse_BadRequestYOtros() { Message = "No se encontraron sedes." };
                }
            }
        }

        public PostSedeResponse postSede(PostSedeRequest dataRequest)
        {
            PostSedeResponse responseMethod = new PostSedeResponse();
            try
            {
                string urlService = "api/sede";
                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.Timeout = new TimeSpan(0, _Timeout, 0);
                    if (!String.IsNullOrEmpty(_token))
                    {
                        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",
                                            _token);
                    }
                    var responseService = httpClient.PostAsJsonAsync(_webApiUrl + urlService, dataRequest).Result;
                    postSede_GetDataService(responseService, responseMethod);
                }
            }
            catch (Exception)
            {
                responseMethod.codeHTTP = HttpStatusCode.InternalServerError;
                responseMethod.messageHTTP = "Error en la petición del servicio de crear sedes.";
            }
            return responseMethod;
        }
        private void postSede_GetDataService(HttpResponseMessage responseService, PostSedeResponse responseMethod)
        {
            if (responseService.StatusCode == HttpStatusCode.Created)
            {
                using (Stream stream = responseService.Content.ReadAsStreamAsync().Result)
                {
                    using (StreamReader re = new StreamReader(stream))
                    {
                        String json = re.ReadToEnd();
                        responseMethod.data = (PostSedeResponse_Ok)JsonConvert.DeserializeObject(json, typeof(PostSedeResponse_Ok));
                    }
                }
            }
            else
            {
                if (responseService.StatusCode != HttpStatusCode.NoContent)
                {
                    using (Stream stream = responseService.Content.ReadAsStreamAsync().Result)
                    {
                        using (StreamReader re = new StreamReader(stream))
                        {
                            String json = re.ReadToEnd();
                            var dataBadRequest = (PostSedeResponse_BadRequestYOtros)JsonConvert.DeserializeObject(json, typeof(PostSedeResponse_BadRequestYOtros));
                            responseMethod.data_badquest_otros = dataBadRequest;
                        }
                    }
                }
                else
                {
                    responseMethod.codeHTTP = HttpStatusCode.NotFound;
                    responseMethod.data_badquest_otros = new PostSedeResponse_BadRequestYOtros() { Message = "No se logro crear la sede" };
                }
            }
            responseMethod.codeHTTP = responseService.StatusCode;
        }


    }
}