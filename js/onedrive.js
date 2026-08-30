// CONFIGURAZIONE -----------------------------------------------------

const CLIENT_ID = "INSERISCI_IL_TUO_CLIENT_ID";
const REDIRECT_URI = "https://costantino1977.github.io/gestione-olio/";
const FOLDER_ID = "INSERISCI_ID_CARTELLA_ONEDRIVE_CONDIVISA"; 
const FILE_NAME = "dati-olio.json";

// MSAL ---------------------------------------------------------------

const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

// Ottiene token
async function getToken() {
  const account = msalInstance.getAllAccounts()[0];

  if (!account) {
    const login = await msalInstance.loginPopup({
      scopes: ["Files.ReadWrite", "Files.ReadWrite.All"]
    });
    return login.accessToken;
  }

  const token = await msalInstance.acquireTokenSilent({
    account,
    scopes: ["Files.ReadWrite", "Files.ReadWrite.All"]
  });

  return token.accessToken;
}

// SALVATAGGIO --------------------------------------------------------

async function salvaSuOneDrive(dati) {
  const token = await getToken();

  const json = JSON.stringify(dati, null, 2);
  const blob = new Blob([json], { type: "application/json" });

  const url = `https://graph.microsoft.com/v1.0/me/drive/items/${FOLDER_ID}:/${FILE_NAME}:/content`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: blob
  });

  return response.ok;
}

// LETTURA ------------------------------------------------------------

async function leggiDaOneDrive() {
  const token = await getToken();

  const url = `https://graph.microsoft.com/v1.0/me/drive/items/${FOLDER_ID}:/${FILE_NAME}:/content`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) return null;

  return await response.json();
}

// FUNZIONI DI UTILITÀ ------------------------------------------------

async function salvaDati() {
  const dati = {
    livello: Math.floor(Math.random() * 100),
    data: new Date().toISOString()
  };

  const ok = await salvaSuOneDrive(dati);

  document.getElementById("output").textContent =
    ok ? "Dati salvati correttamente!" : "Errore nel salvataggio.";
}

async function leggiDati() {
  const dati = await leggiDaOneDrive();

  document.getElementById("output").textContent =
    dati ? JSON.stringify(dati, null, 2) : "Nessun dato trovato.";
}
