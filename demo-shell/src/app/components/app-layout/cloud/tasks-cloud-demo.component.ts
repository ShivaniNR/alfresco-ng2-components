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

import { Component, ViewChild, OnInit } from '@angular/core';
import { TaskListCloudComponent, TaskListCloudSortingModel, TaskFilterCloudModel } from '@alfresco/adf-process-services-cloud';
import { UserPreferencesService, AppConfigService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudLayoutService } from './services/cloud-layout.service';

@Component({
    templateUrl: 'tasks-cloud-demo.component.html',
    styleUrls: ['tasks-cloud-demo.component.scss']
})
export class TasksCloudDemoComponent implements OnInit {

    public static ACTION_SAVE_AS = 'SAVE_AS';
    static TASK_FILTER_PROPERTY_KEYS = 'adf-edit-task-filter.properties';

    @ViewChild('taskCloud')
    taskCloud: TaskListCloudComponent;

    applicationName: string = '';

    isFilterLoaded = false;

    selectedRow: any;

    sortArray: TaskListCloudSortingModel[];
    editedFilter: TaskFilterCloudModel;
    taskFilterProperties: any[] = [];

    filterId;

    constructor(
        private cloudLayoutService: CloudLayoutService,
        private route: ActivatedRoute,
        private router: Router,
        private userPreference: UserPreferencesService,
        private appConfig: AppConfigService) {

        const properties = this.appConfig.get<Array<any>>(TasksCloudDemoComponent.TASK_FILTER_PROPERTY_KEYS);
        if (properties) {
            this.taskFilterProperties = properties;
        }
    }

    ngOnInit() {
        this.isFilterLoaded = false;
        this.route.parent.params.subscribe((params) => {
            this.applicationName = params.applicationName;
        });

        this.route.queryParams.subscribe((params) => {
            this.isFilterLoaded = true;
            this.onFilterChange(params);
            this.filterId = params.id;
        });
    }

    onChangePageSize(event) {
        this.userPreference.paginationSize = event.maxItems;
    }

    onRowClick(taskId) {
        this.router.navigate([`/cloud/${this.applicationName}/task-details/${taskId}`]);
    }

    onFilterChange(filter: any) {
        this.editedFilter = Object.assign({}, filter);
        this.sortArray = [new TaskListCloudSortingModel({ orderBy: this.editedFilter.sort, direction: this.editedFilter.order })];
    }

    onTaskFilterAction(filterAction: any) {
        this.cloudLayoutService.setCurrentTaskFilterParam({ id: filterAction.filter.id });
        if (filterAction.actionType === TasksCloudDemoComponent.ACTION_SAVE_AS) {
            this.router.navigate([`/cloud/${this.applicationName}/tasks/`], { queryParams: filterAction.filter });
        }
    }
}
