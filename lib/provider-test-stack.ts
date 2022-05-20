import { Stack, StackProps, Aws } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Effect, Role, ManagedPolicy, ServicePrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';


export class ProviderTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    const providerManagedPolicy = new ManagedPolicy(this, 'providerManagedPolicy', {
      statements: [new PolicyStatement({
        actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
        resources: [`arn:aws:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:*`],
        effect: Effect.ALLOW,
      })],
    });

    const providerRole = new Role(this, 'providerRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [providerManagedPolicy],
    });

    const onEvent : Function = new Function (this, 'onEvent', {
      runtime: Runtime.PYTHON_3_8,
      code: Code.fromAsset(path.join(__dirname)),
      handler: 'lambda.on_event',
    });

    const isComplete : Function = new Function (this, 'isComplete', {
      runtime: Runtime.PYTHON_3_8,
      code: Code.fromAsset(path.join(__dirname)),
      handler: 'lambda.is_complete',
    });

    new Provider(this, 'customresourceprovider', {
      onEventHandler: onEvent,
      isCompleteHandler: isComplete,
      role: providerRole,
    });

  }
}
