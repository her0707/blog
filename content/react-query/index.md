---
emoji:
title: React Query
date: '2023-02-03 16:18:00'
author: 허원호
tags: react, graphql, javascript
categories: 블로그
---

# React Query

# 살펴보기

- React 앱에서 비동기 로직을 쉽게 다루게 해주는 라이브러리
- Server State를 관리

## Server State

- Client에서 제어하거나 소유되지 않은 원격의 공간에서 관리되고 유지됨
- Fetching이나 Updating에 비동기 API가 필요함
- 다른 사람들과 공유되는 것으로 사용자가 모르는 사이에 변경될 수 있음
- 신경 쓰지 않는다면 잠재적으로 "out of date"가 될 가능성을 지님

# 라이프사이클

- fresh(데이터가 프레시한 상태) : 새롭게 추가된 쿼리 인스턴스 → active 상태의 시작, 기본 staleTime이 0이기 때문에 아무것도 설정을 안해주면 호출이 끝나고 바로 stale 상태로 변한다. staleTime을 늘려줄 경우 fresh한 상태가 유지되는데, 이때는 쿼리가 다시 마운트되도 패칭이 발생하지 않고 기존의 fresh한 값을 반환한다.
  - staleTime: 데이터가 fresh 상태에서 stale로 변경되는데 걸리는 시간
- fetching(데이터 요청 상태) : 요청을 수행하는 중인 쿼리
- stale(데이터가 만료된 상태) : 인스턴스가 존재하지만 이미 패칭이 완료된 쿼리. 특정 쿼리가 stale된 상태에서 같은 쿼리 마운트를 시도한다면 캐싱된 데이터를 반환하면서 리패칭을 시도한다.
- inactive(사용하지 않는 상태) : active 인스턴스가 하나도 없는 쿼리. inactive된 이후에도 cacheTime 동안 캐시된 데이터가 유지된다. cacheTime이 지나면 캐시에서 제거 된다
  - cacheTime: 데이터가 inactive 상태일 때 캐싱된 상태로 남아있는 시간
- delete (캐시에서 제거된 상태)

## 리패칭이 일어나는 경우

1. 런타임에 stale인 특정 쿼리 인스턴스가 다시 만들어졌을 때
2. window가 다시 포커스 되었을 때 (옵션을 통해 비활성화 가능)
3. 네트워크가 다시 연결되었을 때 (옵션을 통해 비활성화 가능)
4. refetch interval이 있을때 : 요청 실패한 쿼리는 디폴트 값으로 3번 더 백그라운드 에서 호출되며 retry, retryDelay 옵션으로 간격과 횟수를 변경 가능

# 가이드

- 리액트 앱 최상단인 App.js에 Context Provider로 하위 컴포넌트를 감싸고 queryClient 를 넘겨줌
  → 이 Context 가 비동기 요청을 알아서 처리하는 background 계층이 됨

```jsx
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {*/ ...Components */}
    </QueryClientProvider>
  )
}
```

## Queries

```jsx
function Todos() {
   const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)

   if (isLoading) {
     return <span>Loading...</span>
   }

   if (isError) {
     return <span>Error: {error.message}</span>
   }

   // We can assume by this point that `isSuccess === true`
   return (
     <ul>
       {data.map(todo => (
         <li key={todo.id}>{todo.title}</li>
       ))}
     </ul>
   )
```

- 쿼리는 Promise를 리턴하는 함수와 unique key로 구성되어짐
- 결과 객체 종류
  - isLoading 또는 status === ‘loading’
    - 쿼리에 데이터가 없고 현재 가져오는 중
  - isError 또는 status === ‘error’
    - 쿼리에 오류가 발생
  - isSuccess 또는 status === ‘success’
    - 쿼리가 성공했고 데이터를 사용할 수 있음
  - isIdle 또는 status === ‘idle’
    - 쿼리가 현재 비활성화 된 상태
  - error - 쿼리가 isError 상태인 경우 error를 통해 오류 발생
  - data - 쿼리가 success 상태인 경우 data를 통해 데이터 사용가능
- 주요 쿼리 옵션
  - enabled - true 값으로 설정할 시 자동으로 쿼리 함수가 요청되지 않음
  ```jsx
  // !!Username 값이 true 일 경우에만 쿼리 실행
  const { data } = useQuery('getBusinessUserData', getBusinessUser, { enabled: !!Username });
  ```
  - keepPreviousData - 쿼리 키에 페이지 정보를 포함하였을 때 쿼리 키가 변경되었더라도 새 데이터가 요청되는 동안 마지막으로 성공적으로 가져온 데이터를 사용할 수 있음

### Query keys

```jsx
useQuery(['todo', 5, { preview: true }], ...)
// queryKey === ['todo', 5, { preview: true }]
```

- 문자열 - 구별되는 문자열로 키를 줄 수 있음. 인자가 하나인 배열로 convert됨
- 배열 - 문자열과 함께 숫자를 주면 같은 문자열로 같은 key를 쓰면서도 id로도 구별이 가능함
- 쿼리 기능이 변수에 의존하는경우 쿼리 키에 포함됨

```jsx
function Todos({ todoId }) {
  const result = useQuery(['todos', todoId], () => fetchTodoById(todoId));
}
```

### Query Functions

- 쿼리 함수는 Promise를 리턴하는 함수의 형태를 가짐

```jsx
useQuery(['todos'], fetchAllTodos);

useQuery(['todos', todoId], () => fetchTodoById(todoId));

useQuery(['todos', todoId], async () => {
  const data = await fetchTodoById(todoId);
  return data;
});

useQuery(['todos', todoId], ({ queryKey }) => fetchTodoById(queryKey[1]));
```

- 에러 처리 시

```jsx
const { error } = useQuery(['todos', todoId], async () => {
  if (somethingGoesWrong) {
    throw new Error('Oh no!'); // 무조건 throw를 통해 예외처리
    // axios 와 graphql-request는 자동으로 error를 throw 하지만 해당 코드는 직접 수행해주어야함
  }

  return data;
});
```

### Query getData

- APP 최상단의 Provider를 통해 Context API 와 유사한 형태로 상태에 접근가능
- getQueryClient 에 unique key를 전달하면 해당 key로 생성된 쿼리데이터를 로드 가능함

```jsx
//
function usePosts() {
  return useQuery('posts', async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
  });
}

function Posts({ setPostId }) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      <Post></Post>
      ...
    </div>
  );
}

//
function usePost(postId) {
  return useQuery(['post', postId], () => getPostById(postId), {
    enabled: !!postId,
  });
}

function Post({ postId, setPostId }) {
  const { status, data, error, isFetching } = usePost(postId);
  const queryClient = useQueryClient();
  console.log(queryClient.getQueryData(['posts']));
  // 타 컴포넌트에서 요청된 쿼리도 getQueryData를 통해 접근가능

  return <div>...</div>;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

### Parallel Queries

- 쿼리가 여러개 선언되어있는 상황이면 쿼리함수는 병렬로 요청되어 처리됨
- 수동 병렬 쿼리

```jsx
function App () {
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
 }
```

- 동적 병렬 쿼리

```jsx
function App({ users }) {
  const userQueries = useQueries(
    // 렌더링이 계속 되는 사이에 계속 쿼리가 수행되어야할 경우 사용
    users.map((user) => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      };
    }),
  );
}
```

## Mutations

- useQuery 와는 다르게 create, update, delete 동작을 수행하며 Server State에 사이드 이펙트를 발생시키는 경우에 사용

```jsx
const formMutation = useMutation({
  mutationFn: (data) =>
    customAxios.createBusinessUser(TypedJSON.stringify(data, BusinessUser), {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  onSuccess: (data, variables, context) => {
    console.log(data);
    router.push('/');
  },
  onError: (error, variables, context) => {
    // 에러 발생
  },
  onSettled: (data, error, variables, context) => {
    // 요청이 완료되었을 때 (성공, 실패 여부 무관)
  },
});
```

### mutation을 통해 서버에 새로운 데이터가 추가되었을 경우

```jsx
const queryClient = useQueryClient();

const mutation = useMutation(editTodo, {
  onSuccess: (data) => queryClient.setQueryData(['todo', { id: 5 }], data),
});

mutation.mutate({
  id: 5,
  name: 'Do the laundry',
});

// 뮤테이션의 response 값으로 업데이트된 data를 사용할 수 있다.
const { status, data, error } = useQuery(['todo', { id: 5 }], fetchTodoByID);
```

## Invalidation

- 쿼리의 데이터가 요청을 통해 서버에서 변경되었다면 클라이언트에서 보유하고있는 데이터는 과거의 데이터가되어 쓸모가 없어짐
- invalidateQueries 메서드를 사용하여 쿼리를 즉시 stale 처리 후 리패칭 동작을 시도
- 쿼리등록 시 특정 키가 공통적으로 적용되어있다면 한번에 invalidation이 가능
- mutation이 발생하여 성공한다면 mutation 내부에서 쿼리를 invalidate 처리해주는 것이 좋음

```jsx
// 캐시가 있는 모든 쿼리들을 invalidate한다.
queryClient.invalidateQueries();

// 'todos'로 시작하는 모든 쿼리들을 invalidate한다.
queryClient.invalidateQueries('todos');

queryClient.invalidateQueries({
  predicate: (query) => query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,
});
```

# GraphQL

- React Query 에서는 Apollo Client 와 같이 GraphQL 기반 클라이언트가 내장되어있지는 않아 별도의 GraphQL 클라이언트 라이브러리를 사용함.
- React Query 예제에서는 [GraphQL-Request](https://github.com/prisma-labs/graphql-request) 라는 라이브러리를 사용함

## [GraphQL Request](https://github.com/prisma-labs/graphql-request)

- 가장 간단하고 가벼운 GraphQL 클라이언트
- Promise 기반
- React Query에서 사용할 경우 요청할 함수만 형태만 만들어 React Query Hook의 Promise 를 리턴하는 함수 자리에 인자로 넘겨주면 됨

```jsx
import { request, gql } from "graphql-request";

function usePosts() {
  return useQuery("posts", async () => {
    const {
      posts: { data },
    } = await request(
      endpoint,
      gql`
        query {
          posts {
            data {
              id
              title
            }
          }
        }
      `
    );
    return data;
  });
}

function Post({ postId, setPostId }) {
  const { status, data, error, isFetching } = usePost(postId);
	...
}
```

## Vue-Apollo 와 비교

- Vue 2

  - 기본적으로는 vue-apollo, graphql, apollo-boost 라이브러리를 기반으로 Vue 에서 apollo를 사용할 수 있도록 설정

  ```jsx
  import ApolloClient from 'apollo-boost';
  import VueApollo from 'vue-apollo';

  const apolloClient = new ApolloClient({
    // You should use an absolute URL here
    uri: 'http://localhost:4000',
  });

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  });

  new Vue({
    apolloProvider,
    render: (h) => h(App),
  }).$mount('#app');
  ```

  - **Queries** (vue-apollo를 통해 함수 호출 절차 없이도 자동으로 Query를 통해 요청함)

    ```jsx
    @Component({
      apollo: {
        userList: useUserListQuery(), // graphQL codegen읉 통해 generate 된 함수
      },
    })
    ```

    - Components

      ```jsx
      <ApolloQuery
            :query="gql => gql`
              query MyHelloQuery ($name: String!) {
                hello (name: $name)
              }
            `"
            :variables="{ name }"
          >
            <template v-slot="{ result: { loading, error, data } }">
              <!-- Loading -->
              <div v-if="loading" class="loading apollo">Loading...</div>

              <!-- Error -->
              <div v-else-if="error" class="error apollo">An error occurred</div>

              <!-- Result -->
              <div v-else-if="data" class="result apollo">{{ data.hello }}</div>

              <!-- No result -->
              <div v-else class="no-result apollo">No result :(</div>
            </template>
          </ApolloQuery>
      ```

  - **Mutations**

    ```jsx
    methods: {
      async addTag() {
        // Call to the graphql mutation
        const result = await this.$apollo.mutate({
    			// $apollo로 선언된 vue apollo 객체를 호출하여 사용
          // Query
          mutation: gql`mutation ($label: String!) {
            addTag(label: $label) {
              id
              label
            }
          }`,
    			// gql 문법은 graphQL codegen으로 대체 가능

          // Parameters
          variables: {
            label: this.newTag,
          },
        })
      }
    }
    ```

    - Components
      ```jsx
      <ApolloMutation
        :mutation="gql => gql`
          mutation DoStuff ($name: String!) {
            someWork (name: $name) {
              success
              timeSpent
            }
          }
        `"
        :variables="{
          name
        }"
        @done="onDone"
      >
        <template v-slot="{ mutate, loading, error }">
          <button :disabled="loading" @click="mutate()">Click me</button>
          <p v-if="error">An error occurred: {{ error }}</p>
        </template>
      </ApolloMutation>
      ```

- Vue 3
