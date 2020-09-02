//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {DeviceEventEmitter} from 'react-native';
import {AppSecurityModule} from './custom-native-modules';
import {isEmptyString, isNullUndefined} from '../util/util';
import {notificationCallback} from '../shared-components-and-modules/notification-center/notifications-controller';
import {showToast} from '../util/react-native-based-utils';

/**
 *
 * @param passwordText
 * @param userCredentials
 * @param notificationAlert
 * @param callbackResListener
 * @returns {Promise<*>}
 */
export async function createPasswordHash(passwordText, userCredentials, notificationAlert, callbackResListener) {

  console.log('createPasswordHash');

  await AppSecurityModule.createPasswordHash(passwordText,
      (response) => createPasswordHashCallback(response, userCredentials, notificationAlert, callbackResListener));

  return userCredentials;

}

export function createPasswordHashCallback(resp, userCredentials, notificationAlert, callbackResListener) {

  console.log('createPasswordHashCallback');
  console.log('RES', resp);

  if (isNullUndefined(resp)) {
    callbackResListener.done = true;
    notificationCallback(
        'err',
        'Cannot perform password hash',
        notificationAlert,
    );
    return;
  }

  if (resp.message === 'SUCCESS') {

    showToast('Password hashed');

    userCredentials.password_hash = resp.passwordHash;
    userCredentials.salt = resp.passwordSalt;

    callbackResListener.done = true;

  } else if (resp.message === 'FAILURE') {

    callbackResListener.done = true;

    notificationCallback(
        'warn',
        'Password hash failed',
        notificationAlert,
    );

  }

}

export function validatePasswordWithHashAndSalt(passwordToValidate, hash, salt,
                                                notificationAlert, validatePasswordFeedback) {
  console.log('validatePasswordWithHashAndSalt');

  DeviceEventEmitter.addListener('password_validation_result',
      (eventResult) => validatePasswordWithHashAndSaltListener(eventResult, validatePasswordFeedback));

  AppSecurityModule.validatePasswordWithHashAndSalt(passwordToValidate, hash, salt,
      (message) => validatePasswordWithHashAndSaltCallback(message, notificationAlert, validatePasswordFeedback),
  );

}

export function validatePasswordWithHashAndSaltListener(eventResult, validatePasswordFeedback) {

  console.log('validatePasswordWithHashAndSaltListener');
  console.log('\neventResult, ', eventResult,
      '\nvalidatePassword, ', validatePasswordFeedback,
  );

  if (isEmptyString(eventResult['passwordValidationPassed'])) {
    showToast(`Validate Password Result Indeterminate`);
    validatePasswordFeedback.done = true;
    //and unregister listener
    DeviceEventEmitter.removeListener('password_validation_result');
  } else {
    if (eventResult['passwordValidationPassed'] === 'true') {
      showToast(`Correct password`);
      //and unregister listener
      DeviceEventEmitter.removeListener('password_validation_result');
      validatePasswordFeedback.isValidPassword = true;
    } else if (eventResult['passwordValidationPassed'] === 'false') {
      showToast(`Incorrect password`);
      //and unregister listener
      DeviceEventEmitter.removeListener('password_validation_result');
    } else {
      showToast(`Validate Password Result Unknown`);
      //and unregister listener
      DeviceEventEmitter.removeListener('password_validation_result');
    }
    validatePasswordFeedback.done = true;
  }

}

export function validatePasswordWithHashAndSaltCallback(message, notificationAlert, validatePasswordFeedback) {
  if (message === 'SUCCESS') {
    showToast(`Validate password process successful`);
    // validatePasswordFeedback.done = true;
  } else if (message === 'FAILURE') {
    showToast(`Password validation process failed`);
    DeviceEventEmitter.removeListener('password_validation_result', null);
    validatePasswordFeedback.done = true;
  } else {
    showToast(`Cannot perform password validation`);
    DeviceEventEmitter.removeListener('password_validation_result', null);
    validatePasswordFeedback.done = true;
  }
}
