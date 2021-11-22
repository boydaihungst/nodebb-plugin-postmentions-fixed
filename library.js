'use strict';

const nconf = require.main.require('nconf');
const winston = require.main.require('winston');
const controllers = require('./lib/controllers');
const meta = require.main.require('./src/meta');
const routeHelpers = require.main.require('./src/routes/helpers');
const plugin = {};

plugin.init = async (params) => {
  const { router, middleware /* , controllers */ } = params;
  /**
   * We create two routes for every view. One API call, and the actual route itself.
   * Use the `setupPageRoute` helper and NodeBB will take care of everything for you.
   *
   * Other helpers include `setupAdminPageRoute` and `setupAPIRoute`
   * */
  routeHelpers.setupPageRoute(
    router,
    '/postmentions',
    middleware,
    async (req, res) => {
      winston.info(
        `[plugins/postmentions] Navigated to ${nconf.get(
          'relative_path',
        )}/postmentions`,
      );
      // Extra data send to template
      if ((await meta.settings.get('postmentions')) == null) {
        // meta.settings.set();
      }
      res.render('postmentions', {});
    },
  );

  routeHelpers.setupAdminPageRoute(
    router,
    '/admin/plugins/postmentions',
    middleware,
    [],
    controllers.renderAdminPage,
  );
};

plugin.appendConfigToClient = async function (config) {
  config['postmentions'] = await meta.settings.get('postmentions');
  return config;
};

plugin.addAdminNavigation = (header) => {
  header.plugins.push({
    route: '/plugins/postmentions',
    icon: 'fa-tint',
    name: 'Post Mentions',
  });

  return header;
};

module.exports = plugin;
