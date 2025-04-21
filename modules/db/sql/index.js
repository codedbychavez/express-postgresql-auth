const { QueryFile } = require('pg-promise');
const { join } = require('path');

module.exports = {
  users: {
    all: sql('users/all.sql'),
    find: sql('users/find.sql'),
    insert: sql('users/insert.sql')
  }
}

///////////////////////////////////////////////
// Helper for linking to external query files;
function sql(file) {

  const fullPath = join(__dirname, file); // generating full path;

  const options = {

    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true

    // See also property 'params' for two-step template formatting
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}