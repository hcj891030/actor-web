/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import { dispatch, dispatchAsync } from '../dispatcher/ActorAppDispatcher';
import { ActionTypes, CallTypes } from '../constants/ActorAppConstants';
import ActorClient from '../utils/ActorClient';

import ActionCreators from './ActionCreators';

class CallActionCreators extends ActionCreators {
  hide() {
    dispatch(ActionTypes.CALL_MODAL_HIDE);
  }

  handleCall(event) {
    const { id, type } = event;
    switch (type) {
      case CallTypes.STARTED:
        this.setBindings('call', [
          ActorClient.bindCall(id, this.setCall)
        ]);
        dispatch(ActionTypes.CALL_MODAL_OPEN, { id });
        break;
      case CallTypes.ENDED:
        this.removeBindings('call');
        dispatch(ActionTypes.CALL_MODAL_HIDE)
        break;
    }
  }

  makeCall(peerId) {
    dispatchAsync(ActorClient.makeCall(peerId), {
      request: ActionTypes.CALL,
      success: ActionTypes.CALL_SUCCESS,
      failure: ActionTypes.CALL_ERROR
    }, { peerId });
  }

  makeGroupCall(peerId) {
    dispatchAsync(ActorClient.makeGroupCall(peerId), {
      request: ActionTypes.CALL,
      success: ActionTypes.CALL_SUCCESS,
      failure: ActionTypes.CALL_ERROR
    }, { peerId });
  }

  setCall(call) {
    dispatch(ActionTypes.CALL_CHANGED, { call });
  }

  answerCall(callId) {
    ActorClient.answerCall(callId);
    dispatch(ActionTypes.CALL_ANSWER, { callId })
  }

  endCall(callId) {
    ActorClient.endCall(callId);
    dispatch(ActionTypes.CALL_END, { callId })
  }

  toggleCallMute(callId) {
    ActorClient.toggleCallMute(callId);
    dispatch(ActionTypes.CALL_MUTE_TOGGLE, { callId })
  }

  toggleFloating() {
    dispatch(ActionTypes.CALL_FLOAT_TOGGLE)
  }
}

export default new CallActionCreators();
