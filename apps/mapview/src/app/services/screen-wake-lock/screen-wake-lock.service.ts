import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

interface IWakeLockReleaser {
  release: () => void;
}

type IWakeLock = {
  request: (type: 'screen') => Promise<IWakeLockReleaser>;
};

@Injectable({
  providedIn: 'root',
})
export class ScreenWakeLockService {
  static supported = 'wakeLock' in navigator;
  private wakeLock?: IWakeLockReleaser;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly translocoService: TranslocoService
  ) {}

  lock(): void {
    if (ScreenWakeLockService.supported) {
      (navigator as unknown as { wakeLock: IWakeLock }).wakeLock
        .request('screen')
        .then(
          (wakeLock) => {
            this.wakeLock = wakeLock;
          },
          () => this.showErrorMsg('wakeLock.lockingError')
        );
    } else {
      this.showErrorMsg('wakeLock.notSupported');
    }
  }

  release(): void {
    this.wakeLock?.release();
    this.wakeLock = undefined;
  }

  private showErrorMsg(msg: string): void {
    this.snackBar.open(this.translocoService.translate(msg), undefined, {
      duration: 5000,
      politeness: 'polite',
    });
  }
}
