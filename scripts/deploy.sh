REPOSITORY=/home/ec2-user/cake/
cd $REPOSITORY

APP_NAME=deco-my-cake

echo "> 배포"
npm i
npm run build
pm2 delete "$APP_NAME"
pm2 start npm --name "$APP_NAME" -- run "start:prod"
