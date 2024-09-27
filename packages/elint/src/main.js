#!/usr/bin/env node

import fs from 'node:fs';
import chalk from 'chalk';
import path from 'node:path';
import ejsLint from 'ejs-lint';
import { globSync } from 'glob';

// 检查命令行参数
if (process.argv.length < 3) {
	console.error('请指定需要检测的文件或目录');
	process.exit(1);
}

const target = path.resolve(process.argv[2]);

// 检查目标路径是否存在且是目录
if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
	console.error('目标不是目录或不存在');
	process.exit(1);
}

// 获取所有 .ejs 文件
const filesList = globSync('**/*.ejs', { cwd: target }).map(file => path.resolve(target, file));

// 处理每个文件
filesList.forEach(file => {
	try {
		const content = fs.readFileSync(file, 'utf-8');
		const lintResult = ejsLint(content);

		if (lintResult) {
			const lines = content.split(/\r?\n/);
			const errorLine = lines[lintResult.line - 1];
			const before = errorLine.substring(0, lintResult.column - 1);
			const during = errorLine.substring(lintResult.column - 1, lintResult.column);
			const after = errorLine.substring(lintResult.column);

			console.error(`-`.repeat(100));
			console.error(`文件：${file}`);
			console.error(`错误信息：${lintResult.message}`);
			console.error(`位置：第 ${lintResult.line} 行，第 ${lintResult.column} 列`);

			const start = Math.max(0, lintResult.line - 5);
			const context = lines.slice(start, start + 4);
			context.forEach((line, index) => {
				console.error(`${(start + index + 1).toString().padStart(4, ' ')}: ${line}`);
			});

			console.error(
				`${lintResult.line.toString().padStart(4, ' ')}: ${before}${chalk.yellowBright(during)}${after}`,
			);
			console.error(`\t`.repeat(lintResult.column - 1) + '^');
			console.error(`-`.repeat(100));
		}
	} catch (error) {
		console.error(`${file}: 读取或检查失败 - ${error.message}`);
	}
});
