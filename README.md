Install yarn 4
```
corepack enable
yarn set version stable
```

Fix issue with node_modules
```
yarn dlx @yarnpkg/sdks vscode
```

Install dependencies
```
yarn install
```

Start Keycloak server and DB
```
docker-compose up
```

Start the application
```
yarn start
```

Open the application in your browser
```
http://localhost:3000
```

Open Keycloak in your browser
```
http://localhost:8080
```
