const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configuração do cliente S3 para o DigitalOcean Spaces
const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('https://nyc3.digitaloceanspaces.com'), // Endpoint do seu Space
  accessKeyId: process.env.SPACE_ACCESS_KEY, // Sua chave de acesso
  secretAccessKey: process.env.SPACE_SECRET_KEY, // Sua chave secreta
  region: 'nyc3', // Região do seu Space
});

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

module.exports = { uploadToSpace };
