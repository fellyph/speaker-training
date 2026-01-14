import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'speaker-training',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getPresentationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPresentation', inputVars);
}
getPresentationRef.operationName = 'GetPresentation';

export function getPresentation(dcOrVars, vars) {
  return executeQuery(getPresentationRef(dcOrVars, vars));
}

export const createPracticeSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePracticeSession', inputVars);
}
createPracticeSessionRef.operationName = 'CreatePracticeSession';

export function createPracticeSession(dcOrVars, vars) {
  return executeMutation(createPracticeSessionRef(dcOrVars, vars));
}

export const listPracticeSessionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPracticeSessions');
}
listPracticeSessionsRef.operationName = 'ListPracticeSessions';

export function listPracticeSessions(dc) {
  return executeQuery(listPracticeSessionsRef(dc));
}

