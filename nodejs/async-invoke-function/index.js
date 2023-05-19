'use strict';

const {
  default: Client,
  InvokeFunctionHeaders,
  InvokeFunctionRequest,
} = require('@alicloud/fc-open20210406');
const { Config } = require('@alicloud/openapi-client');
const { RuntimeOptions } = require('@alicloud/tea-util');

exports.handler = async (event, context, callback) => {
  // const eventObj = JSON.parse(event.toString());

  const config = new Config({
    accessKeyId: context.credentials.accessKeyId,
    accessKeySecret: context.credentials.accessKeySecret,
    securityToken: context.credentials.securityToken,
    endpoint: `${context.accountId}.${context.region}.fc.aliyuncs.com`,
    readTimeout: 10000000,
    connectTimeout: 10000000,
  });

  const client = new Client(config);

  const invokeFunctionHeaders = new InvokeFunctionHeaders({
    xFcInvocationType: 'Async',
    xFcLogType: 'None',
  });

  const invokeFunctionRequest = new InvokeFunctionRequest({
    qualifier: 'LATEST',
    body: JSON.stringify({
      key1: 'value1',
    }),
  });

  const runtime = new RuntimeOptions({});

  try {
    const result = await client.invokeFunctionWithOptions(
      'YOUR_SERVICE_NAME',
      'YOUR_FUNCTION_NAME',
      invokeFunctionRequest,
      invokeFunctionHeaders,
      runtime,
    );
    callback(null, result);
  } catch (e) {
    console.log(e);
    callback(e, null);
  }
};