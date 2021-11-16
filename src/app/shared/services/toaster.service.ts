import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private readonly position: string = 'toast-top-full-width';
  private readonly progressBar: boolean = true;

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title, {
      progressBar: this.progressBar,
      positionClass: this.position
    });
  }

  showInfo(message: string, title?: string) {
    this.toastr.info(message, title, {
      progressBar: this.progressBar,
      positionClass: this.position
    });
  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title, {
      progressBar: this.progressBar,
      positionClass: this.position
    });
  }

  showError(message: string, title?: string) {
    this.toastr.error(message, title, {
      progressBar: this.progressBar,
      positionClass: this.position
    });
  }
}
