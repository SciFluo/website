import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// 构建 网站
const hexo = require('hexo');
const hexoCli = new hexo(process.cwd(), {});
await hexoCli.init();
await hexoCli.call('generate', {});
