# express-graphiql-middleware

[GraphiQL](https://github.com/graphql/graphiql) middleware for [express](https://expressjs.com/). Initial code is extracted from [Apollo server](https://github.com/apollographql/apollo-server) v1.

## Installation

Add to your project

```bash
yarn add express-graphiql-middleware

# or (using npm)
npm i --save express-graphiql-middleware
```

## Usage

```js
import expressGraphiqlMiddleware from 'express-graphiql-middleware';

// ... app is express application

app.get('/graphiql', expressGraphiqlMiddleware({ endpointURL: '/graphql', rewriteURL: true }));
```
