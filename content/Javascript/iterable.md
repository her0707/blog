---
emoji:
title: 이터러블
date: '2023-07-30 21:34:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 이터러블

## 이터레이션 프로토콜

> 순회 가능한 데이터 컬렉션(자료구조)를 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙

- 이터러블 프로토콜

  - Well-known Symbol 인 Symbol.iterator 를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속 받은 Symbol.iterator 를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
  - 이터러블 프로토콜을 준수한 객체를 이터러블이라고하며 for of 문으로 순회 할 수 있으며 스프레드 문법과 배열 디스트럭쳐링 할당의 대상으로 사용할 수 있다.

- 이터레이터 프로토콜
  - Symbol.iterator를 호출해 반환된 이터레이터는 next 메서드를 소유하며 이를 호출하게되면 value와 done을 갖는 이터레이터 리절트 객체를 반환한다.
  - 이터레이터 프로토콜을 준수한 객체를 이터레이터라고 함
  - 이터레이터는 이터러블 요소를 탐색하기위한 포인터 역할을 함

### 이터러블

> Symbol.iterator를 프로퍼티키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체

### 이터레이터

```js
const array = [1, 2, 3];

const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false}
console.log(iterator.next()); // { value: 2, done: false}
console.log(iterator.next()); // { value: 3, done: false}
console.log(iterator.next()); // { value: undefined, done: true}
```

이터레이터의 next 메서드호출을 통해 이터러블을 순회하며 반환되는 결과를 이터레이터 리절트 객체라고 한다.

<br/>

## 빌트인 이터러블

- Array : Array.prototype[Symbol.iterator]
- String: String.prototype[Symbol.iterator]
- Map: Map.prototype[Symbol.iterator]
- Set: Set.prototype[Symbol.iterator]
- TypedArray: TypedArray.prototype[Symbol.iterator]
- arguments: arguments.prototype[Symbol.iterator]
- Dom 컬렉션: NodeList.prototype[Symbol.iterator] / HTMLCollection.prototype[Symbol.iterator]

<br />

## for of 문

> 내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 반환된 이터레이터 리절트 객체의 값을 for of 문의 변수에 할당하는 방식으로 동작함

- done이 false가 되면 순회를 중단합니다.
- [[Enumerable]] 이 false 거나 프로퍼티 키가 심벌인 경우에는 열거되지 않습니다.

<br>

## 유사 배열 객체

> 마치 배열 처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말합니다.

- length 프로퍼티의 존재로 for 문으로 순회할 수 있지만 Symbol.iterator가 없기 때문에 for of 문으로 순회 할 수는 없습니다.
- 모든 유사 배열 객체가 이터러블이 아니기 때문에 Array.from 메서드를 통해 배열로 변환하여 순회하는 것과 같은 이터러블하게 변환할 수 있는 방법이 있습니다.

<br />

## 이터레이션 프로토콜의 필요성

데이터 공급자인 Array, String, Map/Set, DOM 컬렉션 과 같은 이터러블을 ES6 이전에는 각자 다양한 방법을 통해 순회할 수 있었지만 ES6 이후에는 순회가능한 자료구조를 for of, 스프레드 문법, 배열 디스트럭쳐링 과 같은 방법을 통해 일원화 하였다.

이러한 이유는 다양한 데이터 공급자가 각자의 방법으로 순회하게된다면 데이터 소비자는 다양한 데이터 공급자의 순회방식을 모두 지원해야하는 불편함이 존재하기 때문에 데이터 공급자의 순회방식을 이터레이션 프로토콜을 통해 규정하면 데이터 소비자는 이터레이션 프로토콜만 준수하여 구현하면 되기 때문에 훨씬 효과 적이다.

이처럼 이터레이션 프로토콜은 데이터 공급자와 데이터 소비자를 연결하는 인터페이스 역할을 한다.

<br />

## 사용자 정의 이터러블

- 이터러블 생성하는 함수

```js
const fibonacci = function (max) {
  let [prev, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return {
        next() {
          [prev, cur] = [cur, prev + cur];

          return { value: cur, done: cur >= max };
        },
      };
    },
  };
};
```

- 이터러블이면서 이터레이터인 객체를 생성하는 함수

```js
const fibonacci = function (max) {
  let [prev, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      [prev, cur] = [cur, prev + cur];

      return { value: cur, done: cur >= max };
    },
  };
};
```

- 무한 이터러블과 지연평가

```js
const fibonacci = function () {
  let [prev, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      [prev, cur] = [cur, prev + cur];

      return { value: cur };
    },
  };
};

for (const num of fibonacci()) {
  if (num > 1000) break;
  console.log(num); // 1,2,3,5,...
}
```

배열이나 문자열의 경우 모든 데이터를 메모리에 미리 확보한다음 데이터를 공급하지만 위 예제의 이터러블은 **지연평가**를 통해 데이터를 생성한다.

> 지연평가
> 데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가 데이터가 필요한 시점이 되면 데이터를 생성하는 기법 (평가 결과가 필요할때까지 평가를 지연시킴)

지연평가를 통해 빠른 실행속도와 불필요한 메모리를 소비하지 않아 무한도 표현할 수 있다는 장점이 있습니다.
