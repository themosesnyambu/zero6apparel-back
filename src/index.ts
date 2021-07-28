import express, {
  Express,
  NextFunction,
  Request,
  Response,
} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import env from './config/env-config';
import routes from './routes';

dotenv.config();

const isProduction = env.NODE_ENV === 'production';

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors());

// Normal express config defaults
app.use(morgan('dev'));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());

if (!isProduction) {
  app.use(errorhandler());
}

app.use('/api', routes);

mongoose.connect('mongodb://localhost:27017/zero6', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,

}, () => {
  // eslint-disable-next-line no-console
  console.log('connected to database');
});

// / catch 404 and forward to error handler
app.use((req: Request, res: Response, next:NextFunction) => {
  const err = new Error('Not Found');
  // err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    // eslint-disable-next-line no-console
    console.log(err.stack);

    res.status(500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  res.status(500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('The application is listening on port 3000!');
});
