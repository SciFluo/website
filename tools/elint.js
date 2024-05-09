import fs from "fs";
import path from "path";
import chalk from "chalk";
import ejsLint from "ejs-lint";

const ProjectPath = path.resolve(".");
const ignoreFilePath = path.join(ProjectPath, ".prettierignore");

// 扫描特定后缀文件的函数
const ScanFileExt = (Path, Ext, ignore) => {
	const ignorePatterns = ignore
		.split("\n")
		.filter((line) => line.trim() !== "" && !line.startsWith("#"))
		.map(
			(pattern) =>
				new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
		);

	const isIgnored = (filePath) =>
		ignorePatterns.some((pattern) => pattern.test(filePath));

	const scanDirectory = (currentPath) => {
		const files = fs.readdirSync(currentPath);

		files.forEach((file) => {
			const filePath = path.join(currentPath, file);

			if (fs.statSync(filePath).isDirectory()) {
				scanDirectory(filePath);
			} else if (
				path.extname(file) === `.${Ext}` &&
				!isIgnored(filePath)
			) {
				result.push(filePath);
			}
		});
	};

	const result = [];
	scanDirectory(Path);
	return result;
};

// 获取所有ejs文件路径
const EJSFilePath = ScanFileExt(
	ProjectPath,
	"ejs",
	fs.readFileSync(ignoreFilePath, "utf-8")
);

// 检查每个文件的lint错误
for (const filePath of EJSFilePath) {
	const fileContent = fs.readFileSync(filePath, "utf-8");
	const lintResult = ejsLint(fileContent);

	if (lintResult) {
		// 输出lint错误信息
		console.error(`文件：${filePath} 中存在lint错误`);
		console.error(`错误信息：${lintResult.message}`);

		const lines = fileContent.split(/\r?\n/);
		const errorLine = lines[lintResult.line - 1];
		const before = errorLine.substring(0, lintResult.column - 1);
		const during = errorLine.substring(
			lintResult.column - 1,
			lintResult.column
		);
		const after = errorLine.substring(lintResult.column);

		console.error(`${before}${chalk.bgRed(during)}${after}`);
	}
}
