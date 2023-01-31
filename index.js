import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/sampleClient.js";

export const params = {
    Bucket: "datascientest-aymen-sdkdemo", 
    Key: "demoaymen.txt", 
    Body: "Hello aymen Datascientext!", 
  };

  export const bucket =  {
    Bucket: "datascientest-aymen-sdkdemo"
  };

export const run = async () => { 
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );

        const result = await s3Client.send(new ListObjectsCommand(bucket));
        console.log("Debug: ", result)

        return data;
    } catch (err) {
        console.log("Error", err);
    }
 };

 run();