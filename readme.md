Run the commands:

Clone the repo

cd server
npm install
docker-compose up -d

npx prisma migrate dev --name init
npx prisma db seed