"use strict";

var OSS = require("ali-oss");

exports.handler = async (event, context, callback) => {
  // const eventObj = JSON.parse(event.toString());

  let client = new OSS({
    region: `oss-${context.region}`,
    accessKeyId: context.credentials.accessKeyId,
    accessKeySecret: context.credentials.accessKeySecret,
    stsToken: context.credentials.securityToken,
    internal: true,
    bucket: "YOUR_BUCKET_NAME",
  });

  try {
    let result = await client.put("test.txt", new Buffer("Hello OSS"));
    result = await client.get("test.txt");
    const content = result.content.toString("utf8");
    console.log(content);
    callback(null, content);
  } catch (e) {
    console.log(e);
    callback(e, null);
  }
};
