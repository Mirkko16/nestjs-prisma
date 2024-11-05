<!-- QUORUM ASSIGNMENT

To run the application correctly, it is recommended to follow these steps:

1. Make sure to have all the necessary packages installed. If you think you might be missing a specific package, run the following command in a terminal (in the project directory): npm install

2. To run the code coverage tests, you should execute the command: npm run test:cov. There are a total of six test files developed in this project:

_ permissions.controller.spec.ts
_ role.controller.spec.ts
_ rolePermissions.controller.spec.ts
_ user.controller.spec.ts
_ userPermission.controller.spec.ts
_ userRole.controller.spec.ts

3. Once all the necessary packages are installed (step 1), you can start testing the application and the database.

4. To test the application locally, ensure the following: 
a) Create the database quorumdb in your PostgreSQL server. 
b) Apply the migration init with the following command: npx prisma migrate dev --name init 
c) Run npm start (this will run the application in the local environment).
If you want to use Docker Compose, you should run the following command: npm run start:docker. This command will run the container and the database with Docker. Unlike the local setup, this command will perform all necessary migrations and configurations.

4. When the application is running, whether locally or in Docker, you can access the API at http://localhost:3000/api. 
   All GET endpoints will function without authorization, while POST, PUT, and DELETE will require authorization.

6. To test the other endpoints, use the login method /auth/login with the user that was created when compiling the application:
    User: Admin
    Pass: Admin@123

7. Once you obtain the token from the login, you must authorize the other methods. -->