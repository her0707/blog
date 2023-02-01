---
emoji:
title: Vercel Edge Network
date: '2023-02-01 00:18:00'
author: 허원호
tags: Vercel
categories: 블로그
---


# Vercel Edge Network

Vercel Edge Network는 인터넷과 Vercel 배포 사이에 위치합니다. 이러한 유형의 네트워크 토폴로지는 콘텐츠 전송 네트워크 또는 CDN이라고도 합니다.

### Regions
가능한 한 빨리 요청을 라우팅하기 위해 Edge Network는 전 세계 수십 곳에서 실행되고 있습니다.
이러한 모든 위치(Regions 라고 함)에서 Serverless Funtion 및/또는 정적 파일을 출력하는 빌드를 생성하는 배포를 생성할 수 있습니다.

그러면 Edge Network는 들어오는 요청을 Serverless Funtion이 실행 중인 가장 가까운 위치로 자동으로 전달합니다(정적 파일은 항상 전체 네트워크에 분산되므로 특정 위치에 국한되지 않음).

배포의 Serverless Funtion이 요청된 지역에 생성되지 않은 경우 요청은 배포된 Serverless Funtion이 포함된 가장 가까운 지역으로 전달됩니다.


### Caching
Vercel Edge Network는 가능한 한 빨리 사용자에게 데이터를 제공하기 위해 edge에서 콘텐츠를 캐시합니다.

### Streaming
Vercel은 Edge Functions의 스트리밍 응답을 지원합니다.
Edge Function에서 Streams Web API를 사용하면 한 번에 모두가 아니라 점진적으로 원격 소스에서 데이터를 반환할 수 있습니다.

### Supported Protocols
- HTTPS
- HTTP/1.1
- HTTP/2


## Edge Config
> Edge Config 는 모든 요금제에서 베타로 제공됩니다.

Edge Config는 Vercel 계정과 연결된 key-value 데이터 저장소입니다.
외부 데이터베이스를 querying하지 않고도 Edge에서 데이터를 읽을 수 있습니다. 이를 사용하여 업스트림 서버를 건드리지 않고 Edge 속도로 feature flags를 확인하거나 리디렉션을 시작하거나 악의적인 IP를 차단할 수 있습니다.

Edge Functions, Edge Middleware 및 Serverless Functions에서 Edge Config를 사용할 수 있습니다.

### Using Edge Config
Edge Config 클라이언트 SDK 또는 Vercel API를 사용하여 Edge Config을 읽을 수 있습니다.
가장 중요한 것이 요청 속도인 경우 클라이언트 SDK를 사용하거나 Edge Config endpoint를 호출하는 것이 좋습니다. 이 경우 데이터가 전역적으로 복제되고 요청에 속도 제한이 없으며 저렴합니다.

대신 Vercel API를 사용하면 항상 데이터의 최신 값을 얻을 수 있지만 최적화의 이점을 얻지 못하고 읽기 속도가 느립니다.


### Specifications
- [Limits](https://vercel.com/docs/concepts/edge-network/edge-config/edge-config-limits#limits) 에 설명된 Plan에 따라 Vercel 계정당 하나이상의 Edge Config를 가질 수 있습니다.
- 하나의 Vercel 프로젝트에서 여러 Edge Config를 사용할 수 있습니다
- 각 Edge Config는 여러 Vercel 프로젝트에서 엑세스 할 수 있습니다
- Edge Config는 환경 변수를 사용하여 프로젝트 내의 다양한 환경으로 범위를 지정할 수 있습니다
- Edge Config 액세스는 기본적으로 안전합니다. 읽기에는 read access token이 필요하고 쓰기에는 API 토큰이 필요합니다.

### Use cases
Edge Config는 자주 액세스하고 드물게 업데이트되는 데이터에 적합합니다.

- [Feature flags 와 A/B 테스트](https://vercel.com/templates/next.js/feature-flag-apple-store): Edge Config에 feature flags를 저장하여 A/B 테스트를 수행할 수 있습니다. 데이터 베이스가 아닌 Edge Config에 이러한 데이터를 가져오도록 할경우 페이지 로드를 수백 밀리초 줄일 수 있습니다.
- 중요한 redirects: 긴급하게 URL을 리디렉션해야 하는 경우 Edge Config는 웹 사이트를 다시 배포할 필요가 없는 빠른 솔루션을 제공합니다. Edge middleware를 사용하면 사용자가 잘못된 URL을 방문할 때 사용자를 리디렉션하도록 Edge Config에서 읽을 수 있습니다.
- 악성 IP 및 User Agent 차단: Edge Config에 악의적인 IP 세트를 저장한 다음 업스트림 서버를 호출하지 않고 감지 시 차단합니다.


### Limits

- 단일 Edge Config에는 계정 plan에 따라 최대 크기가 있습니다.
  - 8 KB for Hobby
  - 64 KB for Pro
  - 512 KB for Enterprise

- 모든 계정 Plan은 제한된 양의 Edge Config를 배포할 수 있습니다.
  - A maximum of 1 for Hobby
  - A maximum of 3 for Pro
  - A maximum of 10 for Enterprise

- 데이터 항목 키 네임 제한사항
  - 키는 256자로 제한
  - 유효한 키 네임에는 - 또는 _ 이외의 특수문자가 포함 될 수 없습니다. 해당 정규식 패턴에 대해 키 네임을 체크 합니다: ^[A-z0-9_-]+$

- 쓰기는 리소스를 많이 사용합니다.
- Edge Config에 대한 쓰기가 전역으로 전파되는 데 최대 10초가 걸릴 수 있습니다. 자주 업데이트되거나 업데이트 후 즉시 액세스해야 하는 데이터에는 Edge Config를 사용하지 마십시오.
- 로컬 개발 환경에서 액세스한 Edge Config는 Vercel의 최적화를 활용할 수 없습니다. 결과적으로 Production보다 100밀리초 이상 느릴 수 있습니다.
- [공유 환경 변수](https://vercel.com/docs/concepts/projects/shared-environment-variables)를 통한 Edge Config 추가는 아직 지원되지 않습니다.
