using Domain.Entities;
using Domain.Repository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Infrastructure.DataAccess.Repositories
{
    public class NewArticleScoreRepository : INewArticleScoreRepository
    {
        private readonly INewLabelRepository _labelRepository;
        private readonly ICompanyRepository _companyRepository;
        public NewArticleScoreRepository(INewLabelRepository labelRepository, ICompanyRepository companyRepository)
        {
            _labelRepository = labelRepository;
            _companyRepository = companyRepository;
        }
        public (string[] stringArrayLabels, float[] floatArrayLabels, string[] stringArrayCompanies, Guid[] companies_Ids,
     float[] floatArrayCompanies, string sentiment, float sentimentScore) getModelScoresList(NewArticle article, string[] inputlabels)
        {
            List<Company> candidate_companies = _companyRepository.GetAllCompanies();
            List<string> companies_name = new List<string>();
            List<Guid> companies_Ids = new List<Guid>();

            foreach (var name in candidate_companies)
            {
                companies_name.Add(name.Name);
                companies_Ids.Add(name.Id);
            }
            string[] candidate_names = companies_name.ToArray();
            Guid[] companies_ids = companies_Ids.ToArray();

            var fast = new FastApi();
            Dictionary<string, object> input = null; // Initialiser input à null

            if (inputlabels.Length > 0)
            {
                try
                {
                    var result = fast.ClassifyArticle(article.Url, inputlabels, candidate_names);
                    Console.WriteLine(result.Result);
                    input = result.Result;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("BadRequestException occurred: " + ex.Message);
                    // Si une exception est levée, input reste null
                }
            }
            else
            {
                // Si inputlabels est vide, input reste null
            }

            // Vérifier si input est différent de null avant de récupérer les valeurs
            if (input != null)
            {
                string[] labels = ((Newtonsoft.Json.Linq.JArray)input["labels"]).ToObject<string[]>();
                float[] scores_labels = ((Newtonsoft.Json.Linq.JArray)input["scores_labels"]).ToObject<float[]>();
                string[] companies_names = ((Newtonsoft.Json.Linq.JArray)input["companies_names"]).ToObject<string[]>();
                float[] scores_companies = ((Newtonsoft.Json.Linq.JArray)input["scores_companies"]).ToObject<float[]>();
                string sentiment = input["sentiment_label"].ToString();
                float sentimentScore = Convert.ToSingle(input["sentiment_score"]);

                return (labels, scores_labels, companies_names, companies_ids, scores_companies, sentiment, sentimentScore);
            }
            else
            {
                // Si input est null, retourner des valeurs par défaut ou null selon votre logique
                // Par exemple, vous pouvez retourner des tableaux vides ou des valeurs par défaut pour les autres variables
                return (new string[0], new float[0], new string[0], new Guid[0], new float[0], "", 0.0f);
            }
        }


        public NewArticleScore getModelOutput(NewArticle article, Topic topic)
        {

            var listLabels = topic.Labels;
            var highLabels = listLabels.Where(label => label.Priority == 3).Select(label => label.Item).ToArray();
            var midLabels = listLabels.Where(label => label.Priority == 2).Select(label => label.Item).ToArray();
            var lowLabels = listLabels.Where(label => label.Priority == 1).Select(label => label.Item).ToArray();
            var allLabels = highLabels.Concat(midLabels).Concat(lowLabels).ToArray();

            var (labels, score_labels, companies, companies_ids, score_companies, sentiment, sentimentScore) = getModelScoresList(article, allLabels);




            static bool IsHighLabel(string label, string[] highLabels)
            {
                foreach (string highLabel in highLabels)
                {
                    if (label.Equals(highLabel))
                    {

                        return true;
                    }
                }
                return false;
            }
            static bool IsMidLabel(string label, string[] MidLabels)
            {
                foreach (string midLabel in MidLabels)
                {
                    if (label.Equals(midLabel))
                    {

                        return true;
                    }
                }
                return false;
            }
            static bool IsLowLabel(string label, string[] LowLabels)
            {
                foreach (string lowLabel in LowLabels)
                {
                    if (label.Equals(lowLabel))
                    {

                        return true;
                    }
                }
                return false;
            }

            List<float> floatHighArray = new List<float>();
            List<float> floatMidArray = new List<float>();
            List<float> floatLowArray = new List<float>();


            for (int i = 0; i < labels.Length; i++)
            {
                if (IsHighLabel(labels[i], highLabels))
                {

                    floatHighArray.Add(score_labels[i]);
                }
                else
                {
                    if (IsMidLabel(labels[i], midLabels))
                    {

                        floatMidArray.Add(score_labels[i]);
                    }
                    else
                    {

                        floatLowArray.Add(score_labels[i]);

                    }

                }
            }
            var floatArray1 = floatHighArray.ToArray();
            var floatArray2 = floatMidArray.ToArray();
            var floatArray3 = floatLowArray.ToArray();


            return new NewArticleScore
            {
                Id = Guid.NewGuid(),
                HighScore = floatArray1,
                MidScore = floatArray2,
                LowScore = floatArray3,
                Companies_Ids = companies_ids,
                Companies_Score = score_companies,

                articleSentimet = sentiment,
                setimentScore = sentimentScore,
            };
        }
        public NewArticleScore giveFeedBack(NewArticleScore articleScore)
        {
            throw new NotImplementedException();
        }
    }
}

