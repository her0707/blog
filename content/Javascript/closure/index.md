---
emoji:
title: 클로저
date: '2023-07-25 23:23:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 클로저

> 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

클로저라는 개념을 처음 접해본다면 그 정의 부터 난해하다.
코드를 보며 차근차근 이해해보자

## 렉시컬 스코프

```js
const x = 1;

function outer() {
  const x = 5;

  function inner() {
    console.log(x);
  }
  inner();
}

outer(); // 5
```

앞서 자바스크립트 엔진은 함수를 호출한 곳이 아닌 정의한 곳에 따라 상위 스코프를 결정한다고 하였다
이를 렉시컬 스코프(정적 스코프) 라고 한다.

여기서 함수의 상위스코프를 결정한다는 것은 앞서 살펴본 실행컨텍스트의 렉시컬 환경의 외부 렉시컬 환경에 대한 참조값을 결정한다와 같다.

즉 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조 값이 렉시컬 스코프가 되는 것이다.

## 함수 객체 내부의 [[Environment]]

함수는 정의된 환경에 따른 상위 스코프를 기억하기 위해 내부슬롯 [[Environment]] 에 상위 스코프의 참조를 저장한다.
이때 저장하는 상위스코프는 현재 실행중인 실행 컨텍스트의 렉시컬 환경과 같다. 왜냐하면 함수가 정의된 시점의 상위 스코프가 저장되기 때문에 함수가 정의되는 시점 즉 현재 실행중인 실행컨텍스트가 코드를 평가하는 시점이 된다.

## 클로저와 렉시컬 환경

외부함수보다 중첩함수가 더 오래 유지되면서 외부함수의 식별자를 참조하는 중첩함수를 클로저 라고 한다.

외부함수의 식별자를 중첩함수에서 참조하고 있는 경우 실행컨텍스트 스택에서 외부함수 컨텍스트가 pop 되어도 렉시컬 환경은 소멸되지 않는다. 내부함수의 [[Environment]] 내부슬롯에 외부함수의 렉시컬 환경을 참조하고 있기 때문이다.

상위 스코프의 어떤 식별자도 참조하고있지 않는 중첩함수의 경우에 모던 브라우저에서 최적화를 위해 중첩함수의 상위스코프를 기억하고 있지 않는다.

## 클로저의 활용

상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고 특정함수에게만 상태 변경을 허용하기 위해 사용된다.

```js
const increase = (function () {
  let x = 1; // x는 외부에서 접근이 불가능해져 은닉된다.

  return function () {
    return ++x; // x 의 상태 변화 또한 increase 함수 호출을 통해서만 가능하다.
  };
})();

increase(); // 2
```

하지만 위의 코드의 경우 한번에 하나의 상태변화만 수행되고 있다. 이 코드를 고차함수를 사용하여 상태를 제어하도록 변경해 보겠다.

```js
function makeCounter(func) {
  let counter = 0;

  return function () {
    counter = func(counter);

    return counter;
  };
}

function increase(num) {
  return ++num;
}

function decrease(num) {
  return --num;
}

const increaser = makeCounter(increase);
increaser(); // 1

const decreaser = makeCounter(decrease);
decreaser(); // -1
```

makeCounter를 호출하여 반환된 함수또한 렉시컬 환경을 가지기 때문에 상태를 각각 지니게된다.
그래서 increase와 decreaser 모두 공유되지 않은 각각의 상태를 가지게 된 것 이다.

이를 해결하기 위해서는 makeCounter 함수가 여러번 호출되어서는 안된다

```js
const counter = (function () {
  let counter = 0;

  return function (func) {
    counter = func(counter);

    return counter;
  };
})();

counter(increase);
```

## 캡슐화와 정보 은닉

캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 메서드를 하나로 묶는 것을 말한다.
또한 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는 데 이를 정보 은닉이라고 한다.

대부분의 객체지향 프로그래밍 언어는 클래스를 정의하고 public, private, protected 같은 접근제한자로 정보은닉을 할 수 있다. 하지만 자바스크립트는 public, private, protected 를 클래스 이외에서는 지원하지 않기 때문에 기본적으로 모두 public 한 상태가 된다

그럼 이를 정보 은닉 하려면 어떻게 해야할까

```js
const Person = (function () {
  let _age = 0; // 지역 변수로 선언함으로써 private 처리를 할 수 있다.

  function Person(name, age) {
    this.name = name;
    _age = age;
  }

  Person.prototype.getAge = function () {
    return _age;
  };

  return Person;
})();

const person = new Person('kim', 40);

person._age; // undefined;
person.name; // "kim";
person.getAge(); // 40

const lee = new Person('Lee', 20);

lee.name; // "lee"
person.getAge(); // 20 ?!
```

하지만 위의 코드는 다른 문제점이 있다
getAge 메서드가 프로토타입을 통해 단 한번만 생성되기 때문에 Person 생성자 함수의 모든 인스턴스가 상속을 통해 호출할 수 있는 해당 메서드는 모두 동일한 상위 스코프를 사용하게 된다.
