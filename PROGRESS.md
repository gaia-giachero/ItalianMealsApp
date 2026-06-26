# PROGRESS.md — Italian Meals App

**Nome studente:** Gaia Giachero  
**Data ultimo aggiornamento:** 26/06/2026  
**Repository GitHub:** [github.com/gaia-giachero/ItalianMealsApp](https://github.com/gaia-giachero/ItalianMealsApp.git)  
**Google Doc lab 13–22:** [Documento condiviso](https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?usp=sharing)

---

## Schermate obbligatorie

| # | Schermata | Stato | Screenshot | Note |
|---|-----------|:-----:|------------|------|
| 1 | Login | 🔄 In corso | — | Funzionale con 3 utenti mock; stile da rifinire |
| 2 | Header profilo (avatar + nome) | 🔄 In corso | — | Avatar rotondo e nome via `AuthContext`; navigazione a `SettingScreen` da aggiungere |
| 3 | Lista piatti italiani | ✅ Completo | — | `FlatList` + `fetchItalianMeals()` + stati loading / error / success |
| 4 | Ricerca / filtro | ✅ Completo | — | `SearchBar` che filtra la lista in memoria con reset |
| 5 | Dettaglio piatto | 🔄 In corso | — | Fetch `lookup.php?i={idMeal}` ok; immagine, nome, ingredienti e istruzioni presenti; stile da migliorare |
| 6 | Preferiti (AsyncStorage) | ✅ Completo | — | Toggle + persistenza con chiave `app:v1:favs`; empty state gestito |
| 7 | Impostazioni + logout | 🔄 In corso | — | `logout` funzionante; badge preferiti con navigazione a `FavouriteScreen`; toggle Dark Mode / Notifications senza funzione; Privacy, Security, Account sono placeholder |
| 8 | Errore + Retry | ✅ Completo | — | Gestito in `HomeScreen`, `FavouriteScreen` e `DetailScreen` |
| 9 | Accessibilità (≥ 2 accorgimenti) | ❌ Mancante | — | Nessun `accessibilityLabel` ancora presente |
| 10 | Deep link (`exp://…/meal/:idMeal`) | 🔄 In corso | — | Config `linking` presente; path da aggiornare da `dettagli/:id` a `meal/:idMeal` |

> Screenshot da aggiungere in `docs/screenshots/` (login, profilo, lista, ricerca, dettaglio, preferiti, impostazioni, errore) e i path da aggiornare nella tabella.

---

## Checklist componenti

### Architettura e configurazione

| File | Fatto | Cosa |
|------|:-----:|------|
| `App.tsx` | [x] | Entry point con `SafeAreaProvider`, `AuthProvider`, `FavoritesProvider`, `AppNavigator` |
| `AppNavigator.tsx` | [x] | Stack Login / MainTab / Details con `NavigationContainer` e config `linking` |
| `AppNavigator.tsx` | [ ] | Aggiornare path deep link da `dettagli/:id` a `meal/:idMeal` |
| `TabNavigator.tsx` | [x] | Tab bar con Home, Favourite, Setting e `CustomTabButton` |
| `colors.ts` | [x] | Token colori dell'app |
| `style.ts` | [x] | `globalStyles` condivisi tra le schermate |

### Context e stato globale

| File | Fatto | Cosa |
|------|:-----:|------|
| `AuthContext.tsx` | [x] | Sessione utente (`isLogged`, `name`, `avatarUri`, `login`, `logout`) |
| `FavoritesContext.tsx` | [x] | Preferiti condivisi con `AsyncStorage`, load all'avvio e save automatico |

### Services e hooks

| File | Fatto | Cosa |
|------|:-----:|------|
| `auth.ts` | [x] | `MOCK_USERS` con 3 utenti e `validateLogin()` con `trim()` sull'email |
| `meals.ts` | [x] | `fetchItalianMeals()` e `fetchMealById()` con controllo `res.ok` e parsing ingredienti |
| `loadMeals.ts` | [x] | Hook per il caricamento dei piatti |
| `loadMeals.ts` | [ ] | Tipizzare `setMealsItems` (attualmente `any`) |

### Componenti riutilizzabili

| File | Fatto | Cosa |
|------|:-----:|------|
| `MealCard.tsx` | [x] | Card con immagine, titolo, toggle preferito |
| `SearchBar.tsx` | [x] | Input ricerca con icona e pulsante reset |
| `EyeButton.tsx` | [x] | Toggle visibilità password |

### Schermate

| File | Fatto | Cosa |
|------|:-----:|------|
| `LoginScreen.tsx` | [x] | Form controllato, validazione campi vuoti, errore credenziali, `ActivityIndicator`, `EyeButton` |
| `LoginScreen.tsx` | [ ] | Stile da rifinire |
| `HomeScreen.tsx` | [x] | Header avatar + nome, `FlatList` con `SearchBar`, loading / error / retry, navigazione al dettaglio, pull-to-refresh |
| `HomeScreen.tsx` | [ ] | Navigazione a `SettingScreen` al tap sull'avatar/nome |
| `FavouriteScreen.tsx` | [x] | Lista preferiti filtrata, stati loading / error / empty / success, pull-to-refresh |
| `FavouriteScreen.tsx` | [ ] | Navigazione a `SettingScreen` al tap sull'avatar/nome |
| `DetailScreen.tsx` | [x] | Fetch `lookup.php?i={idMeal}`, immagine, nome, ingredienti, istruzioni, retry, fallback se `id` mancante |
| `DetailScreen.tsx` | [ ] | Stile da migliorare |
| `SettingsScreen.tsx` | [x] | Avatar, nome, badge preferiti (con navigazione a `FavouriteScreen`), logout funzionante |
| `SettingsScreen.tsx` | [ ] | Funzione da associare al toggle Dark Mode |
| `SettingsScreen.tsx` | [ ] | Funzione da associare al toggle Notifications |
| `SettingsScreen.tsx` | [ ] | Privacy, Security, Account (attualmente placeholder) |

### Requisiti obbligatori rimanenti

| Requisito | Fatto | Note |
|-----------|:-----:|------|
| Accessibilità | [ ] | Aggiungere `accessibilityLabel` su almeno 2 elementi interattivi |
| Deep link | [ ] | Testare con `npx uri-scheme open "exp://10.0.2.2:8081/--/meal/52772" --android` dopo fix path |
| Screenshot | [ ] | Salvare tutte le schermate in `docs/screenshots/` e aggiornare la tabella sopra |

---

*Prossimo checkpoint: **9 luglio 2026***