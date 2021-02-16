// import { generateHooks } from '../src/generateHooks';
import * as ts from 'typescript';

describe('generateHooks', () => {
  it('works', () => {
    const path = 'node_modules/spotify-web-api-js/src/typings/spotify-web-api.d.ts';

    const program = ts.createProgram([path], {});

    const source = program.getSourceFile(path);

    const syntaxToKind = (kind: ts.Node['kind']) => ts.SyntaxKind[kind];

    ts.isTy

      .ts.forEachChild(source, (node) => {
        console.log(syntaxToKind(node.kind));
      });
    // console.log(generateHooks);
  });
});
