import { CreateUserData, CreateUserVariables, GetPresentationData, GetPresentationVariables, CreatePracticeSessionData, CreatePracticeSessionVariables, ListPracticeSessionsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetPresentation(vars: GetPresentationVariables, options?: useDataConnectQueryOptions<GetPresentationData>): UseDataConnectQueryResult<GetPresentationData, GetPresentationVariables>;
export function useGetPresentation(dc: DataConnect, vars: GetPresentationVariables, options?: useDataConnectQueryOptions<GetPresentationData>): UseDataConnectQueryResult<GetPresentationData, GetPresentationVariables>;

export function useCreatePracticeSession(options?: useDataConnectMutationOptions<CreatePracticeSessionData, FirebaseError, CreatePracticeSessionVariables>): UseDataConnectMutationResult<CreatePracticeSessionData, CreatePracticeSessionVariables>;
export function useCreatePracticeSession(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePracticeSessionData, FirebaseError, CreatePracticeSessionVariables>): UseDataConnectMutationResult<CreatePracticeSessionData, CreatePracticeSessionVariables>;

export function useListPracticeSessions(options?: useDataConnectQueryOptions<ListPracticeSessionsData>): UseDataConnectQueryResult<ListPracticeSessionsData, undefined>;
export function useListPracticeSessions(dc: DataConnect, options?: useDataConnectQueryOptions<ListPracticeSessionsData>): UseDataConnectQueryResult<ListPracticeSessionsData, undefined>;
