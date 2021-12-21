<?php
/**
 * Network Plugin Manager
 *
 * Plugin Name:       Highlighter
 * Plugin URI:        https://wholesomecode.ltd/plugins/highlighter
 * Description:       Highlight text with a highlight colour of your choice, using Highlighter.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.3
 * Author:            Wholesome Code <hello@wholesomecode.ltd>
 * Author URI:        https://wholesomecode.ltd
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wholesome-highlighter
 * Domain Path:       /languages
 *
 * @package           wholesome-highlighter
 */

/**
 * Copyright (C) 2021  Wholesome Code Ltd.  hello@wholesomecode.ltd
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 3, as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

namespace Wholesome\Highlighter; // @codingStandardsIgnoreLine

const PLUGIN_ADDED    = '2021-09-27';
const PLUGIN_PREFIX   = 'wholesome_highlighter';
const PLUGIN_REQUIRES = '5.8';
const PLUGIN_SLUG     = 'wholesome-highlighter';
const PLUGIN_TESTED   = '5.8.2';
const PLUGIN_VERSION  = '1.0.3';
const ROOT_DIR        = __DIR__;
const ROOT_FILE       = __FILE__;

require_once ROOT_DIR . '/inc/main.php';
require_once ROOT_DIR . '/inc/updater/class-updater.php';

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
