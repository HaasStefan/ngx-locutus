# NGX Locutus
- The alternative **Angular Translation Library** used for large scale microfrontend translations. 
- No more worrying about shared translation assets.
- Truly independent translations. 
- Lazy loaded translations.
- Scopes by default.

## Demo

A project named demo is inside the projects folder which should explain the most basic concepts.

## Installation

    npm install ngx-locutus --save

## Usage


### Translation files
Locutus uses Typescript constants as translation files. It is suggested to create an interface definition for each translation and let the explicit translation constant be of the interface type. 

Suggested file structure:

|--assets

|----i18n

|------scope1

|--------en.ts

|--------de.ts

|--------scope1.ts

scope1.ts includes the interface definition for the translation object and also defines an array of TranslationLoaders. It is of big importance that the loaders do reference the translation files in a hardcoded manner such that the files will not be tree-shaken. 

    export const Scope1Loaders: TranslationLoader[] = [
      { de: () => from(import('./de').then(t => t.DE)) },
      { en: () => from(import('./en').then(t => t.EN)) }
    ];


### Import LocutusModule

Call forRoot() in your AppModule and forChild in each feature module. 
- **forRoot** needs a TranslationConfiguration consisting of the scope-name, translation-loaders and the active language
- **forChild** needs a TranslationConfiguration consisting of the scope-name, translation-loaders 

AppModule Import:

     LocutusModule.forRoot([{
      loaders: Scope1Loaders,
      scope: 'scope1',
      language: 'de'
    }])
Feature Module Import:

    LocutusModule.forChild([{
      scope: 'picard',
      loaders: PicardLoaders
    }])


### Translation API
Use the locutus **directive** to make translations in your template:

    <ng-container *locutus="let t of 'scope1'">
      {{t.title}}
    </ng-container>

Or use the **pipe**:

    {{ 'title' | locutus:'scope1' | async }}

Or in the **code** using the LocutusService:

To retrieve a specific key in a scope:

    this.title$ = this.locutus.translate('scope1', 'title');
To retrieve an entire scope:

    this.scope1$ = this.locutus.getTranslations('scope1');

### Lazy Loaded Modules
If you have a lazy loaded module, please make sure that you define the LazyLocutusGuard on the route. Since the translation configurations are registered using APP_INITIALIZER, which is only called once when the application is bootstrapped, you will have to use the guard to register the translation configuration specified in the forChild method.

    imports: [
      CommonModule,
      RouterModule.forChild([
        {
          path:  '',
          canActivate: [LazyLocutusGuard],
          component:  PicardComponent
        }
      ]),
      LocutusModule.forChild([{
        scope:  'picard',
        loaders:  PicardLoaders
      }])
    ]
