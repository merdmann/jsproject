let rollup = require('rollup');

let inputOptions = {
    entry: "../src/js/lib.js",

    onwarn: function (warning) {  
       // skip certain warnings
      if(warning.code === 'UNUSED_EXTERNAL_IMPORT') {
         return;
      }
    // throw other warnings
        if(warning.code === 'NON_EXISTENT_EXPORT') {
            throw new Error(warning.message);
        }
    // console.warn everything else
        console.warn(warning.message);
    },
    plugins: []
}

const main = function () {
    console.log("starting");
    let bundle = rollup.rollup(inputOptions)

    bundle.write({
        format: 'umd',
        moduleName: 'library',
        dest: './app/lib.js',
        sourceMap: true });
    console.log("Done.");
};

main();
