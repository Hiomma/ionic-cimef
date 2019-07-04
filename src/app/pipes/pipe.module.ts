import { SafePipe } from './safe-pipe/safe.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        SafePipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SafePipe
    ]
})
export class PipeModule { }
