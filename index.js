import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/sampleClient.js";


export const run = async () => { 
    try {
        const data = await s3Client.send(new ListBucketsCommand({}));
        data.Buckets.forEach(  
            element => console.log( element.CreationDate.toUTCString() + " " + element.Name ) 
        );
        return data;
    } catch (err) {
        console.log("Error", err);
    }
 };

 run();