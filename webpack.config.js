/**
 * Webpack Config
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const IgnoreEmitWebPackPlugin = require( 'ignore-emit-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const OptimizeCssAssetsWebpackPlugin = require( 'optimize-css-assets-webpack-plugin' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const StylelintWebpackPlugin = require( 'stylelint-webpack-plugin' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

/**
 * Import from Node
 *
 * The path module provides utilities for working with file and directory paths.
 * @see https://nodejs.org/api/path.html#path_path
 */
const path = require( 'path' );

/**
 * Variables
 */
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Config
 */
module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			/**
			 * JS
			 * - JS Linting and Fixing
			 */
			{
				test: /\.js$/,
				include: /src/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: true,
				},
			},
		],
	},
	optimization: {
		...defaultConfig.optimization,
		minimize: true,
		/**
		 * Minification
		 * - CSS minification (OptimizeCssAssetsWebpackPlugin)
		 * - JS minification (TerserWebpackPlugin)
		 */
		minimizer: [
			new OptimizeCssAssetsWebpackPlugin( {
				cssProcessorOptions: {
					map: isProduction ? false : {
						inline: false,
					},
				},
			} ),
			new TerserWebpackPlugin(),
		],
	},
	output: {
		filename: './[name].js',
		path: path.resolve( __dirname, 'build' ),
	},
	/**
	 * Plugin Config
	 * - Prevent incorrect file creation (IgnoreEmitWebPackPlugin)
	 * - Friendly Webpack errors (FriendlyErrorsWebpackPlugin)
	 * - SCSS linting and fixing (StylelintWebpackPlugin)
	 * - Additional config for CSS minification (MiniCssExtractPlugin)
	 */
	plugins: [
		...defaultConfig.plugins,
		new IgnoreEmitWebPackPlugin( [
			'block-styles.asset.php',
		] ),
		new FriendlyErrorsWebpackPlugin(),
		new StylelintWebpackPlugin( {
			files: 'src/**/*.s?(a|c)ss',
			failOnError: true,
			fix: true,
			syntax: 'scss',
		} )
	],
};

// Prevent JS source maps in production.
if ( isProduction ) {
	module.exports.devtool = false;
}