---
emoji:
title: 클래스
date: '2023-07-26 23:30:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# 클래스

기본적으로 프로토타입 기반의 객체 지향언어인 자바스크립트는 클래스 없이 생성자 함수와 프로토 타입을 통해 객체 지향언어의 상속을 구현 할 수 있었다.

하지만 클래스 기반 언어에 익숙한 프로그래머들을 위해 ES6에서 클래스 기반의 객체 지향언어의 클래스와 매우 흡사한 클래스를 도입하였다.

그러나 이 클래스는 함수이며 기존 프로토 타입 기반의 패턴을 클래스 형태로 사용할 수 있도록 하는 문법적 설탕 이라고 볼수도 있다.

단 클래스는 기존의 생성자 함수와는 동일하게 동작하지 않으며 아래와 같은 차이점이 있다.

1. 클래스는 new 연산자 없이 호출하면 에러가 발생
2. 상속을 지원하는 extends와 super 키워드를 제공
3. 호이스팅이 발생하지 않는 것 처럼 동작
4. 클래스 내부의 모든 코드에는 암묵적으로 strict mode 가 적용
5. constructor, 프로토타입 메서드, 정적 메서드는 모두 [[Enumerable]] 값이 false 이다.

따라서 객체 생성 패턴의 단순한 문법적 설탕보다는 새로운 객체 생성 메커니즘 이라고 보는 것이 합당 하다.

## 클래스 정의

클래스는 값으로 사용할 수 있는 일급 객체로서 표현식으로도 사용할 수 있다.

```js
class Person {
  // constructor (생성자)
  constructor(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  hello() {
    console.log(this.name + ' hello');
  }

  // 정적 메서드
  static bye() {
    console.log('bye');
  }
}

const Person = class {};
```

## 클래스 호이스팅

클래스는 함수로 평가되기 때문에 런타임 이전의 소스코드 평가 과정에서 평가되어 함수 객체를 생성한다.
이때 생성된 함수는 constructor다. 또한 프로토타입과 생성자 함수는 항상 쌍으로 존재하기 때문에 프로토타입도 함께 생성된다.

```js
const Person = '';

{
  console.log(Person); // ReferenceError: Cannot access 'Person' before initialization

  class Person {}
}
```

var, let, const, function, function\*, class 키워드를 사용하여 선언된 모든 식별자는 호이스팅 된다.

## 인스턴스 생성

클래스는 생성자 함수이며 new 연산자와 함께 호출하여 인스턴스를 생성한다.
대신 생성자 함수와 다르게 new 연산자 없이 호출할경우 에러가 발생한다.

## 메서드

클래스 몸체에서 정의할 수 있는 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드가 있다.

### constructor

인스턴스를 생성하고 초기화 하기 위한 메서드로 이름을 임의로 변경할 수 없는 특수한 메서드다.

```js
class Person {}
const person = new Person();

Object.getPrototypeOf(person).prototype === Person; // true
```

constructor 메서드의 특징은 아래와 같다.

1. new 연산자와 함께 호출되는 것이 constructor로 파라미터에 전달한 값은 클래스 필드에 할당할 수 있음
2. constructor는 인스턴스의 생성과 동시에 클래스 필드의 생성과 초기화를 실행
3. constructor는 클래스 내에 한 개만 존재하며 2개 이상일 경우 문법 에러(SyntaxError)가 발생
4. constructor를 생략하면 클래스에 constructor() {}, 즉 빈 객체를 포함하는 것처럼 동작

### 프로토 타입 메서드

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  // 인스턴스의 프로토타입에 존재하는 메서드가 됨
  hello() {
    console.log(this.name + ' hello');
  }
}

const person = new Person('lee');

person.hello(); // lee hello
```

### 정적 메서드

인스턴스 생성 없이도 호출 가능한 메서드

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  static hello() {
    console.log(this.name + ' hello'); // 프로토타입 메서드와는 달리 클래스 자신이 this에 바인딩된다.
    // 메서드를 호출한 객체에 바인딩 되기 때문
  }
}

Person.hello(); // Person hello
```

정적 메서드와 프로토타입 메서드의 차이점은 아래와 같다

1. 자신이 속해있는 프로토타입 체인이 다르다
2. 정적 메서드는 클래스로 호출되고 프로토타입 메서드는 인스턴스로 호출한다.
3. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 가능하다.

클래스 또는 생성자 함수를 하나의 네임스페이스로 사용하여 정적메서드를 모아 놓으면 이름 충돌 가능성을 줄이고 관련 함수를 구조화 할 수 있는 자엊ㅁ이 있따.

```js
// 표준 빌트인 객체도 아래와 같이 정적 메서드를 가지고 있다.
Math.max(1, 3);
Number.isNaN(NaN);
JSON.stringify({ a: 5 });
```

### 클래스에서 정의한 메서드의 특징

1. function 키워드를 생략한 메서드 축약표현을 사용
2. 객체리터럴과는 다르게 메서드 정의 시 콤마를 사용하지 않음
3. 암묵적으로 strict mode 가 활성화
4. for in 문이나 Object.keys 메서드 등으로 열거 할 수 없음
5. 내부 메서드 [[Constructor]] 를 가지지 않음

## 클래스의 인스턴스 생성 과정

1. 인스턴스 생성과 this 바인딩
   new 연산자를 통해 클래스가 호출되면 constructor 내부 코드가 실행되면서 빈 객체가 생성됨. 이 객체의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정됨. this에 바인딩

2. 인스턴스 초기화
   constructor 내부코드가 실행되어 this가 바인딩 되어있는 인스턴스를 초기화함
   constructor가 생략되었을 경우 이 과정이 생략됨

3. 인스턴스 반환

## 프로퍼티

```js
class Person {
    // 클래스 필드 정의
  _firstName: 'Wow', // 데이터 프로퍼티

  static #address: ""; // static private 필드

  // 접근자 프로퍼티
  get firstName() {
    return this._firstName;
  },

  set firstName(name) {
    this._firstName = name;
  },

  constructor(name) {
    this.name = name; // 인스턴스 프로퍼티
  }
}
```

- 인스턴스 프로퍼티

  - constructor 내부에서만 정의해야 하며 기본적으로는 언제나 public한 상태

- 접근자 프로퍼티

  - getter와 setter함수로 이루어짐

- 클래스 필드

  - this를 클래스 필드에 바인딩 하면 안됨
  - 초기값을 할당하지 않으면 undefined 반환
  - 외부 초기값으로 초기화가 필요한 경우 constructor 에서 초기화

- private 필드

  - 식별자 선두에 #을 붙여줌
  - 클래스 내부 외의 공간에서 참조 불가능
  - constructor 내부에서 정의 불가

- static 필드

<br />

## 상속에 의한 클래스 확장

> 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것

### extends

```js
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return 'eat';
  }
}

class Dog extends Animal {
  type() {
    return 'pet';
  }
}
```

- extends 키워드로 클래스를 상속
  - 생성자 함수도 상속받을 수 있으나 extends 앞에는 반드시 클래스가 와야 함

### super

- super 호출
  - 슈퍼 클래스의 constructor가 호출 됨
  - 서브 클래스의 constructor를 생략하지 않는 경우 서브클래스의 constructor 에는 반드시 super를 호출해야함
  - 서브 클래스의 constructor에서 super 호출 이전에는 this를 참조할 수 없음
  - 서브 클래스의 constructor가 아닌 곳에서 super를 호출하면 에러 발생

```js
// 슈퍼 클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

// 서브 클래스
class Derived extends Base {
  // 암묵적으로 constructor가 정의되지만 직접 정의도 가능
  // constructor(...args) { super(...args); }
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}

const derived = new Derived(1, 2, 3);
console.log(derived); // Derived {a: 1, b: 2, c: 3}
```

- super 참조

  - 슈퍼 클래스의 메서드를 호출할 수 있음

    ```js
    // 슈퍼 클래스
    class Base {
      constructor(name) {
        this.name = name;
      }

      sayHi() {
        return `Hi! ${this.name}`;
      }
    }

    // 서브 클래스
    class Derived extends Base {
      sayHi() {
        // super.sayHi는 슈퍼 클래스의 프로토타입 메서드
        return `${super.sayHi()}. how are you doing?`;
      }
    }

    const derived = new Derived('Lee');
    console.log(derived.sayHi()); // Hi! Lee. how are you doing?
    ```

- 슈퍼 클래스의 prototype 프로퍼티에 바인딩된 프로토타입을 참조할 수 있어야 슈퍼 클래스의 메서드를 참조 가능

  ```js
  // 슈퍼 클래스
  class Base {
    constructor(name) {
      this.name = name;
    }
    sayHi() {
      return `Hi! ${this.name}`;
    }
  }

  class Derived extends Base {
    sayHi() {
      // __super는 Base.prototype
      const __super = Object.getPrototypeOf(Derived.prototype);
      return `${__super.sayHi.call(this)} how are you doing?`;
    }
  }
  ```

  - call 메서드를 사용하지 않고 그대로 sayHi를 그대로 호출하면 Base.prototype.sayHi 메서드 내부의 this는 인스턴스가 아닌 Base.prototype을 가리키게 된다.
  - 이 처럼 super참조가 동작하기 위해서는 super를 참조하고 있는 메서드가 바인딩되어 있는 객체의 프로토타입을 찾을 수 있어야 한다.

  ```js
  /*
    [[HomeObject]]는 메서드 자신을 바인딩하고 있는 객체를 가리킨다.
    [[HomeObject]]를 통해 메서드 자신을 바인딩하고 있는 객체의 프로토타입을 찾을 수 있다.
  */

  super = Object.getPrototypeOf([[HomeObject]]);
  ```

  - 서브클래스의 정적 메서드 내에서도 super.sayHi는 슈퍼 클래스의 정적 메서드 sayHi를 가리킨다

  ```js
  // 슈퍼 클래스
  class Base {
    static sayHi() {
      return 'Hi!';
    }
  }

  // 서브 클래스
  class Derived extends Base {
    static sayHi() {
      return `${super.sayHi()} how are you doing?`;
    }
  }

  console.log(Derived.sayHi()); // Hi! how are you doing?
  ```

### 상속 클래스의 인스턴스 생성 과정

1. 서브 클래스의 super 호출

   - 자바스크립트 엔진은 슈퍼 클래스와 서브클래스 구분을위해 "base" 또는 "derived"를 값으로 갖는 내부슬롯 [[ConstructorKind]]를 가짐 (상속받지 않는 클래스는 "base", 상속받는 클래스는 "derived")
   - 서브클래스는 자신이 직접 인스턴스를 생성하지 않고 슈퍼클래스에게 인스턴스 생성을 위임함
     - 서브클래스의 constructor에서 반드시 super를 호출해야하는 이유

2. 슈퍼클래스의 인스턴스 생성과 this 바인딩

   - super 가 호출됨에 따라 슈퍼클래스의 constructor 실행이전에 빈 객체를 생성하고 this가 바인딩 됨
   - new.target은 서브클래스를 가리킴
   - 생성된 인스턴스 프로토타입은 슈퍼클래스의 prototype 프로퍼티가 가리키는 객체가 아니라 서브클래스의 prototype 프로퍼티가 가리키는 객체

3. 슈퍼클래스의 인스턴스 초기화

   - this에 바인딩 되어있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화

4. 서브클래스 constructor로의 복귀 this 바인딩

   - super가 반환한 인스턴스가 this에 바인딩 되고 이 바인딩된 인스턴스를 그대로 사용함
   - super가 호출되지 않으면 인스턴스가 생성되지 않고 this 바인딩도 할 수 없음
     - 서브클래스 내부에서 super호출이전 this 참조가 불가능한 이유

5. 서브 클래스의 인스턴스 초기화

   - 슈퍼클래스의 인스턴스 초기화 과정과 동일

6. 인스턴스 반환
   - 인스턴스가 바인딩된 this가 암묵적으로 반환됨
