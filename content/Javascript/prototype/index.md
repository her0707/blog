---
emoji:
title: 프로토타입
date: '2023-07-22 03:28:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 프로토 타입

프로토 타입을 설명하기 이전에 살펴보고 넘어가야할 것이 있다.
자바스크립트는 명령형, 함수형, 프로토타입 기반 객체 지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어로써 거의 모든 것 이 객체로 이루어져있다.

과연 여기서 말하는 객체 지향 프로그래밍 이란 무엇일까?

## 객체 지향 프로그래밍

프로그램을 명령어 또는 함수의 목록으로 보는 명령형 프로그래밍의 절차 지향적 관점에서 벗어나 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다. 실체는 특징이나 성질을 나타내는 **속성** 을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.

> 사람은 이름, 주소, 성별, 나이, 신장, 체중 등의 다양한 속성이 있으며 이 속성들을 구체적으로 표현하면 특정한 사람을 구별하여 인식할 수 있다.

```js
const person = {
  name: 'test',
  address: 'seoul',
};
```

이처럼 다양한 속성중에서 프로그램에 필요한 속성만 간추려 표현하는 것을 **추상화**라고 한다.
속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합 적인 자료구조를 객체라고 하며 이 독립 적인 객체의 집합으로 프로그래밍을 표현하는 것이 객체 지향 프로그래밍 이다.

## 상속과 프로토타입

> 상속
> 객체지향 프로그래밍의 핵심 개념으로 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}
```

위의 Circle 생성자 함수는 동일한 프로퍼티와 메서드 구조를 갖는 객체를 생성할 떄 유용하지만 동일 한 메서드를 중복해서 생성하게되고 모든 인스턴스가 중복 소유하게 되는 문제가 있다.

이러한 불필요한 중복을 제거하기위해 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.

```js
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};
```

위 와 같은 코드로 getArea 메서드를 Circle.prototype에 할당하여 Circle 생성자 함수로 생성된 인스턴스는 모두 getArea 메서드를 상속받게된다.

## 프로토타입 객체

> 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티를 제공한다.

모든 객체는 [[Prototype]] 이라는 내부슬롯을 가지며 이 곳에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.
또한 모든 객체는 하나의 프로토타입을 가지며 생성자 함수와 연결되어있다.

[[Prototype]] 내부슬롯에는 직접 접근 할 수 없지만 `__proto__` 접근자 프로퍼티룰 통해 간접적으로 접근 할 수 있다.
그리고 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근 할 수 있다.

### `__proto__` 접근자 프로퍼티

앞서 언급한대로 모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 Prototype인 [[Prototype]] 내부 슬롯에 간접적으로 접근 할 수 있다.

`__proto__`는 getter/setter 함수라고 부르는 접근자 함수[[Get], [[Set]]) 를 통해 프로토타입을 취득하거나 할당한다.

```js
const data = {};
const parent = { data: 1 };

// getter 함수인 get __proto__ 가 호출됨
data.__proto__;
// setter 함수인 set __proto__ 가 호출 됨
data.__proto__ = parent;
```

### `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.

```js
{}.__proto__ === Object.prototype // true
```

### `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기위함 이다.

```js
const parent = {};
const child = {};

child.__proto__ = parent;
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

프로토 타입은 단방향 링크드 리스트 로 구현되어야 하기 때문에 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인(순환 참조 프로토타입 체인) 이 만들어지면 프로토타입 체인 종점이 존재하지 않아 무한루프에 빠지게 된다.

따라서 `__proto__` 접근자 프로퍼티를통해 프로토타입에 접근하고 교체하도록 구현되어있다.

### `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.

모든객체가 `__proto__` 접근자 프로퍼티릍 사용할 수 없기 때문에 직접 사용은 권장 되지 않는다.
Object.getPrototypeOf 메서드를 통해 get `__proto__` 를 대체할 수 있으며 Object.setPrototypeOf 메서드를 통해 set `__proto`의 역할을 대신 할 수 있다.

## 함수 객체의 prototype 프로퍼티

함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성한 인스턴스의 프로토 타입을 가리킨다.
반면 no-constructor 함수인 경우에 생성자 함수로서 호출할 수 없는 함수기 때문에 prototype 프로퍼티를 소유하지 않는다

```js
const Person = name = > {
    this.name = name;
}

Person.hasOwnProperty("prototype") // false
```

모든 객체가 가지고있는 `__proto__` 접근자 프로퍼티와 함수객체만이 가지는 prototype 프로토 타입은 결국 동일한 프로토타입을 가리키지만 이들 프로퍼티를 사용하는 주체가 다르다

|           | 소유        | 값                | 사용 주체   | 사용 목적                                                              |
| --------- | ----------- | ----------------- | ----------- | ---------------------------------------------------------------------- |
| **proto** | 모든 객체   | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 <br> 교체하기 위해 사용                |
| prototype | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 인스턴스의 프로토타입을 할당하기 위해 사용 |

## constructor 프로퍼티와 생성자 함수

```js
function Person(name) {
  this.name = name;
}

const me = new Person('Heo');

console.log(me.constructor === Person); // true
// me 객체에는 constructor 프로퍼티가 없지만 객체의 프로토타입인 Person.prototype에 존재하기 때문에 상속을 받아 사용할 수 있다.
```

생성자 함수로 생성된 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결된다.

<br >

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

리터럴 표기법으로 생성된 객체도 프로토타입이 존재하지만 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정지을 수 는 없다.

### Object 생성자 함수

> 추상연산
> ECMAScript 사양에서 내부 동작의 구현알고리즘을 표현한 것이다. 설명을 위해 사용되는 함수와 유사한 의사코드

```js
const obj = new Object(); // 인수가 전달되지 않아 추상연산 OrdinaryObjectCreate 를 호출하여 빈 객체를 생성함
console.log(obj); // {}

// new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성
class Foo extends Object {}
new Foo(); // Foo {}

// 인수가 전달 될 경우 인수를 객체로 변환함
const obj2 = new Object('ttt');
console.log(obj2); // String {"ttt"}
```

<br>

### 객체 리터럴

객체 리터럴이 평가될 경우 추상 연산 OrdinaryObjectCreate를 호출하여 빈객체를 생성하고 프로퍼티를 추가하도록 정의됨

함수 객체의 경우 Function 생성자를 통해 함수를 생성하였을떄 렉시컬 스코프를 만들지 않고 전역 함수 인 것 처럼 스코프를 생성하며 클로저도 만들지 않는다. 따라서 함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 Function 생성자 함수가 아니다. 하지만 constructor 프로퍼티를 통해 확인해보면 Function 생성자 함수인 것을 확인 할 수 있다.

```js
function aaa() {}

console.log(aaa.constructor === Function); // true

const test = () => {};

console.log(test.constructor === Function); // true
```

리터럴표기법으로 생성된 객체도 상속을 위해 프로토타입이 필요하기 때문에 가상적인 생성자 함수를 갖게 된다.
즉 **프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다**

<br >

## 프로토타입의 생성 시점

생성자 함수가 생성되는 시점에 생성된다. 언제나 프로토타입과 생성자 함수는 쌍으로 존재하기 때문이다.

### 사용자 정의 함수와 프로토타입의 생성 시점

생성자 함수로 호출할 수 있는 함수(constructor)는 함수 정의가 평가되어 함수객체가 생성되는 시점에 프로토타입도 함께 생성된다.

```js
// 함수선언문의 호이스팅이 발생하여 함수 생성시점에 프로토타입또한 생성되었다.
console.log(People.prototype); // {constructor: f}

function People(name) {
  this.name = name;
}

// non-constructor 함수는 프로토타입이 생성되지 않음
const Person = (name) => {
  this.name = name;
};

console.log(Person.prototype); // undefined
```

<br>

### 빌트인 생성자 함수와 프로토타입 생성 시점

빌트인 생성자 함수 또한 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.
대신 빌트인 생성자함수는 사용자 정의함수와 다르게 전역객체가 생성되는 시점에 생성된다.

<br>

## 객체 생성 방식과 프로토타입의 결정

객체생성방식은 다양한 방법이 있고 각 방법마다 세부적인 객체 생성방식의 차이가 존재하나 추상연산에 의해 생성된다는 공통점을 가지고 있다

- 추상연산을 통해 객체가 반환되는 순서
  - OrdinaryObjectCreate 의 인수로 자신이 생성할 객체의 프로토타입을 필수로 받는다
  - 빈 객체를 생성 후 객체에 추가할 프로퍼티 목록이 인수로 전달되었을 경우 해당 프로퍼티들을 빈 객체에 추가한다
  - 인수로 전달받은 프로토타입을 생성한 객체의 [[Prototype]] 내부 슬롯에 할당한 다음 해당 객체를 반환한다

1. 객체 리터럴에 의한 생성

   ```js
   const obj = { a: 1 };

   // 객체 리터럴로 생성한 객체는 Object.prototype을 상속 받는다.
   console.log(obj.constructor === Object); // true
   console.log(obj.hasOwnProperty('a')); // true
   ```

2. Object 생성자 함수에 의한 생성

   ```js
   // 생성자함수를 인수 없이 호출하여 빈객체를 생성
   const data = new Object(); // 생성자 함수를 통해 생성된 객체는 Object.prototype을 상속받음
   data.x = 1;

   console.log(data.constructor === Object); // true
   console.log(data.hasOwnProperty('x')); // true
   ```

3. 생성자 함수에 의한 생성
   생성자 함수로 생성된 프로토타입을 상속받게 됨

   ```js
   function People(name) {
     this.name = name;
   }

   People.prototype.getFullName = function () {
     return this.name + ' master';
   };

   const people = new People('test');
   console.log(people.constructor === People); // true
   ```

<br />

## 프로토타입 체인

```js
function People(name) {
  this.name = name;
}

People.prototype.getFullName = function () {
  return this.name + ' master';
};

const people = new People('test');
console.log(people.hasOwnProperty('name')); // true

console.log(Object.getPrototypeOf(People.prototype) === Object.prototype); // true
```

People 생성자 함수를 통해 생성한 객체 people이 Object.prototype의 hasOwnProperty를 사용할 수 있는 것을 확인할 수 있다. 이로써 Object.prototype 또한 상속받았다는 것을 알 수 있다.

자바스크립트는 객체의 프로퍼티 와 메서드에 접근할 때 해당 객체에 프로퍼티가 없을 경우 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 상위 프로토타입의 프로퍼티를 순차적으로 검색한다.

이를 프로토타입 체인이라고 한다.

위 코드에서 hasOwnProperty를 검색하는 과정을 설명하자면

1. people 객체에서 hasOwnProperty 를 검색한다. me 객체에는 hasOwnProperty 프로퍼티가 없으므로 [[Prototype]] 내부슬롯에 바인딩된 Person.prototype 에서 검색한다.
2. Person.prototype의 메서드에도 hasOwnProperty 가 없기 때문에 다시 [[Prototype]] 내부슬롯에 바인딩된 Object.prototype에서 hasOwnProperty 메서드를 검색한다.
3. Object.prototype에는 hasOwnProperty 메서드가 존재하기 때문에 Object.prototype.hasOwnProperty를 호출한다 이때 `Object.prototype.hasOwnProperty.call(people, "name")` 형태로 호출되며 this에는 people 객체가 바인딩 된다.

> call 메서드
> this로 사용할 객체를 전달하면서 함수를 호출함

언제나 프로토타입 체인의 최상위 객체는 Object.prototype 이다. 따라서 모든 객체는 Object.prototype을 상속받는다.

<br >

## 오버라이딩과 프로퍼티 섀도잉

```js
function People(name) {
  this.name = name;
}

// 프로토타입 메서드
People.prototype.getHee = function () {
  return 'Hee';
};

const p = new People('hhh');

// 인스턴스 메서드
p.getHee = function () {
  return 'yea';
};

p.getHee(); // "yea"
```

p 인스턴스에 getHee 메서드를 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 찾아 덮어쓰는것이 아닌 인스턴스 프로퍼티에 추가한다. 이 때 인스턴스 메서드가 프로토타입 메서드를 오버라이딩 했고 프로토타입 메서드는 가려진다.

이러한 상속관계로 인해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉 이라한다.

> 오버 라이딩
> 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식

인스턴스 메서드 getHee를 삭제해도 프로토타입 메서드 getHee가 존재하기 때문에 getHee를 호출할 수 있다.

단 하위 객체에서 프로토타입의 프로퍼티는 변경, 삭제가 불가능하다 오직 읽기만 가능하다.
프로토타입 프로퍼티를 변경, 삭제하려면 프로토타입에 직접 접근해야한다.

<br />

## 프로토타입의 교체

### 생성자 함수에 의한 프로토타입의 교체

```js
function Person(name) {
  this.name = name;
}

Person.prototype = {
  logging() {
    console.log('logging');
  },
};

const person = new Person('test');
```

교체한 객체 리터럴에는 constructor가 없기 떄문에 person 객체의 생성자 함수를 검색하면 Object로 나오게 된다.
(constructor 프로퍼티는 자바스크립트 엔진이 프로토타입 생성 시 암묵적으로 추가한 프로퍼티이기 때문)

### 인스턴스에 의한 프로토타입의 교체

```js
function Person(name) {
  this.name = name;
}

const person = new Person('test');

const parent = {
  constructor: Person, // 변경할 객체내부에 constructor 프로퍼티를  직접 추가하여 constructor 연결을 유지 할 수 있다.
  logging() {
    console.log('logging');
  },
};

Object.setPrototypeOf(person, parent);

person.logging(); // logging;
```

생성자 함수떄와 마찬가지로 프로토타입으로 교체한 parent 객체에는 constructor 프로퍼티가 없기 떄문에 person의 생성자 함수는 Object 가 된다.

결과적으로 이 두가지 방식은 동일한 결과를 가져오지만 미묘하지만 다른 차이점이 있다.

생성자 함수로 프로토타입을 교체한 경우에는 생성자 함수의 prototype 프로퍼티 또한 교체된 프로토타입을 가리키지만
인스턴스에 의한 프로토타입 교체의 경우에는 생성자 함수의 prototype 프로퍼티는 변하지 않는다.

위의 사례들로 보았을 때 프로토타입 교체를 통해 객체간의 상속 관계를 동적으로 변경하는 것은 권장되지 않는다
상속 관계를 인위적으로 변경하고자 한다면 이후 보게될 "직접 상속"을 사용하는게 더 편리하고 안전 할 것 이다.

<br/>

## instanceof 연산자

이항 연산자로서 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다.
우변의 피연산자가 함수가 아닐경우 TypeError 가 발생한다.

```js
function Person(name) {
  this.name = name;
}

Person.prototype = {
  logging() {
    console.log('logging');
  },
};

const person = new Person('test');

console.log(person.constructor === Person); // false

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
```

위와 같이 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인에 존재하면 true를 반환한다.

프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아닌 prototype에 바인딩된 객체가 프로토타입 체인상에 존재하는 지를 확인한다.

따라서 인스턴스에 의한 프로토타입 교체가 발생한 경우에는 생성자 함수의 프로토타입과 생성된 객체의 프로토타입이 달라지기 떄문에 false로 평가된다.

<br/>

## 직접 상속

### Object.create에 의한 직접 상속

다른 객체 생성방식과 마찬가지로 추상연산(OrdinaryObjectCreate)를 호출한다.
대신 명시적으로 프로토타입을 지정하여 새로운 객체를 생성할 수 있다.

```js
// 첫번째 매개변수로는 생성할 객체의 프로토타입으로 지정할 객체를 전달한다.
// 두번째 매개변수로는  생성할 객체의 프로퍼티를 갖는  객체를 전달한다.(옵션이므로 생략 가능)
Object.create(prototype[, propertiesObject])

let obj = Object.create(null);
Object.getPrototypeOf(obj) === null // true

obj = Object.create(Object.prototype, {
  a: {value: 3, writable: true, enumerable: true, configurable: true}
})

function Person(name) {
  this.name = name;
}

obj = Object.create(Person.prototype)

```

객체를 생성하면서 상속을 구현할 수 있는 이 메서드의 장점은

- new 연산자 없이도 객체를 생성할 수 있음
- 프로토타입을 지정하면서 객체를 생성할 수 있음
- 객체 리터럴에 의해 생성된 객체도 상속받을 수 있음

하지만 Object.prototype 의 빌트인 메서드를 객체가 직접호출하는 것을 ESLint가 권장하지 않는다
그 이유는 Object.create로 프로토타입 체인의 종점에 해당하는 객체를 생성할 수 있기 때문이다.

```js
// 프로토타입이 null 인 객체를 생성함으로서 프로토타입 종점에 해당하는 객체가 되었다.
const obj = Object.create(null);

obj.hasOwnProperty('t'); // TypeError: obj.hasOwnProperty is not function

// Object.prototype의 빌트인 메서드는 아래와 같이  간접적으로 호출하는 것이 권장된다.
Object.prototype.hasOwnProperty.call(obj, 'bb');
```

### 객체 리터럴 내부에서 `__proto__` 에 의한 직접 상속

```js
const test = { t: true };

const test2 = { f: false, __proto__: test };
// 접근자 프로퍼티를 사용하여 객체 리터럴내부에서도 직접상속이 가능하다.
```

<br/>

## 정적 프로퍼티/메서드

생성자 함수로 인스턴스를 생성하지 않아도 참조/호출 할 수 있는 프로퍼티/메서드

```js
function Person(name) {
  this.name = name;
}

Person.title = 'title';
Person.getTitle = function () {
  console.log('title');
};

const person = new Person('aaa');

person.getTitle(); // TypeError: person.getTitle is not a function
```

정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속하지 않았기 떄문에 접근할 수 없다

<br />

## 프로퍼티 존재 확인

### in 연산자

객체 내에 특정 프로퍼티가 존재하는 지 여부를 확인할 수 있는 연산자

```js
const person = { name: 'aaa' };

'name' in person; //true
'toString' in person; // true
```

in 연산자는 객체가 속한 프로토타입 체인 내에서 프로퍼티를 검색하기 때문에 toString이 true로 평가되었다.
ES6에서 도입된 Reflect.has 메서드로도 사용가능

### Object.prototype.hasOwnProperty 메서드

인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환함

<br/>

## 프로퍼티 열거

### for in 문

객체의 프로퍼티 개수 만큼 순회하여 for in 내부 변수선언문에서 선언한 변수에 프로퍼티 키를 할당한다.

```js
const person = { name: 'aaa', list: 'bbb' };
for (const key in person) {
  console.log(key);
}
// name
// list
```

[[Enumerable]] 값이 true이 프로퍼티만 열거 가능하다!

주의할 점은 for in 문은 프로퍼티의 순서를 보장하며 열거하지 않을 수 있기 때문에 주의할 필요가 있다.
하지만 대부분의 모던 브라우저는 순서를 보상하고 숫자(문자열 기반)인 프로퍼티 키는 정렬을 실시한다.

배열을 순회해야할 경우에는 for, for of Array.prototype.forEach 메서드를 권장한다.

### Object.keys/values/entries 메서드

객체 자신의 고유 프로퍼티를 열거할 경우에 권장되는 메서드 들이다

- Object.keys: 열거 가능한 프로퍼티 키를 배열로 반환
- Object.values: 열거 가능한 프로퍼티 값을 배열로 반환
- Object.entries: 열거 가능한 프로퍼티 키와 값을 배열로 담아 반환

```js
const person = { name: 'aaa', list: 'bbb' };
Object.keys(person); // ["name", "list"]
Object.values(person); // ["aaa", "bbb"]
Object.entries(person); // [["name", "aaa"], ["list", "bbb"]]
```
