using System.Security.Claims;

namespace BibCorpPrevenir2.api.Util.Extensions.Security
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserNameClaim(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserIdClaim(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
