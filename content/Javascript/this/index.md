---
emoji:
title: this
date: '2023-07-24 22:35:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# this

자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수
this를 사용하여 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

자바스크립트의 this는 자바나 C++ 같은 클래스 기반 언어와는 다르게 함수 호출 방식에 의해 동적으로 바인딩 된다.

```js
const data = {
  name: 'hong',
  getRole() {
    return this.name + ' manager'; // 메서드를 호출한 객체를 가리킴
  },
};

function Person(name) {
  this.name = name;

  return this.name + ' manager';
}

// 생성자 함수 내부의 this는 생성할 인스턴스를 가리킴
const person = new Person('hong');
console.log(person); // "hong manager"

function add(a, b) {
  console.log(this); // 일반 함수내의 this 는 전역 객체를 가리킴, 단 strict mode 활성화 시에는 undefined를 반환
  return a + b;
}

add(3, 5);
```

## 함수 호출 방식과 this 바인딩

- 일반함수 호출: window 전역객체를 바인딩

  - 일반함수로 호출한 모든함수(콜백함수, 중첩함수)

    ```js
    const obj = {
      value: 50,
      add() {
        const self = this;
        setTimeout(() => {
          console.log(self.value); // 메서드 내부에서 this를 변수에 할당 후 참조하는 방식으로 객체에 접근할 수 있다.
        }, 100);
      },
    };

    const obj = {
      value: 50,
      add() {
        setTimeout(
          function () {
            console.log(this.value);
          }.bind(this),
          100,
        );
      },
    };

    const obj = {
      value: 50,
      add() {
        setTimeout(() => {
          console.log(this.value); // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킴
        }, 100);
      },
    };
    ```

- 메서드 호출: 메서드를 호출한 객체를 바인딩

  - 메서드는 프로퍼티에 바인딩된 함수이기 때문에 아래와 같이 호출한 객체의 this가 바인딩 되는 것이다.
  - 프로토타입 메서드도 동일하게 동작한다.

  ```js
  const obj1 = {
    name: 'kim',
  };
  const data = {
    name: 'hong',
    getRole() {
      return this.name + ' manager'; // 메서드를 호출한 객체를 가리킴
    },
  };

  obj1.getRole = data.getRole;
  obj1.getRole(); // kim manager;

  const getRole = data.getRole;
  getRole(); // "" 메서드를 호출한 전역객체가 this에 바인딩되어 window.name이 반환됨
  ```

- 생성자 함수 호출: 생성한 인스턴스를 바인딩
- Function.prototype.call/bind/apply: 인수에 따라 다르게 바인딩

  ```js
     /**
       * @param thisArg - this로 사용할 객체
       * @param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
       * @return 호출한 함수의 반환값
       */
      Function.prototype.apply(thisArg[, argsArray])

       /**
       * @param thisArg - this로 사용할 객체
       * @param arg1, arg2, ... - 함수에게 전달할 인수 리스트
       * @return 호출한 함수의 반환값
       */
      Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])

  ```

  bind 메서드는 위의 두 메서드와는 다르게 함수를 호출하지 않고 this로 사용할 객체만 전달한다.

  ```js
  const person = {
    name: 'Lee',
    foo(callback) {
      // bind 메서드로 this를 바인딩 해줄경우 콜백함수에서 호출한 객체 자신에 접근이 가능하다
      setTimeout(callback.bind(this), 100);
    },
  };

  person.foo(function () {
    console.log(this.name); // 일반함수로 호출될 콜백함수 내부의 this는 window 객체를 가리킨다.
  });
  ```
