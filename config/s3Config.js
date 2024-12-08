const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    endpoint: process.env.SPACE_ENDPOINT, // URL do Space (ex: https://nyc3.digitaloceanspaces.com)
    accessKeyId: process.env.SPACE_ACCESS_KEY, // Chave de acesso gerada
    secretAccessKey: process.env.SPACE_SECRET_KEY, // Chave secreta gerada
});

module.exports = s3;
