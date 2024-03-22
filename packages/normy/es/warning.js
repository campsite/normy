var isProduction = process.env.NODE_ENV === 'production';
export var warning = function warning(show) {
  if (!isProduction) {
    if (show) {
      var _console;
      for (var _len = arguments.length, messages = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        messages[_key - 1] = arguments[_key];
      }
      (_console = console).log.apply(_console, messages);
    }
  }
};