using System.ComponentModel.DataAnnotations;


namespace MovieAppApi.Validations
{
    public class FirstLetterUppercaseAttribute : ValidationAttribute
    {
        public FirstLetterUppercaseAttribute()
            : base("The first letter must be uppercase.")
        {
        }

        public override bool IsValid(object value)
        {
            if (value == null)
            {
                return true;
            }

            string stringValue = value as string;

            if (stringValue == null || stringValue.Length == 0)
            {
                return true;
            }

            return Char.IsUpper(stringValue[0]);
        }
    }
}
