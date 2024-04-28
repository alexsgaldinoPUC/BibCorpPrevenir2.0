namespace BibCorpPrevenir2.api.Util.Services.Interfaces.Contracts.Uploads
{
    public interface IUploadService
    {
        void DeleteImageUpload(int contaId, string nomeImagem, string destino);
        Task<string> SaveImageUpload(int contaId, IFormFile arquivoImagem, string destino);
    }
}
