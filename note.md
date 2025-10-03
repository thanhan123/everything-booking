docker build -t everything-booking .
docker run -p 3000:3000 everything-booking

docker-compose up --build

More setup:
- ALB needs to have public subnet
- Task needs to have private subnet
- need to create a NAT which points to a public subnet
- check each of the private subnet and make sure that it has a round table which also has a record of 0.0.0.0/0 points to the NAT gateway -> This is used to let the fargate connect to the ECR to pull the registry