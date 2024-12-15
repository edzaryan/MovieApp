using MovieAppApi.Validations;
using System.ComponentModel.DataAnnotations;

namespace MovieAppApi.DTOs
{
    public class GenreCreationDTO
    {
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(50)]
        [FirstLetterUppercase]
        public string Name { get; set; }
    }
}
