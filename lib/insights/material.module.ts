/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatChipsModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
    MatInputModule, MatListModule, MatNativeDateModule, MatOptionModule, MatProgressSpinnerModule, MatRadioModule,
    MatRippleModule, MatSelectModule, MatSlideToggleModule, MatTableModule, MatTabsModule,
    MatTooltipModule, MatMenuModule,
    MAT_LABEL_GLOBAL_OPTIONS
} from '@angular/material';

export function modules() {
    return [
        MatAutocompleteModule, MatButtonModule, MatCardModule, MatDialogModule,
        MatCheckboxModule, MatDatepickerModule, MatGridListModule, MatIconModule, MatInputModule,
        MatListModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatTableModule,
        MatTabsModule, MatProgressSpinnerModule, MatNativeDateModule, MatRippleModule, MatTooltipModule,
        MatChipsModule, MatMenuModule
    ];
}

@NgModule({
    imports: modules(),
    exports: modules(),
    providers: [
        { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' }}
    ]
})
export class MaterialModule {}
