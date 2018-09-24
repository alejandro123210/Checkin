import Realm from 'realm';
const USER_SCHEMA = 'user';


//THIS WHOLE FILE SHOULD NOT BE TOUCHED, ITS ALL THE REALM STUFF 

export const UserData = {
  name: USER_SCHEMA,
  primaryKey: 'id',
  properties: {
    // id: 'int',
    // name: {type: 'string'},
    // username: {type: 'string'},
    // password: {type: 'string'},
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    id: 'int'
  }
}

const databaseOptions = {
  path: 'C:\Users\Aleja\OneDrive\Desktop\realm',
  schema: [UserData],
}

export const insertUserData = newUserData => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      realm.create(USER_SCHEMA, newUserData);
      resolve(newUserData)
    });
  }).catch((error) => reject(error));
});

export const updateUserData = newUserData => Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let updatingUserData = realm.objectForPrimaryKey(USER_SCHEMA, UserData.id);
      updatingUserData.name = newUserData.name;
      resolve();
    });
  }).catch((error) => reject(error));
});

// export const deleteUserData = userDataId => new Promise((resolve, reject) => {
//   Realm.open(databaseOptions).then(realm => {
//     realm.write(() => {
//       let deletingUserData = realm.objectForPrimaryKey(USER_SCHEMA, userDataId);
//       realm.delete(deletingUserData);
//       resolve();
//     });
//   }).catch((error) => reject(error));
// });

export const querryUserData = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allUserData = realm.objects(USER_SCHEMA);
    resolve(allUserData);
  }).catch((error) => {
    reject(error);
  });
});

export const deleteAllData = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      realm.deleteAll();
      let allUserData = realm.objects(USER_SCHEMA);
      for (var index in allUserData) {
        let eachDatum = allUserData[index]
        realm.delete(eachDatum);
        realm.deleteAll();
      }
      realm.deleteAll();
      Realm.dele
      resolve();
    });
  }).catch((error) => reject(error));
});

export default new Realm(databaseOptions);