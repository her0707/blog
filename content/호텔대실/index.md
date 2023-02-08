---
emoji:
title: 프로그래머스 코딩테스트 - 호텔대실
date: '2023-02-08 14:18:00'
author: 허원호
tags: javascript, 코딩 테스트
categories: 코딩테스트
---

# 부분합, 누적합 (레벨2)

- 배열의 일부 구간에 대한 합을 빠르게 구할 수 있게 해주는 스킬
- n개의 원소로 이루어진 배열이 주어졌을 때 반복문을 통해 배열의 합을 구하려면 $O(n)$이 걸리는데 부분합을 이용하면 모든 부분합을 $O(1)$에 바로 구하기 가능

## 1차원 배열 예

```javascript
const arr = [2,4,1,-5,2,-3]
const sum = [0,2,6,7,2,4,1]

sum[1] === arr[0]
sum[2] === arr[0] + arr[1]
sum[i] === arr[0] + arr[1] + .... + arr[i - 1]
```

## 2차원 배열 예

```javascript
const arr = [[1,2,3,4], [2,3,4,5], [3,4,5,6], [4,5,6,7]]
const sum = [[0,0,0,0], [0,1,3,6,10], [0,3,8,15,24], [0,6,15,27,42], [0,10,24,42,64]]

sum[i][j] === arr[0][0] + ..... + arr[i-1][j-1]
```

# 풀이

```javascript
function solution(book_time) {
  let answer = 0;
  const MAX_TIME = 1450;

  // 분단위의 방을 생성
  const rooms = new Array(MAX_TIME);
  rooms.fill(0);
  // 입실 시 해당 분에 +1, 퇴실 후 청소 시간 10분이후 입실이 가능하므로 -1
  book_time.forEach((v) => {
    rooms[calTime(v[0])] += 1;
    rooms[calTime(v[1]) + 10] += -1;
  });

  // 부분합, 누적합을 통해 최대값을 추출
  for (let i = 1; i < MAX_TIME; i++) {
    rooms[i] += rooms[i - 1];
    answer = Math.max(answer, rooms[i]);
  }

  return answer;
}

function calTime(time) {
  const splitTime = time.split(':');
  const hour = splitTime[0];
  const miniutes = splitTime[1];

  return parseInt(hour) * 60 + parseInt(miniutes);
}
```
