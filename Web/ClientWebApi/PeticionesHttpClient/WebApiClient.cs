using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Web.ClientWebApi.PeticionesHttpClient
{
    public class WebApiClient<T> : IWebApiClient<T> where T : class
    {
        public string _token { get; set; }

        public bool _isAuthenticated { get; set; } = true;

        readonly string _Timeout = ConfigurationManager.AppSettings["TIMEOUT"];
        readonly string _webApiUrl = ConfigurationManager.AppSettings["WEBAPI_URL"];
        private readonly string _webApiToken = ConfigurationManager.AppSettings["WEBAPI_TOKEN"];
        private readonly string _VERSION_WEB = ConfigurationManager.AppSettings["VERSION_WEB"];

        int timeOut = 5;
        public static HttpClient httpClient = new HttpClient();
        public WebApiClient()
        {
            try
            {
                timeOut = Int32.Parse(_Timeout);
            }
            catch (Exception)
            {
            }
        }

        public T postReturnClassEncoded(string requestUri, Dictionary<string, string> values)
        {
            T objeto = null;

            try
            {
                var content = new FormUrlEncodedContent(values);

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", _webApiToken);
                httpClient.DefaultRequestHeaders.Add("version_app", _VERSION_WEB);
                httpClient.DefaultRequestHeaders.Add("country", "0");
                httpClient.DefaultRequestHeaders.Add("datos_adicionales", "");
                var response = httpClient.PostAsync(_webApiUrl + requestUri, content).Result;

                Stream stream = response.Content.ReadAsStreamAsync().Result;
                StreamReader re = new StreamReader(stream);
                String json = re.ReadToEnd();
                objeto = (T)JsonConvert.DeserializeObject(json, typeof(T));

            }
            catch (Exception)
            {
                objeto = null;
            }
            return objeto;
        }

        public T postReturnClass(string requestUri, object clase)
        {
            T objeto = null;

            try
            {
                HttpClient _httpclient = new HttpClient();
                if (!String.IsNullOrEmpty(_token))
                {
                    _httpclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);
                }
                var response = _httpclient.PostAsJsonAsync(_webApiUrl + requestUri, clase).Result;

                Stream stream = response.Content.ReadAsStreamAsync().Result;
                StreamReader re = new StreamReader(stream);
                String json = re.ReadToEnd();
                objeto = (T)Newtonsoft.Json.JsonConvert.DeserializeObject(json, typeof(T));

                if (re != null)
                {
                    re = null;
                }
                if (stream != null)
                {
                    stream = null;
                }
            }
            catch (Exception)
            {

            }
            return objeto;
        }

        public T postReturnClassIntoString(string requestUri, string valor)
        {
            T objeto = null;

            try
            {
                var response = httpClient.PostAsJsonAsync(_webApiUrl + requestUri, valor).Result;

                Stream stream = response.Content.ReadAsStreamAsync().Result;
                StreamReader re = new StreamReader(stream);
                String json = re.ReadToEnd();
                objeto = (T)Newtonsoft.Json.JsonConvert.DeserializeObject(json, typeof(T));

                if (re != null)
                {
                    re = null;
                }
                if (stream != null)
                {
                    stream = null;
                }
            }
            catch (Exception)
            {

            }
            return objeto;
        }

        public List<T> postReturnListEncoded(string requestUri, Dictionary<string, string> values)
        {
            List<T> lista = null;

            try
            {
                var content = new FormUrlEncodedContent(values);

                var response = httpClient.PostAsync(_webApiUrl + requestUri, content).Result;

                //var responseString = response.Content.ReadAsStringAsync();

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    Stream stream = response.Content.ReadAsStreamAsync().Result;
                    StreamReader re = new StreamReader(stream);
                    String json = re.ReadToEnd();
                    lista = (List<T>)Newtonsoft.Json.JsonConvert.DeserializeObject(json, typeof(List<T>));

                    if (re != null)
                    {
                        re = null;
                    }
                    if (stream != null)
                    {
                        stream = null;
                    }
                }
            }
            catch (Exception)
            {

            }
            return lista;
        }
        public List<T> postReturnList(string requestUri, object clase)
        {
            List<T> lista = null;

            try
            {
                HttpClient _httpclient = new HttpClient();

                if (!String.IsNullOrEmpty(_token))
                {
                    _httpclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);
                }

                var response = _httpclient.PostAsJsonAsync(_webApiUrl + requestUri, clase).Result;

                //var responseString = response.Content.ReadAsStringAsync();

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    Stream stream = response.Content.ReadAsStreamAsync().Result;
                    StreamReader re = new StreamReader(stream);
                    String json = re.ReadToEnd();
                    lista = (List<T>)Newtonsoft.Json.JsonConvert.DeserializeObject(json, typeof(List<T>));

                    if (re != null)
                    {
                        re = null;
                    }
                    if (stream != null)
                    {
                        stream = null;
                    }
                }
            }
            catch (Exception)
            {

            }
            return lista;
        }

        /// <summary>
        /// realiza una peticion get y devuelve un listado (json)
        /// </summary>
        /// <param name="requestUri"></param>
        /// <returns></returns>
        public List<T> getReturnList(string requestUri)
        {
            List<T> lista = null;
            try
            {

                HttpClient _httpclient = new HttpClient();

                if (!String.IsNullOrEmpty(_token))
                {
                    _httpclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);
                }

                var response = _httpclient.GetAsync(_webApiUrl + requestUri).Result;

                //Unauthorized
                if (response.StatusCode == HttpStatusCode.Unauthorized)
                {
                    //unauthorized
                }

                if (response.StatusCode == HttpStatusCode.OK)
                {

                    Stream stream = response.Content.ReadAsStreamAsync().Result;
                    StreamReader re = new StreamReader(stream);
                    String json = re.ReadToEnd();
                    lista = (List<T>)Newtonsoft.Json.JsonConvert.DeserializeObject(json, typeof(List<T>));

                    if (re != null)
                    {
                        re = null;
                    }
                    if (stream != null)
                    {
                        stream = null;
                    }

                    return lista;

                }
                else
                {

                }
            }
            catch (Exception)
            {

            }

            return lista;
        }

        public T getReturnClass(string requestUri)
        {
            T resultado = null;
            try
            {

                HttpClient _httpclient = new HttpClient();

                if (!String.IsNullOrEmpty(_token))
                {
                    _httpclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);
                }

                var response = _httpclient.GetAsync(_webApiUrl + requestUri).Result;

                //Unauthorized
                if (response.StatusCode == HttpStatusCode.Unauthorized)
                {
                    //unauthorized
                }

                if (response.StatusCode == HttpStatusCode.OK)
                {

                    Stream stream = response.Content.ReadAsStreamAsync().Result;
                    StreamReader re = new StreamReader(stream);
                    String json = re.ReadToEnd();
                    resultado = (T)JsonConvert.DeserializeObject(json, typeof(T));

                    if (re != null)
                    {
                        re = null;
                    }
                    if (stream != null)
                    {
                        stream = null;
                    }

                    return resultado;

                }
                else
                {

                }
            }
            catch (Exception)
            {

            }

            return resultado;
        }

        public T putReturnClass(string requestUri, object clase, string authenticationHeaderType = "Bearer")
        {
            T resultado = null;
            try
            {

                HttpClient _httpclient = new HttpClient();

                if (!String.IsNullOrEmpty(_token))
                {
                    _httpclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);
                }

                var response = _httpclient.PutAsJsonAsync(_webApiUrl + requestUri, clase).Result;
                //Unauthorized
                if (response.StatusCode == HttpStatusCode.Unauthorized)
                {
                    //unauthorized
                }

                if (response.StatusCode == HttpStatusCode.OK)
                {

                    Stream stream = response.Content.ReadAsStreamAsync().Result;
                    StreamReader re = new StreamReader(stream);
                    String json = re.ReadToEnd();
                    resultado = (T)JsonConvert.DeserializeObject(json, typeof(T));

                    if (re != null)
                    {
                        re = null;
                    }
                    if (stream != null)
                    {
                        stream = null;
                    }

                    return resultado;

                }
                else
                {

                }
            }
            catch (Exception)
            {

            }

            return resultado;
        }
        public T deleteReturnClass(string requestUri)
        {
            T lista = null;
            try
            {
                HttpClient httpClient2 = new HttpClient();
                httpClient2.Timeout = new TimeSpan(0, timeOut, 0);
                if (!String.IsNullOrEmpty(_token))
                {
                    httpClient2.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",
                                        _token);
                }
                var response = httpClient2.DeleteAsync(_webApiUrl + requestUri).Result;

                if (response.StatusCode == HttpStatusCode.OK)
                {

                    Stream stream = response.Content.ReadAsStreamAsync().Result;
                    StreamReader re = new StreamReader(stream);
                    String json = re.ReadToEnd();
                    lista = (T)JsonConvert.DeserializeObject(json, typeof(T));

                    if (re != null)
                    {
                        re = null;
                    }
                    if (stream != null)
                    {
                        stream = null;
                    }

                    return lista;
                }
            }
            catch (Exception)
            {

            }

            return lista;
        }
        public T postReturnClassEncodedFile(string requestUri, HttpPostedFileBase file, string authenticationHeaderType = "Bearer")
        {
            T objeto = null;

            try
            {
                HttpClient httpclient = new HttpClient();
                if (!String.IsNullOrEmpty(_token))
                {
                    httpclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authenticationHeaderType, _token);
                }
                byte[] data;
                using (Stream inputStream = file.InputStream)
                {
                    MemoryStream memoryStream = inputStream as MemoryStream;
                    if (memoryStream == null)
                    {
                        memoryStream = new MemoryStream();
                        inputStream.CopyTo(memoryStream);
                    }
                    data = memoryStream.ToArray();
                }

                var requestContent = new MultipartFormDataContent();
                var fileContent = new ByteArrayContent(data);
                fileContent.Headers.ContentType =
                    MediaTypeHeaderValue.Parse(file.ContentType);

                requestContent.Add(fileContent, file.ContentType, file.FileName);

                var response = httpclient.PostAsync(_webApiUrl + requestUri, requestContent).Result;

                Stream stream = response.Content.ReadAsStreamAsync().Result;
                StreamReader re = new StreamReader(stream);
                String json = re.ReadToEnd();
                objeto = (T)JsonConvert.DeserializeObject(json, typeof(T));

                if (re != null)
                {
                    re = null;
                }
                if (stream != null)
                {
                    stream = null;
                }
            }   
            catch (Exception)
            {

            }
            return objeto;
        }
    }

}