<?php
/**
 * Updater.
 *
 * Update the Plugin directly from GitHub.
 *
 * Inspired by the Smashing Magazine Article: https://www.smashingmagazine.com/2015/08/deploy-wordpress-plugins-with-github-using-transients/
 *
 * @package wholesome-highlighter
 */

namespace Wholesome\Highlighter; // @codingStandardsIgnoreLine

use const Wholesome\Highlighter\PLUGIN_ADDED;
use const Wholesome\Highlighter\PLUGIN_REQUIRES;
use const Wholesome\Highlighter\PLUGIN_TESTED;

/**
 * Updater.
 *
 * Update the plugin directly from GitHub.
 */
class Updater {

	/**
	 * File.
	 *
	 * @var string.
	 */
	private $file;

	/**
	 * Plugin.
	 *
	 * @var array.
	 */
	private $plugin;

	/**
	 * Basename.
	 *
	 * @var string.
	 */
	private $basename;

	/**
	 * Active.
	 *
	 * @var bool.
	 */
	private $active;

	/**
	 * Username.
	 *
	 * @var string.
	 */
	private $username;

	/**
	 * Repository.
	 *
	 * @var string.
	 */
	private $repository;

	/**
	 * Atuhorize Token.
	 *
	 * @var string.
	 */
	private $authorize_token;

	/**
	 * GitHub Response.
	 *
	 * @var array.
	 */
	private $github_response;


	/**
	 * Constructor.
	 *
	 * @param string $file File Path.
	 */
	public function __construct( $file ) {

		$this->file = $file;

		add_action( 'admin_init', array( $this, 'set_plugin_properties' ) );

		return $this;
	}

	/**
	 * Set Plugin Properties.
	 *
	 * @return void
	 */
	public function set_plugin_properties() {
		$this->plugin   = get_plugin_data( $this->file );
		$this->basename = plugin_basename( $this->file );
		$this->active   = is_plugin_active( $this->basename );
	}

	/**
	 * Set Username.
	 *
	 * @param string $username Username.
	 * @return void
	 */
	public function set_username( $username ) {
		$this->username = $username;
	}

	/**
	 * Set Repository.
	 *
	 * @param string $repository Repository.
	 * @return void
	 */
	public function set_repository( $repository ) {
		$this->repository = $repository;
	}

	/**
	 * Authorize.
	 *
	 * @param string $token Authorization Token.
	 * @return void
	 */
	public function authorize( $token ) {
		$this->authorize_token = $token;
	}

	/**
	 * Get Repository Info.
	 *
	 * @return void
	 */
	private function get_repository_info() {
		if ( is_null( $this->github_response ) ) { // Do we have a response?
			$args        = array();
			$request_uri = sprintf( 'https://api.github.com/repos/%s/%s/releases', $this->username, $this->repository ); // Build URI

			$args = array();

			if ( $this->authorize_token ) { // Is there an access token?
					$args['headers']['Authorization'] = "token {$this->authorize_token}"; // Set the headers.
			}

			$response = json_decode( wp_remote_retrieve_body( wp_remote_get( $request_uri, $args ) ), true ); // Get JSON and parse it.

			if ( is_array( $response ) ) { // If it is an array.
				$response = current( $response ); // Get the first item.
			}

			$this->github_response = $response; // Set it to our property.
		}
	}

	/**
	 * Initialize.
	 *
	 * @return void
	 */
	public function initialize() {
		add_filter( 'pre_set_site_transient_update_plugins', array( $this, 'modify_transient' ), 10, 1 );
		add_filter( 'plugins_api', array( $this, 'plugin_popup' ), 10, 3 );
		add_filter( 'upgrader_post_install', array( $this, 'after_install' ), 10, 3 );

		// Add Authorization Token to download_package.
		add_filter(
			'upgrader_pre_download',
			function() {
				add_filter( 'http_request_args', array( $this, 'download_package' ), 15, 2 );
				return false; // upgrader_pre_download filter default return value.
			}
		);
	}

	/**
	 * Modify Transient.
	 *
	 * @param object $transient Transient.
	 * @return object.
	 */
	public function modify_transient( $transient ) {

		if ( property_exists( $transient, 'checked' ) ) { // Check if transient has a checked property.

			$checked = $transient->checked;

			if ( $checked ) { // Did WordPress check for updates?.

				$this->get_repository_info(); // Get the repo info.

				$out_of_date = version_compare( $this->github_response['tag_name'], $checked[ $this->basename ], 'gt' ); // Check if we're out of date.

				if ( $out_of_date ) {

					$new_files = $this->github_response['zipball_url']; // Get the ZIP.

					$slug = current( explode( '/', (string) $this->basename ) ); // Create valid slug.

					$plugin = array( // setup our plugin info.
						'url'         => $this->plugin['PluginURI'],
						'slug'        => $slug,
						'package'     => $new_files,
						'new_version' => $this->github_response['tag_name'],
					);

					$transient->response[ $this->basename ] = (object) $plugin; // Return it in response.
				}
			}
		}

		return $transient; // Return filtered transient.
	}

	/**
	 * Plugin Popup.
	 *
	 * @param object $result The Result Object.
	 * @param string $action Action.
	 * @param object $args Arguments.
	 * @return object
	 */
	public function plugin_popup( $result, $action, $args ) {

		if ( ! empty( $args->slug ) ) { // If there is a slug.

			if ( current( explode( '/', (string) $this->basename ) ) === $args->slug ) { // And it's our slug.

				$this->get_repository_info(); // Get our repo info.

				// Set it to an array.
				$plugin = array(
					'name'              => $this->plugin['Name'],
					'slug'              => $this->basename,
					'requires'          => PLUGIN_REQUIRES,
					'tested'            => PLUGIN_TESTED,
					'rating'            => '0',
					'num_ratings'       => '0',
					'downloaded'        => '0',
					'added'             => PLUGIN_ADDED,
					'version'           => $this->github_response['tag_name'],
					'author'            => $this->plugin['AuthorName'],
					'author_profile'    => $this->plugin['AuthorURI'],
					'last_updated'      => $this->github_response['published_at'],
					'homepage'          => $this->plugin['PluginURI'],
					'short_description' => $this->plugin['Description'],
					'sections'          => array(
						'Description' => $this->plugin['Description'],
						'Updates'     => $this->github_response['body'],
					),
					'download_link'     => $this->github_response['zipball_url'],
				);

				return (object) $plugin; // Return the data.
			}
		}
		return $result; // Otherwise return default.
	}

	/**
	 * Download Package.
	 *
	 * @param array  $args Arguments.
	 * @param string $url URL.
	 * @return array
	 */
	public function download_package( $args, $url ) {

		if ( null !== $args['filename'] ) {
			if ( $this->authorize_token ) {
				$args = array_merge( $args, array( 'headers' => array( 'Authorization' => "token {$this->authorize_token}" ) ) );
			}
		}

		remove_filter( 'http_request_args', array( $this, 'download_package' ) );

		return $args;
	}

	/**
	 * After Install.
	 *
	 * @param Object $response Response.
	 * @param string $hook_extra Hook.
	 * @param Object $result Result.
	 * @return Object.
	 */
	public function after_install( $response, $hook_extra, $result ) {
		global $wp_filesystem; // Get global FS object.

		$install_directory = plugin_dir_path( $this->file ); // Our plugin directory.
		$wp_filesystem->move( $result['destination'], $install_directory ); // Move files to the plugin dir.
		$result['destination'] = $install_directory; // Set the destination for the rest of the stack.

		if ( $this->active ) { // If it was active.
			activate_plugin( $this->basename ); // Reactivate.
		}

		return $result;
	}
}
