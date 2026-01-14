# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetPresentation*](#getpresentation)
  - [*ListPracticeSessions*](#listpracticesessions)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreatePracticeSession*](#createpracticesession)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetPresentation
You can execute the `GetPresentation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPresentation(vars: GetPresentationVariables): QueryPromise<GetPresentationData, GetPresentationVariables>;

interface GetPresentationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPresentationVariables): QueryRef<GetPresentationData, GetPresentationVariables>;
}
export const getPresentationRef: GetPresentationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPresentation(dc: DataConnect, vars: GetPresentationVariables): QueryPromise<GetPresentationData, GetPresentationVariables>;

interface GetPresentationRef {
  ...
  (dc: DataConnect, vars: GetPresentationVariables): QueryRef<GetPresentationData, GetPresentationVariables>;
}
export const getPresentationRef: GetPresentationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPresentationRef:
```typescript
const name = getPresentationRef.operationName;
console.log(name);
```

### Variables
The `GetPresentation` query requires an argument of type `GetPresentationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPresentationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPresentation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPresentationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPresentationData {
  presentation?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    originalScript: string;
    targetLanguage: string;
  } & Presentation_Key;
}
```
### Using `GetPresentation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPresentation, GetPresentationVariables } from '@dataconnect/generated';

// The `GetPresentation` query requires an argument of type `GetPresentationVariables`:
const getPresentationVars: GetPresentationVariables = {
  id: ..., 
};

// Call the `getPresentation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPresentation(getPresentationVars);
// Variables can be defined inline as well.
const { data } = await getPresentation({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPresentation(dataConnect, getPresentationVars);

console.log(data.presentation);

// Or, you can use the `Promise` API.
getPresentation(getPresentationVars).then((response) => {
  const data = response.data;
  console.log(data.presentation);
});
```

### Using `GetPresentation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPresentationRef, GetPresentationVariables } from '@dataconnect/generated';

// The `GetPresentation` query requires an argument of type `GetPresentationVariables`:
const getPresentationVars: GetPresentationVariables = {
  id: ..., 
};

// Call the `getPresentationRef()` function to get a reference to the query.
const ref = getPresentationRef(getPresentationVars);
// Variables can be defined inline as well.
const ref = getPresentationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPresentationRef(dataConnect, getPresentationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.presentation);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.presentation);
});
```

## ListPracticeSessions
You can execute the `ListPracticeSessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPracticeSessions(): QueryPromise<ListPracticeSessionsData, undefined>;

interface ListPracticeSessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPracticeSessionsData, undefined>;
}
export const listPracticeSessionsRef: ListPracticeSessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPracticeSessions(dc: DataConnect): QueryPromise<ListPracticeSessionsData, undefined>;

interface ListPracticeSessionsRef {
  ...
  (dc: DataConnect): QueryRef<ListPracticeSessionsData, undefined>;
}
export const listPracticeSessionsRef: ListPracticeSessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPracticeSessionsRef:
```typescript
const name = listPracticeSessionsRef.operationName;
console.log(name);
```

### Variables
The `ListPracticeSessions` query has no variables.
### Return Type
Recall that executing the `ListPracticeSessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPracticeSessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPracticeSessionsData {
  practiceSessions: ({
    id: UUIDString;
    presentation: {
      title: string;
    };
      sessionDate: DateString;
  } & PracticeSession_Key)[];
}
```
### Using `ListPracticeSessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPracticeSessions } from '@dataconnect/generated';


// Call the `listPracticeSessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPracticeSessions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPracticeSessions(dataConnect);

console.log(data.practiceSessions);

// Or, you can use the `Promise` API.
listPracticeSessions().then((response) => {
  const data = response.data;
  console.log(data.practiceSessions);
});
```

### Using `ListPracticeSessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPracticeSessionsRef } from '@dataconnect/generated';


// Call the `listPracticeSessionsRef()` function to get a reference to the query.
const ref = listPracticeSessionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPracticeSessionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.practiceSessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.practiceSessions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  displayName: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreatePracticeSession
You can execute the `CreatePracticeSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPracticeSession(vars: CreatePracticeSessionVariables): MutationPromise<CreatePracticeSessionData, CreatePracticeSessionVariables>;

interface CreatePracticeSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePracticeSessionVariables): MutationRef<CreatePracticeSessionData, CreatePracticeSessionVariables>;
}
export const createPracticeSessionRef: CreatePracticeSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPracticeSession(dc: DataConnect, vars: CreatePracticeSessionVariables): MutationPromise<CreatePracticeSessionData, CreatePracticeSessionVariables>;

interface CreatePracticeSessionRef {
  ...
  (dc: DataConnect, vars: CreatePracticeSessionVariables): MutationRef<CreatePracticeSessionData, CreatePracticeSessionVariables>;
}
export const createPracticeSessionRef: CreatePracticeSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPracticeSessionRef:
```typescript
const name = createPracticeSessionRef.operationName;
console.log(name);
```

### Variables
The `CreatePracticeSession` mutation requires an argument of type `CreatePracticeSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePracticeSessionVariables {
  presentationId: UUIDString;
  spokenText: string;
  sessionDate: DateString;
}
```
### Return Type
Recall that executing the `CreatePracticeSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePracticeSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePracticeSessionData {
  practiceSession_insert: PracticeSession_Key;
}
```
### Using `CreatePracticeSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPracticeSession, CreatePracticeSessionVariables } from '@dataconnect/generated';

// The `CreatePracticeSession` mutation requires an argument of type `CreatePracticeSessionVariables`:
const createPracticeSessionVars: CreatePracticeSessionVariables = {
  presentationId: ..., 
  spokenText: ..., 
  sessionDate: ..., 
};

// Call the `createPracticeSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPracticeSession(createPracticeSessionVars);
// Variables can be defined inline as well.
const { data } = await createPracticeSession({ presentationId: ..., spokenText: ..., sessionDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPracticeSession(dataConnect, createPracticeSessionVars);

console.log(data.practiceSession_insert);

// Or, you can use the `Promise` API.
createPracticeSession(createPracticeSessionVars).then((response) => {
  const data = response.data;
  console.log(data.practiceSession_insert);
});
```

### Using `CreatePracticeSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPracticeSessionRef, CreatePracticeSessionVariables } from '@dataconnect/generated';

// The `CreatePracticeSession` mutation requires an argument of type `CreatePracticeSessionVariables`:
const createPracticeSessionVars: CreatePracticeSessionVariables = {
  presentationId: ..., 
  spokenText: ..., 
  sessionDate: ..., 
};

// Call the `createPracticeSessionRef()` function to get a reference to the mutation.
const ref = createPracticeSessionRef(createPracticeSessionVars);
// Variables can be defined inline as well.
const ref = createPracticeSessionRef({ presentationId: ..., spokenText: ..., sessionDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPracticeSessionRef(dataConnect, createPracticeSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.practiceSession_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.practiceSession_insert);
});
```

