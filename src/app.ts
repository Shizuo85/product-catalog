import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { logger } from './lib/logger';
import handlers from './lib/handlers';
import routes from './routes';

const app: Express = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.set('trust proxy', true);

// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation using swagger-jsdoc',
        },
        servers: [
            {
                url: process.env.WEB_URL,
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(
        'Incoming request \nmethod %o, \npath %o, \nbody %o, \nparams %o, \nquery %o, \nheaders %o',
        req.method,
        req.originalUrl,
        req.body,
        req.params,
        req.query,
        req.headers
    );
    next();
});
app.use('/api/v1', routes);

app.use(handlers.Error404Handler);

app.use(handlers.errorHandler);

export default app;
