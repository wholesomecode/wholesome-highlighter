<?php
/**
 * Network Plugin Manager
 *
 * Plugin Name:       Highlighter
 * Plugin URI:        https://wholesomecode.ltd/plugins/network-plugin-manager
 * Description:       Highlight text with this simple highlighter plugin.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Wholesome Code <hello@wholesomecode.ltd>
 * Author URI:        https://wholesomecode.ltd
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wholesome-highlighter
 * Domain Path:       /languages
 *
 * @package           wholesome-highlighter
 */

namespace Wholesome\Highlighter; // @codingStandardsIgnoreLine

const PLUGIN_PREFIX  = 'wholesome_highlighter';
const PLUGIN_SLUG    = 'wholesome-highlighter';
const PLUGIN_VERSION = '1.0.0';
const ROOT_DIR       = __DIR__;
const ROOT_FILE      = __FILE__;

require_once ROOT_DIR . '/inc/main.php';

/**
 * Load Plugin.
 */
add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup' );
