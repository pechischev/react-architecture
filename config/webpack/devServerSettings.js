module.exports = ({port = 3000, contentBase}) => ({
    hot: true,
    inline: true,
    noInfo: true,
    open: true,
    historyApiFallback: {
        disableDotRule: true,
    },
    overlay: {
        errors: true,
    },
    port,
    contentBase,
    stats: "minimal",
});
