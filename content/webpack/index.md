---
emoji:
title: Webpack
date: '2023-02-03 16:18:00'
author: 허원호
tags: webpack, vue, vue-cli
categories: 블로그
---

# Webpack

## Webpack 옵션

- optimization

  - splitChunks
    - chunks
      - initial: 기본 Chunk Spliting
      - async: 비동기로 호출하는 요소 중 중복되는 부분을 Spliting
      - all: 모든 코드의 중복되는 요소들을 확인하여 Spliting
  - minimize

    - Bundle 파일을 압축하는 용도
    - 압축시 TerserPlugin을 사용하여 압축을 진행하여 terser-webpack-plugin 모듈이 필요

      ```jsx
      const TerserPlugin = require('terser-webpack-plugin');

      module.exports = {
        optimization: {
          minimize: true,
          minimizer: [new TerserPlugin()],
        },
      };
      ```

    - Webpack5부터는 TerserPlugin이 내장되어 생략가능
      - Terser
        - ES6+ 를 위한 자바스크립트 parser 및 mangler/compressor 툴킷
        - webpack TerserPlugin에서는 자바스크립트를 축소하는데 사용

- devtool
  - 빌드된 파일과 원본파일을 연결시켜주는 역할을 수행(배포된 파일을 디버깅 할 때 사용)
  - [옵션 비교 표](https://webpack.js.org/configuration/devtool/#devtool)

## Vue Cli 3.x 이상

- Vue cli 2 이하에서는 webpack.config.js 파일이 프로젝트 루트 레벨에 노출되어 있으나 Vue cli 3 버전 이상부터는 node_modules/@vue/cli-service 내에 숨김 처리 되어 있음
- 추가로 WebPack 설정이 필요한 경우 현재 프로젝트의 WebPack 설정의 경우 vue.config.js 파일에서 설정
- WebPack Bundle 분석 필요 시 분석 플러그인인 webpack-bundle-loader를 설치하여 번들의 크기를 시각적으로 볼 수 있음

  - npm i --save-dev webpack-bundle-analyzer

  ```jsx
  // vue.config.js

  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  module.exports = {
    configureWebpack: {
      plugins: [new BundleAnalyzerPlugin()],
    },
  };
  ```

  - npm run build 시 번들 크기 분석 페이지 노출

- configureWebpack 또는 chainWebpack 을 통해 설정 변경 가능
  - configureWebPack의 경우 [webpack-merge](https://cli.vuejs.org/guide/webpack.html#simple-configuration)를 사용, chainWebpack의 경우 [webpack-chain](https://cli.vuejs.org/guide/webpack.html#chaining-advanced)을 사용하여 병합처리
- publicPath
  - deploy된 어플리케이션의 BaseUrl 역할을 하는 옵션이며 webpack의 output.publicPath의 역할을 대신합니다.
- productionSourceMap
  - default: true
  - false 시 디버깅 시 사용되는 source maps를 proudction build 시 생성 하지 않게하여 빌드 속도 상승
