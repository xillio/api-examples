using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Xillio.ApiExamples
{
    class Program
    {
        static void Main(string[] args)
        {
            RunAsync(args).GetAwaiter().GetResult();
        }

        static async Task RunAsync(string[] args)
        {
            var client = new HttpClient();
            var clientid = args[0];
            var clientsecret = args[1];
            var username = args[2];
            var password = args[3];

            var authValue = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientid}:{clientsecret}")));
            client.DefaultRequestHeaders.Authorization = authValue;
            var parameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", username),
                new KeyValuePair<string, string>("password", password),
            };
            var content = new FormUrlEncodedContent(parameters);
            var str = await content.ReadAsStringAsync();
           
            HttpResponseMessage response = await client.PostAsync("https://sandbox.xill.io/oauth/token", content);
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine(body);
        }
    }
}
