import common from "./webpack.common.js";
import { merge } from "webpack-merge";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default merge(common, {
    mode: "production",
    devtool: "source-map",
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
    ],

    module: {
        rules:[
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },

    optimization: {
        minimizer: ["...", new CssMinimizerPlugin()],
    },
})