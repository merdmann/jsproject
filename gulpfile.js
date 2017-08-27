var gulp = require("gulp");
var runSequence = require("run-sequence");
var conventionalChangelog = require("gulp-conventional-changelog");
var conventionalGithubReleaser = require("conventional-github-releaser");
var bump = require("gulp-bump");
var gutil = require("gulp-util");
var git = require("gulp-git");
var fs = require("fs");

gulp.task("changelog", function () {
    return gulp.src("CHANGELOG.md", { buffer: false }).pipe(conventionalChangelog({
    preset: "angular" })).pipe(gulp.dest("./"));
});

gulp.task("github-release", function(done) {
    conventionalGithubReleaser(
      { type:   "oauth", token: "25e0e59b4278e9a4127f8e8c9ca77c66d6edafd3"}, 
      { preset: "angular" },
      done);
});

gulp.task("bump-version", function () {
// We hardcode the version change type to 'patch' but it may be a good idea to
// use minimist (https://www.npmjs.com/package/minimist) to determine with a
// command argument whether you are doing a 'major', 'minor' or a 'patch' change.
  return gulp.src(["./bower.json", "./package.json"])
    .pipe(bump({type: "patch"}).on("error", gutil.log))
    .pipe(gulp.dest("./"));
});

gulp.task("commit-changes", function () {
  return gulp.src(".")
    .pipe(git.add())
    .pipe(git.commit("[Prerelease] Bumped version number"));
});

gulp.task("push-changes", function (cb) {
  git.push("origin", "master", cb);
});

gulp.task("create-new-tag", function (cb) {
  var version = getPackageJsonVersion();
  git.tag(version, "Created Tag for version: " + version, function (error) {
    if (error) {
      return cb(error);
    }
    git.push("origin", "master", {args: "--tags"}, cb);
  });

function getPackageJsonVersion () {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync("./package.json", "utf8")).version;
  };
});

gulp.task("release", function (callback) {
  runSequence(
    "bump-version",
    "changelog",
    "commit-changes",
    "push-changes",
    "create-new-tag",
    "github-release",
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log("RELEASE FINISHED SUCCESSFULLY");
      }
      callback(error);
    });
});

