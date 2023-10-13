﻿using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public class GenreCreationDTO
    {
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(30)]
        [FirstLetterUppercase]
        public string Name { get; set; }
    }
}
