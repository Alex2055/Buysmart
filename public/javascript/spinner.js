const showSpinner = function($this) {
    var theme = 'b',
        msgText = 'Loading...',
        textVisible = true,
        textonly = false;
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly
    });
};
