import common from "./webpack.common.js";
import { merge } from "webpack-merge";

export default merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        static: "./dist",
        watchFiles: ["src/template.html"],
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
})