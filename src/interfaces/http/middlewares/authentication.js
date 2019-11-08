const { createContainer } = require('awilix');

const container = createContainer();

const authentication = async resolve => {
  const userService = container.resolve('userService');
  const unprotectedActions = ['login'];

  // if (
  //   unprotectedActions.includes(info.fieldName) ||
  //   (info.parentType.name !== 'Query' && info.parentType.name !== 'Mutation')
  // ) {
  //   return resolve(root, args, context, info);
  // }

  let payload = null;
  const { getUserFromToken, getUserByField } = operations;
  if (process.env.NODE_ENV === 'test') {
    payload = await getUserByField.execute('email', 'test@gmail.com');
  } else {
    // const accessToken = (context.request.get('authorization') || '').substr(7);
    const accessToken = '';
    payload = await getUserFromToken.execute(accessToken);
  }
  userService.setUser(payload);

  const result = await resolve({ user: payload });
  return result;
};

module.exports = authentication;
