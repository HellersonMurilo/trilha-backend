const AWS = require('aws-sdk');
const fs = require('fs');

// Configuração do cliente S3 para o DigitalOcean Spaces
const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('https://nyc3.digitaloceanspaces.com'), // Endpoint do seu Space
  accessKeyId: process.env.SPACE_ACCESS_KEY, // Sua chave de acesso
  secretAccessKey: process.env.SPACE_SECRET_KEY, // Sua chave secreta
  region: 'nyc3', // Região do seu Space
});

// Função para upload do arquivo para o Space
const uploadToSpace = async (filePath, bucketName, key) => {
  try {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: bucketName,  // Nome do seu Space
      Key: key,            // Caminho e nome do arquivo dentro do Space
      Body: fileContent,   // Conteúdo do arquivo
      ACL: 'public-read',  // Permissões de leitura pública (ajustável conforme necessário)
    };

    // Envia o arquivo para o Space
    const uploadResult = await s3.upload(params).promise();
    return uploadResult; // Retorna o resultado do upload
  } catch (error) {
    console.error('Erro ao enviar arquivo para o Space', error);
    throw new Error('Erro ao enviar arquivo para o Space');
  }
};

// Função para obter a URL pública do arquivo
const getPublicUrl = (key) => {
  return `${process.env.SPACE_ENDPOINT}/${key}`; // SPACE_URL é o domínio base do seu Space
};

// Função para listar todos os vídeos em uma pasta específica
const listVideosInLessonFolder = async (idTrail, idModule, idLesson) => {
  const lessonFolder = `videos/${idTrail}/${idModule}/${idLesson}/`; // Caminho da pasta da lição

  const params = {
    Bucket: 'trailsync', // Nome do seu Space
    Prefix: lessonFolder, // Caminho da pasta da lição no Space
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const videoUrls = data.Contents.map((file) => getPublicUrl(file.Key)); // Mapeia para URLs públicas
    return videoUrls; // Retorna as URLs dos vídeos
  } catch (error) {
    console.error('Erro ao listar vídeos na pasta:', error);
    throw new Error('Erro ao listar vídeos na pasta');
  }
};

module.exports = { uploadToSpace, getPublicUrl, listVideosInLessonFolder };
