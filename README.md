**Security Data Portal** is a modern web application built with **React** (frontend) and **Python** (backend) that allows users to analyze potential threats associated with **IP addresses, domains, phone numbers, email addresses, and IoT devices**.

## Funkcjonalności

- **Wprowadzanie danych**: ręczne wpisywanie danych lub wgrywanie plików zawierających IP, domeny, numery telefonów lub e-maile.  
- **Walidacja i parsowanie**: backend sprawdza poprawność danych i przygotowuje je do analizy.  
- **Sprawdzanie zagrożeń za pomocą darmowych API**:  
  - **IP**: AbuseIPDB, APIVoid IP Reputation, Antideo IP Reputation  
  - **Domeny**: VirusTotal, APIVoid Domain Reputation, WhoisXML Domain Reputation  
  - **Numery telefonów**: NumVerify, IPQualityScore Phone Lookup, NumlookupAPI  
  - **E-maile**: weryfikacja adresów i wykrywanie tymczasowych skrzynek  
  - **Urządzenia IoT**: wykrywanie urządzeń w sieci i sprawdzanie potencjalnych zagrożeń  
- **Wyświetlanie wyników**: interaktywna tabela lub okno z wynikami, możliwość filtrowania, wyszukiwania i sortowania.  
- **Opcje eksportu**: pobieranie wyników w formatach JSON, TXT lub CSV.  
- **Dodatkowe funkcje**: kopiowanie do schowka, zapis i przywracanie sesji, konfiguracja parsera.  
- **UI**: nowoczesny, responsywny i intuicyjny design z wizualizacjami wyników w czasie rzeczywistym.

## Architektura

- **Frontend**: React – obsługuje wprowadzanie danych, dynamiczne wyświetlanie wyników oraz interakcje użytkownika.  
- **Backend**: Python – zarządza zapytaniami do API, agreguje wyniki, obsługuje błędy i zwraca ustrukturyzowane dane do frontendu.
