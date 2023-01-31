import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/sampleClient.js";

export const bucketParams = { Bucket: "datascientest-aymen-sdkdemo" };

export const run = async () => { 
    try {
        const data = await s3Client.send(new CreateBucketCommand(bucketParams));
        console.log("Success", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
 };

 run();