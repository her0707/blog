---
emoji:
title: Casl.js
date: '2023-02-02 16:18:00'
author: 허원호
tags: javascript, casl
categories: 블로그
---

# CASL.js

# 소개

- 지정된 클라이언트가 액세스할 수 있는 리소스를 제한하는 JavaScript 동형 인증 라이브러리

1. User Action
   - 사용자가 APP에서 실제로 수행할 수 있는 작업을 설명, 비즈니스 로직에 따라 단어로 정의(일반적으로는 동사) (ex. prolong, CRUD 형식인 create, read, update, delete)
2. Subject
   - 사용자 작업을 확인하려는 제목 또는 제목의 유형, 일반적으로 비즈니스 또는 도메인 entity
     (ex. design, item, company)
3. Fields
   - 일치하는 Subject's fields 로만 사용자 작업을 제한하는 데 사용할 수 있습니다.
     (ex. status field를 업데이트 할 수 있도록 허용하고 description 또는 title의 경우 업데이트를 허용하지 않을 수 있습니다.)
4. Conditions
   - 일치하는 subject에만 사용자 작업을 제한하는 조건 기준입니다. 특정 subject에 대한 권한을 부여해야 할 때 유용하게 사용
     (ex. 사용자가 자신의 Design을 관리하도록 허용)

# 규칙 정의

- defineAbility

  - can, cannot 인자를 넘겨줌
    - can, cannot Parameter
      - `action: string | string[]`
      - `subjectType: string | Function`
      - `fields: string[]`
      - `conditions: Conditions`

  ```jsx
  import { defineAbility } from '@casl/ability';

  export default defineAbility((can, cannot) => {
    can('read', 'Post');
    cannot('delete', 'Post', { published: true });
  });
  ```

  - 주 사용처
    - 유닛 테스트
    - 예제 및 학습 자료
    - 간단한 어플리케이션 이나 프로토타입

- AbilityBuilder Class

  ```jsx
  import { AbilityBuilder, Ability } from '@casl/ability';

  const { can, cannot, build } = new AbilityBuilder(Ability);

  can('read', 'Post');
  cannot('delete', 'Post', { published: true });

  export default build();
  ```

  - 주 사용처

    - 정적 권한이 있는 어플리케이션
    - 현재 AbilityBuilder를 사용하여 리뉴얼 프로젝트에 권한 설정함

      ```jsx
      import { AbilityBuilder, Ability } from '@casl/ability';
      import { forEach } from 'lodash-es';

      export default function defineRulesFor(user) {
        const { can, cannot, rules } = new AbilityBuilder(Ability);

        forEach(user.roles, (role) => {
          switch (role.rolename) {
            case '운영자':
              can('manage', 'all');
              break;
            case '관리자':
              can('manage', [
                'Auth',
                'simest',
                'customer',
                'user',
                'design',
                'company',
                'employee',
                'item',
              ]);
              can('read', ['charge']);
              break;
            case '견적자':
              can('manage', ['Auth', 'customer', 'user']); // 배열형태로 동시에 적용가능
              can(['create', 'read', 'update', 'delete'], 'design');
              can('read', ['company']);
              break;
            case '고객':
              can('manage', ['Auth', 'user']);
              cannot('manage', 'all');
              break;
            default:
              can('read', 'Auth');
              cannot('manage', 'all');
          }
        });
        return rules;
      }
      ```

# Vue에서 활용(Vue 3.x)

- npm install @casl/vue @casl/ability
- main.js에 import 시 Vue component 내 에서도 전역으로 호출 가능

```jsx
import ability from './config/ability';
import { abilitiesPlugin } from '@casl/vue';

Vue.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
});
```

```jsx
<template>
  <div v-if="$can('create', 'all')" class="card modify-container"></div>
</template>
```

- 리뉴얼 프로젝트 적용 예

  ```jsx
  <template v-if="design">
  	<DesignDeletePopupComponent
      v-if="$can('manage', 'design') || ($can('delete', 'design') && design.creator === userData.username)"
      :id="id"
      :access-type="accessType"
      :company-id="companyId"
      :design="design"
     />
    <dx-button
      :disabled="!$can('manage', 'design') && !($can('update','design') && design.creator === userData.username)"
  	  class="content-header-button-apply"
      text="저장"
      type="default"
      @click="save()"
     />
   </template>
  ```

  - 전문설계영역에서 견적자의 경우 견적자 회원 자신이 생성한 설계내역만 삭제 및 수정이 가능하기 때문에 추가로 로그인한 유저의 username과 설계자의 아이디를 비교하여 권한 체크
  - 자신의 생성한 데이터에 대한 수정 및 삭제 등의 접근에 있어 Casl에서 지원하는 conditions를 통하여 추가적인 조건문 없이 사용이 가능하지만 entity 형태의 데이터(Javascript Class)만 해당 condition을 활용할 수 있는 것으로 확인 (권한부여한 subject 명과 생성한 클래스명이 동일해야만 정상작동함)

    ```jsx
    // 권한 설정 시
    can(["create", "read", "update", "delete"], "design", { creator: "user.username" });

    // 클래스 생성
    class design {
      constructor(creator) {
        this.creator = creator;
      }
    }

    // 설정 시 선언한 subject 명과 동일한 클래스에 condition에서 설정한 creator 필드에 값을 넘겨줘야만 정상적으로 동작
    <button v-if="$can("update", new design(design.creator)"></button>
    ```

## Can Component

- Can Component import 시 Component로 특정 element 및 component에 권한 지정가능

```jsx
import ability from './config/ability';
import { Can, abilitiesPlugin } from '@casl/vue';

Vue.use(abilitiesPlugin, ability);
Vue.component(Can.name, Can);
```

```jsx
<template>
  <Can I="create" a="Post">
    <a @click="createPost">Add Post</a>
  </Can>
</template>
```

- Can component의 경우 5개의 property 사용가능
  - do - action의 이름 (ex. read, update) alias: I
  - on - subject 체크 alias: a, an, this
  - field - field 체크
  - not - 사용자가 어떤 action을 수행할 수 없는 경우 ability 체크를 반전하고 UI 표기
  - passThrough - 사용자의 권한에 따라 특정 element를 비활성화 해야하는 경우 등에 사용

```jsx
export default [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth', // beforeEach에서 라우팅 이전 권한체크 ability에 subject에 해당
      action: 'read', // beforeEach에서 라우팅 이전 권한체크 ability에 action에 해당
    },
  },
  {
    path: '/not-authorized',
    name: 'not-authorized',
    component: () => import('@/views/error/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
];
```

- router/index.js

```jsx
router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn();
  if (!canNavigate(to)) {
    /* canNavigate 함수를 통해 route에 선언된 meta내의 action, resource 값을 통해 권한 부여
 가능여부를 체크 */
    // 미 로그인 시 로그인 페이지로
    if (!isLoggedIn) return next({ name: 'auth-login' });
    // 권한 없을 시 not-authorized 페이지로 이동
    return next({ name: 'not-authorized' });
  }

  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData();
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null));
  }

  return next();
});
```

# (작성중) React 에서의 활용

- [Document](https://casl.js.org/v5/en/package/casl-react)
- 설치
  ```tsx
  npm install @casl/react @casl/ability
  # or
  yarn add @casl/react @casl/ability
  ```
- (작성중) 사용
  - provider 로 컴포넌트 감싸기
    - AbilityContext.Provider
    - value에 ability 인스턴스 넘겨주기
- (작성중) 자재플랫폼 적용
  - \_app.tsx
    - provider
    - ~~ability 인스턴스 생성하여 layout 컴포넌트에 전달~~
    - 유저정보를 받는 시점을 어디에서 할지..? ← 변경될 가능성
      - 현재는 Layout 컴포넌트에서 인스턴스 재할당
        - 이때 permissions에서 정의한 규칙 사용
  - permissions.ts
    - AbilityBuilder 를 사용하여 역할별 권한 부여
  - layout
    - layout의 자식컴포넌트인 navbar 와 sidebar에 인스턴스를 전달
    - 전달받은 인스턴스를 사용하여 사이드바 노출 제어
    - (작업필요) 라우트 처리?
