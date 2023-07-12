---
emoji:
title: 변수, 표현식과 문
date: '2023-07-12 23:30:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

## 변수

변수의 정의는 아래와 같다

> 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별해 붙인 이름

메모리 공간에 저장된 값을 식별할 수 있는 이름을 변수명 이라고 하며 변수에 저장된 값은 변수값이 된다.

```javascript
var a = 3; // a는 변수명, 3이 변수값이 된다 (선언과 할당)
a; // 참조
```

<br/>

## 식별자

> 변수, 함수, 클래스 등의 이름으로 지칭한 것

값이 아니라 메모리 주소를 기억하고 있음
변수 이름으로는 메모리상의 변수 값을 식별할 수 있고 함수 명으로는 함수(자바스크립트에서 함수는 값)를 식별할 수 있음

### 식별자 네이밍 규칙

- 특수문자를 제외한 문자, 숫자 언더스코어(\_), 달러 기호($)를 포함할 수 있음
- 단, 특수문자를 제외한 문자, 언더스코어, 달러 기호로 시작해야함, 숫자로의 시작은 허용되지 않음
- 예약어는 식별자로 사용할 수 없음

<table>
  <thead>
    <th colspan="5">
      예약어
    </th>
  </thead>
  <tbody>
    <tr>
      <td>abstract</td>
      <td>arguments</td>
      <td>boolean</td>
      <td>break</td>
      <td>byte</td>
    </tr>
    <tr>
      <td>case</td>
      <td>catch</td>
      <td>char</td>
      <td>class</td>
      <td>const</td>
    </tr>
    <tr>
      <td>continue</td>
      <td>debugger</td>
      <td>default</td>
      <td>delete</td>
      <td>do</td>
    </tr>
    <tr>
      <td>extends</td>
      <td>false</td>
      <td>final</td>
      <td>finally</td>
      <td>float</td>
    </tr>
    <tr>
      <td>for</td>
      <td>function</td>
      <td>goto</td>
      <td>if</td>
      <td>implements</td>
    </tr>
    <tr>
      <td>import</td>
      <td>in</td>
      <td>instanceof</td>
      <td>int</td>
      <td>interface</td>
    </tr>
    <tr>
      <td>let</td>
      <td>long</td>
      <td>native</td>
      <td>new</td>
      <td>null</td>
    </tr>
    <tr>
      <td>package</td>
      <td>private</td>
      <td>protected</td>
      <td>public</td>
      <td>return</td>
    </tr>
    <tr>
      <td>short</td>
      <td>static</td>
      <td>super</td>
      <td>switch</td>
      <td>synchronized</td>
    </tr>
    <tr>
      <td>this</td>
      <td>throw</td>
      <td>throws</td>
      <td>transient</td>
      <td>true</td>
    </tr>
    <tr>
      <td>try</td>
      <td>typeof</td>
      <td>var</td>
      <td>void</td>
      <td>volatile</td>
    </tr>
    <tr>
      <td>while</td>
      <td>with</td>
      <td>yield</td>
      <td colspan="2"></td>
    </tr>
  </tbody>
</table>

<br/>

## 변수 선언

> 값을 저장하기 위한 메모리 공간을 확보하고 변수명과 확보된 메모리 공간의 주소를 연결해서 값을 저장 할 수 있게 준비하는 것

var, let, const 키워드를 사용하여 선언함

- let, const 키워드는 ES6에서 도입되었음
- var는 함수레벨 스코프, let과 const는 블록레벨 스코프를 지원함

> <b>키워드란?</b>
>
> 자바스크립트 코드를 해석하고 실행하는 자바스크립트 엔진이 수행할 동작을 규정한 일종의 명령어

```javascript
var apple; // undefined
// 값을 할당하지 않은 변수는 undefined 라는 값이 암묵적으로 할당되어 초기화 됨
// var 키워드를 사용한 변수 선언은 선언과 초기화가 동시에 진행됨
```

## 호이스팅

```javascript
console.log(apple); // ReferenceError (참조에러)기 아닌 undefined

var apple;
```

변수의 선언이 런타임이 아닌 그 이전 단계에서 실행되기 때문에 변수 선언이전에 해당 변수를 참조하여도 에러가 발생하지 않음 (var 의 경우에만 가능, let 과 const는 에러 발생)

var, let, const, function, function\*, class 키워드를 사용하여 선언하는 모든 식별자는 호이스팅됨.
모든 선언문은 런타임 이전에 실행되기 때문

## 값의 할당

```javascript
console.log(apple); // undefined

var apple; // 변수 선언
apple = true; // 값 할당

console.log(apple); // true
```

변수의 선언 시점과 다르게 값의 할당시점은 런타임에 실행됨

## 상수

> 변수와 동일한 값을 참조하는 이름이지만, 변하지 않는 값으로 약속된 변수

```javascript
const fruit = 'apple';

fruit = 'strawberry'; // 앞서 언급된 const 키워드는 재할당이 금지됨
```

## 표현식

> 값으로 평가될 수 있는 문

```javascript
let score = 100; // 리터럴은 값으로 평가되기 때문에 리터럴 그 자체로 표현식

score; // 참조는 값으로 평가되므로 표현식임
```

표현식은 리터럴, 식별자, 연산자, 함수 호출 등의 조합으로 이뤄질 수 있음

## 값

> 표현식이 평가되어 생성된 결과 (평가: 식을 해석하여 값을 생성하거나 참조하는 것)

## 리터럴

> 사람이 이해할 수 있는 문자, 약속된 기호를 사용해 값을 생성하는 표기법
> 자바스크립트 엔진은 런타임에 리터럴을 평가해 값을 생성함

```javascript
1 // 정수리터럴
1.5 // 부동소수점 리터럴
0b0110101 // 2진수 리터럴
"aaaa" // 문자열 리터럴
true // 불리언 리터럴
null // null 리터럴
undefined // undefined 리터럴
{ name: "aaaa" , address: "seoul"} // 객체 리터럴
[1,2,3] // 배열 리터럴
function () {} // 함수 리터럴
/[A-Z]+/g // 정규 표현식 리터럴
... 등이 있다
```

## 문

> 프로그램을 구성하는 기본 단위이자 최소 실행 단위

```javascript
let sum = 3 + 5; // 키워드, 식별자, 연산자, 리터럴, 특수기호 조합의 문이다
// 키워드, 식별자, 연산자, 리터럴, 특수기호는 문법적인 의미를 가지며 모두 토큰이다.
```

세미 콜론을 통해 문의 종료를 나타냄. 단, 세미콜론은 옵션
자바스크립트 엔진이 세미콜론 자동 삽입기능(ASI)을 통해 암묵적으로 문의 끝이라고 예측되는 지점에 세미콜론을 자동으로 붙여줌

> 토큰이란?
> 문법적인 의미를 가지며 더 이상 나눌 수 없는 코드의 기본요소

문(명령문)의 종류

- 선언문
- 할당문
- 조건문
- 반복문

## 표현식과 문

> 문은 표현식의 상위 집합
> 표현식인 문과 아닌 문을 구별하는 가장 쉬운방법은 변수에 할당해 보는 것

```javascript
// 선언문(Declaration statement) : 표현식을 포함하는 문
let num;
// 할당문(Assignment statement) : 표현식이자 문 그 자체
num = 5;
// 선언문
const MAX_NUM = num * 10;
// 할당문
num = 0;
```
