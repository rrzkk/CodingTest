aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 911203523262.dkr.ecr.ap-southeast-2.amazonaws.com
docker build -t codingtest .
docker tag codingtest:latest 911203523262.dkr.ecr.ap-southeast-2.amazonaws.com/codingtest:latest
docker push 911203523262.dkr.ecr.ap-southeast-2.amazonaws.com/codingtest:latest