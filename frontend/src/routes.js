const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'data'].join('/'),
};
