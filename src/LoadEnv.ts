import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

// Setup command line options
const options = commandLineArgs([
  {
    name: 'env',
    alias: 'e',
    defaultValue: 'development',
    type: String
  }
]);

// Set the env file
const envFile = dotenv.config({
  path: `./env/${options.env}.env`
});

if (envFile.error) throw envFile.error;
