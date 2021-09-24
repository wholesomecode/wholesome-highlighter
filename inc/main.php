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

	// Enqueue Block Assets.
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets', 10 );

	// Styles for the front and backend.
	// add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_assets', 10 );

	// Styles for the backend only.
	// add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_frontend_assets', 10 );
}

/**
 * Enqueue Admin Assets
 *
 * @throws \Error Warn if asset dependencies do not exist.
 *
 * @return void
 */
function enqueue_block_editor_assets() : void {

	$asset_path = ROOT_DIR . '/build/index.asset.php';

	if ( ! file_exists( $asset_path ) ) {
		throw new \Error(
			esc_html__( 'You need to run `npm start` or `npm run build` in the root of the plugin "wholesome-highlighter" first.', 'wholesome-highlighter' )
		);
	}

	$scripts = '/build/index.js';
	$styles  = '/build/index.css';
	$assets  = include $asset_path;

	wp_enqueue_script(
		PLUGIN_SLUG . '-block-scripts',
		plugins_url( $scripts, ROOT_FILE ),
		$assets['dependencies'],
		$assets['version'],
		false
	);

	wp_enqueue_style(
		PLUGIN_SLUG . '-block-styles',
		plugins_url( $styles, ROOT_FILE ),
		array(),
		filemtime( ROOT_DIR . $styles )
	);

	wp_set_script_translations(
		PLUGIN_SLUG . '-admin-scripts',
		'wholesome-highlighter',
		ROOT_DIR . '\languages'
	);
}
