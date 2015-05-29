function cleanUpPath(path) {
  return path.replace(/^\//, "").replace(/\/$/, "");
}

function pathToTokens(path) {
  return path.split("/");
}

function match(url, pattern) {
  urlSegments = pathToTokens(cleanUpPath(url));
  patternSegments = pathToTokens(cleanUpPath(pattern));
  matches = _.zip(urlSegments, patternSegments);
  return matches;
}
