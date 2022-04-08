/**
 * 批量导入所有路由
 * */
export default function (pattern){

    pattern = pattern?pattern:'../../views/**/route/index.*';

    const modules = getGlobImport(pattern);

    return modules;
}

// 适配批量导入环境
function getGlobImport(){
    if(import.meta.globEager)
        return import.meta.globEager;
    throw new Error('没有vite批量导入环境，请安装')
}
