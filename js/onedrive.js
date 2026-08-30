<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Gestione Olio</title>

  <!-- Google Identity Services -->
  <script src="https://accounts.google.com/gsi/client" async defer></script>

  <!-- Google API -->
  <script src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>

  <!-- Funzioni richieste da Google -->
  <script>
    function gapiLoaded() {
      gapi.load("client", initializeGapiClient);
    }

    function gisLoaded() {
      // lasciato vuoto, gestito da google-drive.js
    }
  </script>
</head>

<body>

  <!-- I TUOI CONTENUTI -->
  <div id="app"></div>

  <!-- PULSANTI GOOGLE DRIVE -->
  <button onclick="salvaDati()">Salva su Google Drive</button>
  <button onclick="leggiDati()">Leggi da Google Drive</button>
  <pre id="output"></pre>

  <!-- I TUOI SCRIPT -->
  <script src="js/db.js"></script>
  <script src="js/ui.js"></script>
  <script src="js/onedrive.js"></script>

  <!-- GOOGLE DRIVE -->
  <script src="js/google-drive.js"></script>

</body>
</html>
