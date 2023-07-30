---
emoji:
title: Symbol
date: '2023-07-30 18:49:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 심벌?

> ES6에서 도입된 7번째 데이터 타입이자 원시타입의 값으로 변경 불가능하며 중복되지 않는 유일 무이한 값이다.

## 심벌 값의 생성

1. Symbol 함수
   다른 원시타입의 값과 달리 Symbol 값은 리터럴이 아닌 Symbol 함수를 사용해야만 생성할 수 있다.
   이때 생성된 값은 절대 중복 되지 않는 값이 된다. 또한 외부에 노출되지 않는 값이다.

   ```js
   const symbol = Symbol();
   console.log(typeof symbol); // symbol

   console.log(symbol); // Symbol()
   // 값이 노출되지 않아 확인 할 수 없다.
   ```

   심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않고 불리언 타입으로만 변환이 가능하다.

<br />

2. Symbol.for / Symbol.keyFor
   Symbol.for 메서드는 인수로 전달받은 문자얼을 키로 사용하여 키와 심벌값의 쌍들이 저장되어있는 전역 심벌레지스트리에서 해당 키와 일치하는 심벌 값을 검색한다.
   Symbol 함수는 매번 새로운 심벌값을 생성하지만 Symbol.for를 사용하면 중복되지 않는 단 하나의 심벌 값을 생성하여 어플리케이션 전역에 공유할 수 있다.

   ```js
   const symbol = Symbol.for('string');

   const symbol2 = Symbol.for('string');

   console.log(symbol === symbol2); // true

   // keyFor 메서드를 사용하면 심벌 값 의 키 값을 추출 할 수 있다.
   Symbol.keyFor(symbol1); // string
   ```

   - 검색에 성공하면 검색된 값을 반환하며 검색에 실패하면 심벌 레지스트리에 값을 생성하고 그 값을 반환한다.

<br />

## 심벌 값과 상수

상수를 선언 시 상수의 값보다 상수의 프로퍼티 키가 의미가 있는 경우에 상수의 값이 중복될 수 있는 값인 경우 Symbol을 사용해 생성하면 중복을 방지 할 수 있어 유용하다.

```js
const obj = {
  a: 1,
  b: 2,
};

const objSymbol = {
  a: Symbol(1),
  b: Symbol(2),
};
```

<br />

## 심벌과 프로퍼티 키

객체의 프로퍼티키를 심벌 값으로 생성하여 이후에 동일한 프로퍼티키로 인한 충돌을 완전히 방지 할 수 있다.

```js
const obj = {
  [Symbol.for('a')]: 5,
};

obj[Symbol.for('a')]; // 5

// 심벌을 통해 생성한 프로퍼티는 은닉되어 프로퍼티를 찾는 메서드로 확인되지 않는다 하지만 getOwnPropertySymbols 메서드를 사용하면 심벌 값을 찾을 수 있다.
console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(a)]
```

<br />

## Well-known Symbol

> 자바스크립트기 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 Well-known Symbol 이라 부른다.
> Well-Known Symbol은 자바스크립트 엔진의 내부 알고리즘에 사용된다.
