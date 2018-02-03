using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Xillio.ApiExamples
{
    class Program
    {
        static void Main(string[] args)
        {
            RunAsync().GetAwaiter().GetResult();
        }

        static async Task RunAsync()
        {
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("https://sandbox.xill.io/v2/system/ping");
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine(body);
        }
    }
}
