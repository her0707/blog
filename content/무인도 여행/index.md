---
emoji:
title: 프로그래머스 코딩테스트 - 무인도 여행
date: '2023-02-10 00:13:00'
author: 허원호
tags: javascript, 코딩 테스트
categories: 코딩테스트
---

# 레벨2

## 풀이

```javascript
function solution(maps) {
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  const nestArray = maps.map((v) => v.split(''));
  const answer = [];

  const [row, col] = [nestArray.length, nestArray[0].length];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (nestArray[i][j] == 'X') continue;

      let value = +nestArray[i][j];

      nestArray[i][j] = 'X';

      const queue = [[i, j]];

      while (queue.length !== 0) {
        let [r, c] = queue.pop();

        for (let k = 0; k < 4; k++) {
          let kr = r + dr[k];
          let kc = c + dc[k];

          if (kr >= 0 && kr < row && kc >= 0 && kc < col && nestArray[kr][kc] !== 'X') {
            let nv = nestArray[kr][kc];
            nestArray[kr][kc] = 'X';

            value += Number(nv);

            queue.push([kr, kc]);
          }
        }
      }

      answer.push(value);
    }
  }
  if (answer.length === 0) return [-1];

  answer.sort((a, b) => a - b);

  return answer;
}
```
