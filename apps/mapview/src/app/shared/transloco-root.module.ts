import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { Inject, Injectable, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(
    private http: HttpClient,
    @Inject(APP_BASE_HREF) private readonly baseHref: string
  ) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(
      `${this.baseHref}/assets/i18n/${lang}.json`
    );
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'sk'],
        defaultLang: 'sk',
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
