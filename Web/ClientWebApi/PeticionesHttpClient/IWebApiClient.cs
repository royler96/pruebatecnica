using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.ClientWebApi.PeticionesHttpClient
{
    public interface IWebApiClient<T> where T : class
    {
        string _token { get; set; }
        T postReturnClassEncoded(string requestUri, Dictionary<string, string> values);
        T postReturnClass(string requestUri, object clase);
        T postReturnClassIntoString(string requestUri, string valor);
        T deleteReturnClass(string requestUri);
        List<T> postReturnListEncoded(string requestUri, Dictionary<string, string> values);
        List<T> postReturnList(string requestUri, object clase);
        List<T> getReturnList(string requestUri);
        T getReturnClass(string requestUri);
        T putReturnClass(string requestUri, object clase, string authenticationHeaderType = "Bearer");
        T postReturnClassEncodedFile(string requestUri, HttpPostedFileBase file, string authenticationHeaderType = "Bearer");
    }

}