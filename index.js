/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (privateProps, originalArray) => {
  return privateProps.reduce((newArray, prop) => {
    return newArray.map((el) => {
      if (el.hasOwnProperty(prop)) {
        delete el[prop];
      }
      return el;
    });
  }, originalArray);
};

exports.excludeByProperty = (excludedProp, originalArray) => {
  return originalArray.filter((obj) => !obj.hasOwnProperty(excludedProp));
};

exports.sumDeep = (originalArray) => {
  return originalArray.map(({ objects }) => ({
    objects: objects.reduce((sum, { val }) => sum + val, 0),
  }));
};

exports.applyStatusColor = (colors, statuses) => {
  const statusColors = Object.entries(colors).reduce(
    (returnedStatusColors, [color, statuses]) => {
      const statusColors = statuses.reduce((statusColorObj, status) => {
        statusColorObj[status] = color;
        return statusColorObj;
      }, {});

      return { ...returnedStatusColors, ...statusColors };
    },
    {}
  );

  const validStatuses = statuses.filter((obj) => statusColors[obj.status]);

  return validStatuses.map((obj) => ({
    ...obj,
    color: statusColors[obj.status],
  }));
};

exports.createGreeting = (greet, msg) => (name) => greet(msg, name);

exports.setDefaults = (defaultProp) => (data) => ({
  ...defaultProp,
  ...data,
});

exports.fetchUserByNameAndUsersCompany = async (username, services) => {
  try {
    const { fetchCompanyById, fetchStatus, fetchUsers } = services;
    const [status, users] = await Promise.all([fetchStatus(), fetchUsers()]);
    const currentUser = users.find((user) => user.name === username);
    const company = await fetchCompanyById(currentUser.companyId);

    return {
      user: currentUser,
      company,
      status,
    };
  } catch (error) {
    throw error;
  }
};
