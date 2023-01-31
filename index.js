import { ListBucketsCommand, ListObjectsV2Command, DeleteObjectsCommand, DeleteBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/sampleClient.js";

export const run = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    data.Buckets.forEach(
      (element) => console.log(element.CreationDate.toUTCString() + " " + element.Name)
    );

    const bucketName = "datascientest-aymen-sdkdemo";
    const deleteObjectsParams = { Bucket: bucketName };

    await s3Client.send(
      new ListObjectsV2Command(deleteObjectsParams),
      (err, data) => {
        if (err) throw err;

        const objectsToDelete = data.Contents.map(({ Key }) => ({ Key }));

        s3Client.send(
          new DeleteObjectsCommand({ ...deleteObjectsParams, Delete: { Objects: objectsToDelete } }),
          (err, data) => {
            if (err) throw err;

            s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }), (err, data) => {
              if (err) throw err;

              console.log(`Successfully deleted bucket ${bucketName} and its contents.`);
            });
          }
        );
      }
    );

    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

run();
