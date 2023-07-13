---
emoji:
title: 연산자
date: '2023-07-14 01:05:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 연산자

> 피연산자를 연산하여 새로운 값을 만들어 줌

<br />

## 산술 연산자

### 이항 산술 연산자

> 2개의 피연산자를 연산하여 숫자 값을 만듦
>
> 피연산자의 값을 바꾸지 않고 언제나 새로운 값을 만듬 (부수효과 [sideEffect]가 발생하지 않음)

```javascript
1 + 2;
1 - 2;
1 * 2;
1 / 2;
1 % 2;
```

### 단항 산술 연산자

> 1개의 피연산자를 연산하여 숫자 값을 만듦
> 증가/감소 연산자는 부수효과가 발생함

```javascript
let x = 1;
let result;

// 증가/감소 연산자
result = x++; // result: 1, x: 2

result = ++x; // result: 2, x: 3

result = x--; // result: 3, x: 2

result = --x; // result: 1, x: 1

// 숫자 에 + 연산자 사용
+10; // 10
+-10; // 10

// 숫자가 아닌 피연산자에 + 연산자 사용
let y = 1;
+y; // "1"
y = true;
+y; // 1;
y = false;
+y; // 0
y = 'aaa';
+y; // NaN

// - 연산자
-(-10); // 10
```

## 문자열 연결 연산자

```javascript
let a = '1';
console.log(a + 2); // '12'
console.log(2 + a); // '21'

a = 1;
console.log(a + true); // 2, 1로 타입 변환
console.log(a + false); // 1, 0으로 타입 변환

console.log(a + null); // 1, 0으로 타입 변환

console.log(a + undefined); // NaN, 타입 변환 X
```

+연산자를 통해 서로 다른 데이터 타입을 연산할 경우 자바스크립트 엔진이 암묵적으로 타입을 자동 변환 시킴 (**암묵적 타입변환 또는 타입 강제 변환**)

## 할당 연산자

> 우항의 값을 좌항의 변수에 할당(부수효과 발생)

```javascript
let a;
a = 10;
a += 10;
a -= 10;
a *= 10;
a /= 10;
a %= 10;

let string = 'string ';

string += 'number'; // string number
```

## 비교 연산자

> 좌항과 우항의 피연산자를 비교한 다음 불리언 값을 반환

### 동등 비교 연산자

- 동등 비교 : 값만을 비교하며, == 는 긍정, != 는 부정 `x == y, x != y`

  - 동등 비교 연산자는 좌항, 우항의 피연산자를 비교하기 전에 암묵적 타입 변환을 통해 타입을 일치시키고 값을 비교

- 일치 비교 : 값과 타입을 비교하며 === 는 긍정, !== 는 부정 `x === y, x !== y`
  - 일치 비교 연산자는 좌항, 우항의 피연산자가 값과 타입이 같을 때에만 비교의 결과를 반환
  - 예외적으로 NaN === NaN은 false

> Object.is 메서드
> +0, -0을 동일한 값 NaN을 다른 값이라고 평가하는 데 비해 Object.is 는 예측 가능한 정확한 값을 반환함

```javascript
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

### 대소 관계 비교 연산자

> `>, <, >=, <=` 로 대소관계를 비교

## 삼항 조건 연산자

> 조건식 ? 조건식이 true일 경우의 반환 값 : 조건식이 false일 경우 반환값

if else 문과 유사하게 사용이 가능하지만 차이점은 삼항 조건 연산자 표현식은 값처럼 사용될 수 있지만 if else 문은 불가능하다(if else는 문이기 때문)

## 논리 연산자

> 좌항과 우항의 피연산자를 논리 연산. 부정 논리 연산자의 경우 우항이 대상

- || : 논리 합(OR)
- && : 논리 곱(AND)
- ! : 부정(NOT)

```javascript
// 드모르간의 법칙을 사용하여 가독성을 높일 수 있음

!(a || b) === (!a && !b);
!(a && b) === (!a || !b);
```

## 쉼표 연산자

> 왼쪽 피연산자 부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 마지막 평가 결과를 반환

```javascript
let a, b, c;

(a = 3), (b = 4), (c = 5); // 3
```

## 그룹 연산자

> 소괄호로 피연산자를 감싸면 가장 먼저 평가를 진행 (평가 우선순위를 조절 할 수 있음)

```javascript
5 * 2 + 3; // 13

5 * (2 + 3); // 25
```

## typeof 연산자

> 피연산자의 데이터 타입을 문자열로 반환함
> 반환 가능 문자열('string', 'number', 'boolean', 'undefined', 'symbol', 'object', 'function')

- null 은 null이 아닌 object를 반환하므로 일치 연산자로 null 타입을 확인해야함
- 선언하지 않은 식별자를 typeof 로 연산하게되면 ReferrenceError가 발생하지 않고 undefined가 발생함

## 지수 연산자

> ES7에서 도입
> 좌항의 피연산자를 밑으로 우항의 피연산자를 지수로 거듭제곱하여 계산

```javascript
5 ** 2; //  25

// 지수 연산자 도입 이전에는 Math.pow 메서드를 사용
Math.pow(5, 2);

// 음수를 밑으로 사용할 경우에는 괄호로 묶어야함
(-5) ** 2; // 25

// 할당연산자와 함께 사용할 수 있음
let num = 5;
num **= 2; // 25

// 지수 연산자는 이항연산자중 우선순위가 가장 높음
2 * 5 ** 2; // 50
```

## 그 외의 연산자

### 옵셔널 체이닝 연산자

> ES11에서 도입 `?.`를 통해 표현

좌항의 피연산자가 null/undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어감

```js
// 객체 프로퍼티 참조
const elem = null;
// 논리 연산자 :
let value = elem && elem.value; // null
// 옵셔널 체이닝 연산자 :
value = elem?.value; // undefined

// 예외 상황
const str = '';
const length = str && str.length; //  '' 빈 문자열은 Falsy Value로 판단되기 때문에 우항까지 이어가지 못함
length = str?.length; // 0
```

- `논리곱(&&)`은 평가 후 좌항의 피연산자를 그대로 반환하는 반면, `옵셔널 체이닝 연산자(?.)`는 객체를 가리키는 변수의 null/undefined가 아닌지 확인하고 프로퍼티를 참조

<br>

### null 병합 연산자

> ES11에서 도입. `??`를 통해 표현

좌항의 피연산자가 Falsy Value가 아닌 null/undefined인 경우 우항의 피연산자를 반환하고, 아니라면 좌항의 피연산자를 반환

```js
// null 병합 연산자 :
let str = null ?? 'string value'; // 'string value'
// 논리 연산자 :
str = '' || 'string value'; // 'string value'

// 예외 상황
str = '' ?? 'string value'; // ''
```

## 연산자 우선순위

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
