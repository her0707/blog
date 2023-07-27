---
emoji:
title: ES6 함수의 추가기능
date: '2023-07-28 00:41:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# ES6 함수의 추가기능

ES6에서 도입된 화살표 함수 이전의 함수는 모든 함수가 일반함수로 호출할 수 있는 것 뿐만 아니라 생성자 함수로서 호출할 수 있다.

ES6 이전의 모든 함수는 사용목적에 따른 명확한 구분이 존재하지 않아 의도치 않은 실수가 발생하거나 성능에도 좋지않은 상황이 발생했다

이를 해결하기 위해 ES6 에서는 함수를 사용목적에 따라 명확히 구분했다

|             | constructor | prototype | super | arguments |
| ----------- | ----------- | --------- | ----- | --------- |
| 일반 함수   | O           | O         | X     | O         |
| 메서드      | X           | X         | O     | O         |
| 화살표 함수 | X           | X         | X     | X         |

## 메서드

여기서 말하는 메서드는 객체에 바인딩된 모든 함수를 뜻하는 것이 아닌 ES6 사양에서의 메서드 축약표현으로 정의된 함수만을 의미한다.

```js
const obj = {
  value: 1,

  getValue() {
    return this.value;
  },
};
```

메서드는 아래의 특징을 가진다.

- 인스턴스를 생성할 수 없는 non-constructor
- 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]] 를 갖는다.
  - [[HomeObject]] 내부슬롯을 사용하여 슈퍼클래스의 메서드를 참조할 수 있기 땜눈에 super 키워드를 사용할 수 있다.

```js
const base = {
  name: 'lee',
  getName() {
    return this.name;
  },
};

const derived = {
  __proto__: base,

  sayHi() {
    return `${super.getName} hi`;
  },
};
```

## 화살표 함수

```js
// 값으로 평가될 수 있는 표현식인 문이 함수몸체에 존재하여 표현식이 평가되어 암묵적으로  반환된다.
const add = (x, y) => x + y;

// 매개변수가 한개인 경우 소괄호를 생략할 수 있다.
const arrow = (a) => {};

// 매개변수가 존재하지 않을 경우에는 반드시 소괄호를 포함해야한다.
const back = () => {};

// 객체리터럴을 반환하는경우 객체리터를의 중괄호를 반드시 소괄호로 감싸줘야한다.

const make = () => ({ id: 1, name: 'lee' });

// 콜백함수 정의시 유용하게 사용할 수 있다.
[1, 2, 3].map((v) => v * 2);
```

### 화살표 함수와 일반함수의 차이

1. 화살표함수는 인스턴스를 생성할 수 없는 non-constructor
2. 중복된 매개변수 이름을 선언할 수 없다.
3. 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.

### this

콜백함수 내부의 this 문제를 해결하기위해 의도적으로 설계 되었다.

this 바인딩은 함수정의 시점이 아닌 함수가 어떻게 호출되었는지에 따라 바인딩되는 객체가 동적으로 정해진다.

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(function (item) {
      // 콜백 함수가 Array.prototype.map에서 일반함수로서 호출하기 때문에 this는 undefined를 가리킨다.
      return this.prefix + item;
    });
  }
}
```

위 코드에서 일반함수로 호출되는 콜백함수가 참조하는 this가 왜 undefined 일까?

이는 앞서 살펴본 클래스의 특징에서 알수있다. 클래스 내부 코드에는 strict mode가 암묵적으로 적용되기 때문에 전역객체가 아닌 undefined가 반환된 것이다.

이 문제가 바로 콜백함수의 this와 외부함수의 this가 다르다 라는 문제다.

ES6이전에는 다양한 방법을 사용해 이를 해결하였다.

1. prefixer 객체를 가리키는 this를 일단 회피시킨 뒤 콜백함수에서 사용
2. Array.prototype.map 의 두번째 인수로 this를 전달
3. Function.prototype.bind 메서드를 사용하여 this를 바인딩

화살표 함수는 함수자체의 this 바인딩을 가지지 않기 때문에 화살표 함수 내부에서 this를 참조하면 상위스코프의 this를 그대로 참조할 수 있다.

이러한 특징을 통해 콜백 함수 내부의 this 문제를 해결할 수 있다.

### super

super 또한 this와 마찬가지로 상위 스코프의 super를 참조한다.

### arguments

this와 마찬가지로 상위 스코프의 arguments를 참조한다.

## Rest 파라미터

> 함수에 전달된 인수들의 목록을 배열로 전달받음

```js
function test(...args) {
  console.log(args) // [1, 2, 3, 4, 5];
}

test(1, 2, 3, 4, 5);

// 단 하나의 Rest 파라미터가 허용된다.
function test(...args, ...args1) {
  console.log(args, args1) // SyntaxError: Rest parameter must be last formal parameter
}

test(1, 2, 3, 4, 5);
```

### Rest 파라미터와 arguments 객체

가변 인자 함수를 처리하기위해 Rest 파라미터 도입이전에는 유사 배열객체인 arguments를 순회하기 위해서 Function.prototype.call, Function.prototype.apply 를 통해 배열로 변환하는 과정이 필요했다.

그러나 ES6에서 도입된 Rest 파라미터를 사용할 경우 인수목록을 직접 배열로 전달 받을 수 있따.

```js
function test(...args) {
  return args.map((v) => v + 1); //
}

test(1, 2, 3, 4, 5); // [2,3,4,5,6]
```

주의할 점은 ES6 메서드는 Rest 파라미터와 arguments 객체를 모두 사용할 수 있음에 반해 화살표 함수는 arguments 객체를 갖지못해 화살표 함수로 가변 인자 함수 구현 시에는 반드시 Rest 파라미터를 사용해야한다.

## 매개변수 기본값

인수가 전달되지 않은 매개변수의 값은 기본적으로 undefined 이다. 이에 따른 의도치 않은 결과를 해결하기 위해서
매개변수 기본값을 통해 인수체크 및 초기화를 간소화할 수 있다.

```js
function sum(x = 0, y = 0) {
  return x + y;
}
```

단 Rest 파라미터에는 기본값을 지정할 수 없다.
