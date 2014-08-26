/**
 * Loglog Dev tools
 * Loglog transport for chrome dev tools
 */

;(function(){
  'use strict';

  var loglogDevTools = function( options ){
    options = options || {};

    var defaults = {
      levelMethod: function( level ){
        switch ( level ){
          case 'error': return 'error';
          case 'warn': return 'warn';
          default: return 'log';
        }
      }

    , levelColor: function( level ){
        switch ( level ){
          case 'warn':  return 'orange';
          case 'error': return 'red';
          default: return 'blue';
        }
      }
    };

    for ( var key in defaults ){
      if ( !(key in options ) ){
        options[ key ] = defaults[ key ];
      }
    }

    var ghead   = 0;
    var groups  = [];

    return function( entry ){
      var args = [];
      var components = entry.parents.slice(0);

      if ( entry.component ){
        components.push( entry.component );

        args.push( '%c[' + entry.parents.concat( entry.component ).join('.') + ']' );
        args.push( 'color: ' + options.levelColor( entry.level ) );
      }

      args.push( entry.message );

      if ( Object.keys( entry.data ).length > 0 ) {
        args.push( entry.data );
      }

      // Find where components differs from groups
      var differsAt = -1;
      for ( var i = 0; i < components.length; i++ ){
        if ( components[i] !== groups[i] ){
          differsAt = i;
          break;
        }
      }

      if ( components.length === 0 && groups.length > 0 ){
        differsAt = 0;
      }

      if ( differsAt > -1 ){
        while ( groups.length > differsAt ){
          groups.pop();
          console.groupEnd();
        }

        for ( i = differsAt; i < components.length; i++ ){
          groups.push( components[i] );
          console.group( components[i] );
        }
      }

      console[
        options.levelMethod( entry.level )
      ].apply( console, args );
    };
  };

  if ( typeof module !== "undefined" ) module.exports = loglogDevTools;
  else if ( typeof define !== "undefined" ) define( 'loglog-dev-tools', function(){ return loglogDevTools; } );
  else window.loglogDevTools = loglogDevTools;
})();