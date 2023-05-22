# -*- coding: utf-8 -*-
import logging
import json
import oss2


def handler(event, context):
    # evt = json.loads(event)
    logger = logging.getLogger()
    auth = oss2.StsAuth(context.credentials.access_key_id,
                        context.credentials.access_key_secret, context.credentials.security_token)
    endpoint = 'https://oss-{}-internal.aliyuncs.com'.format(context.region)
    bucket = oss2.Bucket(auth, endpoint, 'YOUR_BUCKET_NAME')
    bucket.put_object('test.txt', u'Hello OSS')
    object_stream = bucket.get_object('test.txt')
    content = object_stream.read()
    logger.info(content)
    return content
