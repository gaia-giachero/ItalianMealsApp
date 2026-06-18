# __PROGRESS.md__ 
**Avanzamento Progetto**  

**Nome:** Gaia Giachero  
**Data ultimo aggiornamento:** 18/06/2026  
**Repository GitHub:** [🔗 Link al repo](https://github.com/gaia-giachero/ItalianMealsApp.git)  

---
 
## Schermate completate
| # | Schermata | Stato | Screenshot | Note |
|---|-----------|-------|------------|------|
| 1 | Login | ❌ Mancante | — | Non ancora implementata |
| 2 | Header profilo (avatar + nome) | ❌ Mancante | — | Non ancora implementata |
| 3 | Lista piatti italiani | 🔄 In corso | — | `FlatList` + fetch API ok; mancano stati loading/error/retry |
| 4 | Ricerca / filtro | ❌ Mancante | — | Non ancora implementata |
| 5 | Dettaglio piatto | 🔄 In corso | — | Riceve `idMeal` via `route.params`; mancano immagine, istruzioni, ingredienti da `lookup.php` |
| 6 | Preferiti (AsyncStorage) | ❌ Mancante | — | Non ancora implementata |
| 7 | Impostazioni + logout | ❌ Mancante | — | Non ancora implementata |
| 8 | Schermata errore + Retry | ❌ Mancante | — | `loadMeals` fa solo `console.log` sull'errore |
| 9 | Accessibilità (≥ 2 accorgimenti) | ❌ Mancante | — | Nessun `accessibilityLabel` presente |
| 10 | Deep link (`exp://…/meal/:idMeal`) | 🔄 In corso | — | Config `linking` presente in `App.tsx` ma usa `myapp://` invece di `exp://`; da correggere |
 
> **Come aggiungere screenshot:** salva le immagini in `docs/screenshots/` nella root del repo e aggiorna i path nella tabella (es. `docs/screenshots/login.png`).
 
---
 
## Documentazione Lab 13–22
📄 [Google Doc condiviso — Lab 13-22](https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?usp=sharing)
 
---
 
## Stato attuale del codice
### Cosa è già presente
- `App.tsx` — navigazione `Stack` con `NavigationContainer` e config `linking` (deep link parziale)
- `HomeScreen.tsx` — `FlatList` che carica i pasti italiani da API con `useEffect` + `useState<Meal[]>`
- `loadMeals.ts` — funzione asincrona che chiama `fetchItalianMeals()` e popola lo stato
- `DetailsScreen.tsx` — riceve `idMeal` da `route.params`, mostra ID e path; gestisce il caso `id` mancante
- Struttura cartelle `src/screens/` e `src/hooks/` avviata

### Cosa manca ancora
**Funzionalità non implementate:**
- [ ] Login con i 3 utenti mock (`services/auth.ts` con `MOCK_USERS`)
- [ ] Avatar rotondo + nome utente dopo il login (lab 07)
- [ ] Ricerca/filtro sulla lista in memoria (`TextInput`)
- [ ] Schermata Dettaglio completa: fetch `lookup.php?i={idMeal}`, immagine, istruzioni, ingredienti
- [ ] Preferiti con `AsyncStorage` (chiave `app:v1:favs`)
- [ ] Schermata Impostazioni con logout
- [ ] Stato UI strutturato `{ status, data, message }` al posto delle variabili sparse (lab 15)
- [ ] Retry su errore API (al momento `catch` fa solo `console.log`)
- [ ] Stato globale `AuthContext` / `FavoritesContext` (o Zustand) — lab 17
- [ ] `accessibilityLabel` su elementi interattivi (≥ 2 obbligatori)
**Bug noti:**
- Deep link configurato con `myapp://` invece di `exp://` — da correggere per il test con `npx uri-scheme open`
- `DetailsScreen` mostra solo ID e path, non carica i dati reali del piatto da API
- `loadMeals` usa `setMealsItems` passato come `any` — da tipizzare
---
 
*Aggiornato ogni settimana. Prossimo checkpoint: **9 luglio 2026**.*