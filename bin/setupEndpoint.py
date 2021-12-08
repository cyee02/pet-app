import json
import boto3

cfn_stack = "pet-app" # to consider generating this dynamically

cfn_client = boto3.client('cloudformation', region_name='ap-southeast-1')
ec2_client = boto3.client('ec2', region_name='ap-southeast-1')

response = cfn_client.describe_stack_resources(
    StackName=cfn_stack,
    LogicalResourceId="Server"
)

instance_id = response['StackResources'][0]['PhysicalResourceId']
print(instance_id)

response = ec2_client.describe_instances(
    Filters=[{"Name": "instance-id", "Values": [instance_id]}]
    # PublicIps=[instance_id]
)
dns = response['Reservations'][0]['Instances'][0]['PublicDnsName'] 

# Write backend endpoint to json file
endpoints = {
  "graphqlEndpoint": "http://" + dns + "/graphql",
  "wsGraphqlEndpoint": "ws://" + dns + "/graphql"
}
with open('./src/endpoint.json', 'w') as outfile:
  json.dump(endpoints, outfile, indent=2)