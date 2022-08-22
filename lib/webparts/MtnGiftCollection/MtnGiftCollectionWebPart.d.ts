import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ImtnGiftCollectionWebPartProps {
    description: string;
}
export default class mtnGiftCollectionWebPart extends BaseClientSideWebPart<ImtnGiftCollectionWebPartProps> {
    onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=MtnGiftCollectionWebPart.d.ts.map