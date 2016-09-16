/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},__decorate=this&&this.__decorate||function(e,t,n,i){var r,c=arguments.length,o=c<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(c<3?r(o):c>3?r(t,n,o):r(t,n))||o);return c>3&&o&&Object.defineProperty(t,n,o),o},__param=this&&this.__param||function(e,t){return function(n,i){t(n,i,e)}};define(["require","exports","vs/nls","vs/base/browser/dom","vs/base/common/errors","vs/base/common/winjs.base","vs/base/common/actions","vs/workbench/browser/viewlet","vs/workbench/services/viewlet/common/viewletService","vs/workbench/parts/search/common/searchModel","vs/workbench/parts/search/common/replace","vs/workbench/parts/search/common/constants","vs/base/parts/tree/browser/treeDefaults","vs/platform/instantiation/common/instantiation","forked/openSettings","vs/workbench/services/editor/common/editorService","vs/platform/telemetry/common/telemetry","vs/base/common/keyCodes","vs/platform/keybinding/common/keybinding","vs/workbench/parts/files/common/editors/fileEditorInput"],function(e,t,n,i,r,c,o,s,l,a,u,h,v,p,f,m,_,d,b,w){"use strict";function S(e){var t=e.getActiveViewlet(),n=document.activeElement;return t&&t.getId()===h.VIEWLET_ID&&n&&i.isAncestor(n,t.getContainer().getHTMLElement())}function g(e,t,n){return t="number"==typeof t?new d.Keybinding(t):t,e+" ("+n.getLabelFor(t)+")"}t.isSearchViewletFocussed=S,t.appendKeyBindingLabel=g;var I=function(e){function t(t,n,i,r){e.call(this,t,n,h.VIEWLET_ID,i,r)}return __extends(t,e),t.ID=h.VIEWLET_ID,t.LABEL=n.localize("showSearchViewlet","Show Search"),t=__decorate([__param(2,l.IViewletService),__param(3,m.IWorkbenchEditorService)],t)}(s.ToggleViewletAction);t.OpenSearchViewletAction=I;var A=function(e){function t(t,n,i){e.call(this,t,n),this.viewletService=i}return __extends(t,e),t.prototype.run=function(){return this.viewletService.openViewlet(h.VIEWLET_ID,!0).then(function(e){var t=e.searchAndReplaceWidget;t.toggleReplace(!0),t.focus(!1,!0)})},t.ID="workbench.action.replaceInFiles",t.LABEL=n.localize("replaceInFiles","Replace in Files"),t=__decorate([__param(2,l.IViewletService)],t)}(o.Action);t.ReplaceInFilesAction=A;var y=function(e){function t(t,i){e.call(this,"workbench.search.action.findInFolder",n.localize("findInFolder","Find in Folder")),this.viewletService=i,this.resource=t}return __extends(t,e),t.prototype.run=function(e){var t=this;return this.viewletService.openViewlet(h.VIEWLET_ID,!0).then(function(e){e.searchInFolder(t.resource)})},t=__decorate([__param(1,l.IViewletService)],t)}(o.Action);t.FindInFolderAction=y;var E=function(e){function t(t){e.call(this,"refresh"),this.viewlet=t,this.label=n.localize("RefreshAction.label","Refresh"),this.enabled=!1,this["class"]="search-action refresh"}return __extends(t,e),t.prototype.run=function(){return this.viewlet.onQueryChanged(!0),c.TPromise.as(null)},t}(o.Action);t.RefreshAction=E;var F=function(e){function t(t){e.call(this,t.getControl(),!1),this["class"]="search-action collapse"}return __extends(t,e),t}(v.CollapseAllAction);t.CollapseAllAction=F;var R=function(e){function t(t){e.call(this,"clearSearchResults"),this.viewlet=t,this.label=n.localize("ClearSearchResultsAction.label","Clear Search Results"),this.enabled=!1,this["class"]="search-action clear-search-results"}return __extends(t,e),t.prototype.run=function(){return this.viewlet.clearSearchResults(),c.TPromise.as(null)},t}(o.Action);t.ClearSearchResultsAction=R;var x=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.getNextFocusElement=function(e,t){if(t===e.getFocus()){for(var n=e.getNavigator();n.current()!==t&&n.next(););var i=n.previous();i?n.next():n.first();var r=void 0;if(t instanceof a.FileMatch){for(;n.next()&&!(n.current()instanceof a.FileMatch););r=n.current()}else r=n.next();return r?r:i}return null},t}(o.Action);t.AbstractSearchAndReplaceAction=x;var D=function(e){function t(t,i){e.call(this,"remove",n.localize("RemoveAction.label","Remove"),"action-remove"),this.viewer=t,this.element=i}return __extends(t,e),t.prototype.run=function(){var e=this.getNextFocusElement(this.viewer,this.element);e&&this.viewer.setFocus(e);var t;if(this.element instanceof a.FileMatch){var n=this.element.parent();n.remove(this.element),t=n}else{var i=this.element.parent();i.remove(this.element),t=0===i.count()?i.parent():i}return this.viewer.DOMFocus(),this.viewer.refresh(t)},t}(x);t.RemoveAction=D;var M=function(e){function t(i,r,c,o,s,l){e.call(this,"file-action-replace-all",g(n.localize("file.replaceAll.label","Replace All"),t.KEY_BINDING,s),"action-replace-all"),this.viewer=i,this.fileMatch=r,this.viewlet=c,this.replaceService=o,this.telemetryService=l}return __extends(t,e),Object.defineProperty(t,"KEY_BINDING",{get:function(){return d.KeyMod.Shift|d.CommonKeybindings.CTRLCMD_ENTER},enumerable:!0,configurable:!0}),t.prototype.run=function(){var e=this;this.telemetryService.publicLog("replaceAll.action.selected");var t=this.getNextFocusElement(this.viewer,this.fileMatch);return this.fileMatch.parent().replace(this.fileMatch).then(function(){t&&e.viewer.setFocus(t),e.viewer.DOMFocus(),e.viewlet.open(e.fileMatch,!0)})},t=__decorate([__param(3,u.IReplaceService),__param(4,b.IKeybindingService),__param(5,_.ITelemetryService)],t)}(x);t.ReplaceAllAction=M;var C=function(e){function t(i,r,c,o,s,l,a){e.call(this,"action-replace",g(n.localize("match.replace.label","Replace"),t.KEY_BINDING,s),"action-replace"),this.viewer=i,this.element=r,this.viewlet=c,this.replaceService=o,this.editorService=l,this.telemetryService=a}return __extends(t,e),Object.defineProperty(t,"KEY_BINDING",{get:function(){return d.KeyMod.Shift|d.KeyMod.CtrlCmd|d.KeyCode.KEY_1},enumerable:!0,configurable:!0}),t.prototype.run=function(){var e=this;this.telemetryService.publicLog("replace.action.selected");var t=this.getNextFocusElement(this.viewer,this.element),n=t&&t instanceof a.Match?t:this.element.parent();return this.element.parent().replace(this.element).then(function(){t&&e.viewer.setFocus(t),e.viewer.DOMFocus(),e.isFileActive(e.element.parent())?e.viewlet.open(n,!0):e.replaceService.openReplacePreviewEditor(n,!0)})},t.prototype.isFileActive=function(e){var t=this.editorService.getActiveEditorInput();return t instanceof w.FileEditorInput&&t.getResource().fsPath===e.resource().fsPath},t=__decorate([__param(3,u.IReplaceService),__param(4,b.IKeybindingService),__param(5,m.IWorkbenchEditorService),__param(6,_.ITelemetryService)],t)}(x);t.ReplaceAction=C;var L=function(e){function t(t){e.call(this,"configureGlobalExclusionsAction"),this.instantiationService=t,this.label=n.localize("ConfigureGlobalExclusionsAction.label","Open Settings"),this.enabled=!0,this["class"]="search-configure-exclusions"}return __extends(t,e),t.prototype.run=function(){var e=this.instantiationService.createInstance(f.OpenGlobalSettingsAction,f.OpenGlobalSettingsAction.ID,f.OpenGlobalSettingsAction.LABEL);return e.run().done(function(){return e.dispose()},r.onUnexpectedError),c.TPromise.as(null)},t=__decorate([__param(0,p.IInstantiationService)],t)}(o.Action);t.ConfigureGlobalExclusionsAction=L});