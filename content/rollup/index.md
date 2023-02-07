---
emoji:
title: Rollup.js
date: '2023-02-03 13:18:00'
author: 허원호
tags: Rollup, bundler, javascript
categories: 블로그
---

# rollup.js

# 개요

- Webpack 과 유사한 Javascript 모듈 번들러
- ES6 모듈형식으로 빌드 결과물을 출력할 수 있음
- loader나 설정파일이 복잡한 Webpack에 비해 설정이 간단한 편
- 코드 스플리팅에 강점을 가짐(중복 제거에 특화됨)

# 빠른시작

`rollup main.js --file bundle.js --format ***`

- —format 옵션을 통해 **브라우저(iife)**, **node(cjs)**, **브라우저와 node를 모두(umd)** 지원하는 번들링이 가능

# 설정

```jsx
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];

function setUpRollup({ input, output }) {
  return {
    input,
    output,
    watch: {
      include: '*',
      exclude: 'node_modules/**',
    },
    plugins: [
      peerDepsExternal(),
      resolve({ extensions }),
      commonjs({
        include: /node_modules/,
      }),
      typescript({ useTsconfigDeclarationDir: true, module: 'esnext' }),
      postcss({
        extract: true,
        modules: true,
        sourceMap: true,
        config: {
          path: './postcss.config.js',
        },
      }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      terser(),
    ],
    external: ['react', 'react-dom'],
  };
}

export default [
  setUpRollup({
    input: 'index.tsx',
    output: {
      file: 'dist/cjs.js',
      sourcemap: true,
      format: 'cjs',
      assetFileNames: '[name]-[hash][extname]',
    },
  }),
  setUpRollup({
    input: 'index.tsx',
    output: {
      file: 'dist/esm.js',
      sourcemap: true,
      format: 'esm',
      assetFileNames: '[name]-[hash][extname]',
    },
  }),
  setUpRollup({
    input: './styles/globals.css',
    output: {
      file: 'dist/global.css',
      sourcemap: true,
      format: 'esm',
    },
  }),
];
```

- input: entry 파일
- output
  - dir: build 폴더명
  - format: build format, cjs로도 설정 가능
  - exports: Name for UMD export
  - sourcemap: sourcemap generate 여부
- preserveModules: 기본값 false, true일 경우 빌드 결과물의 폴더 구조를 유지가능
- inlineDynamicImports: 동적 import
  - 해당옵션을 사용하였을때 lazy loading 관련 이슈가 발생할 수 있을 것 으로 보임 [https://velog.io/@sian/Vue로-만든-Design-system을-Rollup으로-번들링-해본-후기](https://velog.io/@sian/Vue%EB%A1%9C-%EB%A7%8C%EB%93%A0-Design-system%EC%9D%84-Rollup%EC%9C%BC%EB%A1%9C-%EB%B2%88%EB%93%A4%EB%A7%81-%ED%95%B4%EB%B3%B8-%ED%9B%84%EA%B8%B0#2-config-%EC%9E%91%EC%84%B1-%EF%B8%8F)

# [플러그인](https://github.com/rollup/plugins)

- @**rollup/plugin-babel**: rollup에서 babel 을 사용 할 수 있게 해주는 플러그인
- \***\*@rollup/plugin-node-resolve\*\***: node_modules에서 써드파티 모듈을 사용하는 용도로 사용하며, js 이외의 확장자 (ts, tsx) 파일을 불러오기 위해서도 필요
- **rollup-plugin-peer-deps-external**: peerDependency로 설치된 라이브러리의 코드가 번들링된 결과에 포함되지 않고, `import` 구문으로 불러와서 사용할 수 있게 해줌
- @**rollup/plugin-commonjs**: CommonJS 형태로 이루어진 모듈의 코드를 ES6로 변환하여 결과물에 포함
- **@svgr/rollup**: SVG를 컴포넌트 형태로 사용하게 해줌
- @**rollup/plugin-url**: data-URI형태로 svg, png, jpg 파일 등을 불러와서 사용하게 해줌
  - @svgr/rollup 플러그인을 사용 할 때, rollup-plugin-url과 함께 사용을 해야만 `import { ReactComponent as icon } from './icon.svg'` 형태의 코드가 사용가능
- **@rollup/plugin-typescript**
  - **rollup-plugin-typescript2:** 컴파일러 오류를 개선한 버전
- **rollup-plugin-terser:** 번들 결과물을 minify 처리
- **rollup-plugin-postcss**
