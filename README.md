# VolontiRaj
Ovo je React aplikacija za volontere gdje se mogu registrirati, prijavljivati udruge i akcije. Admin korisnici imaju dodatne mogućnosti za upravljanje volonterima i prihvaćanje prijava.

![Screenshot](src/pages/components/assets/1.png)
Ovo je AI slika lol, vidi im ruke

## Početak

Slijedite ove upute kako biste pokrenuli projekt lokalno.

### Preduvjeti

Morate imati instalirane sljedeće alate:
- Node.js
- npm (Node Package Manager)
- JSON Server


### Pokretanje

1. Pokrenite JSON server s bazom podataka `podaci.json`:
    ```sh
    npx json-server --watch podaci.json --port 3001
    ```
2. U drugom terminalu pokrenite React aplikaciju:
    ```sh
    npm start
    ```

Sada bi aplikacija trebala biti dostupna.

### Registracija

Korisnici se mogu registrirati putem forme na "prijava" stranici. 

### Admin Prijava

Za prijavu kao admin, koristite sljedeće podatke:
- **Korisničko ime**: `admin`
- **Lozinka**: `admin`

### User Mogućnosti

- Prijava volontera
- Prijava udruga
- i još mnogo toga
  
### Admin Mogućnosti

- Uklanjanje volontera
- Prihvaćanje prijava udruga
- Upravljanje akcijama
- i još mnogo toga

## Tehnologije

- React
- JSON Server

## Autor

- [BOkkYN](https://github.com/bokkyn)

