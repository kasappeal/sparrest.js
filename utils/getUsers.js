const getUsers = () => {
  try {
    const db = getDB();
    return Array.isArray(db.users) ? db.users : [];
  } catch (err) {
    console.error('Error while retrieving users', err);
    return [];
  }
};

module.exports = getUsers;
