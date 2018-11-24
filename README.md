# Introducere

* Produsul vizeaza trei aspecte: gestionarea filmelor vizionate de utilizator, mentinerea unei evidente a celor 
pe care acesta doreste sa le vizioneze in viitor si prezentarea filmelor ce se afla in trending. In prezent exista  o gama larga si variata de filme
pentru toate gusturile, uneori devenind greu sa retii ce filme ai vazut si ce doresti sa vezi in viitor. 
Utilizatorii vor avea posibilitatea de a salva filmele vazute intr-o lista si de a-si crea "movie wishlists" unde sa adauge filemele pe care doresc 
sa le vada. De asemenea, vor putea fi inspirati de filmele aflate in BoxOffice, la detaliile carora vor avea acces prin intermediul site-ului.

* Filmele sunt o metoda placuta de petrecere a timpului liber, motiv pentru care produsul se adreseaza unei categorii
largi de utilizatori. De la tineri, studenti, pana la adulti, orice utilizator pasionat de cinematografie poate beneficia 
de produs, acesta fiind usor de folosit si deductibil.

* Printre cele mai cunoscute platforme dedicate industriei cinematografice se numara IMDb, site ce pune la dispozitie
utilizatorilor posibilitatea de a adauga intr-un watchlist filme pe care doresc sa le vada. Cu toate acestea, IMDb nu 
se axeaza strict pe nevoile utilizatorului, prezentand in mare parte detalii despre filme, top-uri realizate de alti
utilizatori si noutati din domeniu.
Un alt produs asemanator de pe piata este Letterboxd, site ce permite utilizatorului crearea unui cont si mentinerea
unui "jurnal" in care va adauga filmele vizionate.


# Interfete aplicatie

![alt text](https://github.com/ioanabutoescu/proiect-webtech/blob/master/photo1.jpg "interaces_1")

![alt text](https://github.com/ioanabutoescu/proiect-webtech/blob/master/photo2.jpg "interaces_2")


# API Rest

Request creare lista:
```
POST /list
https://api.themoviedb.org/3/list?api_key=ba356a92fe0ee4b7fd13499d648a6d1e
```
Response:
```
201 Created
{
  "status_code": 1,
  "status_message": "The item/record was created successfully.",
  "success": true,
  "list_id": 95075
}
```

Request adaugare film:
```
POST /list/{list_id}/add_item
https://api.themoviedb.org/3/list/95076/add_item?api_key=ba356a92fe0ee4b7fd13499d648a6d1e&session_id=ebbc0091ef2e0c63a3e785a1d644b52173d6eac0
```
Response:
```
{
  "status_code": 12,
  "status_message": "The item/record was updated successfully."
}
```

Request evaluare film:
```
POST /movie/{movie_id}/rating
https://api.themoviedb.org/3/movie/335983/rating?api_key=ba356a92fe0ee4b7fd13499d648a6d1e&session_id=ebbc0091ef2e0c63a3e785a1d644b52173d6eac0
```
Response:
```
Response:
{
  "status_code": 1,
  "status_message": "Success."
}
```