import * as ts from 'typescript';
import { readFileSync } from 'fs';

export const generateHooks = () => {
  const program = ts.createProgram(['node_modules/spotify-web-api-js/src/typings/spotify-web-api.d.ts'], {});

  console.log(program);
};

export default generateHooks;
