---
emoji:
title: 타입 변환과 단축 평가
date: '2023-07-14 22:01:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 타입 변환과 단축 평가

## 타입 변환이란?

- 명시적 타입변환(타입 캐스팅): 개발자가 의도적으로 값의 타입을 변경하는 것을 의미
- 암묵적 타입변환(타입 강제 변환): 개발자의 의도와 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 변환되는 것을 의미

## 암묵적 타입 변환

```js
let a = 10;

let str = a + ''; // a의 값이 10을 바탕으로 "10"이라는 문자열 값을 생성하고 표현식을 평가한다.
// 새로 생성된 문자열 값 "10"은 한 번사용하고 버려짐

console.log(typeof a, 10); // number 10 (a의 값에는 변화가 없음 (재 할당 되지 않음))

console.log(typeof str, str); // string "10"
```

자바스크립트 엔진에 의한 암묵적 타입변환이 발생하는 경우 원시 타입중 하나로 타입을 자동 변환함

### 문자열 타입으로 변환

```js
0 + ''; // '0'
- 1 + ''; // '-1'
NaN + '' // 'NaN'

true + ''; // 'true'
false + ''; // 'false'

null + ''; // 'null'

undefined + '' // 'undefined'

(Symbol()) + "" // TypeError: Cannot convert a Symbol value to string

({}) + "" // "[object Object]"
Math + "" // "[object Math]"
[] + "" // ""
[10, 3] + "" // "10,3"
(function(){}) + "" // "function(){}"
Array + "" // "function Array() { [native code] }"
```

<br>

### 숫자 타입으로 변환

```js
1 - '1'; // 0
1 * '3'; // 3
1 / 'tww'; // NaN
```

산술연산자의 모든 피연산자는 코드 문맥상 모두 숫자 타입이어야만 숫자 값을 만들 수 있기 때문에 숫자타입이 아닌 피연산자의 경우 암묵적으로 숫자 타입으로 타입변환을 한다.

```js
// 비교연산자 또한 크기비교를 위해 피연산자를 숫자타입으로 변환함

'5' > 3; // true

// 단항 연산자(+) 또한 마찬가지로 숫자타입의 값으로 암묵적 타입 변환을 수행
+'5'; // 5
+'str'; // NaN

+true; // 1
+false; // 0

+null; // 0
+undefined; // NaN

+Symbol(); // TypeError: Cannot convert a Symbol value to number

+{}; // NaN
+[]; // 0
+[10, 20]; // NaN
+function () {}; // NaN
```

<br>

### 불리언 타입으로 변환

```js
if ('') console.log('1');
if (true) console.log('2');
if (0) console.log('3');
if ('aa') console.log('4');
if (null) console.log('5');

// 2,4
```

자바스크립트 엔진은 불리언 타입이 아닌 값을 **Truthy값(참으로 평가되는 값)** 또는 **Falsy값(거짓으로 평가되는 값)** 으로 구분한다.

| Falsy값       |
| ------------- |
| false         |
| undefined     |
| null          |
| 0, -0         |
| NaN           |
| ''(빈 문자열) |

## 명시적 타입 변환

- 표준 빌트인 생성자 함수(String, Number, Boolean)을 new 연산자 없이 호출하는 방법
- 빌트인 메서드를 사용하는 방법
- 암묵적 타입 변환을 이용하는 방법

### 문자열 타입으로 변환

- String 생성자 함수 호출
- Object.prototype.toString 메서드
- 문자열 연결 연산자(+)

```js
String(1); // "1"
1.toString(); // "1"
1 + "" // "1"
```

### 숫자 타입으로 변환

- Number 생성자 함수 호출
- parseInt, parseFloat (문자열만 변환가능)
- - 단항 산술 연산자
- - 산술 연산자

```js
Number('0'); // 0
Number('10.555323'); // 10.555323
parseInt('-1'); // -1
parseFloat('0.9'); // 0.9
+'553'; // 553
+true; // 1

'50' * 3; // 150
```

### 불리언 타입으로 변환

- Boolean 생성자 함수 호출
- ! 부정 논리 연산자를 두번사용하는방법

```js
Boolean('a'); // true

Boolean(NaN); // false

!!'a'; // true
!!null; // false
!!{}; // true
!![]; // true
```

---

## 단축 평가

### 논리 연산자를 사용한 단축 평가

```js
'money' && 'car'; // "car"
```

논리곱(&&) 연산자는 두 개의 피연산자가 모두 true로 평가 될 때 true를 반환함
그러므로 두번쨰 피연산자까지 평가한 후에 두번째 피연산자의 값을 반환함

```js
'money' || 'fund'; // "money"
```

논리합(||) 연산자는 두 개의 피연산자 중 하나만 true로 평가되어도 true를 반환함
좌항에서 우항으로 평가가 진행되면서 true를 반환하는 피 연산자의 값을 반환하게 됨

> 논리 연산의 결과를 결정하는 피연산자의 타입을 변환하지 않고 그대로 반환하는 것을 **단축 평가**라고 함
> 단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평과 과정을 생략하는 것

```js
// 단축 평가를 통해 if문을 대체
let happy = true;
if (happy) console.log('aaaa');

happy && console.log('기쁨');

happy = false;

if (!happy) console.log('눈물');

happy || console.log('눈물');
```

#### 객체의 프로퍼티를 참조할때 null 또는 undefined 인지 확인하고 참조하려는 경우

```js
const object = null;

const value = object && object.value;
```

#### 함수의 매개변수에 기본값을 설정할 떄

함수 호출시 인수를 전달하지 않으면 매개변수에 undefined가 할당되는데 단축평가를 통해 매개변수에 기본값을 설정하면 undefined로 인한 에러를 방지할 수 있음

```js
function getStringLength(str) {
  str = str || '';
  return str.length;
}

// ES6의 매개변수 기본값설정
function getStringLength(str = '') {
  return str.length;
}
```

### 옵셔널 체이닝 연산자(?.)

- ES11에서 도입
- 연산자 (?.)는 좌항의 피연산자가 null or undefined 일 경우 undefined를 반환하고 그렇지 않은경우에 우항의 프로퍼티 참조를 이어감

```js
let object = null;

console.log(object?.value); // undefined
// 옵셔널 체이닝 연산자 이전에는 논리곱 연산자를 사용한 단축평가를 통해 null, undefined 여부를 확인하였음
object && console.log(object.value); // null

// 논리곱 연산자는 Falsy값이면 좌항 피연산자를 그대로 반환하지만 0이나 ""은 객체로 평가될 떄도 있음
let str = '';
let length = str && str.length; // ""

// 하지만 옵셔널 체이닝 연산자는 좌항 연산자가 Falsy 값이라도 null이나 undefined가 아니면 우항의 프로퍼티 참조를 이어감

str?.length; // 0
```

### null 병합 연산자(??)

- ES11 에서 도입
- 좌항의 피연산자가 null 또는 undefined 인 경우 우항의 피연산자를 반환
- 그렇지 않으면 좌항의 피연산자 반환

```js
let text = null ?? 'string'; // string

// null 병합 연산자 이전에는 논리합 연산자를 사용한 단축평가로 변수에 기본값을 설정함
// 단 Falsy 값인 0이나 ""도 기본값으로 유효하다면 예기치 않은 동작 이 발생할 수 있음

const foo = '' || 'default'; // ""

// null 병합 연산자는 좌항의 피연산자가 Falsy 값이더라도 null, undefined가 아니면 좌항의 피연산자를 반환함

const foot = '' ?? 'foot'; // ""
```
