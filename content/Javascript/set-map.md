---
emoji:
title: Set과 Map
date: '2023-07-31 23:24:00'
author: 허원호
tags: javascript, 자바스크립트 딥다이브
categories: 자바스크립트 딥다이브
---

# Set

> 중복되지 않은 유일한 값들의 집합

Set객체는 인덱스로 접근할 수 없으며 요소 순서에 의미가 없고 중복값을 포함하지 않는 특징을 가지고 있습니다.

## Set 객체 생성

```js
const set = new Set(); // Set(0) {}

const set2 = new Set([1, 2, 3, 4]); // Set(4) {1,2,3,4}
```

Set은 Set 생성자 함수를 통해 생성하며 인수를 비우면 빈 Set객체를 반환하며 인수에는 이터러블만 전달 할 수 있습니다.

<br/>

## Set 객체 요소 추가, 개수 확인, 삭제, 존재 여부 확인, 요소 일괄 삭제

```js
const set = new Set();

// 요소 추가
set.add(5).add(4); // add 메서드는 set 객체를 반환하기 때문에 메서드 체이닝 형태로 사용할 수 있다.

set.add([]); // 자바스크립트의 모든 값을 추가할 수 있습니다.

// 요소 개수 확인
set.size; // 3

// 요소 삭제
set.delete(4);

// 요소 존재 여부 확인
set.has(5); // true
set.has(1); // false

// 요소 일괄 삭제
set.clear();
console.log(set); // Set(0) {}

console.log(NaN === NaN); // false
console.log(0 === -0); // true

set.add(NaN).add(NaN); // 일치 비교연산자의 결과와 다르게 NaN을 동일한 값으로 평가하여 중복 추가가 되지 않습니다.
```

<br/>

## 요소 순회

Set 객체의 요소 순회는 Set.prototype.forEach 메서드를 통해 순회가능하며 forEach 내부의 콜백함수의 인수로 첫번째와 두번째는 요소값 세번째는 set 객체 자체를 전달 받습니다.

인수에 동일한 요소값임에도 불구하고 전달하는 이유는 Array.prototype.forEach 메서드의 콜백함수와 동일한 구조를 취하기 위함입니다.

```js
const set = new Set([1, 2, 3, 4, 5, 6]);

set.forEach((v, v2, set) => {
  console.log(v, v2, set); // 1, 1, Set(6) {1,2,3,4,5,6}
});
```

Set 객체또한 이터러블이기 때문에 for of 문으로 순회가 가능합니다.
단 Set 객체는 요소의 순서에 의미가 없으나 순회시에는 요소가 추가된 순서대로 순회하게 됩니다.

<br/>

## 집합 연산

1. 교집합

   ```js
   Set.prototype.intersection = function (set) {
     const intersection = new Set();
     for (const el of set) {
       if (this.has(el)) {
         intersection.add(el);
       }
     }
     return intersection;
   };

   // 스프레드 문법을 통해 아래 코드로도 구현이 가능합니다.
   Set.prototype.intersection = function (set) {
     return new Set([...this].filter((v) => set.has(v)));
   };
   ```

2. 합집합

   ```js
   Set.prototype.union = function (set) {
     const union = new Set(this);
     for (const el of set) {
       union.add(el);
     }

     return union;
   };

   Set.prototype.union = function (set) {
     return new Set([...this, ...set]);
   };
   ```

3. 차집합

   ```js
   Set.prototype.difference = function (set) {
     const difference = new Set(this);
     for (const el of set) {
       difference.delete(el);
     }

     return difference;
   };

   Set.prototype.difference = function (set) {
     return new Set([...this].filter((v) => !set.has(v));
   };
   ```

4. 부분 집합과 상위 집합

   ```js
   Set.prototype.isSuperset = function (subSet) {
     for (const el of subSet) {
       if (!this.has(el)) return false;
     }

     return true;
   };

   Set.prototype.isSuperset = function (subSet) {
     return [...subSet].every((v) => this.has(v));
   };
   ```

<br />

# Map

> 키와 값의 쌍으로 이루어진 컬렉션

Map은 객체와 다르게 키로 자바스크립트의 모든 값을 사용할 수 있으며 이터러블하며 length 프로퍼티가 아닌 Map.size를 통해 요소 개수를 확인할 수 있습니다.

## Map 객체 생성

Map 생성자 함수를 통해 생성하며 Set 과 마찬가지로 인수를 비우게되면 빈 Map 객체를 반환하며 이터러블을 인수로 전달받아야하는 것은 동일하지만 키와 값의 쌍으로 이루어진 이터러블을 전달해야한다.

```js
const map = new Map(); // Map(0) {}

const map2 = new Map([
  ['key1', 1],
  ['key2', 2],
]); // Map(2) { "key1" => 1, "key2" => 2}

const map2 = new Map([
  ['key1', 1],
  ['key1', 2],
]); // Map(1) { "key1" => 2}
```

<br />

## Map 객체 요소 추가, 요소 취득, 개수 확인, 삭제, 존재 여부 확인, 요소 일괄 삭제

```js
const map = new Map();

// set 메서드를 통해 요소를 추가합니다.
map.set('key1', 'value1').set('key2', 'value2');

// get 메서드를 통해 요소를 취득 할 수 있습니다.
map.get('key1'); // "value1"

// size 프로퍼티를 통해 요소의 개수를 확인합니다.
map.size; // 1

// delete 메서드를 통해 요소를 삭제합니다
map.delete('key1');

// clear 메서드를 통해 요소를 일괄 삭제합니다
map.clear();

console.log(NaN === NaN); // false
console.log(0 === -0); // true

map.set(NaN, 'value1').set(NaN, 'value2'); // 일치 비교연산자의 결과와 다르게 NaN을 동일한 값으로 평가하여 중복 추가가 되지 않습니다.
```

<br/>

## 요소 순회

Set 객체와 동일하게 Map 객체또한 Map.prototype.forEach 메서드를 통해 요소를 순회할 수 있습니다.
단 첫번째 인수는 요소의 값으로 동일하지만 Map forEach의 두번째 인수는 요소의 키를 반환합니다.
세번째 인수는 Map 객체 자신을 반환합니다.

```js
const map = new Map([
  ['key1', 1],
  ['key2', 2],
]);

map.forEach((v, k, map) => {
  console.log(v, k, map); // 1, "key1", Map(2) {"key1" => 1, "key2" => 2}
});
```

Map 객체 또한 이터러블이기 때문에 for of 문으로 순회할 수 있습니다.

```js
const map = new Map([
  ['key1', 1],
  ['key2', 2],
]);

for (const entry of map) {
  console.log(entry); // [key1: 1] [key2: 2]
}
```

또한 Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드도 제공합니다.

- Map.keys: 요소의 키를 값으로 갖는 이터러블이면서 이터레이터인 객체 반환
- Map.values: 요소의 값을 값으로 갖는 이터러블이면서 이터레이터인 객체 반환
- Map.entries: 요소의 키와 값을 값으로 갖는 이터러블이면서 이터레이터인 객체 반환
