;
( function ( global, factory ) {
  'use strict';
  if ( typeof define === 'function' && (define.amd || define.cmd) ) {
    // AMD\CMD. Register as an anonymous module.
    define( function ( require, exports, module ) {
      return factory( global );
    } );

  } else if ( typeof exports === 'object' ) {
    module.exports = factory();
  } else {
    global.
    <%= namespace %> = factory( global );
  }
}( typeof window !== "undefined" ? window : this, function ( window ) {

  <%= contents %>

  return <%= exports %>;

} ) );
