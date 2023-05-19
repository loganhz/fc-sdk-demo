# -*- coding: utf-8 -*-
import logging
import json
from alibabacloud_fc_open20210406.client import Client as FC_Open20210406Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_fc_open20210406 import models as fc__open_20210406_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient


def handler(event, context):
    print(str(context))
    # evt = json.loads(event)
    logger = logging.getLogger()
    logger.info('hello world')
    config = open_api_models.Config(
        type='sts',
        access_key_id=context.credentials.access_key_id,
        access_key_secret=context.credentials.access_key_secret,
        security_token=context.credentials.security_token
    )
    config.endpoint = '{}.{}.fc.aliyuncs.com'.format(
        context.account_id, context.region)
    client = FC_Open20210406Client(config)
    invoke_function_headers = fc__open_20210406_models.InvokeFunctionHeaders(
        x_fc_invocation_type='Async',
        x_fc_log_type='None'
    )
    invoke_function_request = fc__open_20210406_models.InvokeFunctionRequest(
        qualifier='LATEST',
        body='{"key":"value"}'
    )
    runtime = util_models.RuntimeOptions()
    result = client.invoke_function_with_options(
        'YOUR_SERVICE_NAME', 'YOUR_FUNCTION_NAME', invoke_function_request, invoke_function_headers, runtime)
    print(result)
    return 'success'
