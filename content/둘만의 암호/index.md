---
emoji:
title: 프로그래머스 코딩테스트 - 둘만의 암호
date: '2023-02-04 16:18:00'
author: 허원호
tags: javascript, 코딩 테스트
categories: 코딩테스트
---

# 레벨 1

## 풀이

```javascript
function solution(s, skip, index) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const arrayS = s.split('');

  // skip 알파벳 필터
  const filterAlphabet = alphabet.filter((v) => !skip.includes(v));
  // index 만큼 더할 경우에 z 를 넘었을 경우를 대비하여 3번 반복
  const loopArray = [...filterAlphabet, ...filterAlphabet, ...filterAlphabet];
  // index 만큼 더한 s 의 index 배열에서 해당 index의 알파벳을 찾음
  return arrayS
    .map((v) => {
      return loopArray.findIndex((val) => val === v) + index;
    })
    .map((v) => loopArray[v])
    .join('');
}
```
