'use strict';

define('admin/plugins/postmentions', ['settings'], function (settings) {
  var ACP = {};

  ACP.init = function () {
    settings.load(
      'postmentions',
      $('.postmentions-settings'),
      function (err, settings) {
        if (err) {
          return app.alertError(err.message);
        }
      },
    );
    $('#save').on('click', saveSettings);
  };

  function saveSettings() {
    settings.save('postmentions', $('.postmentions-settings'), function () {
      app.alert({
        type: 'success',
        alert_id: 'postmentions-saved',
        title: 'Settings Saved',
        message: 'Please reload your NodeBB to apply these settings',
        clickfn: function () {
          socket.emit('admin.reload');
        },
      });
    });
  }

  return ACP;
});
