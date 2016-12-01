;
(function(global, factory) {
  'use strict';
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window) {

  <%= contents %>

  window.<%= namespace %> = <%= exports %>;
  if (typeof define === 'function' && (define.amd || define.cmd)) { // AMD Module
    define(function(require) {
      return <%= exports %>;
    });

  }

  return <%= exports %>;

}));