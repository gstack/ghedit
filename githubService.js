/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spiffcode, Inc. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'vs/platform/instantiation/common/instantiation', 'vs/base/common/winjs.base'], function (require, exports, instantiation_1, winjs_base_1) {
    'use strict';
    var github = require('lib/github');
    exports.IGithubService = instantiation_1.createDecorator('githubService');
    var GithubService = (function () {
        function GithubService(options) {
            this.serviceId = exports.IGithubService;
            this.options = options;
            this.github = new github(options);
        }
        GithubService.prototype.hasCredentials = function () {
            return (this.options.username && this.options.password) || this.options.token;
        };
        GithubService.prototype.isAuthenticated = function () {
            return !!this.authenticatedUserInfo;
        };
        GithubService.prototype.authenticateUser = function () {
            var _this = this;
            if (!this.hasCredentials()) {
                return winjs_base_1.TPromise.wrapError('authenticateUser requires user credentials');
            }
            return new winjs_base_1.TPromise(function (complete, error) {
                _this.github.getUser().show(null, function (err, info) {
                    if (err) {
                        error(err);
                    }
                    else {
                        _this.authenticatedUserInfo = info;
                        complete(info);
                    }
                });
            });
        };
        GithubService.prototype.getAuthenticatedUserInfo = function () {
            return this.authenticatedUserInfo;
        };
        GithubService.prototype.authenticate = function () {
            // If we're running on localhost authorize via the "GH Code localhost" application
            // so we're redirected back to localhost (instead of spiffcode.github.io/ghcode) after
            // the authorization is done.
            var client_id = (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') ? '60d6dd04487a8ef4b699' : 'bbc4f9370abd2b860a36';
            window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + client_id + '&scope=user repo gist';
        };
        GithubService.prototype.openRepository = function (repoName, ref) {
            var _this = this;
            this.repo = repoName;
            this.ref = ref;
            var repo = this.github.getRepo(this.repo);
            return new winjs_base_1.TPromise(function (complete, error) {
                repo.show(function (err, info) {
                    if (err) {
                        error(err);
                    }
                    else {
                        _this.repoInfo = info;
                        complete(info);
                    }
                });
            });
        };
        return GithubService;
    }());
    exports.GithubService = GithubService;
    function openRepository(repo, ref) {
        var selfURL = window.location.origin + window.location.pathname;
        window.location.href = selfURL + '?repo=' + repo + (ref ? '&ref=' + ref : '');
    }
    exports.openRepository = openRepository;
});
//# sourceMappingURL=githubService.js.map