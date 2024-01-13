using System.ComponentModel.DataAnnotations;

public class ClientLoginModel
{
    [Required(ErrorMessage = "The Email field is required.")]
    [EmailAddress]
    public string Email { get; set; }

    [Required(ErrorMessage = "The Password field is required.")]
    public string Password { get; set; }
}
