# Initial installation
1. Install node version 16 via nvm
> -  Install nvm or windows-nvm (_Uninstall any existing installations of NodeJS and Nodist beforehand_):
>    - nvm-windows (for Windows): https://github.com/coreybutler/nvm-windows
>    - nvm (for Mac and Linux): https://nvm.sh
> - In an elevated (administrator) terminal/cmd:
>    - `nvm install 16`
>    - `nvm use 16` (in case of nvm-windows once again when a specific version is displayed in the error message: `nvm use 16.x.x`)
2. Continue to `Authorize the private TrueLime Frontend registry`

### Authorize the private TrueLime Frontend registry
1. In terminal/cmd run: `npm run install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false`
2. Copy the lines in the .npmrc file in the folder of this readme
3. Check if there is a .npmrc file in the `C:/Users/<username>` folder. If not, copy the .npmrc file in this folder and paste it into that location and skip step 4.
4. Open `C:/Users/<username>/.npmrc` and paste the copied lines of step 2 at the end. Then save it.
5. Open (or cd) the terminal/cmd in the folder `C:/Users/<username>/`. Then run `vsts-npm-auth -f -config .npmrc` and if necessary fill in your credentials.

## Frontend development
1. In this folder in the terminal/cmd for only the first run:
    - `nvm use 16` (in case of nvm-windows once again when a specific version is displayed in the error message: `nvm use 16.x.x`)
    - `npm install`
2. In this folder in the terminal/cmd run: `start.cmd`
3. Then go to the browser and paste: "http://localhost:3000/".
4. Alternatively you can run `start-release.cmd` for a build equal to the production environment, 
   but run `start.cmd` for faster buildtimes while editing the frontend
5. Install the following Visual Studio Online Extensions:
- [Beautify css/sass/scss/less](https://marketplace.visualstudio.com/items?itemName=michelemelluso.code-beautifier)
- [EJS language support](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support)
- [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- (optional) [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)

## Deploy to kentico (If you keep the front-end and back-end separate)
1. In terminal/cmd run: `build.cmd`.
2. The files have been published to multiple locations defined in the config.json in the location of the <destination> tag:
   { "publish": { "assetsPaths": ["<destination>"] }}
   
### Resolve npm build error code E401
`npm ERR! Unable to authenticate, need: Basic realm="https://pkgsprodsu3weu.app.pkgs.visualstudio.com/"`
1. Your credentials have been expired. Rerun `vsts-npm-auth -f -config .npmrc` and if necessary fill in your credentials.