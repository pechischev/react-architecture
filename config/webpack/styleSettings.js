module.exports = (paths) => ({
    test: /\.(sass|scss|css)$/,
    include: paths,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader',
    ],
});
