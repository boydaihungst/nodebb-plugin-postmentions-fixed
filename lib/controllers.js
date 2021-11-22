'use strict';

const categories = require.main.require('./src/categories');
const Controllers = {};

Controllers.renderAdminPage = async function (req, res /* , next */) {
  /*
    Make sure the route matches your path to template exactly.

    If your route was:
      myforum.com/some/complex/route/
    your template should be:
      templates/some/complex/route.tpl
    and you would render it like so:
      res.render('some/complex/route');
  */
  const searchData = {};
  const categoriesData = await buildCategories(req.uid);

  searchData.allCategories = categoriesData;
  searchData.allCategoriesCount = Math.max(
    10,
    Math.min(20, categoriesData.length),
  );

  res.render('admin/plugins/postmentions', searchData);
};

async function buildCategories(uid) {
  const cids = await categories.getCidsByPrivilege(
    'categories:cid',
    uid,
    'read',
  );
  let categoriesData = await categories.getCategoriesData(cids);
  categoriesData = categoriesData.filter(
    (category) => category && !category.link,
  );
  categoriesData = categories.getTree(categoriesData);
  categoriesData = categories.buildForSelectCategories(categoriesData, [
    'text',
    'value',
  ]);
  return categoriesData;
}
module.exports = Controllers;
