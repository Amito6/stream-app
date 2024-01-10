import AWS from "aws-sdk";
const s3 = new AWS.S3({
    region : "us-east-2",
    accessKeyId : "AKIA3L6WDYPAIJDOLMOK",
    secretAccessKey : "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"
})
const Bucket = "stream-app-9616"
const useS3 = (file,key=file.name) =>{
    const upload = async () =>{
        const options = {
            Bucket : Bucket,
            Body : file,
            Key : key
        }
        return s3.upload(options);
    }
    return upload;
}
export default useS3;