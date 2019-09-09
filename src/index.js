/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const fs = require('fs');

const extendConfig = function (api, conf) {
  // Check build environment
  const env = process.env.BUILD_ENV;
  let envName = '.env'; // default .env file name

  envName = `.env.${env}`;

  // resolve the path to the file
  const envPath = api.resolve.app(envName);

  // check file exists
  if (!fs.existsSync(envPath)) {
    console.log(`App Extension (dotenv): '${envName}' file missing; skipping`)
    return;
  }

   // dotenv options
  const envOptions = {
    encoding: 'utf8',
    path: envPath
  }

  const { config } = require('dotenv')
  const result = config(envOptions)

  // check for dotenv error
  if (result.error) {
    console.error(`App Extension (dotenv): Error '${result.error}'`)
    process.exit(1)
  }

  // get parsed data
  const parsed = result.parsed

  let target = {};

  for (const key in parsed) {
    target[key] = JSON.stringify(parsed[key])
  }

  return target;
};

module.exports = function (api) {
  // Quasar CLI version compatibility checker
  api.compatibleWith('@quasar/app', '^1.0.0')

  api.extendQuasarConf((conf) => {
    extendConfig(api, conf)
  })
};
