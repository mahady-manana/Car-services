import express from "express";
import favicon from "serve-favicon";
import config from "./configs/config";
import webpackDevBundler from "./bundler";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import React from "react";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import theme from "../frontends/theme";
import Application from "../frontends/App";

import UserRouter from "./routers/user.router";
import CarRouter from "./routers/car.router";
import AuthUserRouter from "./routers/user.authentication";
const CURRENT_WD = process.cwd();
const app = express();

// Webpack Development bundle
if (process.env.NODE_ENV === "development") {
	webpackDevBundler.Bundler(app);
}
// app.use(favicon(path.join(CURRENT_WD, "public", "images", "icon.png")));

app.use(express.static(path.join(CURRENT_WD, "/static/")));
app.use(express.static(path.join(CURRENT_WD, "/build/")));
app.use("*", express.static(path.join(CURRENT_WD, "/build/")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", UserRouter);
app.use("/", CarRouter);
app.use("/", AuthUserRouter);

app.get("*", (req, res) => {
	const sheets = new ServerStyleSheets();
	const context = {};
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
	const MuiCss = sheets.toString();
	let bundleFile;
	if (process.env.NODE_ENV === "development") {
		bundleFile = "/build/bundle.js";
	} else {
		bundleFile = "/bundle.js";
	}
	res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application - Test</title>
        <meta name="description" content="Cette application est un produit d'un test propose par Thierry">
        <meta name="keywords" content="Reactjs, Nodejs, Jsx, Express, MongoDB, JavaScript, Mern">
        <meta name="author" content="Mahady Manana">
        <base href="/">
        <style id="js-server">${MuiCss}</style>
		<style>
		
			body {
				margin: 0;
			}
			* {
				word-wrap: normal;
			}
			a {
				text-decoration: none;
			}
			a:hover {
				text-decoration: none;
			}
			
		
		</style>
    </head>
    <body>
        <div id="root">${html}</div>
        <script src=${bundleFile}></script> 
	</body>
    </html>
    `);
});

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGOURI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
mongoose.connection.on("error", () => {
	throw new Error(`Unable to connect to database: ${config.MONGOURI}`);
});
app.listen(config.PORT, (error) => {
	if (error) {
		console.log(error);
	}
	console.log(
		`Server running at : ${config.PORT}\nVisit : http://localhost:${config.PORT}`,
	);
});
