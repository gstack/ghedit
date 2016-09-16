/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(r<3?i(s):r>3?i(t,n,s):i(t,n))||s);return r>3&&s&&Object.defineProperty(t,n,s),s},__param=this&&this.__param||function(e,t){return function(n,o){t(n,o,e)}};define(["require","exports","path","original-fs","vs/base/common/platform","vs/nls","vs/base/common/paths","vs/base/common/arrays","vs/base/common/objects","vs/platform/package","events","vs/code/electron-main/storage","vs/code/electron-main/window","electron","vs/code/electron-main/env","vs/code/electron-main/lifecycle","vs/code/electron-main/settings","vs/code/electron-main/update-manager","vs/code/electron-main/log","vs/platform/instantiation/common/instantiation"],function(e,t,n,o,i,r,s,a,c,l,d,p,u,v,h,f,g,w,S,m){"use strict";var P,W={OPEN:"open",CLOSE:"close",READY:"ready"};!function(e){e[e.UNRESPONSIVE=0]="UNRESPONSIVE",e[e.CRASHED=1]="CRASHED"}(P||(P={}));var y={ALL:"all",ONE:"one",NONE:"none"};t.IWindowsService=m.createDecorator("windowsService");var E=function(){function e(e,t,n,o,i,r,s){this.instantiationService=e,this.logService=t,this.storageService=n,this.envService=o,this.lifecycleService=i,this.updateService=r,this.settingsService=s,this.eventEmitter=new d.EventEmitter}return e.prototype.onOpen=function(e){var t=this;return this.eventEmitter.addListener(W.OPEN,e),function(){return t.eventEmitter.removeListener(W.OPEN,e)}},e.prototype.onReady=function(e){var t=this;return this.eventEmitter.addListener(W.READY,e),function(){return t.eventEmitter.removeListener(W.READY,e)}},e.prototype.onClose=function(e){var t=this;return this.eventEmitter.addListener(W.CLOSE,e),function(){return t.eventEmitter.removeListener(W.CLOSE,e)}},e.prototype.ready=function(t){this.registerListeners(),this.initialUserEnv=t,this.windowsState=this.storageService.getItem(e.windowsStateStorageKey)||{openedFolders:[]}},e.prototype.registerListeners=function(){var t=this;v.app.on("activate",function(e,n){t.logService.log("App#activate"),n||t.openNewWindow()});var n=[],o=null;v.app.on("open-file",function(e,i){t.logService.log("App#open-file: ",i),e.preventDefault(),n.push(i),null!==o&&(clearTimeout(o),o=null),o=setTimeout(function(){t.open({cli:t.envService.cliArgs,pathsToOpen:n,preferNewWindow:!0}),n=[],o=null},100)}),this.settingsService.onChange(function(e){t.sendToAll("vscode:optionsChange",JSON.stringify({globalSettings:e}))},this),v.ipcMain.on("vscode:startCrashReporter",function(e,n){t.logService.log("IPC#vscode:startCrashReporter"),v.crashReporter.start(n)}),v.ipcMain.on("vscode:windowOpen",function(e,n,o){t.logService.log("IPC#vscode-windowOpen: ",n),n&&n.length&&t.open({cli:t.envService.cliArgs,pathsToOpen:n,forceNewWindow:o})}),v.ipcMain.on("vscode:workbenchLoaded",function(e,n){t.logService.log("IPC#vscode-workbenchLoaded");var o=t.getWindowById(n);o&&(o.setReady(),t.eventEmitter.emit(W.READY,o))}),v.ipcMain.on("vscode:openFilePicker",function(e,n,o){t.logService.log("IPC#vscode-openFilePicker"),t.openFilePicker(n,o)}),v.ipcMain.on("vscode:openFolderPicker",function(e,n){t.logService.log("IPC#vscode-openFolderPicker"),t.openFolderPicker(n)}),v.ipcMain.on("vscode:openFileFolderPicker",function(e,n){t.logService.log("IPC#vscode-openFileFolderPicker"),t.openFileFolderPicker(n)}),v.ipcMain.on("vscode:closeFolder",function(e,n){t.logService.log("IPC#vscode-closeFolder");var o=t.getWindowById(n);o&&t.open({cli:t.envService.cliArgs,forceEmpty:!0,windowToUse:o})}),v.ipcMain.on("vscode:openNewWindow",function(){t.logService.log("IPC#vscode-openNewWindow"),t.openNewWindow()}),v.ipcMain.on("vscode:reloadWindow",function(e,n){t.logService.log("IPC#vscode:reloadWindow");var o=t.getWindowById(n);o&&t.reload(o)}),v.ipcMain.on("vscode:toggleFullScreen",function(e,n){t.logService.log("IPC#vscode:toggleFullScreen");var o=t.getWindowById(n);o&&o.toggleFullScreen()}),v.ipcMain.on("vscode:setFullScreen",function(e,n,o){t.logService.log("IPC#vscode:setFullScreen");var i=t.getWindowById(n);i&&i.win.setFullScreen(o)}),v.ipcMain.on("vscode:toggleDevTools",function(e,n){t.logService.log("IPC#vscode:toggleDevTools");var o=t.getWindowById(n);o&&o.win.webContents.toggleDevTools()}),v.ipcMain.on("vscode:openDevTools",function(e,n){t.logService.log("IPC#vscode:openDevTools");var o=t.getWindowById(n);o&&(o.win.webContents.openDevTools(),o.win.show())}),v.ipcMain.on("vscode:setRepresentedFilename",function(e,n,o){t.logService.log("IPC#vscode:setRepresentedFilename");var i=t.getWindowById(n);i&&i.win.setRepresentedFilename(o)}),v.ipcMain.on("vscode:setMenuBarVisibility",function(e,n,o){t.logService.log("IPC#vscode:setMenuBarVisibility");var i=t.getWindowById(n);i&&i.win.setMenuBarVisibility(o)}),v.ipcMain.on("vscode:flashFrame",function(e,n){t.logService.log("IPC#vscode:flashFrame");var o=t.getWindowById(n);o&&o.win.flashFrame(!o.win.isFocused())}),v.ipcMain.on("vscode:focusWindow",function(e,n){t.logService.log("IPC#vscode:focusWindow");var o=t.getWindowById(n);o&&o.win.focus()}),v.ipcMain.on("vscode:setDocumentEdited",function(e,n,o){t.logService.log("IPC#vscode:setDocumentEdited");var i=t.getWindowById(n);i&&i.win.isDocumentEdited()!==o&&i.win.setDocumentEdited(o)}),v.ipcMain.on("vscode:toggleMenuBar",function(n,o){t.logService.log("IPC#vscode:toggleMenuBar");var i=t.storageService.getItem(u.VSCodeWindow.menuBarHiddenKey,!1),s=!i;if(t.storageService.setItem(u.VSCodeWindow.menuBarHiddenKey,s),e.WINDOWS.forEach(function(e){return e.setMenuBarVisibility(!s)}),s){var a=t.getWindowById(o);a&&a.send("vscode:showInfoMessage",r.localize("hiddenMenuBar","You can still access the menu bar by pressing the **Alt** key."))}}),v.ipcMain.on("vscode:broadcast",function(n,o,i,r){if(r.channel&&r.payload)if(t.logService.log("IPC#vscode:broadcast",i,r.channel,r.payload),t.onBroadcast(r.channel,r.payload),i){var a=e.WINDOWS.filter(function(e){return e.id!==o&&"string"==typeof e.openedWorkspacePath}),c=a.filter(function(e){return t.isPathEqual(i,e.openedWorkspacePath)}),l=a.filter(function(e){return s.isEqualOrParent(i,e.openedWorkspacePath)}),d=c.length?c[0]:l[0];d&&d.send("vscode:broadcast",r)}else t.sendToAll("vscode:broadcast",r,[o])}),v.ipcMain.on("vscode:log",function(e,t){var n=[];try{var o=JSON.parse(t.arguments);n.push.apply(n,Object.getOwnPropertyNames(o).map(function(e){return o[e]}))}catch(i){n.push(t.arguments)}console[t.severity].apply(console,n)}),v.ipcMain.on("vscode:closeExtensionHostWindow",function(e,n){t.logService.log("IPC#vscode:closeExtensionHostWindow",n);var o=t.findWindow(null,null,n);o&&o.win.close()}),this.updateService.on("update-downloaded",function(e){t.sendToFocused("vscode:telemetry",{eventName:"update:downloaded",data:{version:e.version}}),t.sendToAll("vscode:update-downloaded",JSON.stringify({releaseNotes:e.releaseNotes,version:e.version,date:e.date}))}),v.ipcMain.on("vscode:update-apply",function(){t.logService.log("IPC#vscode:update-apply"),t.updateService.availableUpdate&&t.updateService.availableUpdate.quitAndUpdate()}),this.updateService.on("update-not-available",function(e){t.sendToFocused("vscode:telemetry",{eventName:"update:notAvailable",data:{explicit:e}}),e&&t.sendToFocused("vscode:update-not-available","")}),this.updateService.on("update-available",function(e){e&&t.sendToFocused("vscode:update-available",e)}),this.lifecycleService.onBeforeQuit(function(){return e.WINDOWS.length<2?void(t.windowsState.openedFolders=[]):void(t.windowsState.openedFolders=e.WINDOWS.filter(function(e){return e.readyState===u.ReadyState.READY&&!!e.openedWorkspacePath&&!e.isPluginDevelopmentHost}).map(function(e){return{workspacePath:e.openedWorkspacePath,uiState:e.serializeWindowState()}}))}),v.app.on("will-quit",function(){t.storageService.setItem(e.windowsStateStorageKey,t.windowsState)});var i=!1;this.onReady(function(e){i||(i=!0,e.send("vscode:telemetry",{eventName:"startupTime",data:{ellapsed:Date.now()-global.vscodeStart}}))})},e.prototype.onBroadcast=function(e,t){"vscode:changeTheme"===e&&"string"==typeof t&&this.storageService.setItem(u.VSCodeWindow.themeStorageKey,t)},e.prototype.reload=function(e,t){this.lifecycleService.unload(e).done(function(n){n||e.reload(t)})},e.prototype.open=function(e){var t,n=this,o=[];if(e.pathsToOpen&&e.pathsToOpen.length>0){if(t=e.pathsToOpen.map(function(t){var o=n.toIPath(t,!1,e.cli&&e.cli.gotoLineMode);if(!o){var i={title:n.envService.product.nameLong,type:"info",buttons:[r.localize("ok","OK")],message:r.localize("pathNotExistTitle","Path does not exist"),detail:r.localize("pathNotExistDetail","The path '{0}' does not seem to exist anymore on disk.",t),noLink:!0},s=v.BrowserWindow.getFocusedWindow();s?v.dialog.showMessageBox(s,i):v.dialog.showMessageBox(i)}return o}),t=a.coalesce(t),0===t.length)return null}else if(e.forceEmpty)t=[Object.create(null)];else{var i=e.cli.pathArguments.length>0;t=this.cliToPaths(e.cli,i)}var s=[],c=[],l=t.filter(function(e){return e.workspacePath&&!e.filePath&&!e.installExtensionPath}),d=t.filter(function(e){return!e.workspacePath&&!e.filePath&&!e.installExtensionPath}),p=t.filter(function(e){return e.installExtensionPath}).map(function(e){return e.filePath}),u=t.filter(function(e){return!!e.filePath&&e.createFilePath&&!e.installExtensionPath}),h=t.filter(function(e){return!!e.filePath&&!e.createFilePath&&!e.installExtensionPath});e.diffMode?(2===h.length?c=h:d=[Object.create(null)],l=[],u=[]):s=h;var f;if(!l.length&&(s.length>0||u.length>0||c.length>0||p.length>0)){var g=void 0;e.forceNewWindow?g=!0:(g=e.preferNewWindow,g&&!e.cli.extensionDevelopmentPath&&(g=this.settingsService.getValue("window.openFilesInNewWindow",g)));var w=this.getLastActiveWindow();if(!g&&w)w.focus(),w.ready().then(function(e){e.send("vscode:openFiles",{filesToOpen:s,filesToCreate:u,filesToDiff:c}),p.length&&e.send("vscode:installExtensions",{extensionsToInstall:p})}),o.push(w);else{f=this.toConfiguration(e.userEnv||this.initialUserEnv,e.cli,null,s,u,c,p);var S=this.openInBrowserWindow(f,!0);o.push(S),e.forceNewWindow=!0}}var m=e.preferNewWindow||e.forceNewWindow;if(l.length>0){var P=a.coalesce(l.map(function(e){return n.findWindow(e.workspacePath)}));if(P.length>0){var S=P[0];S.focus(),S.ready().then(function(e){e.send("vscode:openFiles",{filesToOpen:s,filesToCreate:u,filesToDiff:c}),p.length&&e.send("vscode:installExtensions",{extensionsToInstall:p})}),o.push(S),s=[],u=[],c=[],p=[],m=!0}l.forEach(function(t){if(!P.some(function(e){return n.isPathEqual(e.openedWorkspacePath,t.workspacePath)})){f=n.toConfiguration(e.userEnv||n.initialUserEnv,e.cli,t.workspacePath,s,u,c,p);var i=n.openInBrowserWindow(f,m,m?void 0:e.windowToUse);o.push(i),s=[],u=[],c=[],p=[],m=!0}})}return d.length>0&&d.forEach(function(){var t=n.toConfiguration(e.userEnv||n.initialUserEnv,e.cli),i=n.openInBrowserWindow(t,m,m?void 0:e.windowToUse);o.push(i),m=!0}),t.forEach(function(e){(e.filePath||e.workspacePath)&&v.app.addRecentDocument(e.filePath||e.workspacePath)}),t.forEach(function(e){return n.eventEmitter.emit(W.OPEN,e)}),a.distinct(o)},e.prototype.openPluginDevelopmentHostWindow=function(t){var n=this,o=e.WINDOWS.filter(function(e){return e.config&&n.isPathEqual(e.config.extensionDevelopmentPath,t.cli.extensionDevelopmentPath)});if(o&&1===o.length)return this.reload(o[0],t.cli),void o[0].focus();if(0===t.cli.pathArguments.length&&!t.cli.extensionTestsPath){var i=this.windowsState.lastPluginDevelopmentHostWindow&&this.windowsState.lastPluginDevelopmentHostWindow.workspacePath;i&&(t.cli.pathArguments=[i])}t.cli.pathArguments.length>0&&(o=e.WINDOWS.filter(function(e){return e.openedWorkspacePath&&t.cli.pathArguments.indexOf(e.openedWorkspacePath)>=0}),o.length&&(t.cli.pathArguments=[])),this.open({cli:t.cli,forceNewWindow:!0,forceEmpty:0===t.cli.pathArguments.length})},e.prototype.toConfiguration=function(e,t,n,o,i,r,s){var a=c.mixin({},t);a.execPath=process.execPath,a.workspacePath=n,a.filesToOpen=o,a.filesToCreate=i,a.filesToDiff=r,a.extensionsToInstall=s,a.appName=this.envService.product.nameLong,a.applicationName=this.envService.product.applicationName,a.darwinBundleIdentifier=this.envService.product.darwinBundleIdentifier,a.appRoot=this.envService.appRoot,a.version=l["default"].version,a.commitHash=this.envService.product.commit,a.appSettingsHome=this.envService.appSettingsHome,a.appSettingsPath=this.envService.appSettingsPath,a.appKeybindingsPath=this.envService.appKeybindingsPath,a.userExtensionsHome=this.envService.userExtensionsHome,a.extensionTips=this.envService.product.extensionTips,a.mainIPCHandle=this.envService.mainIPCHandle,a.sharedIPCHandle=this.envService.sharedIPCHandle,a.isBuilt=this.envService.isBuilt,a.crashReporter=this.envService.product.crashReporter,a.extensionsGallery=this.envService.product.extensionsGallery,a.welcomePage=this.envService.product.welcomePage,a.productDownloadUrl=this.envService.product.downloadUrl,a.releaseNotesUrl=this.envService.product.releaseNotesUrl,a.licenseUrl=this.envService.product.licenseUrl,a.updateFeedUrl=this.updateService.feedUrl,a.updateChannel=this.updateService.channel,a.aiConfig=this.envService.product.aiConfig,a.sendASmile=this.envService.product.sendASmile,a.enableTelemetry=this.envService.product.enableTelemetry,a.userEnv=e;var d=this.getRecentlyOpenedPaths(n,o);return a.recentFiles=d.files,a.recentFolders=d.folders,a},e.prototype.getRecentlyOpenedPaths=function(t,n){var o,i,r=this.storageService.getItem(e.openedPathsListStorageKey);return r?(o=r.files||[],i=r.folders||[]):(o=[],i=[]),n&&o.unshift.apply(o,n.map(function(e){return e.filePath})),t&&i.unshift(t),o=a.distinct(o),i=a.distinct(i),o=o.slice(0,10),i=i.slice(0,10),{files:o,folders:i}},e.prototype.toIPath=function(e,t,i){if(!e)return null;var r;i&&(r=h.parseLineAndColumnAware(e),e=r.path);var s=n.normalize(e);try{var a=o.statSync(s);if(a)return a.isFile()?{filePath:s,lineNumber:i?r.line:void 0,columnNumber:i?r.column:void 0,installExtensionPath:/\.vsix$/i.test(s)}:{workspacePath:s}}catch(c){if(t)return{filePath:s,createFilePath:!0}}return null},e.prototype.cliToPaths=function(e,t){var n=this,o=[];if(e.pathArguments.length>0)o=e.pathArguments;else{var i=void 0;i=this.lifecycleService.wasUpdated?y.ALL:this.settingsService.getValue("window.reopenFolders",y.ONE);var r=this.windowsState.lastActiveWindow&&this.windowsState.lastActiveWindow.workspacePath;if(i===y.ALL){var s=this.windowsState.openedFolders.map(function(e){return e.workspacePath});r&&(s.splice(s.indexOf(r),1),s.push(r)),o.push.apply(o,s)}else!r||i!==y.ONE&&i===y.NONE||o.push(r)}var a=o.map(function(o){return n.toIPath(o,t,e.gotoLineMode)}).filter(function(e){return!!e});return a.length>0?a:[Object.create(null)]},e.prototype.openInBrowserWindow=function(t,n,o){var i,r=this;if(n||(i=o||this.getLastActiveWindow(),i&&i.focus()),i){var s=i.config;!t.extensionDevelopmentPath&&s&&s.extensionDevelopmentPath&&(t.extensionDevelopmentPath=s.extensionDevelopmentPath,t.verboseLogging=s.verboseLogging,t.logExtensionHostCommunication=s.logExtensionHostCommunication,t.debugBrkFileWatcherPort=s.debugBrkFileWatcherPort,t.debugBrkExtensionHost=s.debugBrkExtensionHost,t.debugExtensionHostPort=s.debugExtensionHostPort,t.extensionsHomePath=s.extensionsHomePath)}else i=this.instantiationService.createInstance(u.VSCodeWindow,{state:this.getNewWindowState(t),extensionDevelopmentPath:t.extensionDevelopmentPath,allowFullscreen:this.lifecycleService.wasUpdated||this.settingsService.getValue("window.restoreFullscreen",!1)}),e.WINDOWS.push(i),i.win.webContents.removeAllListeners("devtools-reload-page"),i.win.webContents.on("devtools-reload-page",function(){return r.reload(i)}),i.win.webContents.on("crashed",function(){return r.onWindowError(i,P.CRASHED)}),i.win.on("unresponsive",function(){return r.onWindowError(i,P.UNRESPONSIVE)}),i.win.on("close",function(){return r.onBeforeWindowClose(i)}),i.win.on("closed",function(){return r.onWindowClosed(i)}),this.lifecycleService.registerWindow(i);return this.lifecycleService.unload(i).done(function(e){e||i.load(t)}),i},e.prototype.getNewWindowState=function(e){var t=this;if(e.extensionDevelopmentPath&&this.windowsState.lastPluginDevelopmentHostWindow)return this.windowsState.lastPluginDevelopmentHostWindow.uiState;if(e.workspacePath){var n=this.windowsState.openedFolders.filter(function(n){return t.isPathEqual(n.workspacePath,e.workspacePath)}).map(function(e){return e.uiState});if(n.length)return n[0]}var o=this.getLastActiveWindow();if(!o&&this.windowsState.lastActiveWindow)return this.windowsState.lastActiveWindow.uiState;var r,s=v.screen.getAllDisplays();if(1===s.length)r=s[0];else{if(i.isMacintosh){var a=v.screen.getCursorScreenPoint();r=v.screen.getDisplayNearestPoint(a)}!r&&o&&(r=v.screen.getDisplayMatching(o.getBounds())),r||(r=s[0])}var c=u.defaultWindowState();return c.x=r.bounds.x+r.bounds.width/2-c.width/2,c.y=r.bounds.y+r.bounds.height/2-c.height/2,this.ensureNoOverlap(c)},e.prototype.ensureNoOverlap=function(t){if(0===e.WINDOWS.length)return t;for(var n=e.WINDOWS.map(function(e){return e.getBounds()});n.some(function(e){return e.x===t.x||e.y===t.y});)t.x+=30,t.y+=30;return t},e.prototype.openFileFolderPicker=function(e){this.doPickAndOpen({pickFolders:!0,pickFiles:!0,forceNewWindow:e})},e.prototype.openFilePicker=function(e,t){this.doPickAndOpen({pickFiles:!0,forceNewWindow:e,path:t})},e.prototype.openFolderPicker=function(e){this.doPickAndOpen({pickFolders:!0,forceNewWindow:e})},e.prototype.doPickAndOpen=function(e){var t=this;this.getFileOrFolderPaths(e,function(n){n&&n.length&&t.open({cli:t.envService.cliArgs,pathsToOpen:n,forceNewWindow:e.forceNewWindow})})},e.prototype.getFileOrFolderPaths=function(t,o){var i,r=this,s=t.path||this.storageService.getItem(e.workingDirPickerStorageKey),a=this.getFocusedWindow();i=t.pickFiles&&t.pickFolders?["multiSelections","openDirectory","openFile","createDirectory"]:["multiSelections",t.pickFolders?"openDirectory":"openFile","createDirectory"],v.dialog.showOpenDialog(a&&a.win,{defaultPath:s,properties:i},function(t){t&&t.length>0?(r.storageService.setItem(e.workingDirPickerStorageKey,n.dirname(t[0])),o(t)):o(void 0)})},e.prototype.focusLastActive=function(e){var t=this.getLastActiveWindow();if(t)return t.focus(),t;this.windowsState.openedFolders=[];var n=this.open({cli:e});return n&&n[0]},e.prototype.getLastActiveWindow=function(){if(e.WINDOWS.length){var t=Math.max.apply(Math,e.WINDOWS.map(function(e){return e.lastFocusTime})),n=e.WINDOWS.filter(function(e){return e.lastFocusTime===t});if(n&&n.length)return n[0]}return null},e.prototype.findWindow=function(t,n,o){var i=this;if(e.WINDOWS.length){var r=e.WINDOWS.slice(0),a=this.getLastActiveWindow();a&&(r.splice(r.indexOf(a),1),r.unshift(a));var c=r.filter(function(e){return!("string"!=typeof e.openedWorkspacePath||!i.isPathEqual(e.openedWorkspacePath,t))||(!("string"!=typeof e.openedFilePath||!i.isPathEqual(e.openedFilePath,n))||(!("string"!=typeof e.openedWorkspacePath||!n||!s.isEqualOrParent(n,e.openedWorkspacePath))||"string"==typeof o&&e.extensionDevelopmentPath===o))});if(c&&c.length)return c[0]}return null},e.prototype.openNewWindow=function(){this.open({cli:this.envService.cliArgs,forceNewWindow:!0,forceEmpty:!0})},e.prototype.sendToFocused=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var o=this.getFocusedWindow()||this.getLastActiveWindow();o&&o.sendWhenReady.apply(o,[e].concat(t))},e.prototype.sendToAll=function(t,n,o){e.WINDOWS.forEach(function(e){o&&o.indexOf(e.id)>=0||e.sendWhenReady(t,n)})},e.prototype.getFocusedWindow=function(){var e=v.BrowserWindow.getFocusedWindow();return e?this.getWindowById(e.id):null},e.prototype.getWindowById=function(t){var n=e.WINDOWS.filter(function(e){return e.id===t});return n&&1===n.length?n[0]:null},e.prototype.getWindows=function(){return e.WINDOWS},e.prototype.getWindowCount=function(){return e.WINDOWS.length},e.prototype.onWindowError=function(e,t){var n=this;console.error(t===P.CRASHED?"[VS Code]: render process crashed!":"[VS Code]: detected unresponsive"),t===P.UNRESPONSIVE?v.dialog.showMessageBox(e.win,{title:this.envService.product.nameLong,type:"warning",buttons:[r.localize("reopen","Reopen"),r.localize("wait","Keep Waiting"),r.localize("close","Close")],message:r.localize("appStalled","The window is no longer responding"),detail:r.localize("appStalledDetail","You can reopen or close the window or keep waiting."),noLink:!0},function(t){0===t?e.reload():2===t&&(n.onBeforeWindowClose(e),e.win.destroy())}):v.dialog.showMessageBox(e.win,{title:this.envService.product.nameLong,type:"warning",buttons:[r.localize("reopen","Reopen"),r.localize("close","Close")],message:r.localize("appCrashed","The window has crashed"),detail:r.localize("appCrashedDetail","We are sorry for the inconvenience! You can reopen the window to continue where you left off."),noLink:!0},function(t){0===t?e.reload():1===t&&(n.onBeforeWindowClose(e),e.win.destroy())})},e.prototype.onBeforeWindowClose=function(e){var t=this;if(e.readyState===u.ReadyState.READY){var n={workspacePath:e.openedWorkspacePath,uiState:e.serializeWindowState()};e.isPluginDevelopmentHost?this.windowsState.lastPluginDevelopmentHostWindow=n:(this.windowsState.lastActiveWindow=n,this.windowsState.openedFolders.forEach(function(o){t.isPathEqual(o.workspacePath,e.openedWorkspacePath)&&(o.uiState=n.uiState)}))}},e.prototype.onWindowClosed=function(t){t.dispose();var n=e.WINDOWS.indexOf(t);e.WINDOWS.splice(n,1),this.eventEmitter.emit(W.CLOSE,t.id)},e.prototype.isPathEqual=function(e,t){return e===t||!(!e||!t)&&(e=n.normalize(e),t=n.normalize(t),e===t||(i.isLinux||(e=e.toLowerCase(),t=t.toLowerCase()),e===t))},e.openedPathsListStorageKey="openedPathsList",e.workingDirPickerStorageKey="pickerWorkingDir",e.windowsStateStorageKey="windowsState",e.WINDOWS=[],e=__decorate([__param(0,m.IInstantiationService),__param(1,S.ILogService),__param(2,p.IStorageService),__param(3,h.IEnvironmentService),__param(4,f.ILifecycleService),__param(5,w.IUpdateService),__param(6,g.ISettingsService)],e)}();t.WindowsManager=E});