#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProviderTestStack } from '../lib/provider-test-stack';

const app = new cdk.App();
new ProviderTestStack(app, 'ProviderTestStack', {
  env: { account: <YOUR-ACCOUNT>, region: <YOUR-REGION> },
});