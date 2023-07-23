---
emoji:
title: strict mode
date: '2023-07-23 13:35:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# strict mode

```js
function test() {
  x = 5;
}

test();

console.log(x); // ReferenceError 를 발생시킬 것 같지만 전역객체에 x 프로퍼티가 생성되어 5가 출력된다.
```

위와 같은 현상을 암묵적 전역 이라고 한다.
이러한 암묵적 전역 현상은 오류 발생의 원인이 될 가능성이 높기 때문에 반드시 var, let, const 와 같은 키워드로 변수를 선언하는 것 이 좋다.

하지만 모든 상황에서 이러한 오류 발생의 원인을 반드시 방지하는 것은 어려울 수 있다.
이를 해결하기 위해 ES5 부터 strict mode 가 추가 되었으며 자바스크립트 문법을 좀 더 엄격하게 적용하여 사전에 명시적인 에러를 발생시킨다.

ESLint를 사용해서도 유사한 효과를 얻을 수 있으며 코딩컨벤션 또한 강제할 수 있기 때문에 lint 사용을 권장한다.

## strict mode의 적용

전역의 선두 또는 함수 몸체의 선두에 'use strict' 를 추가하여 적용할 수 있다.

그러나 strict mode 적용 시 유의할 점이 있다.

- 전역에 strict mode를 적용하는 것은 스크립트 단위로 적용되기 때문에 strict 와 non-script 가 혼용되어 오류가 발생할 수 있다. (라이브러리가 non-strict 인 경우도 있기 때문)
  - 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 그 선두에 strict mode 를 적용하는 것을 추천
- 함수단위로 strict mode를 적용하는 것 또한 각 함수별로 strict mode 적용여부가 달라질 수 있으며 모든 함수에 적용하는 것도 번거로운 일이기 때문에 권장되지 않는다.

따라서 즉시 실행함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

## strict mode 에러 유형

### 암묵적 전역

```js
(function () {
  'use strict';
  x = 5;

  console.log(x); // ReferenceError: x is not defined
})();
```

### 변수, 함수, 매개변수의 삭제

```js
(function () {
  'use strict';

  let x = 1;
  delete x; // SyntaxError: Delete of an unqualified identifier in strict mode

  function test(a) {
    delete a; // SyntaxError: Delete of an unqualified identifier in strict mode
  }
  delete test; // SyntaxError: Delete of an unqualified identifier in strict mode
})();
```

### 매개변수 이름의 중복

```js
(function () {
  'use strict';
  // SyntaxError: Duplicate parameter name no allowed in this context
  function test(a, a) {
    return a + a;
  }
})();
```

### with 문의 사용

with 문은 전달된 객체를 스코프 체인에 추가하는 역할을 한다.
동일한 객체의 프로퍼티를 반복적으로 사용할 때 객체 이름을 생략할 수 있어 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있어 사용하지 않는 것이 좋다.

```js
(function () {
  'use strict';
  // SyntaxError: Strict mode code may not include a with statement
  with ({ a: 1 }) {
    console.log(a);
  }
})();
```

<br>

## strict mode 적용에 의한 변화

### 일반함수의 this

생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문에 this에 undefined가 바인딩된다.

```js
(function () {
  'use strict';

  function test() {
    console.log(this); // undefined
  }
  test();
  function Test() {
    console.log(this); // Test
  }
  new Test();
})();
```

### arguments 객체

매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

```js
(function (a) {
  'use strict';
  a = 2;

  console.log(arguments); // {0: 5, length: 1}
})(5);
```
