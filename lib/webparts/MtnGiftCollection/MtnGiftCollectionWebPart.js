var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'mtnGiftCollectionWebPartStrings';
import mtnGiftCollection from './components/MtnGiftCollection';
import { sp } from "@pnp/sp/presets/all";
var mtnGiftCollectionWebPart = /** @class */ (function (_super) {
    __extends(mtnGiftCollectionWebPart, _super);
    function mtnGiftCollectionWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    mtnGiftCollectionWebPart.prototype.onInit = function () {
        sp.setup({
            spfxContext: this.context
        });
        return Promise.resolve();
    };
    mtnGiftCollectionWebPart.prototype.render = function () {
        var element = React.createElement(mtnGiftCollection, { context: this.context,
            pageContext: this.context.pageContext,
        });
        ReactDom.render(element, this.domElement);
    };
    mtnGiftCollectionWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(mtnGiftCollectionWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    mtnGiftCollectionWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return mtnGiftCollectionWebPart;
}(BaseClientSideWebPart));
export default mtnGiftCollectionWebPart;
//# sourceMappingURL=MtnGiftCollectionWebPart.js.map