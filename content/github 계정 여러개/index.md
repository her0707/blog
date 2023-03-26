---
emoji:
title: 한 PC 에서 여러개의 Github 계정 사용하기
date: '2023-03-26 22:02:00'
author: 허원호
tags: github, ssh
categories: 블로그
---

## 일반적인 로그인 방법

가장 쉬운 방법으로는 git config 에 계정정보를 저장하는 방법이 있다.

```
$ git config --global credential.helper store
```

이후 아이디와 패스워드를 입력하면 사용하려는 github 계정이 저장된다.

## 2개이상의 계정을 사용해야할 경우에는?!

검색을 하였을 때 가장 많이 언급되는 방법은 ssh-key를 이용하는 방법이었다.

### ssh-key 생성

- ssh 디렉토리로 이동

```
$ cd ~/.ssh
```

- github 이메일로 ssh-key 생성
  (명령어 실행 시 암호 입력을 받는데 엔터 2번 쳐서 skip 가능)

```
$ ssh-keygen -t rsa -C "test@gamil.com" -f "id_rsa_test"
```

ls 명령으로 생성된 key 정보를 확인할 수 있음
(id_rsa_test, id_rsa_test.pub - 개인키, 공개키)

- ssh-agent에 ssh-key 추가 (계정 수 만큼 ssh-add 진행)

```
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa_user1
```

### github 계정에 ssh 키 등록

- 생성된 공개키 파일의 내용을 복사

```
$ vi ~/.ssh/id_rsa_test.pub
```

- github에 해당 생성한 사용자 계정으로 로그인

- 프로필의 settings 메뉴로 이동

![settings.png](settings.png)

- 좌측의 SSH and GPG keys 진입

![ssh-menu.png](ssh-menu.png)

- new SSH 클릭하여 복사한 공개키 저장

### ssh config 파일 설정

- ssh config 파일 생성 or 수정

```
$ vi ~/.ssh/config
```

아래 설정을 추가

```
 Host github.com-test
   HostName github.com
   User test
   IdentityFile ~/.ssh/id_rsa_test
```

- 연결 테스트

```
$ ssh -T git@github.com-test
```

### 로컬 리포지토리의 remote 및 config 설정 변경

- origin을 추가하는 경우

```
$ git remote add origin git@github.com-test:test/저장소명.git
$ git config user.email test@example.com
```

- 기존 remote 정보를 변경하는 경우

```
$ git remote set-url origin git@github.com-test:test/저장소명.git
$ git config user.email test@example.com
```
