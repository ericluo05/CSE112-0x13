'use strict'

/**
 * New Relic agent configuration.
 *
 * See lib/config.default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['Emissary'],
  /**
   * Your New Relic license key.
   */
  license_key: 'dd3f32b3d975c810cdc193297ebef5035d54e940f30f652',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }

   rules : {
    ignore : [
      '^/socket.io/.*/xhr-polling'
    ]
  }
}
