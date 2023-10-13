using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Entities
{
    public class Genre
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "This field with name {0} is required")]
        [StringLength(30)]
        [FirstLetterUppercase]
        public string Name { get; set; }
    }
}
