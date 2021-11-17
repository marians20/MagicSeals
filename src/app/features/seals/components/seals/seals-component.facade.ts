import { Injectable, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { ToasterService } from "../../../../shared/services/toaster.service";
import { ChargeAndLaunchService } from "../../services/charge-and-launch.service";
import { GraphicalSealService } from "../../services/graphical-seal.service";
import { SealsService } from "../../services/seals.service";
import { StrategySelectorService } from "../../services/strategy-selector.service";
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SealsComponentFacade {
  private _sealsService: SealsService | undefined;
  private _strategyService: StrategySelectorService | undefined;
  private _graphicalSealService: GraphicalSealService | undefined;
  private _chargeAndLaunchService: ChargeAndLaunchService | undefined;
  private _toastr: ToasterService | undefined;
  private _translate: TranslateService | undefined;
  private _confirmation: ConfirmationDialogService | undefined;
  private _auth: AuthService | undefined;
  private _router: Router | undefined;

  constructor(private readonly injector: Injector){}

  get onStrategyChange() {
    return this.strategyService.onStrategyChange;
  }

  get onLangChange() {
    return this.translate.onLangChange;
  }

  get onLoggedOut() {
    return this.auth.onLoggedOut;
  }

  getTranslations = (key: string) => this.translate.get(key);

  getSeal = (statement: string) =>
    this.sealsService.getSeal(statement, this.strategyService.strategy);

  drawSigil = (literalSigil: string) => this.graphicalSealService.drawSigil(literalSigil);

  openChargeAndLaunchDialog = (title: string) => this.chargeAndLaunchService.openDialog(title);

  showSuccessToaster = (message: string, title?: string) => this.toastr.showSuccess(message, title);

  showErrorToaster = (message: string, title?: string) => this.toastr.showError(message, title);

  openConfirmationDialog = (message: string, title: string) => this.confirmation.openDialog(message, title);

  navigate = (args: string[]) => this.router.navigate(args);

  private get sealsService(): SealsService {
    if(!this._sealsService) {
      this._sealsService = this.injector.get(SealsService);
    }

    return this._sealsService;
  }

  private get strategyService(): StrategySelectorService {
    if(!this._strategyService) {
      this._strategyService = this.injector.get(StrategySelectorService);
    }

    return this._strategyService;
  }

  private get graphicalSealService(): GraphicalSealService {
    if(!this._graphicalSealService) {
      this._graphicalSealService = this.injector.get(GraphicalSealService);
    }

    return this._graphicalSealService;
  }

  private get chargeAndLaunchService(): ChargeAndLaunchService {
    if(!this._chargeAndLaunchService) {
      this._chargeAndLaunchService = this.injector.get(ChargeAndLaunchService);
    }

    return this._chargeAndLaunchService;
  }

  private get toastr(): ToasterService {
    if(!this._toastr) {
      this._toastr = this.injector.get(ToasterService);
    }

    return this._toastr;
  }

  private get translate(): TranslateService {
    if(!this._translate) {
      this._translate = this.injector.get(TranslateService);
    }

    return this._translate;
  }

  private get confirmation(): ConfirmationDialogService {
    if(!this._confirmation) {
      this._confirmation = this.injector.get(ConfirmationDialogService);
    }

    return this._confirmation;
  }

  private get auth(): AuthService {
    if(!this._auth) {
      this._auth = this.injector.get(AuthService);
    }

    return this._auth;
  }

  private get router(): Router {
    if(!this._router) {
      this._router = this.injector.get(Router);
    }

    return this._router;
  }
}
