import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private lang = {
      'fr': {
          'SEARCH': `Recherche...`,
          'OPEN': 'Ouvrir',
          'CANCEL_SEARCH': 'Annuler la recherche',
          'NO_RESULT': 'Aucun résultat correspondant',
          'DETAILS': 'Détails'
      },
      'en': {
          'SEARCH': `Search...`,
          'OPEN': 'Open',
          'CANCEL_SEARCH': 'Cancel search',
          'NO_RESULT': 'No corresponding result',
          'DETAILS': 'Details'
      }
  }

  constructor() { }

  public translate(l, word) {
    return this.lang[l][word];
  }
}
