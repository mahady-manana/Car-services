export const Template = (muiCss, html, scripts) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Car services - Web app</title>
        <meta name="description" content="Car services - Application for everyone">
        <meta name="keywords" content="Reactjs, Nodejs, Jsx, Express, MongoDB, JavaScript, Mern">
        <meta name="author" content="Mahady Manana">
        <base href="/">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <style>${muiCss}</style>
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
			@keyframes LoadingSpin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
		
		</style>
    </head>
    <body>
        <div id="__CAR_APP__">${html}</div>
        ${scripts}
	</body>
    </html>
    `;
};
