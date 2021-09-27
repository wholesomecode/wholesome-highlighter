<?php
/**
 * Network Plugin Manager
 *
 * Plugin Name:       Highlighter
 * Plugin URI:        https://wholesomecode.ltd/plugins/wholesome-highlighter
 * Description:       Highlight text with a highlight colour of your choice, using Highlighter.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.1
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
const PLUGIN_VERSION = '1.0.2';
const ROOT_DIR       = __DIR__;
const ROOT_FILE      = __FILE__;

require_once ROOT_DIR . '/inc/main.php';
require_once ROOT_DIR . '/inc/class-updater.php';

/**
 * Load Plugin.
 */
add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup' );

/**
 * Allow plugin to update from GitHub.
 */
$updater = new Updater( ROOT_FILE );
$updater->set_username( 'wholesomecode' );
$updater->set_repository( 'wholesome-highlighter' );
$updater->initialize();
