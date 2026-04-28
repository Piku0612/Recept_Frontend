LessHassle – Projekt dokumentáció
Áttekintés

A LessHassle egy webalkalmazás, amely receptek kezelésére és böngészésére szolgál. A felhasználók recepteket kereshetnek, saját recepteket kezelhetnek, kedvenceket menthetnek, valamint toplistákat tekinthetnek meg.

Az alkalmazás frontend része React + Vite alapokon készült, és React Router-t használ az oldalak közötti navigációhoz.

Használt technológiák
React – komponens alapú UI
Vite – gyors build és fejlesztői környezet
React Router – kliens oldali routing
Bootstrap – alap stílusok és layout
JavaScript (ES6+)
Projekt struktúra (általános)

A projekt komponens alapú felépítést követ.

Főbb részek:

App / fő komponens – routing kezelése
Navbar komponens – navigáció és keresés
Oldalak:
Home (receptek listázása és keresése)
OwnReceipts (saját receptek)
Toplist
Favourites
Admin (jogosultság függő)
Auth oldalak:
Login
Register
Navigáció (Navbar)

A navbar két fő részből áll:

1. Header rész
Logó (LessHassle)
Keresőmező
Felhasználói műveletek:
Bejelentkezett állapotban:
Admin gomb (ha admin)
Logout
Profil ikon (profil szerkesztés)
Nem bejelentkezve:
Register
Login
2. Alsó navigációs sáv

Linkek:

/home – receptek
/ownreceipts – saját receptek
/toplist – toplista
/favourites – kedvencek
Keresés működése

A keresőmező a Navbar-ban található.

Működés:

A felhasználó beír egy kifejezést
A keresés gombra kattintva:
navigáció történik: /home?search=...
A Home oldal a query paraméter alapján szűri az adatokat
Felhasználókezelés

A rendszer a user objektum alapján kezeli a bejelentkezési állapotot.

Bejelentkezett állapot
isLoggedIn = true
Megjelenik:
Logout
(opcionálisan) Admin
Profil ikon
Admin ellenőrzés
const normalizedRole = String(user?.role ?? "").toLowerCase()
const isAdmin = normalizedRole === "admin" || normalizedRole === "1"

Ez lehetővé teszi többféle role formátum kezelését.

Profil szerkesztés

A profil szerkesztés a Navbar része.

Működés
Profil ikonra kattintva megjelenik egy modal
A felhasználó módosíthatja:
nevét
jelszavát
Validáció
Jelszó és megerősítés egyezése ellenőrzött
Jelenlegi állapot
Frontend szinten működik
Adatok csak console.log-ba kerülnek
Backend mentés nincs implementálva
Routing

React Router segítségével történik.

Főbb route-ok:

/home
/ownreceipts
/toplist
/favourites
/admin
/login
/register

A useNavigate hook segítségével történik a programozott navigáció (pl. keresésnél).

Állapotkezelés

A projekt jelenleg lokális state-et használ:

useState:
keresési input
modal állapot
form adatok

Globális state management (pl. Redux, Context API) nincs használva.

UI és stílus
Bootstrap osztályok:
grid rendszer
gombok
form elemek
Egyedi CSS minimális