import  importRoutes from './importRoutes'
import  getRoutesByDirectory from './getRoutesByDirectory'

export default function (pattern){
    getRoutesByDirectory(importRoutes(pattern));
}
