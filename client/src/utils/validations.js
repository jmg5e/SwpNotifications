/* eslint-disable no-useless-escape */

export const isRequired = (value) => {
  if (value === null || typeof value === 'undefined') {
    return 'Required.';
  }
  if (typeof value === 'string' && value.trim().length === 0) return 'Required.';

  if (Array.isArray(value) && value.length === 0) {
    return 'Required.';
  }
  return null;
};

export const isNullOrValidUrl = (value) => {
  if (value.trim() === '') return null;
  const rUrl = /^(https?|http):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
  const isValid = rUrl.test(value);
  // const isValid = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/.test(value);
  return isValid ? null : 'Invalid Url.';
};

export const minLength = length => (value) => {
  if (typeof value === 'string') {
    const isValid = value.length >= length;
    return isValid ? null : `Minimum Length of ${length} Required.`;
  }
  return null;
};

export const maxLength = length => (value) => {
  if (typeof value === 'string') {
    const isValid = value.length <= length;
    return isValid ? null : `Exceeded Character Length: ${length}`;
  }
  return null;
};

/* allValues keys are field ids */
export const matchesPassword = (value, allValues) => (value !== allValues.password ? 'Passwords do not match.' : null);
