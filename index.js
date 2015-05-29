function cleanUpPath(path) {
  return path.replace(/^\//, "").replace(/\/$/, "");
}

function pathToTokens(path) {
  return path.split("/");
}

function zipSegments(url, pattern) {
  var segments = _.zip(pathToTokens(cleanUpPath(url)),
                   pathToTokens(cleanUpPath(pattern)));
  return segments;
}

function isParam(segment) {
  return segment[0] === ":";
}

function paramToPropertyName(param) {
  // removes the : from the param
  return param.substr(1);
}

function segmentToObject(segment) {
  var param = {};
  var value = Number(segment[0]);
  if( isNaN(value) ) {
    value = segment[0];
  }
  var name = segment[1];
  Object.defineProperty(param,
                        name,
                        { enumerable: true,
                          writable: false,
                          value: value });
  return param;
}

function parseUrl(url) {
  var parts = url.split("?");
  return {
    query: parts[1], //after ?
    path: parts[0]  //before ?
  };
}

function paramToObject(param) {
  if(isParam(param[1])){ 
    segmentParam = param.slice(0);
    segmentParam[1] = paramToPropertyName(param[1]);
    segment = segmentToObject(segmentParam);
    return segment;
  }
}

function queryToObject(query) {
  var segments = query.split("&");
  var queryParams = segments.map(function (segment) {
    return segment.split("=").reverse();
  }).map(segmentToObject);
  return queryParams;
}

function pathToObject(url, pattern) {
  var segments = zipSegments(url, pattern);
  var params = segments.map(paramToObject);
  return params;
}

function parse(rawUrl, pattern) {
  var url = parseUrl(rawUrl);
  var params = pathToObject(url.path, pattern);
  var query = queryToObject(url.query);
  return params.concat(query).filter(function (i) {
    return i !== undefined;
  }).reduce(function (params, param) {
    return _.extend(params, param);
  }, {});
}

var pattern = "/:version/api/:collecton/:id";
var uri = "/6/api/listings/3?sort=desc&limit=10";

var result = parse(uri, pattern);
