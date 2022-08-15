var allPathsSourceTarget = function (graph) {
  let path = [],
    res = [],
    visited = new Set(); //验证是否有环
  traverse(graph, path, res, 0);
  return res ;
  function traverse(graph, path, res, cur) {
    if (graph.length <= 0) return;
    path.push(cur) ;
    // console.log(cur);
    if (cur === graph.length - 1) {
      res.push([...path]) ;
      // 可以在这直接 return，但要 removeLast 正确维护 path
      // path.removeLast();
      // return;
      // 不 return 也可以，因为图中不包含环，不会出现无限递归
    }
    // note：递归相邻节点--graph[cur]
    for (let i = 0; i < graph[cur].length; i++) {
      traverse(graph, path, res, graph[cur][i]);
    }
    // console.log(path[path.length - 1]);
    path.pop() ;
    return;
  }
};

let graph = [[1, 2], [3], [3], []];
allPathsSourceTarget(graph);
