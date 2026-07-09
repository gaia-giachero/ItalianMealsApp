# PROGRESS.md — Italian Meals App

**Nome studente:** Gaia Giachero  
**Data ultimo aggiornamento:** 09/07/2026  
**Repository GitHub:** [github.com/gaia-giachero/ItalianMealsApp](https://github.com/gaia-giachero/ItalianMealsApp.git)  
**Google Doc lab 13–19:** [Documento condiviso](https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?usp=sharing)

---

## Schermate obbligatorie

| # | Schermata | Stato | Screenshot (LightMode) | Screenshot (DarkMode) | Screenshot (Error-LightMode) | Screenshot (Error-DarkMode) | Note |
|---|-----------|-------|------------|------------|------------|------------|------|
| 1 | Login | ✅ Completo | ![schermata login](.\docs\screenshots\LoginScreen-LightMode.png) | ![schermata login](.\docs\screenshots\LoginScreen-DarkMode.png) | ![dati non validi schermata login](.\docs\screenshots\Error-LoginScreen-LightMode.png) | ![dati non validi schermata login](.\docs\screenshots\Error-LoginScreen-DarkMode.png) | Funzionale con 3 utenti mock |
| 2 | Header profilo (avatar + nome) | ✅ Completo | ![schermata home](.\docs\screenshots\HomeScreen+HeaderProfile-LightMode.png) | ![schermata home](.\docs\screenshots\HomeScreen+HeaderProfile-DarkMode.png) | ![errore schermata home](.\docs\screenshots\Error-HomeScreen-LightMode.png) | ![errore schermata home](.\docs\screenshots\Error-HomeScreen-DarkMode.png) | Avatar rotondo e nome via `AuthContext`; con navigazione a `SettingScreen` |
| 3 | Lista piatti italiani | ✅ Completo | ![lista piatti (homescreen)](.\docs\screenshots\HomeScreen+HeaderProfile-LightMode.png) | ![lista piatti (homescreen)](.\docs\screenshots\HomeScreen+HeaderProfile-DarkMode.png) | ![errore lista piatti (homescreen)](.\docs\screenshots\Error-HomeScreen-LightMode.png) | ![errore lista piatti (homescreen)](.\docs\screenshots\Error-HomeScreen-DarkMode.png) | `FlatList` + `fetchItalianMeals()` + stati loading / error / success |
| 4 | Ricerca / filtro | ✅ Completo | ![ricerca piatti (homescreen)](.\docs\screenshots\SearchPlates-LightMode.png) | ![ricerca piatti (homescreen)](.\docs\screenshots\SearchPlates-DarkMode.png) | — | — | `SearchBar` che filtra la lista in memoria con reset |
| 5 | Dettaglio piatto | ✅ Completo | ![dettaglio piatto](.\docs\screenshots\DetailsPlate-LightMode.png) | ![dettaglio piatto](.\docs\screenshots\DetailsPlate-DarkMode.png) | ![errore dettaglio piatto](.\docs\screenshots\Error-DetailsPlate-LightMode.png) | ![errore dettaglio piatto](.\docs\screenshots\Error-DetailsPlate-DarkMode.png) | Fetch `lookup.php?i={idMeal}` ok; immagine, nome, ingredienti e istruzioni presenti |
| 6 | Preferiti (AsyncStorage) | ✅ Completo | ![pagina preferiti](.\docs\screenshots\FavoriteScreen-LightMode.png) | ![pagina preferiti](.\docs\screenshots\FavoriteScreen-DarkMode.png) | ![errore pagina preferiti](.\docs\screenshots\Error-FavoriteScreen-LightMode.png) | ![errore pagina preferiti](.\docs\screenshots\Error-FavoriteScreen-DarkMode.png) | Toggle + persistenza con chiave `app:v1:favs`; empty state gestito |
| 7 | Impostazioni + logout | ✅ Completo | ![pagina impostazioni](.\docs\screenshots\SettingScreen-LightMode.png) | ![pagina impostazioni](.\docs\screenshots\SettingScreen-DarkMode.png) | — | — | `logout` funzionante; badge preferiti con navigazione a `FavouriteScreen`; toggle Dark Mode funzionante, Notifications temporaneamente senza funzione; Privacy, Security, Account sono placeholder |
| 8 | Errore + Retry | ✅ Completo | — | — | — | — | Gestito in `HomeScreen`, `FavouriteScreen` e `DetailScreen` |
| 9 | Accessibilità (≥ 2 accorgimenti) | ✅ Completo | ![accessibilità](.\docs\screenshots\Accessibility.png) | — | — | — | Nessun `accessibilityLabel` ancora presente |
| 10 | Deep link (`exp://…/meal/:idMeal`) | ✅ Completo | ![deep-linking](.\docs\screenshots\DeepLinking.png) | — | — | — | Config `linking` presente; path da aggiornare da `dettagli/:id` a `meal/:idMeal` |

> Screenshot da aggiungere in `docs/screenshots/` (login, profilo, lista, ricerca, dettaglio, preferiti, impostazioni, errore) e i path da aggiornare nella tabella.

---

## Checklist componenti

### Architettura e configurazione

| File | Fatto | Cosa |
|------|-------|------|
| `App.tsx` | [x] | Entry point con `SafeAreaProvider`, `AuthProvider`, `FavoritesProvider`, `AppNavigator` |
| `AppNavigator.tsx` | [x] | Stack Login / MainTab / Details con `NavigationContainer` e config `linking` |
| `AppNavigator.tsx` | [x] | Path deep link `meal/:idMeal` |
| `TabNavigator.tsx` | [x] | Tab bar con Home, Favourite, Setting e `CustomTabButton` |
| `colors.ts` | [x] | Token colori dell'app |
| `style.ts` | [x] | `globalStyles` condivisi tra le schermate |

### Context e stato globale

| File | Fatto | Cosa |
|------|-------|------|
| `AuthContext.tsx` | [x] | Sessione utente (`isLogged`, `name`, `avatarUri`, `login`, `logout`) |
| `FavoritesContext.tsx` | [x] | Preferiti condivisi con `AsyncStorage`, load all'avvio e save automatico |

### Services e hooks

| File | Fatto | Cosa |
|------|-------|------|
| `auth.ts` | [x] | `MOCK_USERS` con 3 utenti e `validateLogin()` con `trim()` sull'email |
| `meals.ts` | [x] | `fetchItalianMeals()` e `fetchMealById()` con controllo `res.ok` e parsing ingredienti |

### Componenti riutilizzabili

| File | Fatto | Cosa |
|------|-------|------|
| `MealCard.tsx` | [x] | Card con immagine, titolo, toggle preferito |
| `SearchBar.tsx` | [x] | Input ricerca con icona e pulsante reset |
| `EyeButton.tsx` | [x] | Toggle visibilità password |

### Schermate

| File | Fatto | Cosa |
|------|-------|------|
| `LoginScreen.tsx` | [x] | Form controllato, validazione campi vuoti, errore credenziali, `ActivityIndicator`, `EyeButton` |
| `LoginScreen.tsx` | [x] | Stile da rifinire |
| `HomeScreen.tsx` | [x] | Header avatar + nome, `FlatList` con `SearchBar`, loading / error / retry, navigazione al dettaglio, pull-to-refresh |
| `HomeScreen.tsx` | [x] | Navigazione a `SettingScreen` al tap sull'avatar/nome |
| `FavouriteScreen.tsx` | [x] | Lista preferiti filtrata, stati loading / error / empty / success, pull-to-refresh |
| `FavouriteScreen.tsx` | [x] | Navigazione a `SettingScreen` al tap sull'avatar/nome |
| `DetailScreen.tsx` | [x] | Fetch `lookup.php?i={idMeal}`, immagine, nome, ingredienti, istruzioni, retry, fallback se `id` mancante |
| `DetailScreen.tsx` | [x] | Stile da migliorare |
| `SettingsScreen.tsx` | [x] | Avatar, nome, badge preferiti (con navigazione a `FavouriteScreen`), logout funzionante |
| `SettingsScreen.tsx` | [x] | Funzione da associare al toggle Dark Mode |
| `SettingsScreen.tsx` | [x] | Privacy, Security, Account (attualmente placeholder) |

### Requisiti obbligatori rimanenti

| Requisito | Fatto | Note |
|-----------|-------|------|
| Accessibilità | [x] | Aggiungere `accessibilityLabel` su almeno 2 elementi interattivi |
| Deep link | [x] | Testare con `npx uri-scheme open "exp://10.0.2.2:8081/--/meal/52772" --android` dopo fix path |
| Screenshot | [x] | Salvare tutte le schermate in `docs/screenshots/` e aggiornare la tabella sopra |

---

*Prossimo checkpoint: **9 luglio 2026***