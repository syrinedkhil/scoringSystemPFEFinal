using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Helpers
{
    public class ScoreHelpers
    {
        public (float[] floatArray1, float[] floatArray2, float[] floatArray3) scoresFromTopic(Dictionary<string, object> input)
        {

            var scores1 = input["scores1"];
            var scores2 = input["scores2"];
            var scores3 = input["scores3"];
            var stringScores1 = $"{scores1}".Replace("[", "").Replace("\r", "").Replace("\n", "").Replace("\"", "").Replace("]", "").Replace(" ", "");
            var stringScores2 = $"{scores2}".Replace("[", "").Replace("\r", "").Replace("\n", "").Replace("\"", "").Replace("]", "").Replace(" ", "");
            var stringScores3 = $"{scores3}".Replace("[", "").Replace("\r", "").Replace("\n", "").Replace("\"", "").Replace("]", "").Replace(" ", "");

            string[] scoresArray2;
            string[] scoresArray3;
            string[] scoresArray1 = stringScores1.Split(',');
            if (stringScores2 != "")
            {
                scoresArray2 = stringScores2.Split(',');
            }
            else
            {
                scoresArray2 = new string[1];
                scoresArray2[0] = "0.0";
            }
            if (stringScores3 != "")
            {
                scoresArray3 = stringScores3.Split(',');
            }
            else
            {
                scoresArray3 = new string[1];
                scoresArray3[0] = "0.0";
            }
            Console.WriteLine(scoresArray1);
            Console.WriteLine(scoresArray2);
            Console.WriteLine(scoresArray3);
            CultureInfo culture = CultureInfo.InvariantCulture;
            float[] floatArray1 = new float[scoresArray1.Length];
            float[] floatArray2 = new float[scoresArray2.Length];
            float[] floatArray3 = new float[scoresArray3.Length];

            for (int i = 0; i < scoresArray1.Length; i++)
            {
                floatArray1[i] = float.Parse(scoresArray1[i], culture);
            }
            if (scoresArray2.Length > 0)
            {
                for (int i = 0; i < scoresArray2.Length; i++)
                {
                    floatArray2[i] = float.Parse(scoresArray2[i], culture);
                }
            }
            if (scoresArray3.Length > 0)
            {
                for (int i = 0; i < scoresArray3.Length; i++)
                {
                    floatArray3[i] = float.Parse(scoresArray3[i], culture);
                }
            }
            return (floatArray1, floatArray2, floatArray3);
        }
        public float[] CompaniesScoreHelper(Dictionary<string, object> input)
        {
            var companies_scores = input["Companies_Score"];
            var stringScores1 = $"{companies_scores}".Replace("[", "").Replace("\r", "").Replace("\n", "").Replace("\"", "").Replace("]", "").Replace(" ", "");
            string[] scoresArray1 = stringScores1.Split(',');

            CultureInfo culture = CultureInfo.InvariantCulture;
            float[] floatArray1 = new float[scoresArray1.Length];
            foreach (var score in scoresArray1)
            {
                Console.WriteLine(score);
            }
            for (int i = 0; i < scoresArray1.Length; i++)
            {
                floatArray1[i] = float.Parse(scoresArray1[i], culture);
            }
            return floatArray1;


        }
    }

}
