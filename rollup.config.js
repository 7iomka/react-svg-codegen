import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import jsonPlugin from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import bundleSize from 'rollup-plugin-bundle-size'


const external = [
	'path',
	'slash',
	'fs',
	'chokidar',
	'eta',
	'prettier',
	'svg-sprite-loader',
	'react',
	'react-dom'
]

const plugins = [
	typescript({
		clean: true
	}),

	babel({
		exclude: ['node_modules/**'],

		extensions: ['.js', '.jsx', '.ts', '.tsx'],

		runtimeHelpers: true,

		presets: [
			'@babel/preset-env',
			'@babel/preset-typescript',
		],
	}),

	nodeResolve({
		jsnext: true,

		skip: [],

		extensions: ['.js', '.mjs']
	}),

	commonjs({
		extensions: ['.js', '.mjs']
	}),

	terser(),

	jsonPlugin(),

	bundleSize()
]

const output = {

	file: './dist/index.js',

	format: 'cjs',

	freeze: false,

	exports: 'named',

	sourcemap: true,

	externalLiveBindings: false
}

export default [
	{
		input: './src/index.ts',

		plugins,

		external,

		output
	}
]
