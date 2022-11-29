# alluxio-manager

## Server
``` ./mvnm spring-boot:run```

## Client
1. install nvm
2. use nvm to install node v18.12.1, npm v1.22.19
3. use run `npm install --global yarn` to install yarn
4. run `yarn run start` in the ./client directory

## Build
`mvn package`

## Run
1. run `java11; $JAVA_HOME/bin/java -jar target/alluxio-manager-0.0.1.jar`
2. access the website at http://localhost:8080

## References
[Including React in your Spring Boot maven build](https://medium.com/@itzgeoff/including-react-in-your-spring-boot-maven-build-ae3b8f8826e)
[React.js and Spring Data REST](https://spring.io/guides/tutorials/react-and-spring-data-rest/)