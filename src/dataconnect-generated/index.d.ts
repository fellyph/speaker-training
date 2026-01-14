import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreatePracticeSessionData {
  practiceSession_insert: PracticeSession_Key;
}

export interface CreatePracticeSessionVariables {
  presentationId: UUIDString;
  spokenText: string;
  sessionDate: DateString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
}

export interface Evaluation_Key {
  id: UUIDString;
  __typename?: 'Evaluation_Key';
}

export interface GetPresentationData {
  presentation?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    originalScript: string;
    targetLanguage: string;
  } & Presentation_Key;
}

export interface GetPresentationVariables {
  id: UUIDString;
}

export interface ListPracticeSessionsData {
  practiceSessions: ({
    id: UUIDString;
    presentation: {
      title: string;
    };
      sessionDate: DateString;
  } & PracticeSession_Key)[];
}

export interface PracticeSession_Key {
  id: UUIDString;
  __typename?: 'PracticeSession_Key';
}

export interface Presentation_Key {
  id: UUIDString;
  __typename?: 'Presentation_Key';
}

export interface Translation_Key {
  id: UUIDString;
  __typename?: 'Translation_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetPresentationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPresentationVariables): QueryRef<GetPresentationData, GetPresentationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPresentationVariables): QueryRef<GetPresentationData, GetPresentationVariables>;
  operationName: string;
}
export const getPresentationRef: GetPresentationRef;

export function getPresentation(vars: GetPresentationVariables): QueryPromise<GetPresentationData, GetPresentationVariables>;
export function getPresentation(dc: DataConnect, vars: GetPresentationVariables): QueryPromise<GetPresentationData, GetPresentationVariables>;

interface CreatePracticeSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePracticeSessionVariables): MutationRef<CreatePracticeSessionData, CreatePracticeSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePracticeSessionVariables): MutationRef<CreatePracticeSessionData, CreatePracticeSessionVariables>;
  operationName: string;
}
export const createPracticeSessionRef: CreatePracticeSessionRef;

export function createPracticeSession(vars: CreatePracticeSessionVariables): MutationPromise<CreatePracticeSessionData, CreatePracticeSessionVariables>;
export function createPracticeSession(dc: DataConnect, vars: CreatePracticeSessionVariables): MutationPromise<CreatePracticeSessionData, CreatePracticeSessionVariables>;

interface ListPracticeSessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPracticeSessionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPracticeSessionsData, undefined>;
  operationName: string;
}
export const listPracticeSessionsRef: ListPracticeSessionsRef;

export function listPracticeSessions(): QueryPromise<ListPracticeSessionsData, undefined>;
export function listPracticeSessions(dc: DataConnect): QueryPromise<ListPracticeSessionsData, undefined>;

