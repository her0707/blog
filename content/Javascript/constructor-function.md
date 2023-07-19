---
emoji:
title: 생성자 함수에 의한 객체 생성
date: '2023-07-19 22:26:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# Object 생성자 함수

new 연산자와 함께 Object 생성자 함수를 호출하면 객체를 생성할 수 있다.
생성자 함수란 new 연산자를 통해 호출하여 객체를 생성하는 함수를 뜻하며 이 때 반환되는 객체를 인스턴스 라고 한다.

```js
const javascript = new Object();

javascript.string = 'String';
javascript.function = function () {};

console.log(javascript); // {string: "String", function: f}
```

javascript 는 Object 생성자 함수 외에도 String, Number, Boolean, Function, Array, RegExp, Date, Math, Promise 등의 빌트인 생성자 함수를 제공한다.

```js
const text = new String('text'); // String {"text"}

const number = new Number(5); // Number {5}

const boolean = new Boolean(false); // Boolean{false}

const function = new Function('a', 'return a'); // f anonymous (a)

const array = new Array(1, 2, 3); // [1,2,3]
```

반드시 생성자 함수를 통해 객체를 생성해야하는 것은 아니며 특별한 경우가 아니라면 리터럴로 객체를 생성하는 것 이 더 간편합니다.

# 생성자 함수

객체 리터럴을 통해 객체를 생성하는 방법은 편리하지만 중복되는 메서드와 프로퍼티를 매번 만들어주는 것은 유지보수에 비효율적이다.

이를 생성자 함수를 통해 프로퍼티 구조가 동일한 객체를 생성할 수 있다. (인스턴스를 생성하기 위한 클래스와 유사)

```js
// 생성자 함수의 경우 일반함수와 구별하기위해 파스칼 케이스로 주로 선언함
function Test(text) {
  console.log(this); // 일반 함수로 호출될 경우 this는 전역객체(window)를 생성자 함수로 호출될 경우 생성자 함수가 생성할 인스턴스를 가리킨다

  this.text = text;
  this.getFullText = function () {
    return this.text + ' wow amazing';
  };
}

const test = new Test(5);
console.log(test); // Test {text: 5, getFullText: ƒ}

const test1 = Test('!'); // 일반함수로 호출 되었기 때문에 전역객체 (window)에 text 프로퍼티와 getFullText 메서드가 생성되었다

console.log(text); // "!"
console.log(getFullText); // "! wow amazing";
```

this는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수다. this 바인딩은 아래와 같이 호출방식에 따라 달라진다.

| 함수 호출 방식 | this 가 가리키는 것 (this 바인딩) |
| -------------- | --------------------------------- |
| 일반함수       | 전역객체                          |
| 메서드         | 메서드를 호출한 객체              |
| 생성자함수     | 생성자 함수로 생성할 인스턴스     |

## 생성자 함수의 인스턴스 생성하는 과정

생성자 함수가 인스턴스를 생성하는 것은 필수이고, 생성된 인스턴스를 초기화 하는 것은 옵션이다.

1. 인스턴스 생성과 this 바인딩
   - 런타임 이전에 실행되며 암묵적으로 빈 객체가 생성되고 이 객체는 생성할 인스턴스이다. 이 인스턴스가 this에 바인딩 된다.
2. 인스턴스 초기화
   - 생성자 함수내의 코드가 한 줄씩 실행되어 this에 바인딩 되어있는 인스턴스를 초기화 한다.
3. 인스턴스 반환
   - 생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

- 주의
  - this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 못하고 객체가 반환됨.
  - 단, 명시적으로 반환되는 값이 원시 값일 경우 암묵적으로 this가 반환됨.
  - 그러므로 생성자 함수 내부에선 return 문을 반드시 생략하는 것이 좋음.

## 내부 메서드 [[Call]] 과 [[Construct]]

함수는 객체이기 때문에 일반 객체와 동일하게 동작 할 수 있다. 일반 객체가 가지고 있는 내부 메서드와 내부 슬롯을 모두 가지고 있기 때문이다.

```js
function js() {}

js.string = 'string';
js.function = function () {
  console.log(this.string);
};

js.function(); // "string"
```

대신 함수는 일반 객체와는 다르게 호출 할 수 있다. 따라서 함수 객체는 함수가 동작하기 위한 [[Environment]], [[FormalParameters]] 등의 내부 슬롯과 [[Call]], [[Construct]] 같은 내부 메서드를 추가로 가지고 있따.

내부 메서드 [[Call]]을 갖는 함수 객체를 callable 이라 하며, 내부 메서드 [[Construct]]를 갖는 함수 객체를 constructor, 갖지 않는 객체를 non-constructor 라고 한다.
모든 함수객체를 callable 하며 constructor 일수도 있고 non-constructor 일수도 있다.

### constructor와 non-constructor의 구분

- constructor: 함수 표현식, 함수 선언문, 클래스
- non-constructor: ES6 메서드 축약표현, 화살표 함수

아래의 두 함수 생성 방식은 non-constructor로 [[Construct]] 내부 메서드를 가지지 않아 new 연산자를 사용하여 생성자 함수로 호출 할 수 없다

```js
const arrow = () => {};

const obj = {
  get() {},
};
```

- 주의
  - 생성자 함수로서 호출될 것 을 기대하고 정의하지 않은 일반함수에 new를 붙여 호출하면 생성자 함수처럼 의도와는다르게 동작 할 수 있음

### new.target

ES6 부터 앞서 언급된 의도와는 다르게 생성자 함수가 일반함수처럼 호출되는 것을 방지하기위하여 new.target을 지원한다.
new 연산자로 호출 시 함수 내부의 new.target은 생성자 함수로 호출될경우 함수 자기 자신을 가리키며 일반 함수로 호출할 시 undefined를 반환한다.

```js
function Test(text) {
  if (!new.target) {
    return new Test(text); // 일반함수로 호출되었을 경우 new 연산자와 함께 재귀 호출하여 인스턴스를 생성한다.
  }

  this.text = text;
  this.getFullText = function () {
    return this.text + ' wow amazing';
  };
}

// ES6 를 지원하지 않는 브라우저 에서는 스코프 세이프 생성자 패턴을 통해 대체 할 수 있다.
function Test(text) {
  if (!(this instanceof Test)) {
    return new Test(text);
  }

  this.text = text;
  this.getFullText = function () {
    return this.text + ' wow amazing';
  };
}
```

Object, Function 함수의 경우 new 연산자 없이 호출하여도 new 연산자로 호출 하였을 때와 동일하게 동작한다.
그러나 String, Number, Boolean 함수는 new 연산자와 함께 호출 할 경우 String, Number, Boolean 객체를 생성하여 반환하지만 new 연산자 없이 호출 할 경우 문자열, 숫자, 불리언 값을 반환한다.
이를 통해 데이터 타입을 변환할 수 있다.
