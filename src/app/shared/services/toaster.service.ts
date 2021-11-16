import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      positionClass: 'toast-top-full-width'
    });
  }

  showInfo(message: string, title?: string) {
    this.toastr.info(message, title, {
      progressBar: true,
      positionClass: 'toast-top-full-width'
    });
  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title, {
      progressBar: true,
      positionClass: 'toast-top-full-width'
    });
  }

  showError(message: string, title?: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      positionClass: 'toast-top-full-width'
    });
  }
}
