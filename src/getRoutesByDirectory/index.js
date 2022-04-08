/**
 * 获取一个含目录信息的二维数组
 * */

function getDireactoryArr(modules,pattern){
    const direactoryArr = [];
    let   diffLen       = pattern?pattern.split('/').length:6;

    Object.keys(modules).forEach((rmkey,index) => {

        if (!direactoryArr[rmkey.split('/').length - diffLen]) {
            direactoryArr[rmkey.split('/').length - diffLen] = [];
            direactoryArr[rmkey.split('/').length - diffLen].push(rmkey);
        } else {
            direactoryArr[rmkey.split('/').length - diffLen].push(rmkey);
        }
    });

    return direactoryArr;
}

function getRouteModuleList(direactoryArr, modules){
    const routeModuleList = [];

    for (let i = 0; i < direactoryArr.length; i++) {

        if (direactoryArr[i + 1]) {

            for (let j = 0; j < direactoryArr[i].length; j++) {

                const moduleRoute = modules[direactoryArr[i][j]].default;
                const pkey = direactoryArr[i][j].substring(0, direactoryArr[i][j].indexOf('/route/index'));

                for (let k = 0; k < direactoryArr[i + 1].length; k++) {
                    if (direactoryArr[i + 1][k].indexOf(pkey) > -1) {
                        if (moduleRoute.children) {
                            moduleRoute.children.push(modules[direactoryArr[i + 1][k]].default);
                        } else {
                            moduleRoute.children = [];
                            moduleRoute.children.push(modules[direactoryArr[i + 1][k]].default);
                        }
                    }
                }

                routeModuleList.push(moduleRoute);
            }
        } else {
            break;
        }
    }

    return routeModuleList;
}

export default function (modules,pattern){
    const direactoryArr = getDireactoryArr(modules,pattern);

    const routeModuleList = getRouteModuleList(direactoryArr,modules);

    return routeModuleList;
}
