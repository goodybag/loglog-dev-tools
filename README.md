# Loglog Chrome DevTools Transport

> Logging transport to chrome dev tools for loglog

![http://storage.j0.hn/hierarchical-logging.png](http://storage.j0.hn/hierarchical-logging.png)

__Install:__

```
npm install loglog-dev-tools
```

Or:

```
bower install loglog-dev-tools
```

__Usage:__

```javascript
var logger = require('loglog').create({
  transports: [
    require('loglog-dev-tools')({ /* options */ })
  ]
});
```

__Options:__

```javascript
{
  // Mapping of level to console method
  levelMethod: function( level ){
    switch ( level ){
      case 'error': return 'error';
      case 'warn': return 'warn';
      default: return 'log';
    }
  }

  // Mapping of level to entry color
, levelColor: function( level ){
    switch ( level ){
      case 'warn':  return 'orange';
      case 'error': return 'red';
      default: return 'blue';
    }
  }

  // If true, will not show parents for each log entry
, disableParentPrefix: true
}
```
