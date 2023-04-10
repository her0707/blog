---
emoji:
title: Apple silicon에서 nvm 을 통한 node 설치
date: '2023-04-10 22:33:00'
author: 허원호
tags: node, nvm, m1, m2, MacBook
categories: 블로그
---

# nvm 이란

Node Version Manager의 약자로 사용자별로 설치되고 셸별로 호출되도록 설계된 node.js용 버전 관리자입니다. nvm은 모든 POSIX 호환 셸(sh, dash, ksh, zsh, bash), 특히 Unix, macOS 및 Windows WSL 플랫폼에서 작동합니다.

# 설치 방법

[설치 링크](https://github.com/nvm-sh/nvm#install--update-script)

# 사용법

## Listing Version

```
$ nvm ls
```

![nvm-list](nvm-list.png)

## To Download, compile, install

```
$ nvm install node // 가장 최근 node 버전을 설치
$ nvm install 14.21.3 // 명시된 node 버전을 설치
```

### Long Term Support

```
$ nvm install --lts
$ nvm install --lts=argon
$ nvm install 'lts/*'
$ nvm install lts/argon
```

## Use

```
$ nvm use node
$ nvm use 14.21.3
$ nvm use lts/argon
```

# 설치중 겪은 에러

## python version 에러

lts/gallium 설치 시 mac에 설치된 python 버전이 3.11 이여서 발생한 오류

### 해결방법

[pyenv](https://github.com/pyenv/pyenv) 설치 후 호환되는 python 버전을 설치하여 node 설치 재 진행

## curl 404 not found 에러

상대적으로 구 버전인 node 의 경우 Apple Silicon의 아키텍쳐인 arm64를 지원하지 않아 패키지 설치에 오류가 발생하고 node가 정상적으로 설치되지 않는 현상이 발생

### 해결방법

기본 터미널이아닌 별도의 터미널을 사용하거나
Finder -> Applications(응용프로그램) -> 유틸리티 -> terminal(터미널) -> 우클릭/정보가져오기 -> Rosetta shell 사용하기를 선택하면 설치 가능
