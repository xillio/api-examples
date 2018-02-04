using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.Serialization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Xillio.ApiExamples
{
    public static class Utils
    {
        public static async Task<JObject> GetObject(string url, string auth)
        {
            using (var client = new HttpClient())
            {
                var authValue = new AuthenticationHeaderValue("Bearer", auth);
                client.DefaultRequestHeaders.Authorization = authValue;

                HttpResponseMessage response = await client.GetAsync(url);
                var body = await response.Content.ReadAsStringAsync();
                return JObject.Parse(body);
            }
        }

        public static async Task<JArray> GetArray(string url, string auth)
        {
            using (var client = new HttpClient())
            {
                var authValue = new AuthenticationHeaderValue("Bearer", auth);
                client.DefaultRequestHeaders.Authorization = authValue;

                HttpResponseMessage response = await client.GetAsync(url);
                var body = await response.Content.ReadAsStringAsync();
                
                return JArray.Parse(body);
            }
        }

        public static async Task<string> GetToken(string clientid, string clientsecret, string username, string password)
        {
            using (var client = new HttpClient())
            {
                var authValue = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientid}:{clientsecret}")));
                client.DefaultRequestHeaders.Authorization = authValue;
                var parameters = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", "password"),
                    new KeyValuePair<string, string>("username", username),
                    new KeyValuePair<string, string>("password", password),
                };
                var content = new FormUrlEncodedContent(parameters);

                HttpResponseMessage response = await client.PostAsync("https://sandbox.xill.io/oauth/token", content);
                var body = await response.Content.ReadAsStringAsync();
                var o = JObject.Parse(body);
                return (string)o["access_token"];
            }
        }
    }
}
