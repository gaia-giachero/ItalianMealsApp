# __PROGRESS.md__ 
**Avanzamento Progetto**  

**Nome:** Gaia Giachero  
**Data ultimo aggiornamento:** 21/06/2026  
**Repository GitHub:** [🔗 Link al repo](https://github.com/gaia-giachero/ItalianMealsApp.git)  

---
 
## Schermate completate
| # | Schermata | Stato | Screenshot | Note |
|---|-----------|-------|------------|------|
| 1 | Login | 🔄 In corso | — | WIP: stile e navigazione |
| 2 | Header profilo (avatar + nome) | 🔄 In corso | — | implementato con `route.params?` da modificare e sistemare lo stile |
| 3 | Lista piatti italiani | 🔄 In corso | — | `FlatList` + fetch API + stati loading/error/retry ok - manca stile|
| 4 | Ricerca / filtro | 🔄 In corso | — | implementata con `InputText` - manca stile |
| 5 | Dettaglio piatto | 🔄 In corso | — | Riceve `idMeal` via `route.params`; implementati: immagine, nome, ingredienti da `lookup.php` e istruzioni, da finire lo stile |
| 6 | Preferiti (AsyncStorage) | 🔄 In corso | — | implementata con `AsyncStorage` - manca stile |
| 7 | Impostazioni + logout | ❌ Mancante | — | Non ancora implementata |
| 8 | Schermata errore + Retry | ✅ Completo | — | implementata in `HomeScreen` e `DetailScreen` |
| 9 | Accessibilità (≥ 2 accorgimenti) | ❌ Mancante | — | Nessun `accessibilityLabel` presente |
| 10 | Deep link (`exp://…/meal/:idMeal`) | ✅ Completo | — | Config `linking` presente in `App.tsx` ma usa `myapp://` invece di `exp://`; |
 
> **Come aggiungere screenshot:** salva le immagini in `docs/screenshots/` nella root del repo e aggiorna i path nella tabella (es. `docs/screenshots/login.png`).
 
---
 
## Documentazione Lab 13–22
📄 [Google Doc condiviso — Lab 13-22](https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?usp=sharing)
 
---
 
## Stato attuale del codice
### Cosa è già presente
- `App.tsx` — navigazione `Stack` con `NavigationContainer` e config `linking` (deep link parziale)
- `AuthContext` — context per il passaggio dei dati dell'utente a livello globale
- `AppNavigator` - creata logica di navigazione esterna e refactorizzato codice `App.tsx` per alleggerire il codice
- `LoginScreen.tsx` — Login con i 3 utenti mock (`services/auth.ts` con `MOCK_USERS`)
- `EyeButton.tsx` — componente per vedere o nascondere la password
- `HomeScreen.tsx` — `FlatList` che carica i pasti italiani da API con `useEffect` + `useState<Meal[]>` usando il componente `MealCard`
- `DetailsScreen.tsx` — fetch `lookup.php?i={idMeal}`, immagine, nome, ingredienti, istruzioni
- Avatar rotondo + nome utente dopo il login passato con `route.params?`
- Ricerca/filtro sulla lista in memoria (`TextInput`)
- Preferiti con `AsyncStorage` (chiave `app:v1:favs`)

### Cosa manca ancora
**Funzionalità non implementate:**
- [ ] Schermata Impostazioni con logout
- [ ] Stato UI strutturato `{ status, data, message }` al posto delle variabili sparse (lab 15)
- [ ] Stato globale `FavoritesContext` (o Zustand) — lab 17
- [ ] `accessibilityLabel` su elementi interattivi (≥ 2 obbligatori)

**Bug noti:**
- ✅ Deep link configurato con `myapp://` invece di `exp://` — da correggere per il test con `npx uri-scheme open`
- ✅ `DetailsScreen` mostra solo ID e path, non carica i dati reali del piatto da API
- ✅ `loadMeals` usa `setMealsItems` passato come `any` — da tipizzare
---
 
*Aggiornato ogni settimana. Prossimo checkpoint: **9 luglio 2026**.*