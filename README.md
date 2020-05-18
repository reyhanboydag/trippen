# Trippen Travel
Graphql'in temel yapı taşları olan query ve mutai

MongoDB

Bu projeyi çalıştırmak için MongoDB'yi kurmanız ve bir örneğin çalıştığından emin olmanız gerekir.

NPM Modülleri

Package.json içinde aşağıdaki NPM modülleri gereklidir:

express,
express-graphql,
graphql,
mongoose,
babel-core,
babel-preset-env,
nodemon,
bcryptjs,
body-parser,
bootstrap-icons,

Geliştirme Süreci

npm start ile yapılandırılır, böylece kod dosyaları değiştiğinde sunucu otomatik olarak yeniden başlatılır.(nodemon paketi sayesinde)

GraphQL Mutations & Queries:
Sorgular Graphql ile çalıştırılır. (http://localhost:3000/graphql)

Yeni bir Event Oluşturma:
mutation{createEvent(eventInput:{title:"Road to Travel",description:"Route paths, in combination with a request method, define the endpoints at which requests can be made.",date:"2020-05-18T00:53:38.000Z",from:"Ankara",to:"Istanbul"}){title,description}}
Kullanıcı şifreleri "bcryptjs" ile şifrelenmektedir.

mutation{
 createUser(userInput:{username:"reyhan",password:"test1",description:"1travel"}){_id,password}
}

Response

{
  "data": {
    "createUser": {
      "_id": "5ec287520416ea35480e8382",
      "password": "$2a$12$wo6hVZ4otlIvFK7rVO9mWeoLnsHJHqkWWGFiiig2COy37B5quGqGy"
    }
  }
}
