import {DestroyRef, inject, Injectable, NgZone} from '@angular/core';
import {OutMsg} from '../models/out-msg';
import {InMsg} from '../models/in-msg';
import {filter, map, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PenpotMessagingService {
  private zone = inject(NgZone)
  private destroyRef = inject(DestroyRef)

  private bus$ = new Subject<InMsg>()
  private readonly allowedOrigins = ['http://localhost:9001', 'http://localhost:4200']

  constructor() {
    const handler = (event: MessageEvent) => {
      // Filtrage d’origine (optionnel mais recommandé)
      if (
        this.allowedOrigins.length &&
        !this.allowedOrigins.some((o) => event.origin.startsWith(o))
      ) {
        return
      }
      if (!event.data || typeof event.data !== 'object') return

      // Réintégrer la zone Angular pour déclencher le CD
      this.zone.run(() => this.bus$.next(event.data as InMsg))
    }

    // Attache l’écouteur hors zone pour limiter le coût
    this.zone.runOutsideAngular(() => {
      window.addEventListener('message', handler)
    })

    // Nettoyage automatique à la destruction de l’app
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('message', handler)
    })
  }

  /** Flux de tous les messages entrants */
  messages$(): Observable<InMsg> {
    return this.bus$.asObservable()
  }

  /** Sélecteur pratique : ne recevez que le type voulu */
  on<T extends InMsg['type']>(type: T): Observable<Extract<InMsg, { type: T }>> {
    return this.bus$.pipe(
      filter((m) => m?.type === type),
      map((m) => m as any)
    )
  }

  /** Émettre un message vers Penpot (le parent de l’iframe) */
  send(msg: OutMsg) {
    const targetOrigin = '*'; // Remplacez par l’origine exacte
    try {
     // console.log("Sending message to parent:", msg);
      parent.postMessage(msg, targetOrigin);
    } catch (error) {
     // console.error("Failed to send message:", error);
    }
  }
}
