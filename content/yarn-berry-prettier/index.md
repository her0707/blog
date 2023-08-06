---
emoji:
title: Yarn berry 적응기 1 (함수형 코딩 스터디)
date: '2023-08-06 01:05:00'
author: 허원호
tags: yarn berry, 스터디, zero-install
categories: 삽질
---

## 함수형 스터디 시작

약 5년간 프론트엔드 개발 업무를 진행하면서 적극적이고 주도적인 스터디를 진행해본적이 없는 것 같아 주변 지인분에게 먼저 스터디 제안을 하였고 긍적적인 답변을 받아 최근 "쏙쏙 들어오는 함수형 코딩" 스터디를 시작하게 되었습니다.

아무래도 기록을 남기고 서로 의견을 공유하는 더 의미있는 스터디를 진행해보고자 하는 의견을 받게 되었고 스스로도 기록을 남기는데에 중요성을 느끼게 되어 직접 코드도 작성해보고 서로 리뷰 및 질의 응답을 하는 방식으로 진행하는 것으로 결정 되었습니다.

typescript, jest 를 적용하여 각자 연습문제를 리팩토링 or 구현을 하여 PR을 올리면 git action을 통해 테스트 코드로 검증하도록 저장소를 구축하기로 결론을 내렸습니다.

## Yarn Berry 적응기 1탄

Yarn Berry에 대한 다양한 블로그 포스팅 글과 기존 프로젝트에 적용해보고자 하는 호기심이 있었는데 이번 스터디 저장소가 규모도 작고 기록용이다보니 부담없이 적용해볼 수 있을 것 같다는 생각이 들어 Yarn Berry 를 통해 프로젝트를 구축해봤습니다.

```bash
yarn init -2 // 대망의 berry init 이 명령어를 이제서야 해보다니 정말 게을렀다라는 생각이 들었다..
```

yarn berry 의 경우 위의 커맨드로 프로젝트 생성 시 자동으로 zero-install이 활성화된 상태로 의존성 모듈이 구성되게 됩니다.

> Note: By default, yarn init -2 will setup your project to be compatible with Zero-Installs, which requires checking-in your cache in your repository; check your .gitignore if you wish to disable this.
>
> yarn 2.x 공식문서에도 위와 같이 명시되어있다.

코드 포맷팅을 위해 prettier, eslint 적용 후 vscode의 설정내의 format on save 옵션이 켜져있으나 저장을 해도 prettier가 동작하지 않는 것으로 보여 vscode내의 출력 탭에서 에러를 표시하고 있는걸 알게되었습니다.

zero install을 통해 모듈을 관리하게되면 기존의 node_modules 디렉토리가 아닌 .yarn/cache에서 관리하게 되기 때문에 vscode에서 인식을 하지 못하는 것으로 생각하게 되었습니다.

아니나 다를까 검색을 해보니 동일한 오류로 Prettier와 yarn berry repository의 issue가 존재한다는 블로그글 또한 바로 찾아볼 수 있었습니다.

그렇다면 이를 해결하기 위해선 어떻게 설정을 해줘야할까요?

친절하게도 Yarn berry 공식문서의 [Editor SDKs](https://yarnpkg.com/getting-started/editor-sdks) 에 그 해답이 명시되어있습니다.

> 스마트 IDE (예: VSCode 또는 IntelliJ)는 Plug'n'Play 설치를 사용할 때 TypeScript가 작동하도록 특별한 설정이 필요합니다. 이 페이지는 각 편집기에 대한 설정을 모아놓은 컬렉션을 목표로 합니다 - 여러분도 이 목록에 기여해주세요!

저는 현재 vscode를 사용하고 있으므로 vscode 설정을 따르도록 하겠습니다.

```bash
yarn dlx @yarnpkg/sdks vscode
```

설치하기가 무섭게 콘솔에 에러가 사라졌습니다!

## 후기..

아쉽게도 전역 prettier 가 아닌 package.json 에 install 한 prettier는 format on save로 제대로 동작을 안하는 현상이 발생합니다.

> [https://github.com/prettier/prettier-vscode/issues/3068](https://github.com/prettier/prettier-vscode/issues/3068)
> 해당 이슈에서 동일한 현상이 발생하는 사용자를 확인할 수 있었습니다..

시작부터 손이 가는걸 보아하니 yarn 1.x 버전 사용중인 프로젝트 마이그레이션 시에는 꽤나 고생하겠다는 생각이 벌써 부터 드네요

pnp 방식에 대한 정의는 이후에 내용정리해서 올려보도록 하겠습니다.
