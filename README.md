# Italian Meals App

**Autore:** Gaia Giachero

App mobile realizzata con React Native + Expo per consultare, cercare e salvare tra i preferiti piatti della cucina italiana, tramite le API pubbliche di [TheMealDB](https://www.themealdb.com/api.php). Include login mock, preferiti persistenti, dark mode e deep linking.

---

## Installazione e avvio

1. Clonare il repository:
   ```bash
   git clone <url-repo>
   ```
2. Entrare nella cartella del progetto:
   ```bash
   cd ItalianMealsApp
   ```
3. Installare le dipendenze:
   ```bash
   npm install
   ```
4. Avviare il progetto:
   ```bash
   npx expo start
   ```
   Poi premere `a` per aprire l'app su emulatore/dispositivo Android, oppure inquadrare il QR code con l'app Expo Go.

---

## Prerequisiti

- Node.js versione LTS
- npm (incluso con Node.js)
- App Expo Go installata su dispositivo, oppure emulatore Android / simulatore iOS
- Connessione a Internet per le chiamate alle API

---

## Endpoint API usati

API pubbliche di TheMealDB (documentazione: [themealdb.com/api.php](https://www.themealdb.com/api.php)):

| Endpoint | Utilizzo |
|---|---|
| `GET .../filter.php?a=Italian` | Lista piatti italiani (HomeScreen) |
| `GET .../lookup.php?i={idMeal}` | Dettaglio piatto (DetailScreen) |

URL base: `https://www.themealdb.com/api/json/v1/1`

---

## Utenti mock per il login

Login simulato, valido solo con queste credenziali (definite in `src/services/auth.ts`):

| Nome | Email | Password |
|---|---|---|
| Mario Rossi | `mario.rossi@student.it` | `React2026!` |
| Giulia Bianchi | `giulia.bianchi@student.it` | `Expo2026!` |
| Luca Verdi | `luca.verdi@student.it` | `Mobile2026!` |

---

## Deep linking

Path configurato in `src/navigation/AppNavigator.tsx`: `meal/:idMeal`, che apre la DetailScreen con l'id del piatto.

Comando di test:
```bash
npx uri-scheme open "exp://127.0.0.1:8081/--/meal/52772" --android
```
Sostituire IP/porta con quelli mostrati dal bundler Expo e `52772` con un id piatto valido.

---

## Google Doc (screenshot lab 13–22)

[Link al documento condiviso](https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?usp=sharing)

---

## Stato globale

Gestito con Context API di React, senza librerie esterne, suddiviso in tre context (`src/context/`):

- **AuthContext**: sessione utente (login, logout, dati utente)
- **FavoritesContext**: lista preferiti, sincronizzata con AsyncStorage
- **SettingContext**: preferenze di tema (chiaro/scuro)

**Motivazione**: dimensione e complessità del progetto contenute, senza necessità di azioni asincrone complesse o strumenti di debug avanzati. La Context API risulta sufficiente, evitando dipendenze aggiuntive.

---

## Edge case gestiti

- **Rete**: controllo `res.ok` sulle chiamate API, con stato di errore e retry
- **Login fallito**: messaggio di errore se le credenziali non corrispondono
- **Lista vuota**: stato dedicato per ricerca senza risultati o preferiti assenti
- **Preferiti**: persistenza su AsyncStorage, con gestione errori di lettura/scrittura
- **Deep link invalido**: fallback se l'id ricevuto è mancante o non valido

---

## Feature opzionali

- Dark mode (SettingsScreen)
- Pull-to-refresh (HomeScreen, FavouriteScreen)
- Accessibilità (accessibilityLabel su elementi interattivi)
- Header profilo con navigazione rapida alle impostazioni
- Toggle visibilità password nel login