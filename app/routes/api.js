module.exports = function(express, pool) {

  const apiRouter = express.Router();


  //users
  apiRouter.route('/users').get(async function(req, res) {

    await get(res, 'users');

  }).post(async function(req, res) {

    let salt = crypto.randomBytes(128).toString('base64');
    let hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512');

    const user = {
      email : req.body.email,
      password : hash,
      username : req.body.username,
      admin : req.body.admin,
      salt : req.body.salt
    };

    try {

      let connection = await pool.getConnection();
      let query = await connection.query('INSERT INTO users SET ?', user);
      connection.release();
      res.json({status:'OK', insertId:query.insertId});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while adding user`});

    }

  }).put(async function(req, res) {

    const user = {
      id : req.body.id,
      email : req.body.email,
      password : req.body.password,
      username : req.body.username,
      admin : req.body.admin,
      salt : req.body.salt
    };

    await put(res, 'users', user);

  });

  apiRouter.route('/users/:id').get(async function(req, res) {

    await getWithId(res, 'users', req.params.id);

  }).delete(async function(req, res) {

    await del(res, 'users', req.params.id);

  });


  //posts
  apiRouter.route('/posts').get(async function(req, res) {

    await get(res, 'posts');

  }).post(async function(req, res) {

    const news = {
      title : req.body.title,
      text : req.body.text,
      picture : req.body.picture,
      idUsers : req.body.idUsers
    };

    await post(res, 'posts', news);

  }).put(async function(req, res) {

    const news = {
      id : req.id,
      title : req.body.title,
      text : req.body.text,
      picture : req.body.picture,
      idUsers : req.body.idUsers
    };

    await put(res, 'posts', news);

  });

  apiRouter.route('/posts/:id').get(async function(req, res) {

    await getWithId(res, 'posts', req.params.id);

  }).delete(async function(req, res) {

    await del(res, 'posts', req.params.id);

  });


  //categories
  apiRouter.route('/categories').get(async function(req, res) {

    await get(res, 'categories');

  }).post(async function(req, res) {

    const category = {
      name : req.body.name
    };

    await post(res, 'categories', category);

  }).put(async function(req, res) {

    const category = {
      id : req.body.id,
      name : req.body.name
    };

    await put(res, 'categories', category);

  });

  apiRouter.route('/categories/:id').get(async function(req, res) {

    await getWithId(res, 'categories', req.params.id);

  }).delete(async function(req, res) {

    await del(res, 'categories', req.params.id);

  });


  //products
  apiRouter.route('/products').get(async function(req, res) {

    await get(res, 'products');

  }).post(async function(req, res) {

    const product = {
      name : req.body.name,
      picture : req.body.picture,
      idCategories : req.body.idCategories
    };

    await post(res, 'products', product);

  }).put(async function(req, res) {

    const product = {
      id : req.body.id,
      name : req.body.name,
      picture : req.body.picture,
      idCategories : req.body.idCategories
    };

    await put(res, 'products', product);

  });

  apiRouter.route('/products/:id').get(async function(req, res) {

    await getWithId(res, 'products', req.params.id);

  }).delete(async function(req, res) {

    await del(res, 'products', req.params.id);

  });

  async function get(res, tableName) {

    try {

      let connection = await pool.getConnection();
      let rows = await connection.query(`SELECT * FROM ${tableName}`);
      connection.release();
      res.json({status:'OK', rows:rows});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while getting ${tableName}`});

    }

  }

  async function post(res, tableName, data) {

    try {

      let connection = await pool.getConnection();
      let query = await connection.query(`INSERT INTO ${tableName} SET ?`, data);
      connection.release();
      res.json({status:'OK', insertId:query.insertId});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while adding ${tableName}`});

    }

  }

  async function put(res, tableName, data) {

    try {

      let connection = await pool.getConnection();
      let query = await connection.query(`UPDATE ${tableName} SET ? WHERE id = ?`, [data, data.id]);
      connection.release();
      res.json({status:'OK', changedRows:query.changedRows});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while updating ${tableName}`});

    }

  }

  async function getWithId(res, tableName, id) {

    try {

      let connection = await pool.getConnection();
      let rows = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, id);
      connection.release();
      res.json({status:'OK', row:rows[0]});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while getting ${tableName} with id ${id}`});

    }

  }

  async function del(res, tableName, id) {

    try {

      let connection = await pool.getConnection();
      let query = await connection.query(`DELETE FROM ${tableName} WHERE id = ?`, id);
      connection.release();
      res.json({status:'OK', affectedRows:query.affectedRows});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while deleting ${tableName} with id ${id}`});

    }

  }

  return apiRouter;

}
