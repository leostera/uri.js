# uri parser
> hacked in...let me check...about 2 hours

## Usage
Go to underscore.js's website, open Chrome Dev Tools, paste the source.

YEah, i'M fancy l1ke that.

Or just do `npm i && node index` to see the results of the sample url/pattern.

Or just do `npm i && node`, and then type in

```
var parse = require('./index');
var pattern = "/:version/api/:collecton/:id";
var uri = "/6/api/listings/3?sort=desc&limit=10";
var result = parse(uri, pattern);
```

And play around with that.
