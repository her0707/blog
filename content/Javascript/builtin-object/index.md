---
emoji:
title: 빌트인 객체
date: '2023-07-23 14:08:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

## 자바스크립트 객체의 분류

- 표준 빌트인 객체

  - ECMAScript 사양에 정의된 객체를 말하여 어플리케이션 전역의 공통기능을 제공
  - 브라우저, Node.js 환경에 관계없이 언제나 사용가능
  - 전역객체의 프로퍼티로 제공

- 호스트 객체

  - 자바스크립트 실행환경(브라우저, Node.js)에서 추가로 제공하는 객체

- 사용자 정의 객체

## 표준 빌트인 객체

javascript 는 Object, String, Number, Boolean, Function, Array, RegExp, Date, Math, Promise 등의 빌트인 생성자 함수를 제공한다.

```js
const text = new String('text'); // String {"text"}

const number = new Number(5); // Number {5}

const boolean = new Boolean(false); // Boolean{false}

const function = new Function('a', 'return a'); // f anonymous (a)

const array = new Array(1, 2, 3); // [1,2,3]
```

String, Number, Boolean, Function, Array, Date는 생성자함수를 통해 인스턴스를 생성할 수 있다.
생성된 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype에 바인딩된 객체이다.

또한 표준 빌트인 객체는 인스턴스 없이도 호출가능한 정적 메서드를 제공한다.

```js
const num = new Number(5.5);

// Number.prototype에서 제공되는 프로토타입 메서드
num.toFixed(); // "6"

// Number의 정적 메서드
Number.isInteger(num); // false
```

## 원시값과 래퍼 객체

문자열, 숫자, 불리언등의 원시값이 존재함에도 불구하고 각각의 객체를 생성하는 String,Number,Boolean 등의 표준 빌트인 생성자 함수가 존재하는 이유는 무엇일까?

```js
const str = 'hello';

// 원시 값임에도 불구하고 프로터피와 메서드를 지닌 객체처럼 동작한다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // "HELLO"
```

원시값에 대해 자바스크립트 엔진이 객체처럼 접근하면 생성되는 임시객체를 생성하기 때문이다.
이 임시객체를 **래퍼 객체** 라고 한다.

위의 코드의 경우 마침표 표기법으로 접근하였을때 래퍼 객체인 String 생성자 함수의 인스턴스가 생성되고 할당된 값은 [[StringData]] 내부 슬롯에 할당된다.

이로 인해 String 생성자 함수의 인스턴스가 되어 String.prototype의 메서드를 상속받아 사용할 수 있는 것이다.

래퍼 객체의 처리가 종료되면 [[StringData]] 내부 슬롯에 할당된 값을 원래의 원시값으로 되돌리고 객체는 가비지 컬렉션의 대상이 된다.

```js
const test = new String('aaa');
const test2 = 'aaa';

test.name = 'bbb';
test2.name = 'bbb';

// 생성자 함수로 생성된 객체기 때문에 동적으로 생성된 프로퍼티가 반영된다.
console.log(test); // String {0: "a", 1: "a", 2:"a", name: "bbb"}

// 래퍼 객체를 생성하여 동적 프로퍼티를 추가하고 기존의 원시값으로 되돌렸기 때문에 동적 프로퍼티가 반영되지 않는다.
console.log(test2); // "aaa"

// 앞서 생성된 래퍼 객체와는 또 다른 래퍼객체를 생성하였기 때문에 name 프로퍼티가 존재 하지 않는다.
console.log(test2.name); // undefined
```

래퍼 객체를 통해 문자열, 숫자, 불리언, 심벌은 마치 객체 처럼 사용될 수 있고 표준 빌트인 객체의 프로토타입을 참조할 수 있기 때문에 생성자 함수를 통해 인스턴스를 생성 할 필요가 없고 권장되지도 않는다.

> null, undefined 는 래퍼 객체를 생성하지 않기 때문에 객체처럼 사용하려고 할 경우 에러가 발생한다.

## 전역 객체

자바스크립트 엔진에 의해 어떠한 객체보다 먼저 생성되는 특수한 객체이며 최상위 객체이다.
자바스크립트 환경에 따라 지정되는 이름이 다르지만 ES11에서 도입된 **globalThis**를 통해 전역객체를 가리키던 다양한 식별자를 통일하여 사용할 수 있다.

- 표준 빌트인 객체, 호스트 객체, var 키워드로 선언된 전역변수, 전역 함수, 암묵적 전역을 프로퍼티로 가진다.
- 개발자가 임의로 생성할 수 없다.
- 전역객체의 프로퍼티 접근시 window 또는 global 과 같은 식별자를 생략 할 수 있다.

### 빌트인 전역 프로퍼티

- Infinity : 무한대를 표현하는 숫자값 Infinity를 가지는 프로퍼티
- NaN: 숫자가 아님을 나타내는 숫자값 NaN을 갖는 프로퍼티
- undefined: 원시타입 undefined를 값으로 갖는 프로퍼티

### 빌트인 전역 함수

- eval: 문자열을 인수로 전달받아 해당 문자열이 표현식이라면 런타임에 평가하여 값을 생성하고 표현식이 아닌 문이라면 실행한다.

  ```js
  eval(`1 + 2; `); // 3

  eval(`var a = 5;`); // undefined
  console.log(a); // 5

  const obj = eval('({ a: 5 })');
  console.log(obj); // { a: 5}

  const f = eval('(function () { return 5 })');
  console.log(f()); // 5
  ```

  eval 함수는 기존의 스코프를 런타임에 동적으로 수정한다. (함수 내에서 호출 시 해당함수의 스코프에서 실행된다.)
  단 strict mode 에서는 기존의 스코프를 수정하지 않고 eval 함수 자체적인 스코프를 생성함

  eval 함수를 통해 실행되는 코드는 위와 같이 자바스크립트 엔진에 의해 최적화가 수행되지 않고 일반적인 방식으로 실행되지 않기 때문에 처리 속도도 느리다. 따라서 eval 함수 사용은 금지해야한다.

- isFinite: 전달받은 인수가 무한수일 경우 false를 유한수일 경우 true를 반환한다. (NaN으로 평가되는 값은 false를 반환한다.)
- isNaN: 전달 받은 인수가 NaN인지 검사하여 불리언 타입으로 반환한다.
- parseFloat: 전달받은 문자열 인수를 부동 소수점 숫자로 해석하여 반환
- parseInt: 전달 받은 문자열 인수를 정수로 해석하여 반환
- encodeURI / decodeURI
  - encodeURI는 완전한 URI를 인수로 전달받아 이스케이프 처리를 위해 인코딩함
    - 어떠한 시스템에서도 읽을 수 있도록 아스키 문자셋으로 변환하는 것
  - decode URI는 인코딩된 URI를 디코딩하는것
- encodeURIComponent / decodeURIComponent
  - encodeURI, decodeURI와 유사하게 동작하지만 알파벳, 0~9 숫자, `-_.!~*'()` 문자는 이스케이프처리에서 제외됨

### 암묵적 전역

```js
// 선언되지 않고 전역변수의 프로퍼티가 되었기 때문에 변수 호이스팅이 발생하지 않음
console.log(x); // ReferenceError: x is not defined

function test() {
  x = 20; // 선언되지 않는 식별자 x는 전역 객체의 프로퍼티가되어 전역변수처럼 동작함
}

test();

delete x; // 변수가 아니기 때문에 delete 연산자로 삭제할 수 있음
```
