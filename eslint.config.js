import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			eqeqeq: ['error', 'always'],
			'prettier/prettier': ['off', 'always'],
		},
		ignores: ['node_modules', '/build', '/packages/hexo-theme-scifluo/source', '/submodule'],
	},
];
