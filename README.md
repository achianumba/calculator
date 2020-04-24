# Calculator

A simple calculator built with React using Create-React-App.

I built this web app in partial completion of FreeCodeCamp.org's Frontend Libraries Certification.

Check out the live version at https://codepen.io/chianumba/pen/VwYzVdm?editors=0010

## Testing
This web app uses JavaScript's `window.eval()` method. 
Because Webpack uses strict mode and strict mode forbids the use of `eval()`, the app might crash upon start up unless you configure Webpack to use `eval-source-map` instead of `cheap-source-map`.

##### To try it out:
1. If you've installed git on your local machine, open your terminal and type in `git clone https://github.com/achianumba/calculator`, then press `Enter`. Alternatively, download this repo using the `download` button above and extract it from the zip archive.

2. Change your terminal's working directory to the repo you've just downloaded using: ```cd calculator```

3. Type `npm install` and press `Enter` to install dependencies.

4. Type `npm eject` and press `Enter`. This will allow you to manually configure Webpack.

5. Open the `webpack.config.js` file in the `config` folder at the root of the current directory. I.e `calculator/config/webpack.config.js`.

6. Press `Ctrl + F` to find `'cheap-source-map'` and replace it with `eval-source-map`. Save the config file and close it.

7. Return to your terminal and run `npm start` to start the development server and view this app in your browser.