Nome e presentazione

StudySync

Una web app dal design responsive pensata per connettere insegnanti e studenti. Gli insegnanti possono creare eventi come, lezioni, ricevimenti, e altro ancora, mentre gli studenti possono organizzare eventi come sessioni di studio collettive, seguire gli utenti di cui vogliono visualizzare gli eventi per poi prenotarsi.
Realizzata con React, Redux, JavaScript, and Tailwind CSS.

Funzionalità:

Creazione di eventi:
gli utenti possono creare vari eventi come ricevimenti, lezioni, ecc. Possono modificare e cancellare i propri eventi
Prenotazione agli Eventi:
gli utenti possono prenotarsi agli eventi che desiderano, in questo modo l’evento sarà aggiunto al loro calendario.
Seguire e smettere di seguire: 
è fondamentale seguire gli utenti dei quali si vogliono visualizzare gli eventi per potersi prenotare e partecipare.
Integrazione del Calendario: 
gli utenti hanno a disposizione una visualizzazione sotto forma di calendaro dove possono visualizzare facilmente tutti gli eventi in programma.
Area personale:
Gli utenti possono modificare il proprio dati di accesso ed il nome con cui vengono visualizzati dagli altri utenti nell’area personale.
Login e registrazione:
Gli utenti per accedere all’applicazione devono prima registrarsi e poi possono effettuare il login.

Prossimi obiettivi:

Migrazione a typescript, sono partito con javascript per ridurre le tempistiche di sviluppo;
completamento unit test, non ho ancora testato tutte le componenti per ragioni tempistiche;
back-end;


Stato del progetto

Questo progetto è funzionante, ma ancora in fase di sviluppo, in quanto manca la parte back-end, al momento viene utilizzato Airtable.

Screenshots
di seguito qualche schermata di alcune pagine dell’applicazione.

dashboard in versione Tablet


<img width="390" alt="Schermata 2024-02-15 alle 15 53 21" src="https://github.com/roccolena22/studysync/assets/128648624/73f28b78-9019-4a7c-9704-5ec9ad99ab23">

area personale in versione mobile 

<img width="390" alt="31223" src="https://github.com/roccolena22/studysync/assets/128648624/619358ba-836f-4ba0-b7b7-ad0ad1ef2659">

pagina degli eventi in versione desktop:


visualizzazione eventi in modalità calendario


<img width="590" alt="3245" src="https://github.com/roccolena22/studysync/assets/128648624/43559aee-d01d-4807-998e-c49ebf9d602b">



visualizzazione eventi sottoforma di card



<img width="594" alt="Schermata 2024-02-15 alle 15 54 16" src="https://github.com/roccolena22/studysync/assets/128648624/e296f432-57d8-4539-a874-fde3fcfe2c5d">


Installazione e configurazione

Clonare questo repository sul proprio computer locale, avrai bisogno di node e npm installati globalmente.
Navigare nella directory del progetto. 

Installazione delle dipendenze
npm install 

Per eseguire i test
npm run test


Per avviare il server di sviluppo.
npm run dev 

Note

Questo progetto è stato inizialmente pensato per sopperire ad una mancanza che hanno la maggior parte degli atenei universitari, un sistema per connettere insegnanti e studenti, uno strumento che consente agli insegnanti di programmare meglio le loro attività potendo tenere traccia dei partecipanti ad esempio attivando la possibilità di prenotarsi ad un proprio ricevimento. 
È stata anche l’occasione per l'utilizzo di nuove tecnologie e la familiarizzazione con la documentazione per le nuove funzionalità.
Non avevo mai utilizzato un Persistor per salvare i dati di login, nel localstorage, una scelta obbligata nel mio caso, data la mancanza del back-end.
Le principali tecnologie utilizzate sono state React, Redux, Tailwind CSS, Javascript, Jest, React Big Calendar, React Router, React Hook Form, Yup.
​​Ho scelto Airtable come database, il quale mi ha permesso di creare delle tabelle a cui poter effettuare chiamate API proprio come farei con un database frutto del back-end. In alcune situazioni ho dovuto adottare delle scelte vincolate da Airtable come l'invio di dati sottoforma di array per i campi condivisi e il limite di dover scaricare tutto il contenuto della tabella in alcune situazioni come il Login dove non ho la possibilità di usare una formula per filtrare solo l'utente che tenta l'accesso.
