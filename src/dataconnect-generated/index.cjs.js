const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'speaker-training',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getPresentationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPresentation', inputVars);
}
getPresentationRef.operationName = 'GetPresentation';
exports.getPresentationRef = getPresentationRef;

exports.getPresentation = function getPresentation(dcOrVars, vars) {
  return executeQuery(getPresentationRef(dcOrVars, vars));
};

const createPracticeSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePracticeSession', inputVars);
}
createPracticeSessionRef.operationName = 'CreatePracticeSession';
exports.createPracticeSessionRef = createPracticeSessionRef;

exports.createPracticeSession = function createPracticeSession(dcOrVars, vars) {
  return executeMutation(createPracticeSessionRef(dcOrVars, vars));
};

const listPracticeSessionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPracticeSessions');
}
listPracticeSessionsRef.operationName = 'ListPracticeSessions';
exports.listPracticeSessionsRef = listPracticeSessionsRef;

exports.listPracticeSessions = function listPracticeSessions(dc) {
  return executeQuery(listPracticeSessionsRef(dc));
};
