const AWS_S3 = require('aws-sdk/clients/s3');
const { nanoid } = require('nanoid');
const path = require('node:path');
const { S3_REGION, AWS_SECRET_KEY, AWS_ACCESS_KEY, S3_BUCKET } = require('../configs/variables');

const S3 = new AWS_S3({
    region: S3_REGION,
    secretAccessKey: AWS_SECRET_KEY,
    accessKeyId: AWS_ACCESS_KEY,
    apiVersion: '2006-03-01',
    signatureVersion: 'v4'
});


async function uploadFileToS3(file, itemId, itemType) {
    const Key = fileNameBuilder(file, itemId, itemType);

    await S3
        .upload({
            Bucket: S3_BUCKET,
            Body: file.data,
            Key,
            ContentType: file.mimetype
        })
        .promise();

    return Key;
}


function deleteImageFromS3(Key) {
    Key = Key.slice(47);
    return S3.deleteObject({ Key, Bucket: S3_BUCKET }).promise();
}

function fileNameBuilder(file, itemId, itemType) {
    const extension = path.extname(file.name);
    

    return `${itemType}/${itemId}/${nanoid(8)}${extension}`;
}

module.exports = {
    uploadFileToS3,
    deleteImageFromS3,
    fileNameBuilder,
};