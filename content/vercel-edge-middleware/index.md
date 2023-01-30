---
emoji: ![vercel.png](vercel.png)
title: Vercel Edge middleware
date: '2023-01-30 16:18:00'
author: 허원호
tags: Github
categories: 블로그
---

## Vercel Edge middleware

Edge middleware란 사이트에서 요청이 처리되기 전에 실행되는 코드입니다.

요청에 따라 응답을 수정할 수 있습니다. **캐시보다 먼저 실행되기 때문에 middleware를 사용하는 것은 정적으로 생성된 콘텐츠에 개인화를 제공하는 효과적인 방법입니다.**

들어오는 요청에 따라 응답을 반환하기 전에 사용자 지정 논리를 실행하고 rewrite, redirect, headers 추가 등을 수행할 수 있습니다.

![vercel-infra.avif](edge-middleware-light.avif)

Vercel의 Edge Network에 전역적으로 배포되며 서버 측 로직을 방문자의 출처에 가까운 Edge로 이동할 수 있습니다.

미들웨어는 Chrome 브라우저에서 사용 하는 것과 동일한 고성능 V8 JavaScript 및 WebAssembly 엔진 에 구축된 Vercel Edge Runtime 을 사용합니다.

Edge Runtime은 Web Standard API(FetchEvent, Response, Request)의 하위 집합을 노출하고 확장합니다.
