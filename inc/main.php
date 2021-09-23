<?php
/**
 * Main plugin file.
 *
 * @package wholesome-highlighter
 */

namespace Wholesome\Highlighter; // @codingStandardsIgnoreLine

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	// Load text domain.
	load_plugin_textdomain( 'wholesome-highlighter', false, ROOT_DIR . '\languages' );

	// Enqueue Assets.
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_admin_assets', 10 );
}

/**
 * Enqueue Admin Assets
 *
 * @throws \Error Warn if asset dependencies do not exist.
 *
 * @return void
 */
function enqueue_admin_assets() : void {

	$admin_asset_path = ROOT_DIR . '/build/index.asset.php';

	if ( ! file_exists( $admin_asset_path ) ) {
		throw new \Error(
			esc_html__( 'You need to run `npm start` or `npm run build` in the root of the plugin "wholesome-highlighter" first.', 'wholesome-highlighter' )
		);
	}

	$admin_scripts = '/build/index.js';
	$admin_styles  = '/build/index.css';
	$script_asset  = include $admin_asset_path;

	/**
	 * Settings.
	 *
	 * Settings have a filter so other parts of the plugin can append settings.
	 */
	$block_settings = apply_filters( PLUGIN_PREFIX . '_admin_settings', get_block_settings() );

	wp_enqueue_script(
		PLUGIN_SLUG . '-admin-scripts',
		plugins_url( $admin_scripts, ROOT_FILE ),
		$script_asset['dependencies'],
		$script_asset['version'],
		false
	);

	wp_enqueue_style(
		PLUGIN_SLUG . '-admin-styles',
		plugins_url( $admin_styles, ROOT_FILE ),
		array(),
		filemtime( ROOT_DIR . $admin_styles )
	);

	// wp_localize_script(
	// 	PLUGIN_SLUG . '-admin-scripts',
	// 	'WholesomeHighlighter',
	// 	$block_settings
	// );

	wp_set_script_translations(
		PLUGIN_SLUG . '-admin-scripts',
		'wholesome-highlighter',
		ROOT_DIR . '\languages'
	);
}

/**
 * Get Settings.
 *
 * Returns an array of settings which can be passed into the
 * application.
 *
 * Populate this with settings unique to your application.
 *
 * @return array
 */
function get_block_settings() : array {
	return array(
		'ajaxUrl' => esc_url( admin_url( 'admin-ajax.php', 'relative' ) ),
	);
}
