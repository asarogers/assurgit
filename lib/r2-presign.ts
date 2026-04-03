import { AwsClient } from "aws4fetch";

const ACCOUNT_ID  = "ff1652fb9eaa4d149d6f7ac54dc77b84";
const BUCKET_NAME = "assurgit-media";
export const BUCKET_URL = "https://media.assurgit.com";

export async function getPresignedPutUrl(
  key: string,
  contentType: string,
  env: { R2_ACCESS_KEY_ID: string; R2_SECRET_ACCESS_KEY: string }
): Promise<string> {
  const aws = new AwsClient({
    accessKeyId:     env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    service:         "s3",
    region:          "auto",
  });

  const url = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com/${BUCKET_NAME}/${key}`;

  const signed = await aws.sign(
    new Request(url, {
      method:  "PUT",
      headers: { "Content-Type": contentType },
    }),
    { aws: { signQuery: true } }
  );

  return signed.url;
}
