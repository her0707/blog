---
emoji:
title: 객체
date: '2023-07-14 23:46:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 객체

- 자바스크립트를 구성하고있는 거의 모든 것이 객체
- 변경가능한 값

```js
const data = {
  name: 'tester', // 프로퍼티
  age: 50, // age가 프로퍼티 키, 50이 프로퍼티 값
  getAge: function () {
    // 메서드
    return this.age;
  },
};
```

- 프로퍼티: 객체의 상태를 나타내는 값
- 메서드: 프로퍼티를 참조하고 조작할 수 있는 동작

## 객체 리터럴에 의한 객체 생성

자바스크립트는 프로토타입 기반 객체지향 언어로서 다양한 객체 생성 방법을 지원

- 객체 리터럴 (앞 서 보인 코드가 객체리터럴로 생성한 객체)
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

## 프로퍼티

> 객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성됨

프로퍼티의 나열은 쉼표`,`로 구분함

- 프로퍼티 키: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- 프로퍼티 값: 자바스크립트에서 사용할 수 있는 모든 값

```js
// 가급적 식별자 네이밍 규칙을 준수하여 프로퍼티 키를 사용할 것 을 권장함

const data = {
  firstName: 'hong',
  'last-name': 'lee', // 네이밍 규칙을 준수하지않아 따옴표를 생략할 수 없으며 프로퍼티키를 참조할 경우에도 번거로움
};
```

문자열 또는 문자열로 평가할 수 있는 표현식을 통해 프로퍼티키를 동적으로 생성할 수도 참조할 수 도 있음

```js
const object = {};
const key = 'value';

object[key] = 'value';
// { value: "value" }

console.log(object[key]); // "value"
```

프로퍼티 키에 문자열, 심벌 값 외의 값을 사용하면 암묵적 타입변환으로 인해 문자열이 됨

```js
const data = {
  1: 1,
  2: 2,
  3: 3,
};
// 따옴표는 붙지 않지만 내부적으로는 문자열의 프로퍼티 키
console.log(data); // {1: 1, 2: 2, 3: 3}
```

이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어씀

```js
const obj = {
  name: 'string',
  name: 'false',
};

// { name: "false"}
```

## 메서드

프로퍼티 값이 함수인 경우 일반 함수와 구분하기 위해 메서드라고 부름

```js
const data = {
  name: 'tester',
  age: 50,
  getAge: function () {
    return this.age; // this 키워드는 객체 자신을 가리키는 참조 변수
  },
};
```

## 프로퍼티 접근

- 마침표 프로퍼티 연산자(.)를 사용한 마침표 표기법
- 대괄호 프로퍼티 연산자([..])를 사용한 대괄호 표기법

```js
const data = {
  name: 'tester',
  age: 50,
  getAge: function () {
    return this.age;
  },
};

data.name;
data['name']; // 대괄호 프로퍼티 연산자 내부의 프로퍼티 키는 반드시 따옴표로 감싸진 문자열을 사용해야함

data[name]; // ReferenceError: name is not defined (식별자로 인식하여 name이 선언되어있지 않아 에러 발생)

data.abc; // undefined 객체에 존재하지 않는 프로퍼티에 접근하면 undefined를 반환
```

## 프로퍼티 값 갱신

```js
const data = {
  name: 'tester',
};

data.name = 'admin';

console.log(data); // { name: "admin" }
```

## 프로퍼티 삭제

- delete 연산자를 통해 객체의 프로퍼티를 삭제할 수 있음
- 존재 하지 않는 프로퍼티를 삭제하려고 해도 에러가 발생하지 않음

```js
const data = {
  name: 'tester',
};

delete data.name;

delete data.age; // 에러가 발생하지 않음

console.log(data); // { }
```

## ES6에서 추가된 객체 리터럴의 확장 기능

### 프로퍼티 축약 표현

```js
const x = 1,
  y = 2;

// 프로퍼티 키와 변수 이름이 동일 할 경우 프로퍼티 키를 생략 할 수 있음
const obj = {
  x,
  y,
};
```

### 계산된 프로퍼티 이름

```js
const prefix = 'jade';
let i = 1;

// 객체 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성
const obj = {
  [`${prefix}-${++i}`]: i,
};

obj[prefix + '-' + ++i] = i;
obj[`${prefix}-${++i}`] = i;
```

### 메서드 축약 표현

```js
const data = {
  name: 'tester',
  age: 50,
  getAge() {
    // 앞서 사용한 객체의 getAge 에 할당 된 함수를 축약하여 할당 할 수 있음
    // 단 축약 표현으로 정의하여 할당한 메서드와 일반적으로 선언하여 할당한 함수와는 동작하는 방식이 다름
    return this.age;
  },
};
```
