// 导入 idb 库的 openDB 函数，这个函数用于打开 IndexedDB 数据库。
import { openDB } from 'idb';

//  `class IndexedDBService {...}`定义 IndexedDBService 类。
class IndexedDBService {
  // 在构造函数`constructor(dbName)`中，使用`openDB(dbName, 1, {...})`打开名为 dbName 的数据库。如果该数据库不存在，它将被创建。
  constructor (dbName) {
    this.dbPromise = openDB(dbName, 1, {
      //  在`upgrade(db)`回调函数中检查是否存在名为 users 的对象存储。如果不存在，创建它并设置 id 作为键路径。
      upgrade (db) {
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
  // `addUser(user)`方法用于向 users 对象存储中添加用户。
  async addUser (user) {
    const db = await this.dbPromise;
    await db.add('users', user);
    return user.id;
  }
  // `getUser(id)`方法用于根据 id 从 users 对象存储中获取用户。
  async getUser (id) {
    const db = await this.dbPromise;
    return await db.get('users', id);
  }
  // `updateUser(user)`方法用于更新 users 对象存储中的用户数据。
  async updateUser (user) {
    const db = await this.dbPromise;
    await db.put('users', user);
    return 200;
  }
  // `deleteUser(id)`方法用于根据 id 从 users 对象存储中删除用户。
  async deleteUser (id) {
    const db = await this.dbPromise;
    await db.delete('users', id);
  }
  // `getAllUsers(query)`方法用于获取所有用户，并且实现了分页功能。
  async getAllUsers (query) {
    const pageSize = 10000;
    const page = 1;
    const db = await this.dbPromise;
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const allUsers = await store.getAll();

    // 模糊查询
    const filteredUsers = allUsers.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

    const total = filteredUsers.length;
    const pageCount = Math.ceil(total / pageSize);

    // 分页
    const paginatedUsers = filteredUsers.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return {
      total,
      data: paginatedUsers,
      pageCount
    };
  }
}
// 总的来说，这个类是 IndexedDB 的一个典型应用，它的功能包括创建数据库、创建表（对象存储）、增删改查操作以及分页显示查询结果。它可以作为服务模块在其他地方被引入，以实现数据的本地存储管理。你给的代码最后一行`export default new IndexedDBService('my-database', 'users');` 将创建 IndexedDBService 类的实例，并导出供其他模块使用。
export default new IndexedDBService('my-database', 'users');

