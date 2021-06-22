import express from 'express';
import webpackDevBundler from './bundler';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Application from '../frontend/App';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core';
import theme from './../frontend/theme';
import { Template } from './template';
import UserRouter from './services/routers/user.router';
import CarRouter from './services/routers/car.router';
import AuthUserRouter from './services/routers/user.authentication';
import config from './services/configs/config';
const CURRENT_WD = process.cwd();
const app = express();
const APP_PORT = process.env.PORT || 4000;
const MONGOURI = process.env.MONGO_URI;
if (process.env.NODE_ENV === 'development') {
  webpackDevBundler.Bundler(app);
}

app.use(express.static(path.join(CURRENT_WD, '/static/')));
app.use(express.static(path.join(CURRENT_WD, '/build/')));
app.use('*', express.static(path.join(CURRENT_WD, '/build/')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', UserRouter);
app.use('/', CarRouter);
app.use('/', AuthUserRouter);

app.get('*', (req, res) => {
  const context = {};
  const sheets = new ServerStyleSheets();
  const manifest = path.join(CURRENT_WD, 'build/__chunks__/manifest.json');
  // const getManifestScript = fs.readFileSync(manifest, (err, data) => {
  //   if (err) console.log(err);
  //   else {
  //     return data;
  //   }
  // });
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <Application />
        </ThemeProvider>
      </StaticRouter>,
    ),
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }

  // const scripts = Object.values(JSON.parse(getManifestScript)).map((script) => {
  //   return `<script src="${script}"></script>`;
  // });
  const serverCss = sheets.toString();
  const bundleFile = '<script src="/__chunks__/bundle.js"></script>';

  res.status(200).send(Template(serverCss, html, bundleFile));
});
mongoose.Promise = global.Promise;
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on('error', (error) => {
  throw new Error(`Unable to connect to database:  ${error}`);
});
app.listen(APP_PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server running at : 4000 \nVisit : http://localhost:4000`);
});
