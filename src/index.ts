import {
  GraphiQLData,
  resolveGraphiQLString,
} from 'apollo-server-module-graphiql';
import * as express from 'express';
import * as url from 'url';

export type ExpressGraphiQLOptionsFunction = (
  req?: express.Request,
) => GraphiQLData | Promise<GraphiQLData>;

/* This middleware returns the html for the GraphiQL interactive query UI
 *
 * GraphiQLData arguments
 *
 * - endpointURL: the relative or absolute URL for the endpoint which GraphiQL will make queries to
 * - (optional) query: the GraphQL query to pre-fill in the GraphiQL UI
 * - (optional) variables: a JS object of variables to pre-fill in the GraphiQL UI
 * - (optional) operationName: the operationName to pre-fill in the GraphiQL UI
 * - (optional) result: the result of the query to pre-fill in the GraphiQL UI
 */

export default (options: GraphiQLData | ExpressGraphiQLOptionsFunction) => {
  const graphiqlHandler = (
    req: express.Request,
    res: express.Response,
    next: (x: any) => void,
  ) => {
    const query = req.url && url.parse(req.url, true).query;
    resolveGraphiQLString(query, options, req).then(
      graphiqlString => {
        res.setHeader('Content-Type', 'text/html');
        res.write(graphiqlString);
        res.end();
      },
      error => next(error),
    );
  };

  return graphiqlHandler;
};
