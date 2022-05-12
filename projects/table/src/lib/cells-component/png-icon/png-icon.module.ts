import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PngIconComponent} from "./png-icon.component";

@NgModule({
    declarations: [PngIconComponent],
    imports: [
        CommonModule
    ],
    exports: [
        PngIconComponent
    ]
})
export class PngIconModule {
}
