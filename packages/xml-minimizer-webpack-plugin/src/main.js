import webpack from 'webpack';
import { minify as minifyXML } from 'minify-xml';

export default class XmlMinimizerPlugin {
	/** @param {webpack.Compiler} compiler */
	apply(compiler) {
		compiler.hooks.compilation.tap('XmlMinimizerPlugin', compilation => {
			compilation.hooks.processAssets.tap(
				{
					name: 'XmlMinimizerPlugin',
					stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
				},
				assets => {
					for (const filename in assets) {
						if (filename.endsWith('.xml')) {
							let source = assets[filename].source();
							if (typeof source !== 'string') {
								source = source.toString();
							}
							const compressedXml = minifyXML(source);
							assets[filename] = {
								source: () => compressedXml,
								size: () => compressedXml.length,
							};
						}
					}
				},
			);
		});
	}
}
