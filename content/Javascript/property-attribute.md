---
emoji:
title: 프로퍼티 어트리뷰트
date: '2023-07-17 22:40:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 프로퍼티 어트리뷰트

> 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의합니다.
>
> 프로퍼티의 상태란 프로퍼티의 값(value), 값의 갱신 가능여부(writable), 열거 가능 여부(enumerable), 재 정의 가능 여부(configurable)를 말합니다.

- 내부 슬롯
- 내부 메서드

자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드 입니다.

이중 대괄호([[...]])로 감싼 이름들이 내부 슬롯과 내부 메서드 입니다.
개발자가 직접 접근 할 수 있도록 공개된 객체의 프로퍼티는 아니며 일부 내부 슬롯과 내부 메서드에 한해 간접적으로 접근 할 수 있는 수단이 제공됩니다.

예를 들어 모든 객체는 [[Prototype]] 이라는 내부 슬롯을 가지는데 [[Prototype]] 은 내부 슬롯임에도 불구하고 **proto** 를 통해 간접적으로 접근이 가능합니다.

```js
const a = {};

a[[Prototype]]; // Uncaught SyntaxError: Unexpected token '['

a.__proto__; // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
```

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

```js
const data = {
  name: 'aaa',
};

console.log(Object.getOwnPropertyDescriptor(data, 'name')); // {value: 'aaa', writable: true, enumerable: true, configurable: true}
```

앞서 언급된 프로퍼티의 상태를 내부 슬롯 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]을 가지며 직접 접근할 수 없기 떄문에 위의 코드처럼 Object.getOwnPropertyDescriptor 메서드를 통해 간접적으로 확인 할 수 있습니다.

이 때 반환되는 프로퍼티 어트리뷰트 정보가 담긴 객체를 **프로퍼티 디스크립터** 객체라고 합니다.

ES8에서 도입된 Object.getOwnPropertyDescriptors 메서드를 통해 모든 프로퍼티의 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 확인할 수 도 있습니다.

## 데이터 프로퍼티와 접근자 프로퍼티

- 데이터 프로퍼티

  - 키와 값으로 구성된 일반적인 프로퍼티
    - [[Value]] - value : 프로퍼티 키로 접근 시 반환되는 프로퍼티 값
    - [[Writable]] - writable : 프로퍼티 값의 변경 여부
    - [[Enumerable]] - enumerable : 프로퍼티의 열거 가능 여부
    - [[Configurable]] - configurable: 프로퍼티의 재정의 가능 여부

- 접근자 프로퍼티
  - 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출하는 접근자 함수(getter/setter 함수)로 구성된 프로퍼티
    - [[Get]] - get : 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 함수
    - [[Set]] - set : 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 함수
    - [[Enumerable]] - enumerable : 프로퍼티의 열거 가능 여부
    - [[Configurable]] - configurable: 프로퍼티의 재정의 가능 여부

```js
const person = {
  firstName: "Wonho",
  lastName: "Heo"
  // firstName, lastName은 데이터 프로퍼티

  // get과 set의 fullName은 접근자 프로퍼티
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ")
  }
}

person.fullName  = "giga zinga"
console.log(person) // {firstName: "giga", lastName: "zinga"}
```

접근자 프로퍼티 프로퍼티 값에 접근하면 아래와 같은 동작이 발생합니다.

1. 프로퍼티 키의 유효 여부 확인. 프로퍼티키는 문자열 또는 심벌만 허용됨
2. 프로토타입 체인에서 프로퍼티를 검색.
3. 검색된 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인
4. getter 함수를 호출하여 그 값을 반환

> 프로토타입
> 어떤 객체의 상위 객체 역할을 하는 객체, 하위 객체에게 자신의 프로퍼티와 메서드를 상속합니다.
> 프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 뜻합니다.

## 프로퍼티 정의

> 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나 기존 프로퍼티의 프로퍼티 어트리뷰트를 재 정의 하는 것을 말합니다.

```js
// Object.defineProperty 메서드를 사용해 프로퍼티의 어트리뷰트를 정의할 수 있습니다.

const person = {};

// 데이터 프로퍼티
Object.defineProperty(person, 'firstName', {
  value: 'oh',
  writable: true,
  enumerable: true,
  configurable: true,
});

// 접근자 프로퍼티
Object.defineProperty(person, 'fullName', {
  get() {
     return `${this.firstName}`
  },
  set(name) {
    this.firstName = name
  }
  enumerable: true,
  configurable: true,
});
```

| 프로퍼티 디스크립터 객체의 프로퍼티 | 프로퍼티 어트리뷰트 | 기본 값   |
| ----------------------------------- | ------------------- | --------- |
| value                               | [[Value]]           | undefined |
| get                                 | [[Get]]             | undefined |
| set                                 | [[Set]]             | undefined |
| writable                            | [[Writable]]        | false     |
| enumerable                          | [[Enumerable]]      | false     |
| configurable                        | [[Configurable]]    | false     |

Object.defineProperty는 한번에 하나의 프로퍼티만 정의할 수 있지만 Object.defineProperties를 사용하면 여러 개의 프로퍼티를 정의 할 수 있습니다.

## 객체 변경 방지

객체는 변경 가능한 값이기 때문에 재할당 없이 변경할 수 있습니다.
이러한 객체의 자유로운 변경을 막기위해 아래와 같은 메서드를 제공합니다.

| 구분          | 메서드                   | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| ------------- | ------------------------ | ------------- | ------------- | ---------------- | ---------------- | -------------------------- |
| 객체 확장금지 | Object.preventExtensions | X             | O             | O                | O                | O                          |
| 객체 밀봉     | Object.seal              | X             | X             | O                | O                | X                          |
| 객체 동결     | Object.freeze            | X             | X             | O                | X                | X                          |

### 불변 객체

위의 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체에는 영향을 주지 못한다.
중첩객체까지 동결하여 불변객체를 구현하려면 모든 프로퍼티에 대해 재귀적으로 Object.freeze를 호출해야한다.

```js
function deepFreeze(target) {
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);

    Object.keys(target).forEach((key) => deepFreeze(target[key]));
  }
  return target;
}
```
