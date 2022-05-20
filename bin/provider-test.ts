#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProviderTestStack } from '../lib/provider-test-stack';

const app = new cdk.App();
new ProviderTestStack(app, 'ProviderTestStack', {
  env: { account: '214783019211', region: 'us-west-1' },
});