using System;
using System.Collections.Generic;
using System.Text;
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
            var clientid = args[0];
            var clientsecret = args[1];
            var username = args[2];
            var password = args[3];

            var token = await Utils.GetToken(clientid, clientsecret, username, password);
            var result = await Utils.GetObject("https://sandbox.xill.io/v2/entities?scope=children", token);
            Console.WriteLine(result.ToString());
            foreach(var repo in result["children"].Children())
            {
                Console.WriteLine(repo["original"]["name"]["systemName"]);
            }
        }
    }
}
