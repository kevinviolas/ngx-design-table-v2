# NgxDesignTable


### Install
``` npm install --save sfvii/ngx-design-table ```


### Todo 

    Complete  this documentation, adding sample assets for icon generation and theming  

### How To Use 

```
  import {
    CellsComponentList,
    CoreMatTable,
    CoreMatTableInterface,
    displayedColumnsInterface
} from "ngx-design-table/dist/table";

....

   class X {
       public columnDefinitions: displayedColumnsInterface[] = [
        {key: 'CaseNumber', value: 'No.', order: 1, class: 'u-3', module: CellsComponentList.ButtonLink, sort: true},
        {key: 'Status', value: 'Statut', order: 2, class: 'u-3', sort: true},
        {key: 'Priority', value: 'Priorité', order: 3, class: 'u-2', module: CellsComponentList.Priority, sort: true},
        {key: 'Subject', value: 'Titre', order: 4, sort: true},
        {key: 'AccountName', value: 'Site', order: 5, class: 'u-4', sort: true},
        {
            key: 'ContactName',
            value: 'Contact',
            order: 6,
            class: 'u-2',
            module: CellsComponentList.NameAvatar,
            override: ['ContactName', 'Email'],
            sort: true
        },
        {key: 'Title', value: 'Fonction', order: 7, class: 'u-3', sort: true},
        {key: 'Origin', value: 'Origine', order: 8, class: 'u-2', module: CellsComponentList.Origin, sort: true},
        {key: 'Nature__c', value: 'Nature', order: 9, class: 'u-3', sort: true},
        {
            key: 'CreatedDate',
            value: 'Date d\'ouverture',
            order: 10,
            class: 'u-4',
            module: CellsComponentList.DateFormat,
            sort: true
        },
        {key: 'Attachments', value: 'icon.attach_file', order: 11, class: 'u-2', module: CellsComponentList.CountRow}]
   }
   
   ngOnInit() {
       this.tickets = new CoreMatTable(<your data>,  {
                active: 'CreatedDate', direction: 'asc'
            }, {active: '', valueStart: null, valueEnd: null}
        , 15);
   }
   
   
   
     <ngx-design-table [columnDefinitions]="columnDefinitions" 
                       [displayDetail]="true" 
                       [data]="tickets">
     </ngx-design-table>

```

Add this lines to angular.json:

    {
        ...
        "assets": [
            ...,
            {
                "glob": "**/*",
                "input": "./node_modules/table/assets/flags",
                "output": "./assets/flags"
            }
        ].
        ...
    }

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
