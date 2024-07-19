using Domain.Repository;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
namespace Infrastructure.DataAccess.Repositories
{
    public class FastApi : IFastApi
    {

        private readonly HttpClient _httpClient;
        private readonly string _apiUrl;
        private readonly string _apiUrl2;

        public FastApi()
        {
            _httpClient = new HttpClient();
            _apiUrl = """http://127.0.0.1:8000/classify""";
            _apiUrl2 = """http://127.0.0.1:8000/classifyArticle""";
        }

        public async Task<(string[], double[])> ClassifySequenceAsync(string ArticleTexte, string[] Items)
        {
            if (string.IsNullOrEmpty(ArticleTexte))
            {
                throw new ArgumentException("Sequence to classify cannot be null or empty.", nameof(ArticleTexte));
            }

            if (Items == null || Items.Length == 0)
            {
                throw new ArgumentException("Candidate labels cannot be null or empty.", nameof(Items));
            }

            var url = $"{_apiUrl}";

            var requestBody = new
            {
                sequence_to_classify = ArticleTexte,
                candidate_labels = Items
            };

            var response = await _httpClient.PostAsJsonAsync(url, requestBody);

            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            dynamic? result = Newtonsoft.Json.JsonConvert.DeserializeObject(responseContent);
            string[] labels = result["labels"].ToObject<string[]>();
            double[] scores = result["scores"].ToObject<double[]>();
            return (labels, scores);





        }
        public async Task<Dictionary<string, object>> ClassifyArticle(string url, string[] inputLabels, string[] companies_names)
        {
            var requestData = new
            {
                sequence_to_classify = url,
                candidate_labels = inputLabels,
                candidate_companies = companies_names

            };

            _httpClient.Timeout = TimeSpan.FromSeconds(600);
            var url2 = $"{_apiUrl2}";
            var response = await _httpClient.PostAsJsonAsync(url2, requestData);
            Console.WriteLine(response.Content);

            if (response.IsSuccessStatusCode)
            {
                // Vérifier si le code de statut est 200 (OK)
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var content1 = await response.Content.ReadAsStringAsync();
                    var dataDict = JsonConvert.DeserializeObject<Dictionary<string, object>>(content1);
                    return dataDict;
                }
                else
                {

                    Console.WriteLine($"Warning: Unexpected status code: {response.StatusCode}");
                }
            }
            else
            {
                // Ignorer les erreurs BadRequest (code 400)
                if (response.StatusCode != HttpStatusCode.BadRequest)
                {
                    throw new HttpRequestException($"Error: {response.StatusCode}");
                }
                else
                {
                    Console.WriteLine("Ignoring BadRequest response.");
                }
            }

            // Retourner null si le code de statut n'est pas 200 ou si c'est une erreur BadRequest
            return null;
        }



    }





}
