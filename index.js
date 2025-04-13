const makeWASocket = require("@whiskeysockets/baileys", "@adiwajshing/baileys").default
const { Boom } = require('@hapi/boom')
const fg = require('api-dylux');
const NodeCache = require("node-cache")
const readline = require("readline")
const PhoneNumber = require('awesome-phonenumber')
const cfonts = require('cfonts');
const pino = require('pino');
let phoneNumber = "523346541709"; // cambiar número
const fs = require('fs')
const axios = require('axios');
const ytSearch = require('yt-search');
// Variable para manejar el estado mute
let isMuted = false

const path = require('path');

const { writeFileSync, existsSync, mkdirSync, unlinkSync, readFileSync } = require('fs');

// Función para enviar mensajes
const enviar = (texto) => {
    // Asegúrate de que `from` e `info` están disponibles o pásalos como parámetros a esta función
    if (typeof sock !== 'undefined' && typeof from !== 'undefined' && typeof info !== 'undefined') {
        sock.sendMessage(from, { text: texto }, { quoted: info });
    } else {
        console.log(texto); // Solo imprime en consola si no puede enviar el mensaje
    }
};


// Ruta al archivo sorteo.json
const sorteoPath = path.join(__dirname, 'sorteo.json');

// Función para guardar los participantes del sorteo
const saveSorteo = (participantes) => {
    fs.writeFileSync(sorteoPath, JSON.stringify(participantes, null, 2));
};

// Función para cargar los participantes del sorteo
const loadSorteo = () => {
    if (fs.existsSync(sorteoPath)) {
        return JSON.parse(fs.readFileSync(sorteoPath, 'utf-8'));
    }
    return [];
};

// Función para ejecutar el sorteo


let botAdminMode = {}; // Objeto global para guardar estados por grupo

const rcanal = {
    contextInfo: {
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363296259364141@newsletter",
            serverMessageId: 100,
            newsletterName: '❄️NEKOBOT OFICIAL✅.  【✫𝚃𝙴𝙰𝙼  乂 𝚂𝚃𝙰𝚁𝙲𝙾𝚁𝙴✫',
        },
        externalAdReply: {
            showAdAttribution: true,
            title: 'NombreDelBot',
            body: 'NombreDelBot o AlgoNocxd',
            mediaUrl: null,
            description: null,
            previewType: "PHOTO",
            thumbnailUrl: "https://postimage.me/images/2025/01/10/IMG-20250110-WA0016.jpg", // URL fija de la imagen
            sourceUrl: 'https://whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e',
            mediaType: 1,
            renderLargerThumbnail: false
        },
    },
};

const corto = "Fire";

const { getRoles, saveRoles } = require('./rolesManager');
console.log("Cargando roles...");
let roles = getRoles();
console.log("Roles cargados:");
const crypto = require('crypto');
// Declarar el objeto global para almacenar los retos
const reto = {};
let dynamicVariables = {};
let dynamicCases = {};

const warningsFilePath = './archivo/data/warnings.json';
let warnings = {};

try {
    if (fs.existsSync(warningsFilePath)) {
        warnings = JSON.parse(fs.readFileSync(warningsFilePath, 'utf-8'));
    } else {
        fs.writeFileSync(warningsFilePath, JSON.stringify({}));
    }
} catch (error) {
    console.error("Error al cargar las advertencias:", error.message);
    warnings = {};
}

// Función para guardar las advertencias
const saveWarnings = () => {
    fs.writeFileSync(warningsFilePath, JSON.stringify(warnings, null, 2));
};

// Variable para almacenar el bot principal
let primaryBot = null;

// Ruta del archivo bots.json
const botsFilePath = './bots.json';

// Función para cargar la lista de bots desde bots.json
const cargarBots = () => {
    if (fs.existsSync(botsFilePath)) {
        return JSON.parse(fs.readFileSync(botsFilePath, 'utf-8'));
    } else {
        console.error("❌ El archivo bots.json no existe.");
        return [];
    }
};




const { default: JulsBotIncConnect, getAggregateVotesInPollMessage, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})
const banner = cfonts.render((`Mahiru | shiina 💛`), {
font: 'tiny',             
align: 'center',           
background: 'transparent',  
letterSpacing: 1,           
lineHeight: 1,            
space: true,               
maxLength: '0',            
gradrient: [`yellow`,`blue`],     
independentGradient: true, 
transitionGradient: true, 
env: 'node'
});  
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")


const claimMessagesPath = path.join(__dirname, 'media', 'claimMessages.json');

let claimMessages = JSON.parse(fs.existsSync(claimMessagesPath) ? fs.readFileSync(claimMessagesPath, 'utf-8') : '{}');

console.log("Roles cargados:", roles);
// Función para verificar los permisos basados en roles
function hasPermission(userNumber, requiredRole) {
    const roleHierarchy = {
        usuario: 1,
        helper: 2,
        trial:3 ,
        mod: 4,
        srmod: 5,
        owner: 6
    };

    const userRole = roles[userNumber] || 'usuario'; // Asigna "helper" por defecto si no tiene rol
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}


function isUserBanned(userNumber) {
    if (bannedUsers[userNumber]) {
        const { expiresAt } = bannedUsers[userNumber];
        if (expiresAt === 0) {
            return { banned: true, message: '❌ Estás baneado permanentemente.' };
        } else if (Date.now() > expiresAt) {
            // Si el baneo expiró, eliminarlo
            delete bannedUsers[userNumber];
            fs.writeFileSync('./archivo/data/banned.json', JSON.stringify(bannedUsers, null, 2));
            return { banned: false }; // Ya no está baneado
        } else {
            return { banned: true, message: `❌ Estás baneado hasta ${new Date(expiresAt).toLocaleString()}.` };
        }
    }
    return { banned: false };
}


const waifuDBPath = path.join(__dirname, 'media', 'waifuDB.json');

// Verificar si el archivo existe, si no, crear uno vacío
if (!fs.existsSync(waifuDBPath)) {
    fs.writeFileSync(waifuDBPath, JSON.stringify([], null, 2)); // Crear un archivo vacío
    console.log("El archivo waifuDB.json no existía, se ha creado uno nuevo.");
}


const cooldowns = {};

const waifuVotesPath = './waifuVotes.json'; // Archivo para guardar los votos
let waifuVotes = {}; // Objeto para almacenar votos

// Cargar los datos de votos al iniciar el bot
try {
    if (fs.existsSync(waifuVotesPath)) {
        waifuVotes = JSON.parse(fs.readFileSync(waifuVotesPath, 'utf-8'));
    }
} catch (error) {
    console.error("Error al cargar los datos de votos:", error);
}

// Guardar los datos de votos
const saveWaifuVotes = () => {
    fs.writeFileSync(waifuVotesPath, JSON.stringify(waifuVotes, null, 2));
};

let waifus = JSON.parse(fs.readFileSync(waifuDBPath, 'utf-8'));

let bannedUsers = {};

try {
    bannedUsers = JSON.parse(fs.readFileSync('./archivo/data/banned.json', 'utf-8'));
} catch (error) {
    console.log("Error al cargar la lista de baneados:", error);
    bannedUsers = {};
}

const comandosPorNivel = 10;

let bienvenidaActivada = [];
try {
    bienvenidaActivada = JSON.parse(fs.readFileSync('./archivo/data/bienvenida.json', 'utf-8'));
    if (!Array.isArray(bienvenidaActivada)) {
        bienvenidaActivada = [];
    }
} catch (error) {
    bienvenidaActivada = [];
}

let users = {};
try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(data);
    console.log("Usuarios cargados correctamente:");
} catch (error) {
    console.error("Error al cargar users.json:", error);
    users = {}; // Iniciar vacío si no existe o hay un error
}

let user = {};
try {
    user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    console.log("Datos de usuarios cargados correctamente:");
} catch (error) {
    console.error("Error al cargar user.json:", error.message);
    user = {}; // Inicia vacío si no existe o hay un error
}

const balanceFilePath = './balance.json';

let bal = {};
try {
    if (fs.existsSync(balanceFilePath)) {
        bal = JSON.parse(fs.readFileSync(balanceFilePath, 'utf-8'));
        console.log("Balance cargado correctamente.");
    }
} catch (error) {
    console.error("Error al cargar balance.json:", error.message);
    bal = {}; // Inicia vacío si no existe o hay un error
}

// Función para guardar el balance actualizado en el archivo
const guardarBalance = () => {
    try {
        fs.writeFileSync(balanceFilePath, JSON.stringify(bal, null, 2));
        console.log("Balance guardado correctamente.");
    } catch (error) {
        console.error("Error al guardar el balance:", error.message);
    }
};

const generatedWaifusPath = path.join(__dirname, 'media', 'generatedWaifus.json');

// Cargar las waifus generadas desde un archivo, o inicializar vacío
let generado = JSON.parse(fs.existsSync(generatedWaifusPath) ? fs.readFileSync(generatedWaifusPath, 'utf-8') : '{}');

// Función para guardar las waifus generadas
const saveGeneratedWaifus = () => {
    fs.writeFileSync(generatedWaifusPath, JSON.stringify(generado, null, 2));
};

let despedidaActivada = [];
try {
    despedidaActivada = JSON.parse(fs.readFileSync('./archivo/data/despedida.json', 'utf-8'));
    if (!Array.isArray(despedidaActivada)) {
        despedidaActivada = [];
    }
} catch (error) {
    despedidaActivada = [];
}

let mensajesBienvenida = {};
try {
    mensajesBienvenida = JSON.parse(fs.readFileSync('./archivo/data/mensajes_bienvenida.json', 'utf-8'));
} catch (error) {
    mensajesBienvenida = {}; // Si el archivo no existe o está vacío, inicializa como un objeto vacío
}

let mensajesDespedida = {};
try {
    mensajesDespedida = JSON.parse(fs.readFileSync('./archivo/data/mensajes_despedida.json', 'utf-8'));
} catch (error) {
    mensajesDespedida = {}; // Si el archivo no existe o está vacío, inicializa como un objeto vacío
}

const getNekoImage = async () => {
  try {
    const response = await axios.get('https://nekos.life/api/v2/img/neko');
    return response.data.url; // Devuelve la URL de la imagen del neko
  } catch (error) {
    console.error('Error al obtener la imagen de neko:', error.message);
    throw new Error('No se pudo obtener una imagen de neko.');
  }
};

const apagado = JSON.parse(fs.readFileSync('./archivo/data/apagado.json'))

function obtenerRango(nivel) {
    if (nivel <= 3) return { nombre: `Bronce ${nivel}`, imagen: 'https://postimage.me/images/2024/12/05/21-sin-titulo_20241204173207.png' };
    if (nivel <= 6) return { nombre: `Plata ${nivel}`, imagen: 'https://postimage.me/images/2024/12/05/21-sin-titulo_20241204173630.png' };
    if (nivel <= 10) return { nombre: `Oro ${nivel}`, imagen: 'https://i.postimg.cc/y6m8ZxxV/21-sin-t-tulo-20241204173306.png' };
    if (nivel <= 14) return { nombre: `Platino ${nivel}`, imagen: 'https://postimage.me/images/2024/12/05/21-sin-titulo_20241204173430.png' };
    if (nivel <= 18) return { nombre: `Diamante ${nivel}`, imagen: 'https://postimage.me/images/2024/12/05/21-sin-titulo_20241204173125.png' };
    if (nivel <= 22) return { nombre: `Maestro ${nivel}`, imagen: 'https://postimage.me/images/2024/12/05/21-sin-titulo_20241204173506.png' };
    return { nombre: `Leyenda ${nivel - 22}`, imagen: 'https://postimage.me/images/2024/12/05/21-sin-titulo_20241204173541.png' };
}

const marriagesFile = path.join(__dirname, 'marriages.json');
let proposals = {}; 
let marriages = fs.existsSync(marriagesFile) ? JSON.parse(fs.readFileSync(marriagesFile, 'utf-8')) : {};
const confirmation = {};

function saveMarriages() {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}


let stickerConfig = {
    packname: "❄️Destiny Bot🌸",
    author: "✅Nekobot©"
};

const logFilePath = path.join(__dirname, "logs.json");

// Función para registrar comandos
function logCommand(usuario, comando, detalles) {
    let logs = [];

    // Leer archivo de logs si existe
    if (fs.existsSync(logFilePath)) {
        logs = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
    }

    // Agregar el nuevo registro
    logs.push({
        fecha: new Date().toISOString(),
        usuario,
        comando,
        detalles,
    });

    // Guardar los logs actualizados
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
}

let currentTime = Date.now(); // Se declara una vez al inicio del archivo o switch

// Ruta al archivo wshop.json
const wshopPath = path.join(__dirname, 'wshop.json');

// Leer el archivo wshop.json o inicializar como un arreglo vacío
let wshop = [];
try {
    if (fs.existsSync(wshopPath)) {
        wshop = JSON.parse(fs.readFileSync(wshopPath, 'utf-8'));
    }
} catch (error) {
    console.error("Error al cargar wshop.json:", error);
    wshop = [];
}

const groupHaremPath = path.join(__dirname, 'media', 'groupHarem.json');

let groupHarem = JSON.parse(fs.existsSync(groupHaremPath) ? fs.readFileSync(groupHaremPath, 'utf-8') : '{}');

const saveGroupHarem = () => {
    fs.writeFileSync(groupHaremPath, JSON.stringify(groupHarem, null, 2));
};


let antilinkState = {}; // Formato: { 'group_id': true } (true = activado, false = desactivado)

// Guardar el estado del antilink en un archivo
const saveAntilinkState = () => {
    fs.writeFileSync('./antilinkState.json', JSON.stringify(antilinkState, null, 2));
};

// Cargar el estado del antilink desde un archivo
try {
    if (fs.existsSync('./antilinkState.json')) {
        antilinkState = JSON.parse(fs.readFileSync('./antilinkState.json', 'utf-8'));
    }
} catch (error) {
    console.error("Error al cargar el estado del antilink:", error);
    antilinkState = {};
}

const respuestasBot = {
    hola: "¡Hola! ¿Cómo estás?",
    adios: "¡Hasta luego! Cuídate mucho.",
    neko: "¡Neko neko nya~!",
    gracias: "¡De nada! Estoy aquí para ayudarte.",
    ayuda: "¿Necesitas algo? Escribe #help para más opciones.",
    exitate: "!huy mi amor ya me exite vamos ala recámara!",
    teamo: "yo también te amo mi amor",
    porno: "!❌ *_palabra restringida_*",
    gatita: "nya~ mi aquí estoy de gatita como te gusta ahora si lo vamos a hacer"
    
};


const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const color = (text, color) => { return !color ? chalk.red(text) : chalk.keyword(color)(text) };
function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

// Constantes Editables
const prefixo = "-"; // Cambiar Prefijo Aquí
const wm = "Destiny Oficial" // cambiar creador
let botname = "Fire Fly" // Cambiar nombre del bot
let moneda = "nekoCoins" //cambia el nombre de la moneda 


// cambiar el banner de bot
let bannerbot = "https://postimage.me/images/2025/01/10/IMG-20250110-WA0016.jpg";

const numerodono = "+5213339992782"; // cambiar número
const themeemoji = "💛" ; // cambiar emoji

async function startProo() {

// Método Privado con Número // Encriptado
function _0x4cf1(_0x398f11,_0x5d887d){const _0x2c06f3=_0x2c06();return _0x4cf1=function(_0x4cf186,_0x177a47){_0x4cf186=_0x4cf186-0x1ea;let _0x2038cd=_0x2c06f3[_0x4cf186];return _0x2038cd;},_0x4cf1(_0x398f11,_0x5d887d);}const _0x13243b=_0x4cf1;(function(_0x2a5c55,_0x1c7ac7){const _0x126f84=_0x4cf1,_0x27717d=_0x2a5c55();while(!![]){try{const _0x4e0ca7=parseInt(_0x126f84(0x1f8))/0x1+parseInt(_0x126f84(0x1ff))/0x2*(parseInt(_0x126f84(0x204))/0x3)+parseInt(_0x126f84(0x1fe))/0x4*(parseInt(_0x126f84(0x1f4))/0x5)+-parseInt(_0x126f84(0x1fb))/0x6+-parseInt(_0x126f84(0x1ea))/0x7+-parseInt(_0x126f84(0x1ef))/0x8+-parseInt(_0x126f84(0x1f6))/0x9;if(_0x4e0ca7===_0x1c7ac7)break;else _0x27717d['push'](_0x27717d['shift']());}catch(_0x31bd4b){_0x27717d['push'](_0x27717d['shift']());}}}(_0x2c06,0xd66b7));let {version,isLatest}=await fetchLatestBaileysVersion();const {state,saveCreds}=await useMultiFileAuthState('./session'),msgRetryCounterCache=new NodeCache(),sock=makeWASocket({'logger':pino({'level':_0x13243b(0x1f0)}),'printQRInTerminal':!pairingCode,'mobile':useMobile,'browser':['chrome',_0x13243b(0x1ee),'20.0.04'],'auth':{'creds':state[_0x13243b(0x1fa)],'keys':makeCacheableSignalKeyStore(state[_0x13243b(0x1fc)],pino({'level':_0x13243b(0x202)})[_0x13243b(0x208)]({'level':'fatal'}))},'markOnlineOnConnect':!![],'generateHighQualityLinkPreview':!![],'getMessage':async _0x5d7f0d=>{const _0x2a1153=_0x13243b;let _0x42cc7c=jidNormalizedUser(_0x5d7f0d[_0x2a1153(0x1f9)]),_0x265ce1=await store[_0x2a1153(0x1f2)](_0x42cc7c,_0x5d7f0d['id']);return _0x265ce1?.['message']||'';},'msgRetryCounterCache':msgRetryCounterCache,'defaultQueryTimeoutMs':undefined});store['bind'](sock['ev']);if(pairingCode&&!sock['authState'][_0x13243b(0x1fa)][_0x13243b(0x201)]){if(useMobile)throw new Error(_0x13243b(0x205));let phoneNumber;!!phoneNumber?(phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),!Object[_0x13243b(0x1fc)](PHONENUMBER_MCC)[_0x13243b(0x206)](_0xb3068f=>phoneNumber[_0x13243b(0x1ec)](_0xb3068f))&&(console['log'](chalk[_0x13243b(0x209)](chalk['redBright'](_0x13243b(0x1f1)))),process['exit'](0x0))):(phoneNumber=await question(chalk[_0x13243b(0x209)](chalk[_0x13243b(0x1fd)](_0x13243b(0x203)))),phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),!Object[_0x13243b(0x1fc)](PHONENUMBER_MCC)[_0x13243b(0x206)](_0x2eeb80=>phoneNumber['startsWith'](_0x2eeb80))&&(console['log'](chalk[_0x13243b(0x209)](chalk[_0x13243b(0x207)](_0x13243b(0x1f1)))),phoneNumber=await question(chalk[_0x13243b(0x209)](chalk['greenBright'](_0x13243b(0x203)))),phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),rl['close']())),setTimeout(async()=>{const _0x489bf9=_0x13243b;let _0x8a96ab=await sock[_0x489bf9(0x1eb)](phoneNumber);_0x8a96ab=_0x8a96ab?.[_0x489bf9(0x20a)](/.{1,4}/g)?.[_0x489bf9(0x1f3)]('-')||_0x8a96ab,console['log'](chalk[_0x489bf9(0x1f7)](chalk[_0x489bf9(0x200)](_0x489bf9(0x20b))),chalk[_0x489bf9(0x1f7)](chalk[_0x489bf9(0x1ed)](_0x8a96ab)));},0xbb8);}function _0x2c06(){const _0x1bbd11=['1637373LZnyZs','Cannot\x20use\x20pairing\x20code\x20with\x20mobile\x20api','some','redBright','child','bgBlack','match','Your\x20Pairing\x20Code\x20:\x20','1250522JShAKL','requestPairingCode','startsWith','white','Chrome','9897888veqNgu','silent','Start\x20with\x20country\x20code\x20of\x20your\x20WhatsApp\x20Number,\x20Example\x20:\x20+32460220392','loadMessage','join','3095530dIuEjy','replace','985968qabeqv','black','1465506gzUlAn','remoteJid','creds','1360236TOTwHA','keys','greenBright','4gBEQlq','2csqFkw','bgGreen','registered','fatal','Please\x20type\x20your\x20WhatsApp\x20number\x20ðŸ˜\x0aFor\x20example:\x20+32460220392\x20:\x20'];_0x2c06=function(){return _0x1bbd11;};return _0x2c06();}
// Conexión

sock.ev.on('connection.update', async (update) => {
	const {
		connection,
		lastDisconnect
	} = update
try{
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				startProo()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				startProo()
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				startProo()
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				startProo()
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
				startProo()
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				startProo()
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				startProo()
			} else sock.end(`Unknown DisconnectReason: ${reason}`)
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			console.log(color(`\n🌿Connecting...`, 'blue'))
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			console.log(color(` `,'yellow'))
			await delay(1999)
            console.log(banner.string)
            console.log(color(`< ================================================== >`, 'yellow'))
	        console.log(color(`\n${themeemoji} Suscribete`,'red'))
            console.log(color(`${themeemoji} https://youtube.com/@destinyyt33621?si=573DEE3lq4jCC3lW `,'blue'))
            console.log(color(` `,'blue'))
                        console.log(color(`< ================================================== >`, 'yellow'))
            console.log(color(`${themeemoji} Creador Oficial de la base`,'magenta'))
            console.log(color(`${themeemoji} Destiny Oficial\n`,'yellow'))
		}
	
} catch (err) {
	  console.log('Error in Connection.update '+err)
	  startProo();
	}
})
sock.ev.on('creds.update', saveCreds)
sock.ev.on("messages.upsert",  () => { })


sock.ev.on('group-participants.update', async (update) => {
    console.log('Evento detectado:', update);

    try {
        const { id, participants, action } = update;
        console.log(`Acción: ${action}, Grupo: ${id}, Participantes: ${participants}`);

        if (action === 'add' && bienvenidaActivada.includes(id)) {
            console.log('Enviando bienvenida...');
            for (let participant of participants) {
                const mensajePersonalizado = mensajesBienvenida[id] || "¡Disfruta tu estancia!";
                const mensajeBienvenida = `
👋 ¡Hola! soy ${botname}! tu bot neko de confianza
 ! mahiru shiina V1.4 ! 
 
 ◦•●◉✿ 𝐵𝑜𝑡 ${corto} 𝑂𝑓𝑖𝑐𝑖𝑎𝑙 ✿◉●•◦
 
 @${participant.split('@')[0]} 
Bienvenido(a) al grupo *${(await sock.groupMetadata(id)).subject}*.

${mensajePersonalizado}

> Para pedir la lista de comandos usa #help
                `;

                // Configuración para mostrar una imagen más grande
                rcanal.contextInfo.externalAdReply = {
                    showAdAttribution: true,
                    title: "🌟 Bienvenido al grupo 🌟",
                    body: "Explora y diviértete con Neko Bot 🐾",
                    mediaUrl: bannerbot, // URL de tu imagen
                    description: null,
                    previewType: "PHOTO",
                    thumbnailUrl: null, // Desactiva la miniatura para usar mediaUrl
                    sourceUrl: "https://whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e", // Enlace oficial
                    mediaType: 1,
                    renderLargerThumbnail: true, // Solicita imagen más grande
                };

                // Envía el mensaje con rcanal
                await sock.sendMessage(id, {
                    text: mensajeBienvenida,
                    mentions: [participant],
                    ...rcanal,
                });

                console.log(`Bienvenida enviada a: ${participant}`);
            }
        }

        if (action === 'remove' && despedidaActivada.includes(id)) {
            console.log('Enviando despedida...');
            for (let participant of participants) {
                const mensajePersonalizadoDespedida = mensajesDespedida[id] || "👋 ¡Hasta pronto! Te deseamos lo mejor.";
                const mensajeDespedida = `
😢 Adiós, querido amigo o amiga.

◦•●◉✿ 𝐵𝑜𝑡 ${corto} 𝑂𝑓𝑖𝑐𝑖𝑎𝑙 ✿◉●•◦

 @${participant.split('@')[0]} 
ha salido del grupo *${(await sock.groupMetadata(id)).subject}*.

${mensajePersonalizadoDespedida}

¡Te deseamos lo mejor! 👋
                `;

                // Configuración para mostrar una imagen más grande
                rcanal.contextInfo.externalAdReply = {
                    showAdAttribution: true,
                    title: "🌟 Despedida del grupo 🌟",
                    body: "Esperamos verte de nuevo en otro momento 🐾",
                    mediaUrl: bannerbot, // URL de tu imagen
                    description: null,
                    previewType: "PHOTO",
                    thumbnailUrl: null, // Desactiva la miniatura para usar mediaUrl
                    sourceUrl: "https://whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e", // Enlace oficial
                    mediaType: 1,
                    renderLargerThumbnail: true, // Solicita imagen más grande
                };

                // Envía el mensaje con rcanal
                await sock.sendMessage(id, {
                    text: mensajeDespedida,
                    mentions: [participant],
                    ...rcanal,
                });

                console.log(`Despedida enviada a: ${participant}`);
            }
        }
    } catch (err) {
        console.error('Error en group-participants.update:', err);
    }
});

// Función para ejecutar el sorteo
const ejecutarSorteo = (sock) => {
    let participantes = loadSorteo();

    if (participantes.length > 0) {
        let ganador = participantes[Math.floor(Math.random() * participantes.length)];
        const premio = 10000;

        bal[ganador] = bal[ganador] || { banco: 0, dinero: 0 };
        bal[ganador].dinero += premio;
        guardarBalance();

        sock.sendMessage(ganador, { 
            text: `🎉 ¡Felicidades! Has ganado el sorteo y recibido ${premio} ${moneda}.` 
        });

        enviar(`🎉 ¡Felicidades @${ganador.split('@')[0]}! Has ganado el sorteo.`);
        saveSorteo([]);
    } else {
        enviar("No hubo participantes en el sorteo.");
    }
};

// Llamar a ejecutarSorteo y pasar sock como argumento
setTimeout(() => ejecutarSorteo(sock), 24 * 60 * 60 * 1000); // Cambiar a 24 horas en producción

sock.ev.on('messages.upsert', async m => {
    try {
        const info = m.messages[0];
        if (!info.message) return;

const enviar = (texto) => {
 sock.sendMessage(from,{ text : texto }, {quoted : info})
 }

        const isGroup = info.key.remoteJid.endsWith('@g.us');
        const sender = isGroup ? info.key.participant : info.key.remoteJid;
        const senderNumber = sender.split('@')[0];

        // Verificación de usuarios baneados
        const banStatus = isUserBanned(senderNumber); // Usa la función centralizada
        if (banStatus.banned) {
            enviar(banStatus.message);
            return; // Detener el procesamiento si el usuario está baneado
        }

        // Resto de la lógica del comando..
        
  
 
  if (info.key && info.key.remoteJid == "status@broadcast") return
 const altpdf = Object.keys(info.message)
 const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
const content = JSON.stringify(info.message)
const from = info.key.remoteJid
 var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : ''

 const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''

 const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
 const isGroupAdmins = groupAdmins.includes(sender) || false 

// Verificar que el mensaje no provenga del bot
if (sender === sock.user.id) {
    return; // Ignora los mensajes del bot
}

// Inicializa el estado para el usuario si no existe

// Detecta saludos comunes
if (/^(hola,?\s*(buenos|buenas\s*(días|tardes|noches)))/i.test(body)) {
    const opcionesMensaje = `¡Hola, buenas noches! ¿En qué puedo ayudarte hoy? Aquí tienes algunas opciones que puedo ofrecerte:
1. Información general
2. Soporte técnico
3. Consultas de bots activos

> Elige el número de tu pregunta`;

    await sock.sendMessage(from, { text: opcionesMensaje });
    return; // Detenemos aquí para evitar conflictos con otros comandos
}

// Detecta respuestas a las opciones principales
if (['1', '2', '3'].includes(body)) {
    switch (body) {
        case '1': // Información general
            const opcionesInformacion = `Has seleccionado Información general.

Elige el número de la información que deseas:
1️⃣. Información del bot
2️⃣. Información del creador
3️⃣. Información del staff
4️⃣. Información de redes sociales`;

            await sock.sendMessage(from, { text: opcionesInformacion });
            return;

        case '2': // Soporte técnico
            const opcionesSoporte = `Has seleccionado Soporte técnico.

Elige el número de tu problema:
a. Problema con el bot
b. Problemas con el pago
c. Reporta queja del bot o mods
d. Contactar un asesor`;

            await sock.sendMessage(from, { text: opcionesSoporte });
            return;

        case '3': // Consultas de bots activos
            await sock.sendMessage(from, { text: 'Has seleccionado Consultas de bots activos.' });
            return;

        default:
            await sock.sendMessage(from, { text: 'Por favor, selecciona una opción válida (1, 2 o 3).' });
            return;
    }
}

// Detecta respuestas al submenú de Información general
if (['1️⃣', '2️⃣', '3️⃣', '4️⃣'].includes(body)) {
    switch (body) {
        case '1️⃣':
            await sock.sendMessage(from, { text: 'Seleccionaste "Información del bot". El bot fue desarrollado para ayudarte con múltiples tareas y diversión sin límites Versión dek bot: 1.4 con nodejs' });
            break;
        case '2️⃣':
            await sock.sendMessage(from, { text: 'Seleccionaste "Información del creador". Creador: Destiny Oficial. Contáctalo para más detalles wa.me//5213339992782?text=hola+vengo+del+bot.' });
            break;
        case '3️⃣':
            await sock.sendMessage(from, { text: 'Seleccionaste "Información del staff". El equipo está compuesto por moderadores que son +595971423659 +5212721174861 +573148700281 +5213511767672 +50557702304  y desarrolladores que son +5213339992782 +595985665263 +51967125528 +5213342518705 +5213344753421 +5213512825587 dedicados a mejorar tu bot de confianza.' });
            break;
        case '4️⃣':
            await sock.sendMessage(from, { text: 'Seleccionaste "Información de redes sociales". Encuéntranos en: \nYouTube: https://www.youtube.com/@DestinyYT33621\nInstagram: https://www.instagram.com/sergio_yt46?igsh=MWdsaHN3cDRwaXZhag==\nx twitter: https://x.com/SergioY25444970?t=6LgYSoR4CHOqvRu_xT1tAw&s=09' });
            break;
        default:
            await sock.sendMessage(from, { text: 'Por favor, selecciona una opción válida (1, 2, 3 o 4).' });
            break;
    }
    return;
}

// Detecta respuestas al submenú de Soporte técnico
if (['a', 'b', 'c', 'd'].includes(body)) {
    switch (body) {
        case 'a':
            await sock.sendMessage(from, { text: 'Seleccionaste "Problema con el bot". Por favor, describe tu problema detalladamente.' });
            break;
        case 'b':
            await sock.sendMessage(from, { text: 'Seleccionaste "Problemas con el pago". Un asesor se pondrá en contacto contigo pronto.' });
            break;
        case 'c':
            await sock.sendMessage(from, { text: 'Seleccionaste "Reporta queja del bot o mods". Por favor, envía los detalles de tu queja.' });
            break;
        case 'd':
            await sock.sendMessage(from, { text: 'Seleccionaste "Contactar un asesor". Un asesor te responderá en breve.' });
            break;
        default:
            await sock.sendMessage(from, { text: 'Por favor, selecciona una opción válida (1, 2, 3 o 4).' });
            break;
    }
    return;
}


// Detecta mensajes que comiencen con "Hey Google"
if (body.toLowerCase().startsWith('hey google')) {
    const pregunta = body.slice(11).trim(); // Quita "Hey Google" y espacios en blanco
    
    // Respuestas predefinidas
    const respuestas = {
        "como estas": "Estoy bien, ¡gracias por preguntar!",
        "qué es un bot": "Un bot es un software que automatiza tareas.",
        "quién es tu creador": "Fui creado por Destiny Oficial.",
        "que es inteligencia artificial": "La inteligencia artificial es la simulación de procesos de inteligencia humana por parte de máquinas.",
        "pronostico del dia": 'Actualmente en Guadalajara estamos a 81°F Parcialmente nublado Con una temperatura mínima de 66° y máxima de 84° que tenga un buen dia Destiny',
        "de amor no se vive": "claro de amor no se vive haci como lo tiene mi comando en su nombre"
        // Agrega más respuestas aquí
    };

    const respuesta = respuestas[pregunta.toLowerCase()] || "❖ !buenas tardes, usuario de WhatsApp!, ¿En que puedo ayudarte?";
    enviar(respuesta);
    return; // Detenemos aquí para evitar conflictos con otros comandos
}

// Detectar y eliminar mensajes con enlaces si el antilink está activado
if (isGroup && antilinkState[from]) {
    const isUrl = /https?:\/\/[^\s]+/gi.test(body); // Regex para detectar enlaces

    if (isUrl) {
        // Eliminar el mensaje
        await sock.sendMessage(from, { delete: { remoteJid: from, id: info.key.id, participant: sender } });

        // Expulsar al usuario si el bot es administrador
        if (isBotGroupAdmins) {
            await sock.groupParticipantsUpdate(from, [sender], 'remove'); // Expulsar usuario
            await sock.sendMessage(from, { 
                text: `🚫 @${sender.split('@')[0]} fue expulsado por enviar enlaces.`, 
                mentions: [sender] 
            });
        } else {
            await sock.sendMessage(from, { 
                text: `🚫 Enlaces no están permitidos. El mensaje fue eliminado.`, 
                mentions: [sender] 
            });
        }
    }
 }

if (primaryBot && primaryBot !== sock.user.id) {
    // Ignora comandos si este bot no es el principal
    return;
}

if (botAdminMode[from] && !isGroupAdmins) {
    return;
}

user[sender] = user[sender] || { nivel: 1, comandos: 0 };

// Incrementa los comandos usados
user[sender].comandos += 1;

// Incrementa el nivel si alcanza el umbral
if (user[sender].comandos % comandosPorNivel === 0) {
    user[sender].nivel += 1;
}


const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

var pes = (type === 'conversation' && info.message.conversation) ? info.message.conversation : (type == 'imageMessage') && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == 'videoMessage') && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == 'extendedTextMessage') && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ''

// CONSTANTES IS  

const nome = info.pushName ? info.pushName : ''
const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isCmd = body.startsWith(prefixo)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null 
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? sock.sendMessage(from, {text: teks.trim(), mentions: memberr}) : sock.sendMessage(from, {text: teks.trim(), mentions: memberr})}
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).Mimetype || ""
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
const pushname = info.pushName ? info.pushName : ''


const isApagado = apagado.includes(from)

const isBot = info.key.fromMe ? true : false
const isOwner = numerodono.includes(sender)
const BotNumber = sock.user.id.split(':')[0]+'@s.whatsapp.net'

const isBotGroupAdmins = groupAdmins.includes(BotNumber) || false
const isUrl = (url) => { return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')) }
const deviceType = info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'IPhone' : 'WhatsApp web'
const options = { timeZone: 'America/Lima', hour12: false }
const data = new Date().toLocaleDateString('PE', { ...options, day: '2-digit', month: '2-digit', year: '2-digit' })
const hora = new Date().toLocaleTimeString('PE', options) 
 
 // CONSTANTES NUEVAS
 
 
 
 // CONSTANTES IFF 
 const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage") 
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
return buffer}
 
 // RESPUESTAS AUTOMATICAS
 const respuesta = {
 espere : "Espere un momento porfavor",
 dono : " este comando es solo usado por mi creador",
 premiun: "compre la version premiun",
 grupos : "este comando es solo para grupos",
 privado : " 🕵‍♂️*Este comando solo se puede usar en el chat privado*",
 error : " ⚠️ *Lo siento ocurrio un error, intentelo de nuevo Porfavor*",
 textito : "😤 *Digita un texto Porfavor* ",
 }
 
// MENSAJES EN CONSOLA 
 
 if (isGroup) {
if (isGroup && isGroup) console.log(`${color('┏━━━━━━━━━┅┅┄┄⟞⟦ ⟝┄┄┉┉━━━━━━━━━┓', 'blue')}\n${color('┃', 'blue')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'blue')} ${color('Nombre:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'blue')} ${color('Horário:', 'yellow')} ${color(hora, 'white')}\n${color('┃', 'red')} ${color('comando:', 'yellow')} ${color(comando)}\n${color('┃', 'blue')} ${color('Palabras:', 'yellow')} ${color(budy.length, 'yellow')}\n${color('┃', 'blue')} ${color('Grupo:', 'yellow')} ${color(groupName, 'white')}\n${color('┗━━━━━━━━┅┅┄┄⟞⟦⟧⟝┄┄┉┉━━━━━━━━┛', 'blue')}`)
 if (!isGroup && isGroup) console.log(`${color('┏━━━━━━━━━┅┅┄┄⟞⟦ ⟝┄┄┉┉━━━━━━━━━┓', 'blue')}\n${color('┃', 'blue')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'blue')} ${color('Nombre:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'blue')} ${color('Horário:', 'yellow')} ${color(time, 'white')}\n${color('┃', 'red')} ${color('comando:', 'yellow')} ${color('No', 'white')}\n${color('┃', 'blue')} ${color('Palabras:', 'yellow')} ${color(budy.length, 'white')}\n${color('┃', 'blue')} ${color('Grupo:', 'yellow')} ${color(groupName, 'white')}\n${color('┗━━━━━━━━┅┅┄┄⟞⟦⟧⟝┄┄┉┉━━━━━━━━┛', 'blue')}`)
}
 
 
 
switch(comando) {

case 'botoff': case 'off':
if (!isGroupAdmins) return enviar("❖ El comando *bot* solo puede ser usado por los administradores del grupo.")
apagado.push(from)
fs.writeFileSync('./archivo/data/apagado.json', JSON.stringify(apagado))
enviar("El bot Neko fue desactivado correctamente✅")
break

// Case para activar Bot
case 'boton': case "on":
if (!isGroupAdmins) return enviar("❖ El comando *bot* solo puede ser usado por los administradores del grupo.")
let activaElbot = apagado.indexOf(from)
apagado.splice(activaElbot, 1)
fs.writeFileSync('./archivo/data/apagado.json', JSON.stringify(apagado))
enviar("El bot Neko fué activo con éxito ✅")
break

case "help":
case "menu":
    const helpMessage = `
🇲🇽𝙌𝙪𝙚 𝙤𝙣𝙙𝙖 𝙡𝙤𝙘𝙤 𝙨𝙤𝙮 ${botname}
*𝘼𝙦𝙪𝙞́ 𝙩𝙞𝙚𝙣𝙚𝙨 𝙡𝙖 𝙡𝙞𝙨𝙩𝙖 𝙙𝙚 𝙘𝙤𝙢𝙖𝙣𝙙𝙤𝙨 𝙬𝙚𝙮*
   \`Versión 1.4 de Node.js\`
   
   Te enseño mi sitio web para que recibas toda la información:
   
   \`Sitio web de anuncios\`
> ~animeoffis.wixsite.com/neko~
   
   \`Canal del team Neko y canal del bot\`
> whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e

> whatsapp.com/channel/0029Vb26b7jHrDZi3EeWwq1z
   
   \`Problemas o preguntas frecuentes\`
> destiny-oficial.github.io/reportes_NekoBot/
🥙 🇲🇽 🍔 🤠 🌮 😎 🌯
 taquitos de puerquito a 5 pesos🌮
𝑎𝑞𝑢𝑖 𝑡𝑖𝑒𝑛𝑒𝑠 𝑙𝑎 𝑙𝑖𝑠𝑡𝑎 𝑑𝑒 𝑐𝑜𝑚𝑎𝑛𝑑𝑜𝑠 ⇩
2‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
- ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎

**Comandos Generales del bot Neko Destiny:**

» 🇲🇽 *Economy* | *ganar feria* 🇲🇽

 Comandos de *Economia* para ganar dinero y divertirte con tus amigos.

✦ #w • #chambiar*
> trabaja para ganar dinero.

✦ *#crime* 
> Cometer un crimen para ganar o perder dinero.

✦ *#daily* *diario*
> reclama tu coins diarios.

✦ *#rt [cantidad] red/black*
> apostar dinero en ruleta de red/black

✦ *#bolado [cantidad] cara/cruz*
> apostar tu dinero en cara y Cruz

✦ *#guess* | *#acertijo*
> gana dinero haciendo acertijos


» 🇲🇽 *waifus | viejas* 🇲🇽

✐ Comandos de *Gacha* para conseguir tu viejas favorito de anime y tenerlas en tu casa xd, jugar con tus amigos y diviertete.

✦ *#rw • #ver*
> Ver una waifu aleatoria.
 
✦ *#c • #claim*
> para reclamar un personaje.

✦ *#harem* | *#misviejas*
> para ver la waifus reclamadas.

✦ *#wimage [nombre]*
> para ver la información de la waifu.

*winfo [nombre]*
> para ver la información de una waifu

✦ *#vote [nombre]*
> para subir el valor de una waifu.
 
 ✦ *#ainfo*
> ver todas las waifus de un anime en específico.
 
✦ *#𝑛𝑒𝑘𝑜 • #gato*
> 𝑚𝑢𝑒𝑠𝑡𝑟𝑎 𝑢𝑛𝑎 𝑖𝑚𝑎𝑔𝑒𝑛 𝑑𝑒 𝑢𝑛 𝑛𝑒𝑘𝑜.
 
✦ *#sell* | *#vender* *+ nombre de waifu* 
> para vender una waifu.
 
✦ *#buyw* | *#comprar* *+ nombre* 
> para comprar una waifu.

✦ *#wshop* | *tiendita*
> para ver la waifus ala venta.

 » 🇲🇽  *Profile* ⊹ 🇲🇽

✦ *#profile #perfil*
> Ver tu perfil de usuario.

✦ *#level #nivel*
> ver tu progreso de nivel.

✦ *#setdesc*
> cambia tu descripción del perfil.

✦ *#suggest • #add*
> Enviar una sugerencia al bot.

✦ #genero • #gender*
> para cambiar tu género.

✦ #setcumple • #cumple*
para establecer tu cumpleaños.

✦ #divorce + @mencion*
> para divorciarte de alguien.

✦ #top + página*
-> para ver los usuarios con mas nivel.

» 🇲🇽 *Admin* | *grupos* 🇲🇽

✦ #welcomeon/off
> encender o apagar un mensaje que da una bienvenida al grupo.

✦ *#despedida on/off
> para activar o desactivar un mensaje de despedida en un grupo.

*setwelcome | mensajebienvenida*
> para cambiar el mensaje de bienvenida 

*setgoodbye| mensajedespedida*
> para cambiar el mensaje de despedida

*gp | infogrupo*
> para ver la información del grupo (aun en proceso)

*antilinkon/off | *linkon/off*
> encender o apagar el antilink

*kick | sacar*
> para expulsar a un usuario de un grupo

✦ *#on*
> para encender el bot de un grupo.

✦ *#off* | *prender*
> para apagar el bot de un grupo.

➪ *join | unete*
> para que el bot se meta a un grupo

❥ *#tag + mensaje*
> para mencionar a todos cin un mensaje.

 *open / close*
 > para abrir y cerrar un grupo
 
 *mute*
> para que el bot sea solo para administración.

 🇲🇽 *comando NSFW | +18* 🇲🇽
 
➣ *nsfwon/off* 
> para apagar el nsfw en un grupo
 
➮ *bj + @mencion*
> para dar una mamada a alguien

➪ *fuck | cojer*
> para cojer a alguien en un grupo

➪ *Cum | venirse*
> para cumear a alguien en un grupo

➪ *Touch | pechos*
> para tocar los pechos de alguien

➪ *Chest | no disponen*
> para lamber la vagina de alguien

➪ *Licking | culo*
> para lamber el pussy de alguien

➪ *69 | six*
> para hacer un 69 con alguien

➪ *perrito | 4*
> para poner en 4 a alguien

➪ *undress | encuerar*
> para encuerar a alguien


➪ *Hentai | h*
> envía una imagen hentai


» 🇲🇽 *Download* | *descargas* 🇲🇽

✐ Comandos de *Download* para descargar varios archivos.

✦ *#play + link*
> para descargar una música en YouTube.

✦ *#mp4 + link*
> para descargar un vídeo de YouTube.
 
 







> puedes probar nuestro bot de discord aquí abajo ⬇️ 
> discord.gg/YZbNb7Cd

*si quieres algún comando, puedes enviárselo ami dueño con #suggest.*
`;
    const imageUrl = bannerbot; // URL dinámica del banner

try {
    // Asegúrate de que `externalAdReply` existe
    if (!rcanal.contextInfo.externalAdReply) {
        rcanal.contextInfo.externalAdReply = {}; // Inicializa si no existe
    }

    // Actualiza dinámicamente las propiedades de `rcanal`
    rcanal.contextInfo.externalAdReply = {
    showAdAttribution: true,
    title: "🌟 Menú Principal - Fire ",
    body: "Fly Developed by Destiny",
    mediaUrl: null,
    description: null,
    previewType: "PHOTO",
    thumbnailUrl: "https://postimage.me/images/2025/01/10/IMG-20250110-WA0016.jpg",
    sourceUrl: "https://whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e", // Enlace de referencia
    mediaType: 1,
    renderLargerThumbnail: true // Activa el intento de mostrar miniaturas más grandes
};

    // Envía el mensaje con `rcanal`
    await sock.sendMessage(from, {
        text: helpMessage, // Texto del menú
        ...rcanal // Incluye el objeto rcanal
    });

    console.log("Imagen y mensaje de ayuda enviados correctamente.");
} catch (err) {
    console.error("Error al enviar la imagen y el mensaje de ayuda: ", err);
    enviar("❌ Hubo un error al enviar la imagen. Inténtalo nuevamente.");
}

// Inicializa el usuario si no existe en el objeto `user`
user[sender] = user[sender] || { nivel: 1, comandos: 0 };

// Incrementa los comandos usados
user[sender].comandos += 1;

// Incrementa el nivel si alcanza el umbral
if (user[sender].comandos % comandosPorNivel === 0) {
    user[sender].nivel += 1;
    enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel).nombre}).`);
}

// Guarda los cambios en el archivo user.json y balance.json
fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

break;
    
case "w":
case "work": {
    const cooldown = 2 * 60 * 1000; // 2 minutos
    const currentTime = Date.now(); // Asegúrate de obtener el tiempo actual

    user[sender] = user[sender] || { lastWork: 0 };

    if (currentTime - user[sender].lastWork < cooldown) {
        const tiempoRestante = cooldown - (currentTime - user[sender].lastWork);
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        return enviar(`No trabajes tanto compa, el trabajo es malo. Descansa ${minutos} minutos y ${segundos} segundos para volver a chambear.`);
    }

    user[sender].lastWork = currentTime;

    const coins = 156; // Dinero ganado
    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };
    bal[sender].dinero += coins;

    enviar(`¡Felicidades! Chambeado bien duro, has ganado *${coins}* ${moneda}! 
> Ahora tienes *${bal[sender].dinero} ${moneda}* en efectivo.`);

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    guardarBalance();
    break;
}

case "crime": {

    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };

    // Textos para ganar
    const textosGanar = [
        {
            texto: "Te metiste al cartel de Sinaloa ganando 1000 coins",
            detalle: "> Y arriba el cartel de Sinaloa",
            coins: 1000
        },
        {
            texto: "Lograste escapar con el botín ganando 500 coins",
            coins: 500 // Sin detalle
        }
    ];

    // Textos para perder
    const textosPerder = [
        {
            texto: "Estabas vendiendo drogas y los federales te encontraron perdiendo 800 coins",
            detalle: "> Escondete más mejor para la otra",
            coins: 800
        },
        {
            texto: "Intentaste robar un coche, pero te atraparon perdiendo 400 coins",
            coins: 400 // Sin detalle
        }
    ];

    // Determinar si se gana o se pierde
    const probabilidad = Math.random();
    if (probabilidad < 0.5) {
        // Ganar
        const casoGanar = textosGanar[Math.floor(Math.random() * textosGanar.length)];
        enviar(`¡${casoGanar.texto}!\n${casoGanar.detalle || ""}\n> Ahora tienes *${bal[sender].dinero += casoGanar.coins} ${moneda}* en efectivo.`);
    } else {
        // Perder
        const casoPerder = textosPerder[Math.floor(Math.random() * textosPerder.length)];
        bal[sender].dinero = Math.max(0, bal[sender].dinero - casoPerder.coins); // Evitar saldo negativo
        enviar(`¡${casoPerder.texto}!\n${casoPerder.detalle || ""}\n> Ahora tienes *${bal[sender].dinero} ${moneda}* en efectivo.`);
    }

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    guardarBalance();
    break;
}

case "slut": {
    const cooldown = 3 * 60 * 1000; // 3 minutos
    user[sender] = user[sender] || { lastSlut: 0 };

    if (currentTime - user[sender].lastSlut < cooldown) {
        const tiempoRestante = cooldown - (currentTime - user[sender].lastSlut);
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        return enviar(`Esperate hombre, todavía no puedes usarlo. Espera ${minutos} minutos y ${segundos} segundos para poder usarlo de nuevo.`);
    }

    user[sender].lastSlut = currentTime;

    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };

    // Textos para ganar
    const textosGanar = [
        {
            texto: "Tu jefe te dijo que fueras a su oficina para subirte el salario y tu salario subió a *900 coins*",
            detalle: "> A tu jefe le gustó lo que vio, ¡te subió el sueldo de más!",
            coins: 900
        },
        {
            texto: "¡Tu jefe quedó tan impresionado que te subió el sueldo a *1200 coins*!",
            detalle: "> ¡Sigue así, campeón!",
            coins: 1200
        }
    ];

    // Textos para perder
    const textosPerder = [
        {
            texto: "Tu jefe no quedó nada contento y no solo no te subió el salario, sino que te descontó *500 coins*",
            detalle: "> ¡Mejor ponte las pilas para la próxima!",
            coins: -500
        },
        {
            texto: "Intentaste impresionar a tu jefe, pero solo te descuentan *300 coins*",
            detalle: "> ¡No basta solo con esfuerzo, compa!",
            coins: -300
        }
    ];

    // Determinar si se gana o se pierde
    const probabilidad = Math.random();
    if (probabilidad < 0.5) {
        // Ganar
        const casoGanar = textosGanar[Math.floor(Math.random() * textosGanar.length)];
        bal[sender].dinero += casoGanar.coins;
        enviar(`¡${casoGanar.texto}!\n${casoGanar.detalle}\n> Ahora tienes *${bal[sender].dinero} ${moneda}* en efectivo.`);
    } else {
        // Perder
        const casoPerder = textosPerder[Math.floor(Math.random() * textosPerder.length)];
        bal[sender].dinero = Math.max(0, bal[sender].dinero - Math.abs(casoPerder.coins)); // Evitar saldo negativo
        enviar(`¡${casoPerder.texto}!\n${casoPerder.detalle}\n> Ahora tienes *${bal[sender].dinero} ${moneda}* en efectivo.`);
    }

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    guardarBalance();
    break;
}

case "daily": {
    const cooldown = 22 * 60 * 60 * 1000; // 22 horas en milisegundos para reclamar el daily
    const maxStreakCooldown = 44 * 60 * 60 * 1000; // 44 horas en milisegundos para reiniciar el streak
    user[sender] = user[sender] || { lastDaily: 0, streak: 0 };

    // Si el usuario ha pasado más de 44 horas sin reclamar, reiniciar el streak
    if (currentTime - user[sender].lastDaily > maxStreakCooldown) {
        user[sender].streak = 0; // Reinicia el streak si no lo ha reclamado en 44 horas
    }

    // Asegurarse de que `streak` sea un número válido
    if (isNaN(user[sender].streak)) {
        user[sender].streak = 0; // Reestablecer si es NaN
    }

    // Aumentar el streak si no se ha reiniciado
    user[sender].streak = user[sender].streak + 1;

    // Determinar la cantidad de dinero a recibir según el streak
    let coins = 500 + (user[sender].streak - 1) * 800; // 500 para el primer día, 800 para el segundo, 1200 para el tercero, etc.

    // Asegurarse de que `coins` no sea NaN (esto puede ser útil si se da algún valor incorrecto)
    if (isNaN(coins)) {
        coins = 500; // Asignar un valor por defecto si `coins` es NaN
    }

    // Verificar si el usuario está intentando reclamar el daily antes de las 22 horas de espera
    if (currentTime - user[sender].lastDaily < cooldown) {
        const tiempoRestante = cooldown - (currentTime - user[sender].lastDaily);
        const horas = Math.floor(tiempoRestante / (60 * 60 * 1000));
        const minutos = Math.floor((tiempoRestante % (60 * 60 * 1000)) / (60 * 1000));
        return enviar(`espera hombre todavia no pasa el dia y ya quieres volver a usarlo espera ${horas} horas y ${minutos} minutos no duerme o que vato que`);
    }

    // Actualizar el saldo del usuario
    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };
    bal[sender].dinero += coins;

    // Guardar la fecha actual como la última vez que el usuario reclamó el daily
    user[sender].lastDaily = currentTime;

    // Enviar el mensaje de recompensa
    enviar(`¡Recibiste tu salario diario de *${coins}* ${moneda}!
> Has mantenido una racha de ${user[sender].streak} días en tu chamba. Sigue asi para que te suba el sueldo a +800.`);

    // Guardar los datos del usuario y el balance
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    guardarBalance();
    break;
}

case "bal":
case "banco": {
    if (isApagado) {
        return enviar("❖ El bot *mahiru * está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    }

    // Asegurar que el balance para el usuario actual exista y sea válido
    if (!bal[sender] || typeof bal[sender] !== "object" || bal[sender] === null) {
        bal[sender] = { banco: 0, dinero: 0 }; // Crear entrada válida si no existe
    }

    // Extraer valores correctamente del objeto
    const { banco = 0, dinero = 0 } = bal[sender]; // Usa valores predeterminados si faltan claves
    const total = banco + dinero;

    // Mostrar el balance con detalles
    enviar(
        `Bienvenido/a 
*a tu estado de cuenta de BBVA Bancomer:*\n\n` +
        `- feria en el pantalón: *${dinero}* ${moneda}\n` +
        `- en el banco BBVA: *${banco}* ${moneda}\n` +
        `- Total: *${total}* ${moneda}\n\n` +
        "> banco ilustrativo de Kitten gift ❄️"
    );

    // Inicializar el usuario si no existe en el objeto `user`
    user[sender] = user[sender] || { nivel: 1, comandos: 0 };

    // Incrementar los comandos usados
    user[sender].comandos += 1;

    // Incrementar el nivel si alcanza el umbral
    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel).nombre}).`);
    }

    // Guardar cambios en los archivos
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

    break;
}

case "profile":
case "perfil": {
    if (isApagado) return enviar("❖ El bot *mahiru* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    
    // Obtener datos del usuario
    const usuarioFoto = info.pushName || "Sin nombre"; // Nombre del usuario
    const descripcion = users[sender]?.desc || "Sin descripción. Usa #setdesc para establecer una."; // Descripción personalizada
    const nivel = user[sender]?.nivel || 1; // Nivel del usuario
    const rango = obtenerRango(nivel); // Calcula el rango (incluye nombre e imagen)
    const comandosUsados = user[sender]?.comandos || 0; // Total de comandos usados
    const casadoCon = marriages[sender]?.[0] ? `@${marriages[sender][0].split("@")[0]}` : "Soltero"; // Persona con la que está casado
    const cumple = user[sender]?.birthday || "No establecido"; // Fecha de cumpleaños
    const genero = user[sender]?.gender || "No especificado"; // Género del usuario
    const { banco = 0, dinero = 0 } = bal[sender] || { banco: 0, dinero: 0 }; // Monedas del usuario
    const total = banco + dinero;

    // Obtener la posición del usuario en el ranking
    const userList = Object.entries(user)
        .map(([number, data]) => {
            const rango = obtenerRango(data.nivel || 1).nombre;
            return {
                number,
                rango,
                nivel: data.nivel || 1,
                nombre: data.nombre || `+${number}`,
            };
        })
        .sort((a, b) => b.nivel - a.nivel); // Ordenar por nivel
    const userPosition = userList.findIndex(u => u.number === sender.split("@")[0]) + 1;

    // Construir el mensaje de perfil
    const perfilMensaje = `
 「✿」Perfil ${usuarioFoto}
-----------------------------------
 ${descripcion}
 
 Cumpleaños: ${cumple}
 Género: ${genero}
 Estado Civil: ${casadoCon}

 Nivel: ${nivel}
 Rango: ${rango.nombre}

✿ Total de Monedas: ${total}
✿ Comandos Usados: ${comandosUsados}

✿ Tu puesto en el Top: ${userPosition || "No disponible"}
-----------------------------------
> 🌸 *Perfil creativo de Kitten gift Destiny❄️*
    `;

    // Intentar obtener y enviar la foto de perfil del usuario
    try {
        const perfilFotoUrl = await sock.profilePictureUrl(sender, "image").catch(() => null); // URL de la foto de perfil
        const imagenPerfil = perfilFotoUrl || rango.imagen; // Usar foto de perfil o imagen del rango si no tiene

        await sock.sendMessage(from, { 
            image: { url: imagenPerfil }, // Imagen de la foto de perfil o rango
            caption: perfilMensaje 
        });
    } catch (error) {
        console.error("Error al enviar el perfil con imagen:", error.message);
        enviar("❌ No se pudo obtener la foto de perfil. Aquí está tu perfil en texto:\n\n" + perfilMensaje);
    }

    // Guarda los cambios en los archivos
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

    break;
}

    case "lvl":
case "level": {
    if (isApagado) return enviar("❖ El bot *mahiru * está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");

    // Inicializa el usuario si no existe en el objeto `user`
    user[sender] = user[sender] || { nivel: 1, comandos: 0 };
    
    const nivelActual = user[sender].nivel;
    const comandosUsados = user[sender].comandos;

    // Configuración del sistema de niveles
    const progresoActual = comandosUsados % comandosPorNivel; // Comandos usados en este nivel
    const faltan = comandosPorNivel - progresoActual; // Comandos restantes para el siguiente nivel

    // Respuesta del nivel
    const mensajeNivel = `
    *Tu Nivel Actual:* ${nivelActual} (${obtenerRango(nivelActual).nombre})
    *Progreso:* ${progresoActual}/${comandosPorNivel} comandos
    *Faltan:* ${faltan} comandos para alcanzar el nivel ${nivelActual + 1}.

> ya falta poco compa ya mero
    `;

    enviar(mensajeNivel);

    // Incrementa los comandos usados
    user[sender].comandos += 1;

    // Incrementa el nivel si alcanza el umbral
    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel).nombre}).`);
    }

    // Guarda los cambios en el archivo user.json
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

    break;
}

case "rw":
case "ver": {
    const cooldown = 25 * 60 * 1000; // 25 minutos en milisegundos
    user[sender] = user[sender] || { lastRw: 0 };

    const currentTime = Date.now();
    const timeSinceLastUse = currentTime - (user[sender].lastRw || 0);

    if (timeSinceLastUse < cooldown) {
        const tiempoRestante = cooldown - timeSinceLastUse;
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        return enviar(`⏳ Espera ${minutos} minutos y ${segundos} segundos antes de usar este comando nuevamente.`);
    }

    user[sender].lastRw = currentTime;

    const randomWaifu = waifus[Math.floor(Math.random() * waifus.length)];
    const randomImage = randomWaifu.images[Math.floor(Math.random() * randomWaifu.images.length)];
    const estadoWaifu = randomWaifu.claimedBy
        ? `casada con @${randomWaifu.claimedBy.split('@')[0]}`
        : `libre`;

    // Guarda la waifu generada con el mismo identificador
    if (!generado[from]) generado[from] = {};
    generado[from] = randomWaifu; // Almacena en el objeto generado
    saveGeneratedWaifus(); // Asegura la persistencia

    const waifuMsg = `
 Nombre: ${randomWaifu.name}
Sexo: ${randomWaifu.gender || "No especificado"}
cuesta: ${randomWaifu.value}
estado: ${estadoWaifu}
viene del anime: ${randomWaifu.source || "No especificada"}
    `;

    try {
        await sock.sendMessage(from, {
            image: { url: randomImage },
            caption: waifuMsg,
            contextInfo: { mentionedJid: [] }
        });
    } catch (error) {
        enviar(`[Error] No se pudo enviar la imagen de "${randomWaifu.name}".`);
    }

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    break;
}


case "harem": {
    const groupId = from; // ID del grupo
    let targetUser = sender; // Usuario predeterminado (el remitente del mensaje)

    // Verificar si el mensaje contiene menciones o respuestas
    if (m.message?.extendedTextMessage?.contextInfo) {
        const contextInfo = m.message.extendedTextMessage.contextInfo;

        // Si hay menciones explícitas
        if (contextInfo.mentionedJid && contextInfo.mentionedJid.length > 0) {
            targetUser = contextInfo.mentionedJid[0]; // Primer usuario mencionado
        } 
        // Si es un mensaje citado
        else if (contextInfo.participant) {
            targetUser = contextInfo.participant; // Usuario citado
        }
    }

    // Depurar el usuario objetivo
    console.log("Usuario objetivo:", targetUser);

    // Validar si el usuario tiene un harem
    if (!groupHarem[groupId] || !groupHarem[groupId][targetUser] || groupHarem[groupId][targetUser].length === 0) {
        enviar(`❌ ${targetUser === sender ? "No tienes" : "Este usuario no tiene"} waifus en su harem en este grupo. Usa *#rw* para generar una waifu y *#claim* para reclamarla.`);
        break;
    }

    // Construir la lista del harem
    const haremList = groupHarem[groupId][targetUser]
        .map((waifu, index) => `✨ ${index + 1}. ${waifu.name} (${waifu.source || "Desconocido"}) - ${waifu.value} coins`)
        .join('\n');

    // Enviar el mensaje del harem
    const targetName = targetUser === sender ? "Tu" : "El usuario mencionado";
    enviar(`🌸 *${targetName} tus viejas en este grupo:*\n\n${haremList}`);
    
    // Incrementar estadísticas del usuario que ejecutó el comando
    user[sender] = user[sender] || { nivel: 1, comandos: 0 };
    user[sender].comandos += 1;

    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
    }

    // Guardar los cambios
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    break;
}
        
case "suggest":
case "add": {

if (!isBotGroupAdmins) return enviar("enviar nesesito ser admin para enviar la sugerencia");
    const suggestionText = q; // Texto de la sugerencia

    if (!suggestionText) {
        enviar("❌ Por favor, escribe una sugerencia.");
        break;
    }

    const botName = botname || "Bot Neko Destiny"; // Nombre del bot (variable global)
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = currentTime.toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' });

    let originGroupName = "Privado"; // Nombre del grupo desde donde se envió
    let originGroupLink = "No disponible";

    if (isGroup) {
        try {
            const originGroupMetadata = await sock.groupMetadata(from);
            originGroupName = originGroupMetadata.subject; // Nombre del grupo origen
            originGroupLink = await sock.groupInviteCode(from).then(code => `https://chat.whatsapp.com/${code}`);
        } catch (error) {
            console.error("Error al obtener datos del grupo de origen:", error);
        }
    }

    // Datos del grupo destino (donde se envía la sugerencia)
    const targetGroupId = "120363325949340879@g.us"; // ID del grupo donde se enviará
    let targetGroupName = "Grupo destino desconocido";
    let targetGroupLink = "No disponible";

    try {
        const targetGroupMetadata = await sock.groupMetadata(targetGroupId); // Metadatos del grupo destino
        targetGroupName = targetGroupMetadata.subject;
        targetGroupLink = await sock.groupInviteCode(targetGroupId).then(code => `https://chat.whatsapp.com/${code}`);
    } catch (error) {
        console.error("Error al obtener datos del grupo destino:", error);
    }

    // Enviar la sugerencia al grupo destino
    sock.sendMessage(targetGroupId, {
        text: `📢 **Nueva sugerencia recibida**\n\n📌 **Sugerencia:** ${suggestionText}\n👤 **Usuario:** ${pushname} (${sender})\n🏷️ **Desde el grupo:** ${originGroupName}\n🔗 **Enlace del grupo de origen:** ${originGroupLink}\n\n🏷️ **Enviado a este grupo:** ${targetGroupName}\n🔗 **Enlace del grupo destino:** ${targetGroupLink}\n\n🤖 **Bot:** ${botName}\n📅 **Fecha:** ${date}\n⏰ **Hora:** ${time}\n\n🔔 **Notificando a los responsables.**`,
    })
    .then(() => {
        enviar(`✅ ¡Tu sugerencia fue enviada al grupo *${targetGroupName}*! Gracias por tu aporte.`);
    })
    .catch((err) => {
        console.error("Error al enviar la sugerencia:", err);
        enviar("❌ Lo siento, ocurrió un error al enviar la sugerencia.");
    });

    break;
}

    case "ping":
case "p": {
    // Marca el tiempo de inicio
    const startTime = Date.now();

    // Calcula el tiempo de respuesta
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Muestra solo el tiempo de respuesta
    enviar(`!pong! Tiempo de respuesta: ${responseTime}ms.`);
    break;
}

    case "addwaifu": {
    const senderNumber = sender.split('@')[0]; // Extraemos el número del remitente

    // Verificar permisos (helper o superior)
    if (!hasPermission(senderNumber, 'helper')) {
        enviar("❌ Este comando solo puede ser usado por usuarios con el rol *helper* o superior.");
        break;
    }

    // Dividir los argumentos: nombre de la waifu y la URL
    const [newWaifuName, newWaifuImageUrl] = args;

    if (!newWaifuName || !newWaifuImageUrl) {
        enviar("❌ Uso: #addwaifu <nombre> <link.jpg>");
        break;
    }

    // Verificar si ya existe una waifu con el mismo nombre
    if (waifus.some(w => w.name.toLowerCase() === newWaifuName.toLowerCase())) {
        enviar(`❌ Ya existe una waifu con el nombre "${newWaifuName}".`);
        break;
    }

    // Verificar que la URL sea válida
    if (!newWaifuImageUrl.startsWith("http") || !newWaifuImageUrl.match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
        enviar("❌ Proporciona un enlace válido de imagen. Ejemplo:\nhttps://i.postimg.cc/ydFG67yD/1707337707358.jpg");
        break;
    }

    // Crear la nueva waifu con el campo "images" como array
    const newWaifu = { 
        name: newWaifuName, 
        images: [newWaifuImageUrl], // Ahora es un array que contiene la primera imagen
        value: 100, 
        votes: [], 
        gender: "No especificado", // Valor predeterminado
        source: "No especificada", // Valor predeterminado
    };

    // Agregar la waifu a la base de datos
    waifus.push(newWaifu);

    // Guardar la base de datos actualizada
    fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2));

    enviar(`✅ La waifu "${newWaifuName}" fue agregada con éxito con un valor inicial de 100 coins.`);
    logCommand(sender, "addwaifu", `Agregó a ${newWaifuName} al gacha`);

    // Actualizar estadísticas del usuario
    user[sender] = user[sender] || { nivel: 1, comandos: 0 };
    user[sender].comandos += 1;

    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel).nombre}).`);
    }

    // Guardar estadísticas del usuario
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    break;
}

    case 'addcoins': {
    if (!hasPermission(senderNumber, 'owner')) {
        enviar("❌ Este comando es exclusivo para usuarios con rol de *owner*.");
        break;
    }

    let target; // Usuario objetivo
    let cantidad; // Cantidad de monedas

    // Modo 1: Respuesta a mensaje
    if (quoted) {
        try {
            target = quoted.participant || quoted.sender; // Detectar remitente del mensaje citado
            cantidad = parseInt(args[0]); // La cantidad debe ser el primer argumento
            console.log("Modo: Respuesta a mensaje");
        } catch (error) {
            console.error("Error al obtener el remitente del mensaje citado:", error);
        }
    } 
    
    // Modo 2: Mención directa con @usuario
    else if (args[0]?.startsWith('@')) {
        try {
            target = args[0].replace(/[@\s]/g, '') + '@s.whatsapp.net';
            cantidad = parseInt(args[1]); // La cantidad debe ser el segundo argumento
            console.log("Modo: Mención directa");
        } catch (error) {
            console.error("Error al procesar mención directa:", error);
        }
    } 
    
    // Modo 3: Número directo
    else if (args.length === 2) {
        try {
            target = args[0].replace(/[@\s]/g, '') + '@s.whatsapp.net';
            cantidad = parseInt(args[1]); // La cantidad debe ser el segundo argumento
            console.log("Modo: Número directo");
        } catch (error) {
            console.error("Error al procesar número directo:", error);
        }
    }

    // Depuración: Mostrar información en la consola
    console.log("Target detectado:", target);
    console.log("Cantidad detectada:", cantidad);

    // Validación de las entradas
    if (!target || isNaN(cantidad) || cantidad <= 0) {
        enviar("❌ Uso incorrecto. Ejemplo: *#addcoins @usuario cantidad* o responde a un mensaje con *#addcoins cantidad*.");
        break;
    }

    // Inicializar balance si no existe
    bal[target] = bal[target] || { banco: 0, dinero: 0 };

    // Agregar monedas
    bal[target].dinero += cantidad;
    guardarBalance();

    // Confirmar operación
    enviar(`✅ Se han agregado ${cantidad} ${moneda} a @${target.split('@')[0]}.`, [target]);
    break;
}

    case "setrole": {
    const senderNumber = sender.split("@")[0];

    if (!hasPermission(senderNumber, "owner")) {
        enviar("❌ Solo el owner puede asignar roles.");
        break;
    }

    const [target, newRole] = args; // Ejemplo: !setrole 5213339992782 mod
    if (!target || !newRole) {
        enviar("❌ Uso: !setrole [número] [rol]. Ejemplo: !setrole 5213339992782 mod");
        break;
    }

    const validRoles = ["helper", "mod", "owner"];
    if (!validRoles.includes(newRole)) {
        enviar(`❌ Rol no válido. Los roles válidos son: ${validRoles.join(", ")}`);
        break;
    }

    const targetNumber = target.split("@")[0];
    roles[targetNumber] = newRole; // Actualiza el rol del usuario
    saveRoles(roles); // Guarda los cambios en roles.json

    enviar(`✅ ${target} ha sido asignado al rol ${newRole}.`);
    logCommand(sender, "setrole", `Asignó el rol ${newRole} a ${target}`);
    
    user[sender] = user[sender] || { nivel: 1, comandos: 0 };

    // Incrementar los comandos usados
    user[sender].comandos += 1;

    // Incrementar el nivel si alcanza el umbral
    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
    }

    // Guardar cambios en los archivos
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    
    break;
}
        
case "claim":
case "c": {
    const cooldown = 2.2 * 60 * 1000; // 2.2 minutos en milisegundos
    const costoOmitir = 150000; // Costo para omitir el cooldown
    user[sender] = user[sender] || { lastClaim: 0, balance: 0 }; // Inicializa datos del usuario si no existen

    const currentTime = Date.now();
    const timeSinceLastUse = currentTime - (user[sender].lastClaim || 0);

    // Verifica si el usuario está en cooldown
    if (timeSinceLastUse < cooldown) {
        const tiempoRestante = cooldown - timeSinceLastUse;
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);

        // Verifica si el usuario tiene habilitada la omisión y si tiene saldo suficiente
        if (user[sender].omitClaim && user[sender].balance >= costoOmitir) {
            user[sender].balance -= costoOmitir; // Descuenta el saldo
            user[sender].omitClaim = false; // Desactiva la omisión para el siguiente uso
            enviar(`✅ Has omitido el cooldown pagando ${costoOmitir} ${moneda}. Saldo restante: ${user[sender].balance}.`);
        } else {
            return enviar(
                `⏳ Espera ${minutos > 0 ? minutos + " minutos y " : ""}${segundos} segundos antes de reclamar otra waifu.\n\n` +
                `💰 Para omitir el tiempo, escribe *#omitircooldown c* pagando ${costoOmitir} ${moneda}.`
            );
        }
    }

    // Actualiza el tiempo de uso del comando
    user[sender].lastClaim = currentTime;

    if (isApagado) {
        return enviar("❖ El bot *mahiru* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    }
    if (!generado[from]) {
        enviar("❌ No hay ninguna waifu generada. Usa *#rw* para generar una.");
        break;
    }

    const groupId = from;
    const waifuToClaim = generado[from];

    groupHarem[groupId] = groupHarem[groupId] || {};
    groupHarem[groupId][sender] = groupHarem[groupId][sender] || [];

    if (waifuToClaim.claimedBy) {
        enviar(`❌ Esta waifu ya ha sido reclamada en este grupo por @${waifuToClaim.claimedBy.split('@')[0]}.`);
        break;
    }

    groupHarem[groupId][sender].push(waifuToClaim);
    waifuToClaim.claimedBy = sender;
    saveGeneratedWaifus();
    saveGroupHarem();

    const mensajeReclamacion = claimMessages[sender] || "@user reclamó a *waifu* ";
    const mensajeFinal = mensajeReclamacion
        .replace("@user", pushname || sender.split('@')[0])
        .replace("*waifu*", waifuToClaim.name);

    enviar(mensajeFinal);

    user[sender] = user[sender] || { nivel: 1, comandos: 0 };
    user[sender].comandos += 1;

    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel).nombre}).`);
    }

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    break;
}

case "infobot":
case "botinfo": {
    const botsPath = './bots.json';
    const numeroBot = '5213344753421'; // Número fijo del bot
    let botTipo = "Desconocido"; // Valor predeterminado
    let botDueño = "Desconocido"; // Valor predeterminado para el dueño

    try {
        // Cargar la lista de bots
        if (fs.existsSync(botsPath)) {
            const bots = JSON.parse(fs.readFileSync(botsPath, 'utf-8'));
            const botActual = bots.find(b => b.numero === numeroBot); // Identificar el bot por su número

            if (botActual) {
                botTipo = botActual.tipo.charAt(0).toUpperCase() + botActual.tipo.slice(1); // Capitalizar tipo
                botDueño = botActual.dueño || "Desconocido"; // Asignar dueño o valor predeterminado
            }
        }
    } catch (error) {
        console.error("Error al cargar el archivo de bots:", error.message);
    }

    const botDetails = `
✿  Información del Bot *${botname}*

✿ *Nombre corto:* ${corto}
✿ *Nombre largo:* ${botname}
✦ *Moneda:* ${moneda} 💰

❒ *Host:* host my Heart
❒ *Conectado a:* 736w72-o7299
❒ *Tipo:* ${botTipo}
❐ *Dueño:* ${botDueño}
❒ *Creador:* Destiny Oficial

> *Sitio Anuncios* "https://animeoffis.wixsite.com/neko"
> *canal team* "https://whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e"
`;

    const bannerImage = bannerbot; // URL dinámica del banner

    try {
        // Asegúrate de que `externalAdReply` existe
        if (!rcanal.contextInfo.externalAdReply) {
            rcanal.contextInfo.externalAdReply = {}; // Inicializa si no existe
        }

        // Configura `rcanal` dinámicamente
        rcanal.contextInfo.externalAdReply = {
            showAdAttribution: true,
            title: `💛 ${botname} 💛`,
            body: "Fly, Developed by Destiny Oficial",
            mediaUrl: null,
            description: null,
            previewType: "PHOTO",
            thumbnailUrl: bannerImage, // Imagen dinámica
            sourceUrl: "https://whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e", // Enlace de referencia
            mediaType: 1,
            renderLargerThumbnail: true // Activa miniaturas más grandes
        };

        // Envía el mensaje con rcanal
        await sock.sendMessage(from, {
            text: botDetails, // Detalles del bot
            ...rcanal // Incluye el objeto rcanal
        });

        console.log("Información del bot enviada correctamente con rcanal.");
    } catch (err) {
        console.error("Error al enviar la información del bot:", err);
        enviar("❌ Hubo un error al enviar la información del bot.");
    }
    break;
}

case "wimage": {
    if (!q) return enviar("❌ Por favor, proporciona el nombre de la waifu. Ejemplo: #wimage Destiny");

    const waifuName = q.toLowerCase();
    const waifuToShow = waifus.find(w => w.name.toLowerCase() === waifuName);

    if (!waifuToShow) return enviar(`❌ No se encontró ninguna waifu con el nombre "${q}".`);

    const randomImage = waifuToShow.images[Math.floor(Math.random() * waifuToShow.images.length)];
    const waifuMsg = `
❀ Nombre: ${waifuToShow.name}
⚥ Género: ${waifuToShow.gender || "No especificado"}
✰ Valor: ${waifuToShow.value}
❖ Fuente: ${waifuToShow.source}
    `;

    try {
        await sock.sendMessage(from, {
            image: { url: randomImage },
            caption: waifuMsg
        });
    } catch (error) {
        enviar(`[Error] No se pudo enviar la imagen de "${waifuToShow.name}".`);
    }
    break;
}

enviar("ese comando no existe usar *help* para ver la lista de comandos.")

case 'listroles': {
    // Normaliza el número del remitente eliminando el sufijo @s.whatsapp.net
    const senderNumber = sender.split('@')[0]; 

    // Verifica si el remitente tiene el rol necesario
    if (!hasPermission(senderNumber, 'owner')) {
        enviar('❌ Solo el owner puede usar este comando.');
        break;
    }

    // Inicializa las categorías de roles
    const rolesByCategory = {
        owner: [],
        srmod: [],
        mod: [],
        helper: []
    };

    // Agrupa los usuarios según su rol
    Object.entries(roles).forEach(([user, role]) => {
        if (rolesByCategory[role]) {
            rolesByCategory[role].push(user); // Añade el usuario a la categoría correspondiente
        }
    });

    // Construye la respuesta agrupada por roles
    let rolesList = '📜 *Lista de Roles:*\n\n';
    for (const [role, users] of Object.entries(rolesByCategory)) {
        if (users.length > 0) {
            const roleTitle = role.charAt(0).toUpperCase() + role.slice(1); // Capitaliza el rol
            const usersList = users.map(user => user).join(' '); // Combina los usuarios en una línea
            rolesList += `*${roleTitle}s:*\n${usersList}\n\n`; // Añade la categoría y los usuarios
        }
    }

    // Envía la lista de roles o un mensaje si no hay roles asignados
    enviar(rolesList.trim() || '❌ No hay roles asignados.');
    
    // Incrementa el conteo de comandos del usuario
    user[sender] = user[sender] || { nivel: 1, comandos: 0 };
    user[sender].comandos += 1;

    // Incrementa el nivel si corresponde
    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
    }

    // Guarda los cambios en los archivos de datos
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

    // Registrar el comando (sin la referencia a target)
    logCommand(sender, "listroles");
    break;
}

case 'ban': {
    const senderNumber = sender.split('@')[0]; // Normaliza el remitente

    if (!hasPermission(senderNumber, 'mod')) {
enviar('> Solo los mods o el owner pueden usar este comando.');
        break;
    }

    const [target, duration] = args; // Ejemplo: #ban 5213339992782 1d
    if (!target) {
        enviar('> Especifica el número del usuario a banear. Ejemplo: #ban 5213339992782 1d');
        break;
    }

    const targetNumber = target.split('@')[0]; // Normaliza el número objetivo

    if (bannedUsers[targetNumber]) {
        enviar(`⚠️ El usuario ${targetNumber} ya está baneado.`);
        break;
    }

    let expiresAt = 0; // Por defecto, baneo permanente

    // Procesar duración si está especificada
    if (duration) {
        const unit = duration.slice(-1); // Último carácter (d = días, h = horas)
        const value = parseInt(duration.slice(0, -1)); // Número antes de la unidad

        if (unit === 'd') {
            expiresAt = Date.now() + value * 24 * 60 * 60 * 1000; // Días a milisegundos
        } else if (unit === 'h') {
            expiresAt = Date.now() + value * 60 * 60 * 1000; // Horas a milisegundos
        } else {
            enviar('❌ Duración no válida. Usa "1d" para días o "3h" para horas.');
            break;
        }
    }

    // Agregar a la lista de baneados
    bannedUsers[targetNumber] = { expiresAt };
    fs.writeFileSync('./archivo/data/banned.json', JSON.stringify(bannedUsers, null, 2));

    const banMessage = expiresAt
        ? `✅ Usuario ${targetNumber} baneado por ${duration}.`
        : `✅ Usuario ${targetNumber} ha sido baneado permanentemente.`;
    enviar(banMessage);
    logCommand(sender, "ban", `an baneado a ${targetNumber}`);
     // Inicializa el usuario si no existe en el objeto `user`
user[sender] = user[sender] || { nivel: 1, comandos: 0 };

// Incrementa los comandos usados
user[sender].comandos += 1;

// Incrementa el nivel si alcanza el umbral
if (user[sender].comandos % comandosPorNivel === 0) {
    user[sender].nivel += 1;
    enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
}

// Guarda los cambios en el archivo user.json
fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    break;
}

case 'unban': {
    const senderNumber = sender.split('@')[0];

    if (!hasPermission(senderNumber, 'mod')) {
        enviar('> Solo los mods o el owner pueden usar este comando.');
        break;
    }

    const target = args[0]?.split('@')[0];
    if (!target) {
        enviar('> Especifica el número del usuario a desbanear. Ejemplo: #unban 5213339992782');
        break;
    }

    if (!bannedUsers[target]) {
        enviar(`⚠️ El usuario ${target} no está baneado.`);
        break;
    }

    delete bannedUsers[target];
    fs.writeFileSync('./archivo/data/banned.json', JSON.stringify(bannedUsers, null, 2));
    enviar(`✅ Usuario ${target} ha sido desbaneado.`);
    logCommand(sender, "unban", `an desbaneado a ${target}`);
    break;
}

case "marry":
    if (!q) {
        enviar("❌ Por favor, menciona a quién deseas proponer matrimonio. Ejemplo: #marry @usuario");
        break;
    }

    const target = info.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!target) {
        enviar("❌ Por favor, menciona correctamente al usuario. Ejemplo: #marry @usuario");
        break;
    }

    if (sender === target) {
        enviar("❌ No puedes proponer matrimonio a ti mismo.");
        break;
    }

    if (marriages[sender]?.length > 0) {
        const spouse = marriages[sender][0]; // Obtener el primer cónyuge, ya que solo puede haber uno
        enviar(`❌ Ya estás casado(a) con ${spouse.split('@')[0]} y no puedes casarte con otra persona.`);
        break;
    }

    if (marriages[target]?.length > 0) {
        const spouse = marriages[target][0]; // Obtener el primer cónyuge de la persona objetivo
        enviar(`❌ ${target.split('@')[0]} ya está casado(a) con ${spouse.split('@')[0]}.`);
        break;
    }

    // Guardar la propuesta
    proposals[target] = { from: sender, to: target };
    enviar(`💍 ${pushname} ha propuesto matrimonio a ${q}. Responde con 
> ✎"#si" para aceptar 
> ✎"#no" para rechazar.`);
    break;

case "si":
case "no":
    const proposal = proposals[sender];
    if (!proposal) {
        enviar("❌ No tienes propuestas de matrimonio pendientes.");
        break;
    }

    if (comando === "si") {
        // Asegurarse de que marriages[proposal.from] y marriages[proposal.to] sean arrays
        marriages[proposal.from] = Array.isArray(marriages[proposal.from]) ? marriages[proposal.from] : [];
        marriages[proposal.to] = Array.isArray(marriages[proposal.to]) ? marriages[proposal.to] : [];

        // Agregar el matrimonio
        marriages[proposal.from].push(proposal.to);
        marriages[proposal.to].push(proposal.from);

        saveMarriages(); // Guardar los matrimonios actualizados

        enviar(`¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧
       *•.¸♡ Esposo: ${pushname}
      *•.¸♡ Esposa: ${proposal.from.split('@')[0]} 
      Disfruten de su luna de miel`);
    } else {
        enviar(`❌ ${pushname} ha rechazado la propuesta de matrimonio de ${proposal.from.split('@')[0]}.`);
    }

    // Eliminar la propuesta procesada
    delete proposals[sender];
    break;

case "divorce": {
    const senderNumber = sender.split("@")[0]; // Normaliza el número del remitente

    if (!q) {
        enviar("❌ Por favor, menciona a quién deseas divorciarte. Ejemplo: #divorce @usuario");
        break;
    }

    const target = info.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!target) {
        enviar("❌ Por favor, menciona correctamente al usuario. Ejemplo: #divorce @usuario");
        break;
    }

    if (!marriages[sender]?.includes(target) || !marriages[target]?.includes(sender)) {
        enviar("❌ No estás casado(a) con esta persona.");
        break;
    }

    // Eliminar el matrimonio
    marriages[sender] = marriages[sender].filter(partner => partner !== target);
    marriages[target] = marriages[target].filter(partner => partner !== sender);

    // Eliminar entradas vacías
    if (marriages[sender].length === 0) delete marriages[sender];
    if (marriages[target].length === 0) delete marriages[target];

    saveMarriages(); // Guardar los cambios

    enviar(`💔 ${pushname} y ${target.split('@')[0]} se han divorciado.`);
    break;
}

case "vote":
    if (!args[0]) return enviar("❌ Por favor, proporciona el nombre de la waifu para votar.");
    const waifuNamev = args[0].toLowerCase();

    // Buscar la waifu
    const waifu = waifus.find(w => w.name.toLowerCase() === waifuNamev);

    if (!waifu) {
        enviar(`❌ No se encontró la waifu "${args[0]}".`);
    } else {
        const now = Date.now(); // Hora actual
        const userVotes = waifuVotes[waifu.name] || {}; // Obtener los votos para esta waifu
        const userLastVote = userVotes[sender]; // Última vez que este usuario votó

        // Verificar si el usuario ya votó y si debe esperar
        if (userLastVote && (now - userLastVote < 3600000)) { // 1 hora en milisegundos
            const timeLeft = Math.ceil((3600000 - (now - userLastVote)) / 60000); // Minutos restantes
            enviar(`⏳ Ya votaste por "${waifu.name}". Por favor, espera ${timeLeft} minutos para volver a votar.`);
        } else {
            // Registrar el nuevo voto
            waifuVotes[waifu.name] = {
                ...userVotes,
                [sender]: now // Actualizar el tiempo de último voto
            };

            waifu.value += 10; // Incrementar el valor

            // Guardar cambios en la base de datos y los votos
            fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2));
            saveWaifuVotes();

            enviar(`✅ Has votado por "${waifu.name}". Su valor ahora es de ${waifu.value} coins.`);
        }
    }
    break;

case "setdesc": {
    const nuevaDescripcion = q; // Captura el argumento ingresado
    if (!nuevaDescripcion) {
        enviar("❌ Por favor, escribe una descripción después del comando. Ejemplo: *#setdesc Soy un amante de los gatos.*");
        break;
    }

    // Guardar la descripción en los datos del usuario
    users[sender] = users[sender] || {};
    users[sender].desc = nuevaDescripcion;

    // Guardar los cambios en el archivo `users.json`
    try {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
        enviar(`✅ Tu descripción ha sido actualizada: "${nuevaDescripcion}"`);
    } catch (error) {
        console.error("Error al guardar la descripción:", error.message);
        enviar("❌ Hubo un error al guardar tu descripción. Inténtalo más tarde.");
    }
    
     // Inicializa el usuario si no existe en el objeto `user`
user[sender] = user[sender] || { nivel: 1, comandos: 0 };

// Incrementa los comandos usados
user[sender].comandos += 1;

// Incrementa el nivel si alcanza el umbral
if (user[sender].comandos % comandosPorNivel === 0) {
    user[sender].nivel += 1;
    enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
}

// Guarda los cambios en el archivo user.json
fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    
    break;
}

case 'cf': {
    if (isApagado) {
        enviar("❖ El bot está desactivado en este grupo. Pídele a un administrador que lo active con `#bot on`.");
        break;
    }

    const apuesta = parseInt(args[0]); // Cantidad apostada
    const eleccion = args[1]?.toLowerCase(); // Cara o Cruz

    if (!apuesta || !['cara', 'cruz'].includes(eleccion)) {
        enviar("❌ Uso: `#cf <cantidad> cara|cruz`.");
        break;
    }

    // Verificar si el balance está inicializado y es suficiente
    bal[sender] = bal[sender] || 0;
    if (bal[sender] < apuesta) {
        enviar(`❌ No tienes suficientes ${moneda} para apostar.`);
        break;
    }

    const resultado = Math.random() < 0.5 ? 'cara' : 'cruz'; // Simula el resultado

    if (eleccion === resultado) {
        bal[sender] += apuesta;
        enviar(`🎉 ¡Ganaste! El resultado fue *${resultado}*. Ahora tienes ${bal[sender]} ${moneda}.`);
    } else {
        bal[sender] -= apuesta;
        enviar(`😢 Perdiste. El resultado fue *${resultado}*. Ahora tienes ${bal[sender]} ${moneda}.`);
    }

    // Inicializa el usuario si no existe en el objeto `user`
    user[sender] = user[sender] || { nivel: 1, comandos: 0 };

    // Incrementa los comandos usados
    user[sender].comandos += 1;

    // Incrementa el nivel si alcanza el umbral
    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
    }

    // Guarda los cambios en los archivos correspondientes
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

    guardarBalance();
    break;
}

case "rt": {
    // Verificar si se ha proporcionado una cantidad y una opción (red/black)
    if (args.length < 2) {
        return enviar("Por favor, proporciona una cantidad y una opción (red/black). Ejemplo: #rt 100 red");
    }

    const cantidad = parseInt(args[0]);
    const opcion = args[1].toLowerCase();

    // Verificar si la cantidad es un número válido
    if (isNaN(cantidad) || cantidad <= 0) {
        return enviar("Por favor, proporciona una cantidad válida.");
    }

    // Verificar si la opción es válida
    if (!["red", "black"].includes(opcion)) {
        return enviar("Por favor, elige una opción válida (red/black).");
    }

    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };

    // Verificar si el usuario tiene suficiente dinero
    if (bal[sender].dinero < cantidad) {
        return enviar("No tienes suficiente dinero para apostar esa cantidad.");
    }

    // Generar el resultado aleatorio (red o black)
    const resultado = Math.random() < 0.7 ? "red" : "black";

    if (opcion === resultado) {
        // Ganar
        const ganancia = cantidad * 2;
        bal[sender].dinero += ganancia;
        enviar(`¡Felicidades! Apostaste ${cantidad} a ${resultado} ganando ${ganancia} ${moneda}. 
> Ahora tienes ${bal[sender].dinero} ${moneda}.`);
    } else {
        // Perder
        bal[sender].dinero -= cantidad;
        enviar(`Lo siento, salio ${resultado} ${cantidad} perdiendo ${cantidad} ${moneda} 
> Ahora tienes ${bal[sender].dinero} ${moneda}.`);
    }

    // Guardar cambios en el balance
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    guardarBalance();
    break;
}


case "setgender": {
    const senderNumber = sender.split("@")[0]; // Normaliza el número del remitente

    if (!hasPermission(senderNumber, "helper")) {
        enviar("❌ Solo los usuarios con el rol *helper* o superior pueden cambiar el género.");
        break;
    }

    const [waifuName, ...genderParts] = args; // Ejemplo: !setgender Rem Femenino
    const newGender = genderParts.join(" ").trim();

    if (!waifuName || !newGender) {
        enviar("❌ Uso: !setgender [nombre_waifu] [género]. Ejemplo: !setgender Rem Femenino");
        break;
    }

    const waifuToUpdate = waifus.find(w => w.name.toLowerCase() === waifuName.toLowerCase());

    if (!waifuToUpdate) {
        enviar(`❌ No se encontró ninguna waifu con el nombre "${waifuName}".`);
        break;
    }

    waifuToUpdate.gender = newGender; // Actualiza el género
    fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2)); // Guarda los cambios

    enviar(`✅ El género de "${waifuToUpdate.name}" ha sido actualizado a "${newGender}".`);
    logCommand(sender, "setgender", `Cambiado género de ${waifuName} a ${newGender}`);
    break;
}


case "setsource": {
    const senderNumber = sender.split("@")[0]; // Normaliza el número del remitente

    if (!hasPermission(senderNumber, "helper")) {
        enviar("❌ Solo los usuarios con el rol *helper* o superior pueden cambiar la fuente.");
        break;
    }

    const [waifuName, ...sourceParts] = args; // Ejemplo: !setsource Rem Re:Zero
    const newSource = sourceParts.join(" ").trim();

    if (!waifuName || !newSource) {
        enviar("❌ Uso: !setsource [nombre_waifu] [fuente]. Ejemplo: !setsource Rem Re:Zero");
        break;
    }

    const waifuToUpdate = waifus.find(w => w.name.toLowerCase() === waifuName.toLowerCase());

    if (!waifuToUpdate) {
        enviar(`❌ No se encontró ninguna waifu con el nombre "${waifuName}".`);
        break;
    }

    waifuToUpdate.source = newSource; // Actualiza la fuente
    fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2)); // Guarda los cambios

    enviar(`✅ La fuente de "${waifuToUpdate.name}" ha sido actualizada a "${newSource}".`);
    logCommand(sender, "setsource", `Cambiado fuente de ${waifuName} a ${newSource}`);
    break;
}

case "setimage": {
    const senderNumber = sender.split("@")[0]; // Normaliza el número del remitente

    if (!hasPermission(senderNumber, "helper")) {
        enviar("❌ Solo los usuarios con el rol *helper* o superior pueden cambiar la imagen de una waifu.");
        break;
    }

    const [waifuName, newImageUrl] = args; // Ejemplo: !setimage Rem https://example.com/image.jpg
    if (!waifuName || !newImageUrl) {
        enviar("❌ Uso: !setimage [nombre_waifu] [url_imagen]. Ejemplo: !setimage Rem https://example.com/image.jpg");
        break;
    }

    const waifuToUpdate = waifus.find(w => w.name.toLowerCase() === waifuName.toLowerCase());

    if (!waifuToUpdate) {
        enviar(`❌ No se encontró ninguna waifu con el nombre "${waifuName}".`);
        logCommand(sender, "setimage", `${target} ${newRole}`); // Registrar el comando
        break;
    }

    waifuToUpdate.image = newImageUrl; // Actualiza la URL de la imagen
    fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2)); // Guarda los cambios en waifuDB.json

    enviar(`✅ La imagen de "${waifuToUpdate.name}" ha sido actualizada.`);
    break;
}

case "ainfo": {
    if (!q || typeof q !== "string") {
        return enviar("❌ Por favor, proporciona el nombre del anime. Ejemplo: *#ainfo Tokyo Revengers*");
    }

    const animeName = q.trim().toLowerCase(); // Nombre del anime proporcionado en minúsculas

    // Buscar personajes del anime en la base de datos (usa "source" en lugar de "anime")
    const personajesDelAnime = waifus.filter((waifu) => 
        waifu.source && waifu.source.toLowerCase() === animeName
    );

    if (personajesDelAnime.length === 0) {
        return enviar(`❌ No se encontraron personajes para el anime *${q.trim()}*.`);
    }

    // Contar personajes totales y reclamados
    const totalPersonajes = personajesDelAnime.length;
    const reclamados = personajesDelAnime.filter((waifu) => waifu.claimedBy).length;

    // Crear la lista de personajes
    const listaPersonajes = personajesDelAnime.map((waifu, index) => {
        const reclamadoPor = waifu.claimedBy
            ? `*(Reclamado por @${waifu.claimedBy.split('@')[0]})*`
            : "*(Disponible)*";
        return `*${index + 1}.* ${waifu.name.replace(/_/g, " ")} ${reclamadoPor}`;
    }).join("\n");

    // Mensaje formateado
    const mensajeAinfo = `
✰ 𝘕𝘰𝘮𝘣𝘳𝘦: *${personajesDelAnime[0].source}*

✿ 𝘗𝘦𝘳𝘴𝘰𝘯𝘢𝘫𝘦𝘴: *${totalPersonajes}*
◆ 𝘙𝘦𝘤𝘭𝘢𝘮𝘢𝘥𝘰𝘴: *${reclamados}*
◧ 𝘓𝘪𝘴𝘵𝘢 𝘥𝘦 𝘱𝘦𝘳𝘢𝘰𝘯𝘢𝘫𝘦𝘴: ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
‎‎${listaPersonajes}
    `;

    enviar(mensajeAinfo);
    break;
}


case 'ytmp4': // Descargar videos
case 'mp4': {
    if (!args[0]) {
        enviar(`🌸 _Ingresa el enlace o el nombre del video._\n\nEjemplo:\n> *${prefixo}mp4* Despacito\n> *${prefixo}mp4* https://youtube.com/watch?v=e-xToC9wNl0`);
        break;
    }

    const query = args.join(' '); // Convierte los argumentos en una sola cadena
    let videoUrl = args[0].match(/youtu/gi) ? args[0] : null;

    if (!videoUrl) {
        try {
            enviar('🔍 _Buscando el video..._');
            const search = await ytSearch(query); // Realiza la búsqueda en YouTube
            if (!search || !search.videos.length) {
                enviar('❌ No se encontraron resultados para tu búsqueda.');
                break;
            }
            const video = search.videos[0]; // Toma el primer resultado
            videoUrl = video.url; // Obtén el enlace del video
            enviar(`🌸 *Video encontrado:* ${video.title}\n🎥 _Procesando descarga..._`);
        } catch (error) {
            console.error('Error al buscar el video:', error.message);
            enviar('❌ Ocurrió un error al buscar el video. Intenta nuevamente.');
            break;
        }
    }

    const quality = args[1] || '360p'; // Calidad predeterminada
    const validQualities = ['144p', '360p', '720p']; // Calidades soportadas
    if (!validQualities.includes(quality)) {
        enviar(`❌ Calidad no válida. Usa una de las siguientes: ${validQualities.join(', ')}`);
        break;
    }

    try {
        enviar('📥 _Procesando descarga..._');
        const result = await fg.ytv(videoUrl, quality); // Descarga el video del enlace

        if (!result || !result.dl_url || !result.title || !result.size) {
            throw new Error('Respuesta inválida de ytv. Verifica el enlace o la calidad.');
        }

        const { dl_url, title, size } = result;
        const sizeMB = parseFloat(size.split('MB')[0]);

        if (sizeMB > 100) { // Limitar el tamaño del archivo
            enviar(`❌ El archivo pesa más de 100 MB (${size}). Usa otro comando alternativo.`);
            break;
        }

        const caption = `🌸 *Título:* ${title}\n🎞️ *Calidad:* ${quality}\n☁️ *Tamaño:* ${size}\n\n📽️ *Enviando tu video...*`;
        await sock.sendMessage(from, { text: caption });
        await sock.sendMessage(from, { 
            video: { url: dl_url }, 
            caption: title 
        });
    } catch (error) {
        console.error('Error al descargar el video:', error.message);
        enviar('❌ Ocurrió un error al descargar el video. Intenta nuevamente.');
    }
    break;
}

case "play": {
    if (!q) return enviar("❌ Por favor, proporciona el nombre de la canción o el enlace de YouTube.");

    try {
        enviar("🔍 Buscando la canción, por favor espera un momento...");

        // Llamada a la API de búsqueda
        const searchResponse = await axios.get(`https://restapi.apibotwa.biz.id/api/search-yts?message=${encodeURIComponent(q)}`);
        const searchData = searchResponse.data;

        console.log("Respuesta de la API de búsqueda:", searchData);

        // Accede al primer video de la respuesta
        const videoList = searchData.data.response.video;
        if (!videoList || videoList.length === 0) {
            return enviar("❌ No se encontraron resultados para tu búsqueda.");
        }

        const video = videoList[0];
        const { title, url } = video;

        enviar(`🎶 Canción encontrada: *${title}*\n⏳ Procesando descarga...`);

        // Descargar el audio usando otra API
        const downloadResponse = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`);
        const downloadData = downloadResponse.data;

        console.log("Respuesta de la API de descarga:", downloadData);

        if (!downloadData || !downloadData.result || !downloadData.result.audio) {
            return enviar("❌ No se pudo obtener el audio de la canción.");
        }

        const audioUrl = downloadData.result.audio;

        // Enviar el audio como mensaje de voz
        await sock.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mp4",
            ptt: true, // Enviar como mensaje de voz
        }, { quoted: info });

        enviar(`✅ Canción *${title}* enviada correctamente como mensaje de voz.`);
    } catch (error) {
        console.error("Error en el comando 'play':", error.message);
        enviar("❌ Ocurrió un error al intentar procesar tu solicitud. Por favor, verifica el enlace o inténtalo más tarde.");
    }
    break;
}



case 'guess': {
    if (isApagado) {
        enviar("❖ El bot *mahiru * está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
        break;
    }

    // Lista de acertijos
    const acertijos = [
        { pregunta: "¿Qué tiene manos pero no puede aplaudir?", respuesta: "el reloj" },
        { pregunta: "Mientras más quitas, más grande soy. ¿Qué soy?", respuesta: "un agujero" },
        { pregunta: "Soy alto cuando soy joven y bajo cuando soy viejo. ¿Qué soy?", respuesta: "una vela" },
        { pregunta: "¿Qué puede viajar alrededor del mundo mientras permanece en el mismo lugar?", respuesta: "un sello" },
        { pregunta: "¿Qué tiene un ojo pero no puede ver?", respuesta: "una aguja" },
    ];

    // Seleccionar un acertijo al azar
    const acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];
    enviar(`🤔 *Acertijo:* ${acertijo.pregunta}\n\nTienes 30 segundos para responder. Escribe tu respuesta con el prefijo *#*. Ejemplo: #respuesta`);

    // Configurar variables
    const respuestaCorrecta = `#${acertijo.respuesta.toLowerCase()}`; // Respuesta con prefijo
    const tiempo = 30 * 1000; // 30 segundos
    const userId = sender; // ID del usuario que activó el comando
    let acertado = false;

    // Listener para capturar respuestas
    const respuestaListener = async (respuesta) => {
        const message = respuesta.message?.conversation || respuesta.message?.extendedTextMessage?.text;

        // Ignorar mensajes sin texto
        if (!message) return;

        const texto = message.toLowerCase();
        const autor = respuesta.key?.participant || respuesta.key?.remoteJid;

        // Ignorar mensajes de otros usuarios o sin prefijo
        if (autor !== userId || !texto.startsWith('#')) return;

        // Verificar si la respuesta es correcta o incorrecta
        if (texto === respuestaCorrecta) {
            acertado = true;
            bal[userId] = (bal[userId] || 0) + 500; // Otorgar coins
            enviar(`🎉 ¡Correcto! Has ganado 500 ${moneda}. Tu saldo actual es de ${bal[userId]} ${moneda}.`);
        } else {
            enviar(`❌ Respuesta incorrecta. La respuesta correcta era: *${respuestaCorrecta}*.`);
        }

        // Finalizar el juego
        finalizarJuego();
    };

    // Función para finalizar el juego
    const finalizarJuego = () => {
        sock.ev.off("messages.upsert", respuestaListener); // Desactivar listener
        if (!acertado) {
            enviar(`⏱️ Se acabó el tiempo. La respuesta correcta era: *${respuestaCorrecta}*.`);
        }
    };

    // Configurar timeout
    setTimeout(() => {
        if (!acertado) finalizarJuego();
    }, tiempo);

    // Activar el listener
    sock.ev.on("messages.upsert", respuestaListener);
    break;
}

case "transfer": 
case "cambiar": {
    const senderNumber = sender.split("@")[0]; // Normaliza el número del remitente

    if (!hasPermission(senderNumber, "srmod")) {
        enviar("❌ Solo los usuarios con el rol *srmod* o superior pueden usar este comando.");
        break;
    }

    const [sourceNumber, targetNumber] = args; // Ejemplo: !transferall 521123456789 521987654321

    if (!sourceNumber || !targetNumber) {
        enviar("❌ Uso: !transferall [número_origen] [número_destino]. Ejemplo: !transferall 521123456789 521987654321");
        break;
    }

    // Validar si la cuenta origen existe
    if (!marriages[sourceNumber] && !bal[sourceNumber] && !user[sourceNumber]) {
        enviar(`❌ No se encontraron datos para la cuenta de origen: ${sourceNumber}`);
        break;
    }

    // Crear la cuenta de destino si no existe
    if (!marriages[targetNumber]) marriages[targetNumber] = [];
    if (!bal[targetNumber]) bal[targetNumber] = 0;
    if (!user[targetNumber]) user[targetNumber] = { nivel: 1, comandos: 0 };

    // Transferir datos de matrimonios
    if (marriages[sourceNumber]) {
        marriages[targetNumber] = [...(marriages[targetNumber] || []), ...marriages[sourceNumber]];
        delete marriages[sourceNumber];
    }

    // Transferir balance
    if (bal[sourceNumber] !== undefined) {
        bal[targetNumber] = (bal[targetNumber] || 0) + bal[sourceNumber];
        delete bal[sourceNumber];
    }

    // Transferir estadísticas del usuario
    if (user[sourceNumber]) {
        user[targetNumber].nivel = Math.max(user[targetNumber].nivel, user[sourceNumber].nivel);
        user[targetNumber].comandos += user[sourceNumber].comandos;
        delete user[sourceNumber];
    }

    // Guardar cambios en los archivos
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
    guardarBalance();
    fs.writeFileSync(userFile, JSON.stringify(user, null, 2));

    enviar(`✅ Todos los datos de la cuenta ${sourceNumber} han sido transferidos exitosamente a ${targetNumber}.`);
    logCommand(sender, "transfer", `transfirio los datos de ${sourceNumber} a ${targetNumber}`);
    break;
}

case "verrws": 
case "list" : {
    if (!hasPermission(sender.split("@")[0], "helper")) {
        enviar("❌ Solo los usuarios con el rol *helper* o superior pueden ver la lista de waifus.");
        break;
    }

    if (waifus.length === 0) {
        enviar("❌ No hay waifus registradas actualmente.");
        break;
    }

    // Agrupar waifus por fuente
    const sources = waifus.reduce((acc, waifu) => {
        const source = waifu.source || "Fuente no especificada";
        if (!acc[source]) acc[source] = [];
        acc[source].push(waifu.name);
        return acc;
    }, {});

    // Convertir a un formato para mostrar
    const sourceList = Object.entries(sources).map(([source, waifuNames]) => 
        `- ${source} (${waifuNames.length})`
    );

    // Configurar paginación
    const itemsPerPage = 10; // Cantidad de elementos por página
    const pages = Math.ceil(sourceList.length / itemsPerPage);
    const page = args[0] && !isNaN(args[0]) ? parseInt(args[0]) - 1 : 0; // Página actual (por defecto: 0)
    
    if (page < 0 || page >= pages) {
        enviar(`❌ Página inválida. Por favor selecciona una entre 1 y ${pages}.`);
        break;
    }

    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedList = sourceList.slice(start, end);

    enviar(
        `🌸 *Lista de Waifus Disponibles:*\n\n` +
        `${paginatedList.join("\n")}\n\n` +
`Página ${page + 1} de ${pages}. Usa *verrws <número de página>* para navegar.`
    );
    logCommand(sender, "verrws", `Página ${page + 1}`);
    break;
}

case "delrw": {
    if (!hasPermission(sender.split("@")[0], "srmod")) {
        enviar("❌ Solo los usuarios con el rol *srmod* o superior pueden eliminar una waifu.");
        break;
    }

    const waifuName = q.trim(); // Nombre de la waifu
    if (!waifuName) {
        enviar("❌ Por favor, proporciona el nombre de la waifu a eliminar. Ejemplo: #delwaifu Rem");
        break;
    }

    const waifuIndex = waifus.findIndex(w => w.name.toLowerCase() === waifuName.toLowerCase());
    if (waifuIndex === -1) {
        enviar(`❌ No se encontró ninguna waifu con el nombre "${waifuName}".`);
        break;
    }

    const removedWaifu = waifus.splice(waifuIndex, 1)[0]; // Elimina la waifu
    fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2)); // Guarda los cambios

    enviar(`✅ La waifu "${removedWaifu.name}" ha sido eliminada exitosamente.`);
    logCommand(sender, "delrw", `Eliminó a ${waifuName}`);
    break;
}

case "logs": {
    const PAGE_SIZE = 5; // Tamaño de página
    let logs = [];
    if (fs.existsSync(logFilePath)) {
        try {
            logs = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
            if (!Array.isArray(logs)) throw new Error("Formato inválido en logs.json");
        } catch (error) {
            enviar("❌ Error al leer los registros. El archivo de logs está corrupto.");
            console.error("Error al leer logs.json:", error);
            break;
        }
    } else {
        enviar("❌ No hay registros disponibles.");
        break;
    }

    // Extraer argumentos
    const args = q.split(" "); // Separar argumentos
    let query = null;
    let currentPage = 1;

    // Detectar página directamente (por ejemplo, "#logs 2")
    if (args.length === 1 && !isNaN(args[0])) {
        currentPage = parseInt(args[0]);
    } else {
        // Buscar argumentos en formato "by=filtro page=n"
        query = args.find(arg => arg.startsWith("by="));
        const pageArg = args.find(arg => arg.startsWith("page="));
        currentPage = pageArg ? parseInt(pageArg.split("=")[1]) : 1;
    }

    if (isNaN(currentPage) || currentPage < 1) {
        enviar("❌ El número de página debe ser un valor válido mayor o igual a 1.");
        break;
    }

    if (query) {
        const filterQuery = query.split("=")[1].trim();

        // Filtrar registros por usuario o comando
        const filteredLogs = logs.filter((log) => 
            log.usuario.toLowerCase().includes(filterQuery.toLowerCase()) || 
            log.comando.toLowerCase() === filterQuery.toLowerCase()
        );

        if (filteredLogs.length === 0) {
            enviar(`❌ No se encontraron registros para el filtro *${filterQuery}*.`);
            break;
        }

        // Paginación
        const totalPages = Math.ceil(filteredLogs.length / PAGE_SIZE);
        const paginatedLogs = filteredLogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

        if (paginatedLogs.length === 0) {
            enviar(`❌ No hay registros disponibles en la página ${currentPage}.`);
            break;
        }

        const formattedLogs = paginatedLogs.map((log, index) => {
            return `📄 *Registro ${index + 1 + (PAGE_SIZE * (currentPage - 1))}:*\n🕒 Fecha: ${log.fecha}\n👤 Usuario: ${log.usuario}\n🔧 Comando: ${log.comando}\n📄 Detalles: ${log.detalles}`;
        });

        enviar(
            `📝 *Registros filtrados por '${filterQuery}'* (Página ${currentPage} de ${totalPages}):\n\n${formattedLogs.join("\n\n")}`
        );

        // Contador si se filtra por comando
        const commandCount = logs.filter((log) => log.comando.toLowerCase() === filterQuery.toLowerCase()).length;
        if (commandCount > 0) {
            enviar(`🔢 El comando *${filterQuery}* ha sido utilizado *${commandCount}* veces.`);
        }
    } else {
        // Mostrar registros generales con paginación
        const totalPages = Math.ceil(logs.length / PAGE_SIZE);
        const paginatedLogs = logs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

        if (paginatedLogs.length === 0) {
            enviar(`❌ No hay registros disponibles en la página ${currentPage}.`);
            break;
        }

        const formattedLogs = paginatedLogs.map((log, index) => {
            return `📄 *Registro ${index + 1 + (PAGE_SIZE * (currentPage - 1))}:*\n🕒 Fecha: ${log.fecha}\n👤 Usuario: ${log.usuario}\n🔧 Comando: ${log.comando}\n📄 Detalles: ${log.detalles}`;
        });

        enviar(
            `📝 *Últimos registros de moderación* (Página ${currentPage} de ${totalPages}):\n\n${formattedLogs.join("\n\n")}`
        );
    }
    break;
}

case "einfo": {
    let mensaje = "⏳ *Información de los cooldowns de los comandos económicos:*\n\n";

    // Tiempo restante para el comando "crime"
    const crimeCooldown = 2 * 60 * 1000; // 2 minutos en milisegundos
    user[sender] = user[sender] || { lastCrime: 0 };
    if (currentTime - user[sender].lastCrime < crimeCooldown) {
        const tiempoRestante = crimeCooldown - (currentTime - user[sender].lastCrime);
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        mensaje += `*Crime:* Debes esperar ${minutos} minutos y ${segundos} segundos.\n`;
    } else {
        mensaje += "*Crime:* El comando está disponible para usar.\n";
    }

    // Tiempo restante para el comando "slut"
    const slutCooldown = 3 * 60 * 1000; // 3 minutos en milisegundos
    user[sender] = user[sender] || { lastSlut: 0 };
    if (currentTime - user[sender].lastSlut < slutCooldown) {
        const tiempoRestante = slutCooldown - (currentTime - user[sender].lastSlut);
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        mensaje += `*Slut:* Debes esperar ${minutos} minutos y ${segundos} segundos.\n`;
    } else {
        mensaje += "*Slut:* El comando está disponible para usar.\n";
    }

    // Tiempo restante para el comando "daily"
    const dailyCooldown = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    user[sender] = user[sender] || { lastDaily: 0 };
    if (currentTime - user[sender].lastDaily < dailyCooldown) {
        const tiempoRestante = dailyCooldown - (currentTime - user[sender].lastDaily);
        const horas = Math.floor(tiempoRestante / (60 * 60 * 1000));
        const minutos = Math.floor((tiempoRestante % (60 * 60 * 1000)) / (60 * 1000));
        mensaje += `*Daily:* Debes esperar ${horas} horas y ${minutos} minutos.\n`;
    } else {
        mensaje += "*Daily:* El comando está disponible para usar.\n";
    }

    // Tiempo restante para el comando "work"
    const wCooldown = 2 * 60 * 1000; // 2 minutos en milisegundos
    user[sender] = user[sender] || { lastWork: 0 };
    if (currentTime - user[sender].lastWork < wCooldown) {
        const tiempoRestante = wCooldown - (currentTime - user[sender].lastWork);
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        mensaje += `*Work:* Debes esperar ${minutos} minutos y ${segundos} segundos.\n`;
    } else {
        mensaje += "*Work:* El comando está disponible para usar.\n";
    }

    enviar(mensaje);
    break;
}

case "neko":
case "gato": {
  try {
    enviar("🔄 Buscando una imagen de neko, espera un momento...");
    const response = await axios.get('https://nekos.life/api/v2/img/neko'); // Llama a la API
    const imageUrl = response.data.url; // Extrae la URL de la imagen

    // Envía la imagen con el mensaje
    await sock.sendMessage(from, {
      image: { url: imageUrl },
      caption: "✨ Aquí tienes un neko 🐾"
    });
  } catch (error) {
    console.error("Error al obtener la imagen de neko:", error.message);
    enviar("❌ Ocurrió un error al intentar obtener una imagen de neko.");
  }
  
   // Inicializa el usuario si no existe en el objeto `user`
user[sender] = user[sender] || { nivel: 1, comandos: 0 };

// Incrementa los comandos usados
user[sender].comandos += 1;

// Incrementa el nivel si alcanza el umbral
if (user[sender].comandos % comandosPorNivel === 0) {
    user[sender].nivel += 1;
    enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
}

// Guarda los cambios en el archivo user.json
fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
  
  break;
}

case "setclaim": {
    if (!q) return enviar(`Por favor, especifica un mensaje de reclamación con los marcadores: "@user" y "*waifu*". 
> Ejemplo: *#setclaim @user protegió a *waifu* y fueron felices.*`);

    claimMessages[sender] = q; // Guarda el mensaje personalizado
    fs.writeFileSync(claimMessagesPath, JSON.stringify(claimMessages, null, 2)); // Guarda en el archivo JSON

    enviar(`✅ Tu mensaje de reclamación ha sido configurado como: "${q}"`);
    break;
}

case "genero":
case "gender": {
    const gender = q.trim().toLowerCase();

    if (!gender || !["masculino", "femenino", "otro"].includes(gender)) {
        enviar("❌ Género inválido. Usa: Masculino, Femenino u Otro.");
        break;
    }

    user[sender] = user[sender] || {};
    user[sender].gender = gender.charAt(0).toUpperCase() + gender.slice(1); // Capitaliza la primera letra

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    enviar(`✅ ¡Tu género ha sido configurado como ${user[sender].gender}!`);
    break;
}

case "setcumple":
case "cumple": {
    const birthday = q.trim();
    if (!birthday.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        enviar("❌ Formato inválido. Usa DD/MM/AAAA.");
        break;
    }

    user[sender] = user[sender] || {};
    user[sender].birthday = birthday;

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    enviar(`🎂 ¡Cumpleaños configurado como ${birthday}!`);
    break;
}

case "sellw": {
    const [nombreWaifu, precio] = args; // Separa el nombre y el precio
    const precioNum = parseInt(precio, 10); // Convierte el precio a número

    if (!nombreWaifu || isNaN(precioNum) || precioNum <= 0) {
        enviar("❌ Uso: #sellw <nombre_waifu> <precio>. Ejemplo: #sellw Mikasa 1000");
        break;
    }

    // Verificar si la waifu está en el harem del usuario
    const waifuIndex = userHarem[sender]?.findIndex(w => w.name.toLowerCase() === nombreWaifu.toLowerCase());
    if (waifuIndex === -1) {
        enviar("❌ No tienes una waifu con ese nombre en tu harem.");
        break;
    }

    // Mover la waifu a la tienda
    const waifu = userHarem[sender][waifuIndex];
    waifu.seller = sender; // Agregar información del vendedor
    waifu.price = precioNum; // Establecer el precio
    wshop.push(waifu);

    // Eliminarla del harem del usuario
    userHarem[sender].splice(waifuIndex, 1);

    // Guardar cambios
    fs.writeFileSync('userHarem.json', JSON.stringify(userHarem, null, 2));
    fs.writeFileSync('wshop.json', JSON.stringify(wshop, null, 2));

    enviar(`✅ Has puesto en venta a "${nombreWaifu}" por ${precioNum} ${moneda}. Ahora está disponible en la tienda.`);
    break;
}


case "wshop": {
    if (wshop.length === 0) {
        enviar("🛒 La tienda está vacía. ¡Anima a otros a vender waifus!");
        break;
    }

    // Crear la lista de waifus a la venta
    const tiendaMensaje = wshop
        .map((waifu, index) => {
            const nombre = waifu.nombre || "Desconocido";
            const precio = waifu.precio || "No especificado";
            const vendedor = waifu.vendedor ? `@${waifu.vendedor.split('@')[0]}` : "Vendedor desconocido";

            return `✨ ${index + 1}. *${nombre}*\n   - 💰 Precio: ${precio} ${moneda}\n   - 🏷️ Vendido por: ${vendedor}`;
        })
        .join("\n\n");

    try {
        enviar(`🛒 *Tienda de Waifus:*\n\n${tiendaMensaje}`, { mentions: wshop.map(w => w.vendedor).filter(Boolean) });
    } catch (error) {
        console.error("Error al enviar el mensaje del wshop:", error);
        enviar("❌ Hubo un error al intentar mostrar el wshop.");
    }

    break;
}


case "buyw": {
    if (!args[0]) {
        enviar("❌ Por favor, especifica el nombre de la waifu que deseas comprar. Ejemplo: #buyw [nombre]");
        break;
    }

    const waifuName = args[0].toLowerCase().trim(); // Convertir a minúsculas y eliminar espacios
    const buyer = sender; // ID del comprador

    // Buscar la waifu en el wshop
    const waifuIndex = wshop.findIndex(waifu => 
        waifu.nombre && waifu.nombre.toLowerCase() === waifuName
    );

    if (waifuIndex === -1) {
        enviar(`❌ No se encontró ninguna waifu con el nombre "${args[0]}" en el wshop.`);
        break;
    }

    const waifu = wshop[waifuIndex];

    // Verificar si el comprador tiene suficiente balance
    if (!bal[buyer] || bal[buyer] < waifu.precio) {
        enviar(`❌ No tienes suficientes ${moneda} para comprar a "${waifu.nombre}". Necesitas ${waifu.precio} ${moneda}.`);
        break;
    }

    // Restar el precio del balance del comprador
    bal[buyer] -= waifu.precio;

    // Agregar el balance al vendedor
    bal[waifu.vendedor] = (bal[waifu.vendedor] || 0) + waifu.precio;

    // Transferir la waifu al harem del comprador
    groupHarem[from] = groupHarem[from] || {};
    groupHarem[from][buyer] = groupHarem[from][buyer] || [];
    groupHarem[from][buyer].push({
        name: waifu.nombre,
        image: waifu.imagen,
        value: waifu.precio,
        votes: [],
        gender: "Desconocido", // Agregar el género si está disponible
        source: waifu.fuente || "Desconocido",
        claimedBy: buyer
    });

    // Eliminar la waifu del wshop
    wshop.splice(waifuIndex, 1);

    // Guardar los cambios
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    fs.writeFileSync('groupHarem.json', JSON.stringify(groupHarem, null, 2));
    fs.writeFileSync('wshop.json', JSON.stringify(wshop, null, 2));

    enviar(`✅ ¡Has comprado a "${waifu.nombre}" por ${waifu.precio} ${moneda}!`);
    break;
}

case "top": {
    const senderNumber = sender.split("@")[0];

    // Parámetro opcional para paginación
    const page = parseInt(args[0]) || 1;
    const itemsPerPage = 10;

    // Verificar que haya datos en el archivo `user.json`
    if (!user || Object.keys(user).length === 0) {
        enviar("❌ No hay datos de usuarios registrados.");
        break;
    }

    // Crear una lista de usuarios con su rango y nivel
    const userList = Object.entries(user)
        .map(([number, data]) => {
            const rango = obtenerRango(data.nivel || 1).nombre; // Obtener el rango
            return {
                number,
                rango,
                nivel: data.nivel || 1,
                nombre: data.nombre || `+${number}`, // Usar el nombre si está disponible
            };
        })
        .sort((a, b) => b.nivel - a.nivel); // Ordenar por nivel

    // Calcular la paginación
    const totalItems = userList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (page > totalPages || page < 1) {
        enviar(`❌ Página inválida. Solo hay ${totalPages} página(s) disponible(s).`);
        break;
    }

    // Obtener la lista de la página actual
    const topUsers = userList.slice(startIndex, endIndex);

    // Generar el mensaje estilizado
    let topMessage = "◢✿ *Top de usuarios con más rango* ✿◤\n\n";
    topUsers.forEach((user, index) => {
        topMessage += `✰ ${startIndex + index + 1} » *${user.nombre}*\n`;
        topMessage += `\t\t❖ Rango » *${user.rango}* ❖ LVL » *${user.nivel}*\n`;
    });

    // Agregar información de paginación
    topMessage += `\n> • Página *${page}* de *${totalPages}*\n`;
    if (page < totalPages) {
        topMessage += `> Para ver la siguiente página » *#top ${page + 1}*\n`;
    }

    enviar(topMessage);
    break;
}

case "ginfo": {
    const cooldownRw = 2 * 60 * 1000; // Cooldown de rw
    const cooldownC = 5 * 60 * 1000; // Cooldown de c
    const cooldownVote = 10 * 60 * 1000; // Cooldown de vote

    const tiempoRestanteRw = Math.max(0, cooldownRw - (Date.now() - (user[sender]?.lastRwUse || 0)));
    const tiempoRestanteC = Math.max(0, cooldownC - (Date.now() - (user[sender]?.lastCUse || 0)));
    const tiempoRestanteVote = Math.max(0, cooldownVote - (Date.now() - (user[sender]?.lastVoteUse || 0)));

    const tiempoFormato = (ms) => {
        const minutos = Math.floor(ms / (60 * 1000));
        const segundos = Math.floor((ms % (60 * 1000)) / 1000);
        return `${minutos} minutos y ${segundos} segundos`;
    };

    const mensajeGinfo = `
*⏳ Tiempos de enfriamiento:*
- *rw*: ${tiempoRestanteRw > 0 ? tiempoFormato(tiempoRestanteRw) : "Disponible"}
- *c*: ${tiempoRestanteC > 0 ? tiempoFormato(tiempoRestanteC) : "Disponible"}
- *vote*: ${tiempoRestanteVote > 0 ? tiempoFormato(tiempoRestanteVote) : "Disponible"}
    `;
    enviar(mensajeGinfo);
    break;
}

case "setname":
    if (isOwner) return enviar ("ese comando solo pueda ser usado por el dueño")
    if (!q) return enviar("❌ Proporciona el nuevo nombre para el bot.");
    
    botname = q; // Cambia el nombre del bot
    enviar(`✅ El nombre del bot se cambió a: ${botname}`);
    break;

case "setmoneda":
    if (isOwner) return enviar ("ese comando solo pueda ser usado por el dueño")
    if (!q) return enviar("❌ Proporciona el nuevo nombre para las monedas.");
    
    monedas = q; // Cambia el nombre de la moneda
    enviar(`✅ El nombre de la moneda se cambió a: ${monedas}`);
    break;




case 'antilinkon': {

const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''

 const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
 const isGroupAdmins = groupAdmins.includes(sender) || false 
 

    if (!isGroup) return enviar("❌ Este comando solo puede usarse en grupos.");
    if (!isGroupAdmins) return enviar("❌ Solo los administradores del grupo pueden usar este comando.");
    if (!isBotGroupAdmins) return enviar("❌ Necesito ser administrador para activar el Antilink.");

    if (!antilinkState[from]) {
        antilinkState[from] = true; // Activar antilink
        saveAntilinkState();
        enviar("✅ El Antilink ha sido ACTIVADO en este grupo.");
    } else {
        enviar("❌ El Antilink ya está ACTIVADO en este grupo.");
    }
    break;
    }

case 'antilinkoff': {

const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''

 const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
 const isGroupAdmins = groupAdmins.includes(sender) || false 

    if (!isGroup) return enviar("❌ Este comando solo puede usarse en grupos.");
    if (!isGroupAdmins) return enviar("❌ Solo los administradores del grupo pueden usar este comando.");
    if (!isBotGroupAdmins) return enviar("❌ Necesito ser administrador para desactivar el Antilink.");

    if (antilinkState[from]) {
        antilinkState[from] = false; // Desactivar antilink
        saveAntilinkState();
        enviar("⛔ El Antilink ha sido DESACTIVADO en este grupo.");
    } else {
        enviar("❌ El Antilink ya está DESACTIVADO en este grupo.");
    }
    break;
    }


case "Destiny":
    if (!q) { // Verifica si no hay texto después de #bot
        enviar("❌ Por favor escribe un mensaje después de #Destiny para hablar con el bot");
        break;
    }
    const respuesta = respuestasBot[q.toLowerCase()]; // Busca la respuesta en el diccionario
    if (respuesta) {
        enviar(respuesta); // Envía la respuesta predefinida
    } else {
        enviar("❌ No tengo una respuesta para eso. Intenta con otra palabra.");
    }
    break;
    

case "clear": {
    if (!isGroup) return enviar("❌ Este comando solo puede usarse en grupos.");

    // Validar el rol del usuario
    if (!hasPermission(sender.split("@")[0], "srmod")) {
        return enviar("❌ Este comando solo está disponible para usuarios con el rol *Srmod* o superior.");
    }

    const groupId = from; // ID del grupo actual

    if (!groupHarem[groupId]) {
        return enviar("❌ No hay personajes reclamados en este grupo.");
    }

    // Eliminar el harem de todos los usuarios en el grupo
    groupHarem[groupId] = {};

    // Guardar los cambios en el archivo
    saveGroupHarem();

    enviar("✅ Se han eliminado todos los personajes reclamados y ahora están disponibles para reclamar.");
    break;
}

case "baltop": {
    if (isApagado) {
        return enviar("❖ El bot *mahiru* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    }

    // Validar si hay datos de balances
    if (Object.keys(bal).length === 0) {
        return enviar("❌ No hay usuarios con monedas registradas actualmente.");
    }

    // Número de resultados por página
    const resultadosPorPagina = 10;

    // Obtener la página solicitada, por defecto es la 1
    const paginaSolicitada = parseInt(args[0]) || 1;
    const totalUsuarios = Object.keys(bal).length;
    const totalPaginas = Math.ceil(totalUsuarios / resultadosPorPagina);

    if (paginaSolicitada < 1 || paginaSolicitada > totalPaginas) {
        return enviar(`❌ La página solicitada no existe. Hay un total de ${totalPaginas} páginas.`);
    }

    // Ordenar los balances de mayor a menor (basado en dinero en efectivo)
    const ranking = Object.entries(bal)
        .sort(([, a], [, b]) => (b.dinero || 0) - (a.dinero || 0))
        .slice((paginaSolicitada - 1) * resultadosPorPagina, paginaSolicitada * resultadosPorPagina);

    // Construir el mensaje del ranking
    let mensajeRanking = `🌟 *Top Usuarios con Más Monedas* 🌟\n\n`;
    mensajeRanking += ranking
        .map(([jid, balance], index) => {
            const posicion = (paginaSolicitada - 1) * resultadosPorPagina + index + 1;
            const nombreUsuario = users[jid]?.nombre || jid.split('@')[0];
            const dinero = balance.dinero || 0; // Asegurar que siempre haya un número
            const banco = balance.banco || 0;   // Asegurar que siempre haya un número
            const total = dinero + banco;
            return `#${posicion} - ${nombreUsuario} » 💰 *${total} monedas*`;
        })
        .join("\n");

    mensajeRanking += `\n\n📄 Página ${paginaSolicitada} de ${totalPaginas}`;
    mensajeRanking += `\n🔄 Usa *#baltop [número de página]* para navegar entre las páginas.`;

    // Enviar el mensaje
    enviar(mensajeRanking);
    break;
}

// Comando r34 para mostrar la waifu
case "r34": {
    // Cargar el archivo rule.json
    let waifus = {};
    try {
        waifus = JSON.parse(fs.readFileSync('rule.json', 'utf8'));
    } catch (error) {
        console.error("Error al leer el archivo rule.json:", error.message);
        enviar("❌ No se pudo cargar la base de datos de waifus.");
        break;
    }

    // Validar el nombre de la waifu
    const waifuName = args[0]?.toLowerCase(); // Nombre de la waifu
    if (!waifuName || !waifus[waifuName]) {
        enviar(`❌ No se ha encontrado la waifu *${waifuName}*.`);
        break;
    }

    // Obtener la información de la waifu
    const { imageUrl, talla, edad } = waifus[waifuName];

    // Construir el mensaje con los detalles
    const mensaje = `
    *Nombre:* ${waifuName.charAt(0).toUpperCase() + waifuName.slice(1)}
    *Talla:* ${talla}
    *Edad:* ${edad}
    `;

    // Enviar la imagen y el mensaje
    try {
        await sock.sendMessage(from, {
            image: { url: imageUrl },
            caption: mensaje
        });
    } catch (error) {
        console.error("Error al enviar la imagen de la waifu:", error.message);
        enviar("❌ No se pudo enviar la imagen de la waifu.");
    }
    break;
}

   // Comando addrule para agregar una waifu
case "addrule": {
    const nombre = args[0]?.trim(); // Nombre de la waifu
    const imageUrl = args[1]?.trim(); // URL de la imagen
    const talla = args[2]?.trim(); // Talla de la waifu
    const edad = args[3]?.trim(); // Edad de la waifu

    if (!nombre || !imageUrl || !talla || !edad) {
        enviar("❌ Por favor, proporciona todos los detalles de la waifu: *nombre*, *URL de la imagen*, *talla* y *edad*.");
        break;
    }

    // Verificar si el archivo `rule.json` existe y cargar los datos
    let ruleData = {};
    try {
        ruleData = JSON.parse(fs.readFileSync('rule.json', 'utf8'));
    } catch (error) {
        console.error("Error al leer el archivo rule.json:", error.message);
    }

    // Registrar la waifu en el objeto `ruleData`
    ruleData[nombre.toLowerCase()] = {
        imageUrl: imageUrl,
        talla: talla,
        edad: edad
    };

    // Guardar los cambios en el archivo `rule.json`
    try {
        fs.writeFileSync('rule.json', JSON.stringify(ruleData, null, 2));
        enviar(`🌸 *Waifu añadida correctamente:*
        *Nombre:* ${nombre}
        *Imagen:* ${imageUrl}
        *Talla:* ${talla}
        *Edad:* ${edad}`);
        
        console.log("cargando rules",ruleData)
    } catch (error) {
        console.error("Error al guardar el archivo rule.json:", error.message);
        enviar("❌ Ocurrió un error al guardar los cambios en el archivo.");
    }
    break;
}

// Comando para iniciar un reto
case "retar":
case "tree":
    if (isApagado) return enviar("❖ El bot *mahiru * está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");

    // Cambiar nombre de la variable 'target' para evitar conflicto
    const retoTarget = info.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!retoTarget) {
        enviar("❌ Por favor, menciona correctamente a un usuario para retarlo.");
        break;
    }
    if (sender === retoTarget) {
        enviar("❌ No puedes retarte a ti mismo.");
        break;
    }

    // Guardar el reto
    reto[sender] = {
        estado: "pendiente",
        jugadores: [sender, retoTarget],
        turno: 0, // 0 para el primero, 1 para el segundo
        tablero: [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']],
        apuesta: 0,
        timer: setTimeout(() => {
            // Si no se acepta el reto en 5 minutos, se cancela
            if (reto[sender].estado === "pendiente") {
                enviar(`❌ El reto de @${sender.split('@')[0]} a @${retoTarget.split('@')[0]} ha caducado debido a que no fue aceptado a tiempo.`);
                // Eliminar el reto
                delete reto[sender];
                delete reto[retoTarget];
            }
        }, 300000) // 5 minutos = 300000 ms
    };
    reto[retoTarget] = reto[sender];

    enviar(`@${sender.split('@')[0]} te ha retado a un juego de 3 en Raya, ¿aceptas?`);
    enviar(`> Para aceptar, usa *#sia*. Para rechazar, usa *#noa*.`);
    enviar("El reto caducará en 5 minutos si no respondes.");
    break;

// Comando para aceptar o rechazar el reto
case "sia":
    if (!reto[sender] || reto[sender].estado !== "pendiente") {
        enviar("❌ No tienes ningún reto pendiente.");
        break;
    }

    // Cancelar el temporizador del reto
    clearTimeout(reto[sender].timer);

    // Solicitar la apuesta
    reto[sender].estado = "aceptado";
    reto[reto[sender].jugadores[0]].estado = "aceptado";
    enviar(`¡El juego ha comenzado entre @${reto[sender].jugadores[0].split('@')[0]} y @${sender.split('@')[0]}!`);
    enviar("**¡Es tu turno!** Usa *#mover fila columna* para hacer tu jugada.");
    enviar("Antes de continuar, ingresa la cantidad de monedas que deseas apostar.");
    break;

case "noa":
    if (!reto[sender] || reto[sender].estado !== "pendiente") {
        enviar("❌ No tienes ningún reto pendiente.");
        break;
    }

    // Cambiar nombre de la variable 'target' para evitar conflicto
    const retoRechazoTarget = reto[sender].jugadores[1 - reto[sender].turno];
    delete reto[sender];
    delete reto[retoRechazoTarget];
    
    enviar(`@${sender.split('@')[0]} ha rechazado el reto de @${retoRechazoTarget.split('@')[0]}. El reto ha sido cancelado.`);
    break;

// Comando para aceptar o rechazar la apuesta
case "apuesta":
    if (!reto[sender] || reto[sender].estado !== "aceptado") {
        enviar("❌ No estás en un juego de 3 en Raya. Primero acepta un reto.");
        break;
    }

    // Verificar que la apuesta sea un número válido
    const apuesta = parseInt(q);
    if (isNaN(apuesta) || apuesta <= 0) {
        enviar("❌ La apuesta debe ser un número positivo.");
        break;
    }

    // Guardar la apuesta
    reto[sender].apuesta = apuesta;
    reto[reto[sender].jugadores[0]].apuesta = apuesta;
    enviar(`@${sender.split('@')[0]} ha apostado ${apuesta} monedas. El juego comienza ahora.`);
    enviar("**¡Es tu turno!** Usa *#mover fila columna* para hacer tu jugada.");
    enviarTablero(reto[sender].tablero);
    break;

// Comando para mover en el juego de 3 en raya
case "mover":
    if (isApagado) return enviar("❖ El bot *mahiru * está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");

    const retoUsuario = reto[sender];
    if (!retoUsuario || retoUsuario.estado !== "aceptado" || !retoUsuario.apuesta) {
        enviar("❌ No estás en un juego de 3 en Raya. Primero acepta un reto.");
        break;
    }

    // Verificar el formato de las coordenadas
    if (!q || !q.includes(' ')) {
        enviar("❌ El formato del movimiento es incorrecto. Usa: *#mover fila columna* (por ejemplo: *#mover 1 2*).");
        break;
    }

    const [fila, columna] = q.split(' ').map(num => parseInt(num));

    // Validar coordenadas dentro del rango del tablero
    if (isNaN(fila) || isNaN(columna) || fila < 1 || fila > 3 || columna < 1 || columna > 3) {
        enviar("❌ Las coordenadas deben estar entre 1 y 3 para filas y columnas.");
        break;
    }

    // Ajustar las coordenadas para el índice del tablero
    const filaIndex = fila - 1;
    const columnaIndex = columna - 1;

    // Verificar si es el turno del jugador
    const turno = retoUsuario.turno;  // 0 es para el primer jugador, 1 es para el segundo jugador
    const jugadorActual = retoUsuario.jugadores[turno];
    if (sender !== jugadorActual) {
        enviar("❌ No es tu turno. Espera a que el otro jugador juegue.");
        break;
    }

    // Verificar si la casilla está vacía
    if (retoUsuario.tablero[filaIndex][columnaIndex] !== ' ') {
        enviar("❌ Esa casilla ya está ocupada. Elige otra.");
        break;
    }

    // Realizar el movimiento
    const simbolo = turno === 0 ? 'X' : 'O';
    retoUsuario.tablero[filaIndex][columnaIndex] = simbolo;

    // Mostrar el tablero actualizado
    enviarTablero(retoUsuario.tablero);

    // Verificar si alguien ha ganado
    if (comprobarGanador(retoUsuario.tablero)) {
        // El ganador recibe las monedas apostadas
        const ganador = retoUsuario.jugadores[turno];
        const perdedor = retoUsuario.jugadores[1 - turno];
        enviar(`¡${simbolo} ha ganado! 🎉`);
        enviar(`@${ganador.split('@')[0]} recibe ${retoUsuario.apuesta * 2} monedas. ¡Felicidades!`);
        
        // Repartir las monedas
        bal[ganador] = (bal[ganador] || 0) + retoUsuario.apuesta * 2;
        bal[perdedor] = (bal[perdedor] || 0) - retoUsuario.apuesta;
        
        // Limpiar el reto
        delete reto[sender];
        delete reto[reto[sender].jugadores[0]];
        return;
    }

    // Verificar si hay empate
    if (retoUsuario.tablero.every(fila => fila.every(celda => celda !== ' '))) {
        // Empate, dividir las monedas
        const apuestaTotal = retoUsuario.apuesta * 2;
        const mitad = Math.floor(apuestaTotal / 2);
        enviar("¡Es un empate! 🙁 Las monedas se dividen.");
        enviar(`@${retoUsuario.jugadores[0].split('@')[0]} y @${retoUsuario.jugadores[1].split('@')[0]} reciben ${mitad} monedas cada uno.`);
        
        // Repartir las monedas
        bal[retoUsuario.jugadores[0]] = (bal[retoUsuario.jugadores[0]] || 0) + mitad;
        bal[retoUsuario.jugadores[1]] = (bal[retoUsuario.jugadores[1]] || 0) + mitad;

        // Limpiar el reto
        delete reto[sender];
        delete reto[reto[sender].jugadores[0]];
        return;
    }

    // Cambiar turno
    retoUsuario.turno = 1 - turno; // Alterna entre 0 y 1
    const siguienteJugador = retoUsuario.jugadores[retoUsuario.turno];
    enviar(`Es el turno de @${siguienteJugador.split('@')[0]}.`);

    break;

// Función para mostrar el tablero
function enviarTablero(tablero) {
    let mensaje = "Tablero de 3 en Raya:\n";
    for (let fila of tablero) {
        mensaje += fila.join(' | ') + '\n';
    }
    enviar(mensaje);
}

// Función para comprobar si alguien ha ganado
function comprobarGanador(tablero) {
    // Verificar filas, columnas y diagonales
    for (let i = 0; i < 3; i++) {
        if (tablero[i][0] !== ' ' && tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) return true;
        if (tablero[0][i] !== ' ' && tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) return true;
    }
    if (tablero[0][0] !== ' ' && tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) return true;
    if (tablero[0][2] !== ' ' && tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) return true;

    // No hay ganador
    return false;
    
    user[sender] = user[sender] || { nivel: 1, comandos: 0 };

    // Incrementar los comandos usados
    user[sender].comandos += 1;

    // Incrementar el nivel si alcanza el umbral
    if (user[sender].comandos % comandosPorNivel === 0) {
        user[sender].nivel += 1;
        enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
    }

    // Guardar cambios en los archivos
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
}

case "warn": {
    // Obtener el número del remitente (sin el dominio)
    const senderNumber = sender.split('@')[0];

    // Verificar si el usuario tiene permisos
    if (!hasPermission(senderNumber, 'mod')) {
        return enviar("❌ Este comando solo puede ser usado por usuarios con rol *mod* o superior.");
    }
    if (!isBotGroupAdmins) return enviar("❌ El bot debe ser administrador para usar este comando.");

    // Obtener usuario mencionado
    const mentionedUser = info.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedUser) return enviar("❌ Debes mencionar al usuario al que quieres advertir.");
    
    // Razón de la advertencia
    const razon = args.slice(1).join(" ") || "Sin razón especificada.";
    const userId = mentionedUser.split('@')[0];

    // Inicializar advertencias si no existen
    warnings[userId] = warnings[userId] || [];

    // Agregar la advertencia con razón y fecha
    warnings[userId].push({
        razon: razon,
        fecha: new Date().toISOString()
    });

    saveWarnings();

    // Expulsar al usuario si alcanza 3 advertencias
    if (warnings[userId].length >= 3) {
        await sock.groupParticipantsUpdate(from, [mentionedUser], 'remove'); // Expulsar al usuario
        enviar(`🚫 El usuario @${userId} ha sido expulsado del grupo por acumular *3 advertencias*.\nRazón: ${razon}`);
        delete warnings[userId]; // Reiniciar advertencias
        saveWarnings();
    } else {
        enviar(`⚠️ El usuario @${userId} ha recibido una advertencia.\nRazón: ${razon}\nTotal: *${warnings[userId].length} advertencia(s).*`);
    }
    break;
}

case "warns": {
    try {
        // Verificar si el comando proviene de un grupo o chat privado
        const sender = isGroup ? info.key.participant : info.key.remoteJid;
        const senderNumber = sender.split('@')[0];

        // Validar si el usuario tiene permisos
        if (!hasPermission(senderNumber, 'mod')) {
            return enviar("❌ Este comando solo puede ser usado por usuarios con rol *mod* o superior.");
        }

        // Obtener el usuario mencionado o el mismo que ejecuta el comando
        const mentionedUser = info.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || sender;
        const userId = mentionedUser.split('@')[0];

        // Verificar si el usuario tiene advertencias registradas
        const userWarnings = warnings[userId] || [];
        if (userWarnings.length === 0) {
            return enviar(`⚠️ El usuario @${userId} no tiene advertencias.`, { mentions: [mentionedUser] });
        }

        // Construir el mensaje de advertencias
        let warningList = `⚠️ *Advertencias para @${userId}:*\n\n`;
        userWarnings.forEach((warn, index) => {
            warningList += `🔹 *Advertencia ${index + 1}:*\n`;
            warningList += `📄 *Razón:* ${warn.razon}\n`;
            warningList += `📅 *Fecha:* ${new Date(warn.fecha).toLocaleString()}\n\n`;
        });

        // Enviar la lista de advertencias
        enviar(warningList.trim(), { mentions: [mentionedUser] });
    } catch (error) {
        console.error("Error al ejecutar el comando 'warns':", error);
        enviar("❌ Ocurrió un error al consultar las advertencias. Por favor, intenta nuevamente.");
    }
    break;
}

case "delwarn": {
    try {
        // Inicializar senderNumber correctamente
        const sender = isGroup ? info.key.participant : info.key.remoteJid;
        const senderNumber = sender.split('@')[0]; // Aseguramos la inicialización

        // Verificar si el usuario tiene permisos
        if (!hasPermission(senderNumber, 'mod')) {
            return enviar("❌ Este comando solo puede ser usado por usuarios con rol *mod* o superior.");
        }

        // Obtener usuario mencionado
        const mentionedUser = info.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) {
            return enviar("❌ Debes mencionar al usuario al que quieres eliminar una advertencia.");
        }

        const userId = mentionedUser.split('@')[0];
        const indexToRemove = parseInt(args[1], 10) - 1; // Índice de la advertencia a eliminar

        // Verificar si el usuario tiene advertencias
        if (!warnings[userId] || warnings[userId].length === 0) {
            return enviar(`⚠️ El usuario @${userId} no tiene advertencias.`, { mentions: [mentionedUser] });
        }

        if (isNaN(indexToRemove)) {
            // Eliminar todas las advertencias si no se especifica un número
            delete warnings[userId];
            saveWarnings();
            return enviar(`✅ Todas las advertencias del usuario @${userId} han sido eliminadas.`, { mentions: [mentionedUser] });
        }

        // Verificar si el índice es válido
        if (indexToRemove < 0 || indexToRemove >= warnings[userId].length) {
            return enviar(`❌ Número de advertencia inválido. El usuario @${userId} tiene *${warnings[userId].length} advertencia(s).*`, { mentions: [mentionedUser] });
        }

        // Eliminar la advertencia específica
        warnings[userId].splice(indexToRemove, 1);

        // Eliminar el registro del usuario si ya no tiene advertencias
        if (warnings[userId].length === 0) {
            delete warnings[userId];
        }

        saveWarnings();
        enviar(`✅ La advertencia número *${indexToRemove + 1}* del usuario @${userId} ha sido eliminada.`, { mentions: [mentionedUser] });
    } catch (error) {
        console.error("Error al ejecutar el comando 'delwarn':", error);
        enviar("❌ Ocurrió un error al eliminar la advertencia. Por favor, intenta nuevamente.");
    }
    break;
}

case "promote": {
    if (!isGroup) {
        enviar("❌ Este comando solo puede ser usado en grupos.");
        break;
    }

    // Verificar si el bot es administrador
    const groupMetadata = await sock.groupMetadata(from); // Obtiene los datos del grupo
    const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net"; // Número del bot
    const isBotAdmin = groupMetadata.participants.some(participant => 
        participant.id === botNumber && participant.admin !== null
    );

    if (!isBotAdmin) {
        enviar("❌ Necesito ser administrador para realizar esta acción.");
        break;
    }

    // Obtener el número del remitente
    const senderNumber = sender.split("@")[0]; // Extraer el número del remitente

    // Verificar si el usuario tiene permisos de rol mod o superior
    if (!hasPermission(senderNumber, "mod")) {
        enviar("❌ No tienes permisos suficientes para usar este comando.");
        break;
    }

    // Validar que se esté respondiendo a un mensaje
    if (!info.message.extendedTextMessage || !info.message.extendedTextMessage.contextInfo || !info.message.extendedTextMessage.contextInfo.participant) {
        enviar("❌ Debes responder al mensaje del usuario que deseas promover a administrador.");
        break;
    }

    const target = info.message.extendedTextMessage.contextInfo.participant; // Usuario objetivo

    try {
        // Promover al usuario a administrador
        await sock.groupParticipantsUpdate(from, [target], "promote");
        enviar(`✅ El usuario @${target.split("@")[0]} ha sido promovido a administrador.`, { mentions: [target] });
    } catch (error) {
        console.error("Error al promover al usuario:", error);
        enviar("❌ No se pudo promover al usuario. Asegúrate de que el bot tiene permisos de administrador.");
    }
    break;
}

case "demote": {
    if (!isGroup) {
        enviar("❌ Este comando solo puede ser usado en grupos.");
        break;
    }

    // Verificar si el bot es administrador
    const groupMetadata = await sock.groupMetadata(from); // Obtiene los datos del grupo
    const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net"; // Número del bot
    const isBotAdmin = groupMetadata.participants.some(participant => 
        participant.id === botNumber && participant.admin !== null
    );

    if (!isBotAdmin) {
        enviar("❌ Necesito ser administrador para realizar esta acción.");
        break;
    }

    // Obtener el número del remitente
    const senderNumber = sender.split("@")[0]; // Extraer el número del remitente

    // Verificar si el usuario tiene permisos de rol mod o superior
    if (!hasPermission(senderNumber, "mod")) {
        enviar("❌ No tienes permisos suficientes para usar este comando.");
        break;
    }

    // Validar que se esté respondiendo a un mensaje
    if (!info.message.extendedTextMessage || !info.message.extendedTextMessage.contextInfo || !info.message.extendedTextMessage.contextInfo.participant) {
        enviar("❌ Debes responder al mensaje del usuario que deseas quitar como administrador.");
        break;
    }

    const target = info.message.extendedTextMessage.contextInfo.participant; // Usuario objetivo

    try {
        // Quitar permisos de administrador al usuario
        await sock.groupParticipantsUpdate(from, [target], "demote");
        enviar(`✅ El usuario @${target.split("@")[0]} ya no es administrador.`, { mentions: [target] });
    } catch (error) {
        console.error("Error al quitar admin al usuario:", error);
        enviar("❌ No se pudo quitar el rol de administrador. Asegúrate de que el bot tiene permisos de administrador.");
    }
    break;
}

case "setbanner": {

    // Verificar permisos (por ejemplo, si el usuario tiene el rol de mod o superior)
    const senderNumber = sender.split("@")[0];
    if (!hasPermission(senderNumber, "mod")) {
        enviar("❌ No tienes permisos suficientes para usar este comando.");
        break;
    }

    // Validar que se proporcione una URL válida como argumento
    const args = body.split(" "); // Suponiendo que el comando es algo como "#setbanner URL"
    if (args.length < 2) {
        enviar("❌ Debes proporcionar una URL válida para el banner. Ejemplo: #setbanner https://example.com/imagen.jpg");
        break;
    }

    const newBanner = args[1];
    if (!newBanner.startsWith("http")) {
        enviar("❌ La URL proporcionada no es válida. Asegúrate de incluir 'http' o 'https'.");
        break;
    }

    // Actualizar el banner
    banner = newBanner;
    enviar(`✅ Banner actualizado con éxito. Nueva URL: ${banner}`);
    break;
}

case "delrol": {
    // Extraer el número del remitente
    const senderNumber = sender.split("@")[0]; // Obtiene el número del remitente

    // Verifica si el usuario que envió el comando tiene permisos de "owner"
    if (!hasPermission(senderNumber, "owner")) {
        enviar("❌ Solo los usuarios con el rol *owner* pueden usar este comando.");
        break;
    }

    // Verifica que se proporcione un argumento válido
    if (!q || q.trim().length === 0) {
        enviar("❌ Debes proporcionar el número del usuario para eliminar su rol. Ejemplo: #delrol 521234567890");
        break;
    }

    const userNumber = q.trim(); // Número del usuario (formato: 52XXXXXXXXXX)

    // Verifica si el usuario tiene un rol asignado
    if (!roles[userNumber]) {
        enviar(`❌ El usuario ${userNumber} no tiene ningún rol asignado.`);
        break;
    }

    // Elimina el rol del usuario
    delete roles[userNumber];
    saveRoles(); // Guarda los cambios en el archivo o base de datos

    enviar(`✅ Se eliminó el rol del usuario ${userNumber}.`);
    console.log(`Rol eliminado para el usuario ${userNumber}`);
    break;
}

case "depositar":
case "d": {
    if (isApagado) {
        return enviar("❖ El bot *mahiru * está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    }

    // Asegurar que el balance del usuario exista y sea válido
    if (!bal[sender] || typeof bal[sender] !== "object" || bal[sender] === null) {
        bal[sender] = { banco: 0, dinero: 0 }; // Crear entrada válida si no existe
    }

    const args = body.trim().split(/ +/).slice(1); // Obtener los argumentos después del comando
    const cantidad = args[0]; // La cantidad a depositar (puede ser número o "all")

    if (!cantidad) {
        return enviar("❌ Por favor, especifica la cantidad a depositar. Ejemplo: *#depositar 100* o *#depositar all*");
    }

    const efectivoDisponible = bal[sender].dinero;

    if (cantidad.toLowerCase() === "all") {
        if (efectivoDisponible <= 0) {
            return enviar("❌ No tienes suficiente dinero en efectivo para depositar.");
        }

        // Transferir todo el efectivo al banco
        bal[sender].banco += efectivoDisponible;
        bal[sender].dinero = 0;

        enviar(
            `✅ Has depositado todo tu dinero en efectivo (${efectivoDisponible} ${moneda}) al banco.\n\n` +
            `💰 *Balance actualizado:*\n- Efectivo: *${bal[sender].dinero}* ${moneda}\n` +
            `- Banco: *${bal[sender].banco}* ${moneda}\n` +
            `- Total: *${bal[sender].banco + bal[sender].dinero}* ${moneda}`
        );
    } else {
        const montoDepositar = parseInt(cantidad);

        if (isNaN(montoDepositar) || montoDepositar <= 0) {
            return enviar("❌ Por favor, ingresa un monto válido para depositar. Ejemplo: *#depositar 100*");
        }

        if (montoDepositar > efectivoDisponible) {
            return enviar(`❌ No tienes suficiente efectivo para depositar. Tu efectivo actual es: *${efectivoDisponible}* ${moneda}.`);
        }

        // Transferir la cantidad especificada al banco
        bal[sender].banco += montoDepositar;
        bal[sender].dinero -= montoDepositar;

        enviar(
            `✅ Has depositado *${montoDepositar}* ${moneda} al banco.\n\n` +
            `💰 *Balance actualizado:*\n- Efectivo: *${bal[sender].dinero}* ${moneda}\n` +
            `- Banco: *${bal[sender].banco}* ${moneda}\n` +
            `- Total: *${bal[sender].banco + bal[sender].dinero}* ${moneda}`
        );
    }

    // Guardar cambios en el archivo de balance
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

    break;
}

case "retirar":
case "r": {
    if (isApagado) {
        return enviar("❖ El bot *mahiru * está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    }

    // Asegurar que el balance del usuario exista y sea válido
    if (!bal[sender] || typeof bal[sender] !== "object" || bal[sender] === null) {
        bal[sender] = { banco: 0, dinero: 0 }; // Crear entrada válida si no existe
    }

    const args = body.trim().split(/ +/).slice(1); // Obtener los argumentos después del comando
    const cantidad = args[0]; // La cantidad a retirar (puede ser número o "all")

    if (!cantidad) {
        return enviar("❌ Por favor, especifica la cantidad a retirar. Ejemplo: *#retirar 100* o *#retirar all*");
    }

    const saldoBanco = bal[sender].banco;

    if (cantidad.toLowerCase() === "all") {
        if (saldoBanco <= 0) {
            return enviar("❌ No tienes suficiente dinero en el banco para retirar.");
        }

        // Retirar todo el dinero del banco
        bal[sender].dinero += saldoBanco;
        bal[sender].banco = 0;

        enviar(
            `✅ Has retirado todo tu dinero del banco (${saldoBanco} ${moneda}).\n\n` +
            `💰 *Balance actualizado:*\n- Efectivo: *${bal[sender].dinero}* ${moneda}\n` +
            `- Banco: *${bal[sender].banco}* ${moneda}\n` +
            `- Total: *${bal[sender].banco + bal[sender].dinero}* ${moneda}`
        );
    } else {
        const montoRetirar = parseInt(cantidad);

        if (isNaN(montoRetirar) || montoRetirar <= 0) {
            return enviar("❌ Por favor, ingresa un monto válido para retirar. Ejemplo: *#retirar 100*");
        }

        if (montoRetirar > saldoBanco) {
            return enviar(`❌ No tienes suficiente dinero en el banco para retirar. Tu saldo actual en el banco es: *${saldoBanco}* ${moneda}.`);
        }

        // Retirar la cantidad especificada del banco
        bal[sender].dinero += montoRetirar;
        bal[sender].banco -= montoRetirar;

        enviar(
            `✅ Has retirado *${montoRetirar}* ${moneda} del banco.\n\n` +
            `💰 *Balance actualizado:*\n- Efectivo: *${bal[sender].dinero}* ${moneda}\n` +
            `- Banco: *${bal[sender].banco}* ${moneda}\n` +
            `- Total: *${bal[sender].banco + bal[sender].dinero}* ${moneda}`
        );
    }

    // Guardar cambios en el archivo de balance
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

    break;
}

case "winfo":
    if (isApagado) {
        return enviar(`❖ El bot *${botname}* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*`);
    }

    // Verificar si se proporcionó un nombre
    if (!q) {
        return enviar("❌ Por favor, proporciona el nombre de la waifu. Ejemplo: #winfo emilia");
    }

    const grupoID = from; // ID del grupo actual
    const nombreWaifu = q.toLowerCase(); // Nombre de la waifu buscada (en minúsculas)

    // Buscar en waifusDB
    const waifuDB = waifus.find(w => w.name.toLowerCase() === nombreWaifu);
    if (!waifuDB) {
        return enviar(`❌ No se encontró ninguna waifu con el nombre "${q}" en la base de datos.`);
    }

    // Buscar en groupHarem para verificar si está reclamada
    let claimedBy = null;
    if (groupHarem[grupoID]) {
        for (const usuario in groupHarem[grupoID]) {
            const waifusUsuario = groupHarem[grupoID][usuario];
            const waifuReclamada = waifusUsuario.find(w => w.name.toLowerCase() === nombreWaifu);
            if (waifuReclamada) {
                claimedBy = waifuReclamada.claimedBy;
                break;
            }
        }
    }

    // Preparar el mensaje de la waifu
    const nombre = waifuDB.name || "No especificado";
    const genero = waifuDB.gender || "No especificado";
    const valor = waifuDB.value || "0";
    const fuente = waifuDB.source || "Desconocida";
    const estado = claimedBy
        ? `❌ *Estado:* Reclamada por @${claimedBy.split('@')[0]}`
        : `✅ *Estado:* Disponible`;

    const waifuInfo = `
❀ Nombre: ${nombre}
⚥ Género: ${genero}
✰ Valor: ${valor}
${estado}
❖ Fuente: ${fuente}
    `;

    // Enviar solo el texto
    enviar(waifuInfo);
    break;

case "kick": {

const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''

 const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
 const isGroupAdmins = groupAdmins.includes(sender) || false 

    if (!isGroup) {
        return enviar("❌ Este comando solo puede ser usado en grupos.");
    }

    if (!isGroupAdmins) {
        return enviar("❌ Solo los administradores del grupo pueden usar este comando.");
    }

    if (!isBotGroupAdmins) {
        return enviar("❌ No puedo expulsar usuarios porque no soy administrador del grupo.");
    }

    // Obtener el ID del usuario mencionado
    const mencionado = info.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mencionado || mencionado.length === 0) {
        return enviar("❌ Por favor, menciona al usuario que deseas expulsar. Ejemplo: #kick @usuario");
    }

    // Verificar si es posible expulsar al usuario
    const usuarioExpulsar = mencionado[0];
    if (groupAdmins.includes(usuarioExpulsar)) {
        return enviar("❌ No puedo expulsar a un administrador del grupo.");
    }

    try {
        // Expulsar al usuario del grupo
        await sock.groupParticipantsUpdate(from, [usuarioExpulsar], "remove");
        enviar(`✅ Usuario @${usuarioExpulsar.split("@")[0]} ha sido expulsado exitosamente.`, [usuarioExpulsar]);
    } catch (error) {
        console.error("Error al expulsar al usuario:", error.message);
        enviar("❌ Hubo un error al intentar expulsar al usuario. Por favor, inténtalo de nuevo.");
    }
    break;
    }
    
    case "grup":
    case "gp": {
    if (!isGroup) {
        return enviar("❖ Este comando solo puede ser usado en grupos.");
    }

    // Obtener datos del grupo
    const nombreGrupo = groupName || "Nombre desconocido";
    const numeroIntegrantes = groupMembers.length || 0;
    const botEstado = isApagado ? "Apagado" : "Activo";
    const bienvenidaEstado = bienvenidaActivada.includes(from) ? "Activada" : "Desactivada";

    // Cálculo de waifus
    const grupoWaifus = groupHarem[from] || []; // Waifus del grupo
    const waifusReclamadas = grupoWaifus.length;
    const waifusLibres = waifus.filter(w => !w.claimedBy).length;

    // Respuesta del comando
    const mensajeGrupo = `
📋 Información del grupo:
➥ Nombre del grupo: *${nombreGrupo}*
➥ Número de integrantes: *${numeroIntegrantes}*
➥ Estado del bot: *${botEstado}*
➥ Bienvenida: *${bienvenidaEstado}*
➥ Waifus reclamadas: *${waifusReclamadas}*
➥ Waifus libres: *${waifusLibres}*
➥ Nombre del bot: *${botname}*
    `;

    enviar(mensajeGrupo);
    break;
}

case "gppfp":
case "foto": {
    if (!isGroup) {
        return enviar("❖ Este comando solo puede ser usado en grupos.");
    }

    try {
        // Obtener la URL de la imagen del grupo
        const metadata = await sock.groupMetadata(from);
        const groupImage = await sock.profilePictureUrl(from, "image"); // "image" para la imagen normal, "preview" para una miniatura

        // Enviar la imagen del grupo
        if (groupImage) {
            await sock.sendMessage(from, {
                image: { url: groupImage },
                caption: `🖼️ Foto del grupo: *${metadata.subject || "Sin nombre"}*`
            });
        } else {
            enviar("❌ Este grupo no tiene foto de perfil.");
        }
    } catch (err) {
        console.error("Error al obtener la foto del grupo:", err);
        enviar("❌ Ocurrió un error al obtener la foto del grupo. Por favor, inténtalo de nuevo.");
    }
    break;
}

case "bj":
case "mamada": {
    ejecutarNSFW("bj", "le dio una mamada a");
    break;
}

case "cum":
case "venirse": {
    ejecutarNSFW("cum", "cumeó a");
    break;
}

case "fuck":
case "cojer": {
    ejecutarNSFW("fuck", "se cogió a");
    break;
}

case "69":
case "six": {
        ejecutarNSFW("69", "hizo un 69 con");
    break;
}
        case "touch":
        case "pechos": {
                ejecutarNSFW("touch", "le toco los pechos a")
                break;
        }

        case "chest":{ 
                ejecutarNSFW("chest", "le lambio la vagina a")
                break;
        }

        case "pussy":
        case "culo": {
                ejecutarNSFW("pussy", "le lambio el pussy a")
                break;
        }

case "4":
case"perrito":{
         ejecutarNSFW("4", "puso como perrito a")
         break;
         }

case "undress":
case "encuerar":{
      ejecutarNSFW("undress", "a encuerado a")
      break;
      }



// Función genérica para manejar comandos NSFW
async function ejecutarNSFW(categoria, accion) {
    if (!isGroup) {
        return enviar("❖ Este comando solo puede ser usado en grupos.");
    }

    // Verificar si el NSFW está activado en el grupo
    if (!antilinkState[from]) {
        return enviar(`❌ El contenido NSFW no está activado en este grupo. Pide a un administrador que lo active 
> con #nsfwon`);
    }

    try {
        // Cargar la base de datos de NSFW
        const nsfwDBPath = './archivo/data/nsfwDB.json';
        if (!fs.existsSync(nsfwDBPath)) {
            return enviar("❌ No se encontró la base de datos de contenido NSFW.");
        }

        const nsfwDB = JSON.parse(fs.readFileSync(nsfwDBPath, 'utf-8'));

        // Verificar si hay contenido para la categoría
        const contenido = nsfwDB[categoria];

        if (!contenido || contenido.length === 0) {
            return enviar(`❌ No hay contenido para la categoría *${categoria}*.`);
        }

        // Seleccionar un enlace al azar de la categoría
        const enlaceAleatorio = contenido[Math.floor(Math.random() * contenido.length)];

        // Obtener la mención
        const mencionado = info.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mencionado) {
            return enviar(`❌ Debes mencionar a alguien para usar el comando *${categoria}*.`);
        }

        // Construir el mensaje
        const mensaje = `🔥 @${sender.split('@')[0]} ${accion} @${mencionado.split('@')[0]}`;

        // Enviar el GIF y el mensaje
        await sock.sendMessage(from, {
            video: { url: enlaceAleatorio },
            caption: mensaje,
            mentions: [sender, mencionado]
        });
    } catch (err) {
        console.error(`Error al ejecutar el comando NSFW (${categoria}):`, err.message);
        enviar("❌ Ocurrió un error al obtener el contenido NSFW. Intenta nuevamente más tarde.");
    }
}

case "nsfwon": {

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);
    
    if (!isGroupAdmins) {
        return enviar("❖ Este comando solo puede ser usado por administradores.");
    }

    antilinkState[from] = true; // Activar NSFW
    saveAntilinkState();
    enviar("✅ El contenido NSFW ha sido activado en este grupo.");
    break;
}

case "nsfwoff": {

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);

    if (!isGroupAdmins) {
        return enviar("❖ Este comando solo puede ser usado por administradores.");
    }

    antilinkState[from] = false; // Desactivar NSFW
    saveAntilinkState();
    enviar("✅ El contenido NSFW ha sido desactivado en este grupo.");
    break;
}

case "gif": {
    if (!isGroup) {
        return enviar("❖ Este comando solo puede ser usado en grupos.");
    }

    // Calcula si el bot y el usuario son administradores
    const isUserGroupAdmin = groupAdmins.includes(sender); // Comprueba si el usuario es admin
    const isBotGroupAdmins = groupAdmins.includes(sock.user.id.split(":")[0] + "@s.whatsapp.net"); // Comprueba si el bot es admin

    if (!isUserGroupAdmin && !isBotGroupAdmins) {
        return enviar("❌ Este comando solo puede ser usado por administradores del grupo o si el bot es administrador.");
    }

    try {
        // Verifica el formato del comando
        const categoria = args[0]; // Primer argumento: categoría
        const link = args[1]; // Segundo argumento: enlace

        if (!categoria || !link) {
            return enviar("❌ Formato incorrecto. Usa: *#gif <categoría> <link>*");
        }

        // Validar que el enlace sea un GIF o un archivo válido
        const esValido = link.match(/\.(gif|mp4|webm)$/i);
        if (!esValido) {
            return enviar("❌ El enlace proporcionado no parece ser un GIF o video válido.");
        }

        // Cargar la base de datos NSFW
        const nsfwDBPath = './archivo/data/nsfwDB.json';
        let nsfwDB = {};

        if (fs.existsSync(nsfwDBPath)) {
            nsfwDB = JSON.parse(fs.readFileSync(nsfwDBPath, 'utf-8'));
        }

        // Verifica si la categoría existe, si no, la crea
        if (!nsfwDB[categoria]) {
            nsfwDB[categoria] = [];
        }

        // Añadir el enlace a la categoría
        nsfwDB[categoria].push(link);

        // Guardar cambios en la base de datos
        fs.writeFileSync(nsfwDBPath, JSON.stringify(nsfwDB, null, 2));

        enviar(`✅ GIF añadido exitosamente a la categoría *${categoria}*.`);
    } catch (err) {
        console.error("Error al añadir el GIF al nsfwDB:", err.message);
        enviar("❌ Ocurrió un error al añadir el GIF. Intenta nuevamente.");
    }
    break;
}

case "setwelcome": {

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);
    
    if (!isGroupAdmins) return enviar("❖ Este comando solo puede ser usado por administradores.");
    if (!q) return enviar("❖ Por favor, proporciona el nuevo mensaje de bienvenida.");
    mensajesBienvenida[from] = q;
    fs.writeFileSync('./archivo/data/mensajes_bienvenida.json', JSON.stringify(mensajesBienvenida, null, 2));
    enviar("✅ Mensaje de bienvenida actualizado con éxito.");
    break;
}

case "setgoodbye": {

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);

    if (!isGroupAdmins) return enviar("❖ Este comando solo puede ser usado por administradores.");
    if (!q) return enviar("❖ Por favor, proporciona el nuevo mensaje de despedida.");
    mensajesDespedida[from] = q;
    fs.writeFileSync('./archivo/data/mensajes_despedida.json', JSON.stringify(mensajesDespedida, null, 2));
    enviar("✅ Mensaje de despedida actualizado con éxito.");
    break;
}
case "welcomeon":
case "bienvenida on": {

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);

    if (!isGroupAdmins) return enviar("❖ Solo los administradores pueden activar las bienvenidas.");
    if (bienvenidaActivada.includes(from)) return enviar("❖ Las bienvenidas ya están activadas en este grupo.");
    bienvenidaActivada.push(from);
    fs.writeFileSync('./archivo/data/bienvenida.json', JSON.stringify(bienvenidaActivada));
    enviar("✅ Las bienvenidas se han activado correctamente.");
    break;
}

case "welcomeoff":
case "bienvenida off": {

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);

    if (!isGroupAdmins) return enviar("❖ Solo los administradores pueden desactivar las bienvenidas.");
    if (!bienvenidaActivada.includes(from)) return enviar("❖ Las bienvenidas ya están desactivadas en este grupo.");
    bienvenidaActivada = bienvenidaActivada.filter(group => group !== from);
    fs.writeFileSync('./archivo/data/bienvenida.json', JSON.stringify(bienvenidaActivada));
    enviar("✅ Las bienvenidas se han desactivado correctamente.");
    break;
    }

case "goodbyeon":
case "despedida on": {

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);

    if (!isGroupAdmins) return enviar("❖ Solo los administradores pueden activar las despedidas.");
    if (despedidaActivada.includes(from)) return enviar("❖ Las despedidas ya están activadas en este grupo.");
    despedidaActivada.push(from);
    fs.writeFileSync('./archivo/data/despedida.json', JSON.stringify(despedidaActivada));
    enviar("✅ Las despedidas se han activado correctamente.");
    break;
}

case "goodbyeoff":
case "despedida off": {

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);

    if (!isGroupAdmins) return enviar("❖ Solo los administradores pueden desactivar las despedidas.");
    if (!despedidaActivada.includes(from)) return enviar("❖ Las despedidas ya están desactivadas en este grupo.");
    despedidaActivada = despedidaActivada.filter(group => group !== from);
    fs.writeFileSync('./archivo/data/despedida.json', JSON.stringify(despedidaActivada));
    enviar("✅ Las despedidas se han desactivado correctamente.");
    break;
}

case "pfp": {
    try {
        console.log("=== Comando 'pfp' iniciado ===");
        console.log("Mensaje recibido:", body);
        console.log("Argumentos recibidos:", args);

        // Determinar el objetivo del comando
        const target = quoted?.key?.participant || 
                       (args[0] && args[0].includes("@") ? args[0] : `${args[0]}@s.whatsapp.net`);
        console.log("Objetivo procesado (target):", target);

        if (!target) {
            enviar("❌ Por favor, menciona a un usuario o proporciona un número válido.");
            console.log("Comando 'pfp' finalizado: No se especificó un objetivo.");
            break;
        }

        // Intentar obtener la foto de perfil
        console.log("Intentando obtener la foto de perfil del usuario:", target);
        const profilePicUrl = await sock.profilePictureUrl(target, 'image').catch(err => {
            console.error("Error al intentar obtener la URL de la foto de perfil:", err.message);
            return null;
        });

        // Verificar el resultado de la obtención
        if (!profilePicUrl) {
            enviar("❌ Este usuario no tiene foto de perfil o no es accesible.");
            console.log("Foto de perfil no disponible o no accesible para el usuario:", target);
            break;
        }

        console.log("URL de la foto de perfil obtenida:", profilePicUrl);

        // Enviar la foto de perfil
        console.log("Enviando foto de perfil al chat...");
        await sock.sendMessage(from, {
            image: { url: profilePicUrl },
            caption: `🌟 Foto de perfil del usuario: @${target.split("@")[0]}`,
            mentions: [target]
        }).catch(err => {
            console.error("Error al enviar la foto de perfil:", err.message);
        });
        console.log("Foto de perfil enviada con éxito.");
    } catch (error) {
        console.error("Error inesperado en el comando 'pfp':", error.message);
        enviar("❌ Hubo un error al intentar obtener la foto de perfil. Intenta nuevamente.");
    }
    console.log("=== Comando 'pfp' finalizado ===");
    break;
}

case "join": {
    try {
        console.log("=== Comando 'join' iniciado ===");

        // Verificar si el usuario proporcionó un enlace
        if (!args[0] || !args[0].startsWith("https://chat.whatsapp.com/")) {
            enviar("❌ Por favor, proporciona un enlace válido de invitación a un grupo.");
            console.log("El enlace proporcionado no es válido.");
            break;
        }

        const inviteLink = args[0];
        console.log("Enlace de invitación recibido:", inviteLink);

        // Extraer el código de invitación del enlace
        const inviteCode = inviteLink.split("/").pop();
        console.log("Código de invitación extraído:", inviteCode);

        // Intentar unirse al grupo
        const result = await sock.groupAcceptInvite(inviteCode).catch(err => {
            console.error("Error al intentar unirse al grupo:", err.message);
            return null;
        });

        if (result) {
            enviar(`✅ Me he unido exitosamente al grupo: ${result.gid}`);
            console.log("El bot se unió al grupo:", result.gid);
        } else {
            enviar("❌ No pude unirme al grupo. Asegúrate de que el enlace sea válido y de que tenga permisos.");
        }
    } catch (error) {
        console.error("Error inesperado en el comando 'join':", error.message);
        enviar("❌ Ocurrió un error al intentar unirme al grupo.");
    }
    console.log("=== Comando 'join' finalizado ===");
    break;
}

case "info": {
    console.log("Mensaje recibido:", body); // Log del mensaje completo
    console.log("Argumentos obtenidos:", args); // Log de los argumentos procesados

    // Verificar si hay al menos un argumento después del comando
    const name = args[0]?.trim().toLowerCase(); // Cambiado de args[1] a args[0]

    if (!name) {
        enviar("Por favor, especifica un nombre. Ejemplo: info Nombre");
        break;
    }

    // Búsqueda insensible a mayúsculas/minúsculas
    const userKey = Object.keys(users).find(
        key => key.toLowerCase() === name
    );

    if (!userKey) {
        enviar(`El usuario "${name}" no está registrado.`);
        console.log("Usuario no encontrado:", name);
        break;
    }

    // Mostrar información del usuario encontrado
    const userInfo = users[userKey];
    console.log("Usuario encontrado:", userInfo); // Log del usuario encontrado

    const animeList = userInfo.animes.length > 0
        ? userInfo.animes.map((anime) => `- ${anime}`).join("\n")
        : "No ha aportado animes.";

    enviar(`Información de "${userKey}":\n\nRegistrado: ✅\nContacto: ${userInfo.email}\n\n*Animes aportados:*\n${animeList}\n\n> Junta más para tener más anime en tu lista.`);
    break;
}

case "botsactivos":
case "bots": {
    const botsPath = './bots.json';

    let bots = [];

    try {
        if (fs.existsSync(botsPath)) {
            bots = JSON.parse(fs.readFileSync(botsPath, 'utf-8'));
        }
    } catch (error) {
        console.error("Error al cargar el archivo de bots:", error.message);
        enviar("❌ Error al cargar la lista de bots. Asegúrate de que el archivo exista.");
        break;
    }

    if (!Array.isArray(groupMembers)) {
        enviar("❌ Error: La lista de miembros del grupo no está disponible.");
        break;
    }

    const botsEnGrupo = groupMembers
        .map(p => (p.id ? p.id.split('@')[0] : null))
        .filter(numero => numero);

    const estaEnGrupo = (numero) => {
        if (!numero) return false;
        const numeroSinPrefijo = numero.replace('+', '');
        return botsEnGrupo.includes(numero) || botsEnGrupo.includes(numeroSinPrefijo);
    };

    const botsEnGrupoFiltrados = bots.filter(bot => estaEnGrupo(bot.numero));

    const mensajeBots = `
*◆ ʟɪsᴛᴀ ᴅᴇ ʙᴏᴛs ᴀᴄᴛɪᴠᴏs ◆* *(${bots.length})*

❖ *ᴘʀɪɴᴄɪᴘᴀʟᴇ𝘴*:  *${bots.filter(b => b.tipo === 'principal').length}*
✰ *ᴘʀᴇᴍɪᴜᴍ𝘴*: *${bots.filter(b => b.tipo === 'premium').length}* 

   ❒ 𝘌𝘯 𝘦𝘴𝘵𝘦 𝘨𝘳𝘶𝘱𝘰: *(${botsEnGrupoFiltrados.length})*

${botsEnGrupoFiltrados.map(bot => {
    const miembro = groupMembers.find(p => p.id && p.id.includes(bot.numero));
    const mencion = miembro ? `@${miembro.id.split('@')[0]}` : "No encontrado";
    return `- [${bot.tipo.charAt(0).toUpperCase() + bot.tipo.slice(1)}] ${bot.nombre}: ${mencion}`;
}).join('\n')}

> Bots Kitten, todos los derechos reservados.
`;

    enviar(mensajeBots, { mentions: botsEnGrupoFiltrados.map(bot => {
        const miembro = groupMembers.find(p => p.id && p.id.includes(bot.numero));
        return miembro ? `${miembro.id}` : null;
    }).filter(Boolean) });
    break;
}

case 'tag': {

const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''

 const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
 const isGroupAdmins = groupAdmins.includes(sender) || false 
 

    if (!isGroup) return enviar("❖ Este comando solo puede usarse en grupos.");
    if (!isGroupAdmins) return enviar("❖ Solo los administradores del grupo pueden usar este comando.");

    // Mensaje que se enviará
    let mensaje = args.join(' ') || "👋 ¡Hola a todos!";
    let mentions = groupMembers.map(member => member.id); // Obtener los IDs de todos los miembros del grupo

    // Enviar el mensaje con menciones internas
    await sock.sendMessage(from, {
        text: mensaje, // Solo muestra el mensaje proporcionado
        mentions: mentions // Menciona a todos internamente
    });
    break;
}

// Comando setprimary
case "setprimary": {

const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''

 const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
 const isGroupAdmins = groupAdmins.includes(sender) || false 

    if (!isGroup) return enviar("❌ Este comando solo se puede usar en grupos.");
    if (!isGroupAdmins) return enviar("❌ Solo los administradores del grupo pueden usar este comando.");
    if (!quoted || !quoted.message || !quoted.message.extendedTextMessage || !quoted.message.extendedTextMessage.contextInfo) {
        return enviar("❌ Debes mencionar al bot que deseas establecer como principal respondiendo a un mensaje suyo.");
    }

    // Obtener las menciones del mensaje citado
    const mentionedBots = quoted.message.extendedTextMessage.contextInfo.mentionedJid || [];
    if (mentionedBots.length === 0) return enviar("❌ No se detectaron bots mencionados.");

    // Cargar la lista de bots desde bots.json
    const bots = JSON.parse(fs.readFileSync('./bots.json', 'utf-8'));

    const botID = mentionedBots[0];
    const botEncontrado = bots.find(bot => botID.includes(bot.numero));

    if (!botEncontrado) {
        return enviar(`❌ El bot mencionado no está registrado en la lista.`);
    }

    // Establecer el bot principal
    primaryBot = botID;
    bots.forEach(bot => bot.isPrimary = bot.numero === botEncontrado.numero);
    fs.writeFileSync('./bots.json', JSON.stringify(bots, null, 2)); // Guarda cambios

    enviar(`✅ El bot principal se ha establecido como ${botEncontrado.nombre} (${botEncontrado.numero}).`, {
        mentions: [primaryBot],
    });
    break;
}

case 'kiss':
case 'hug':
case 'happy':
case 'pout':
case 'love':
case 'blush':
case 'pat':
case 'lick': {
    const category = comando; // El comando define la categoría (kiss, hug, etc.)
    const folderPath = `./videos/${category}`; // Carpeta específica para la categoría

    // Verificar si la carpeta existe
    if (!fs.existsSync(folderPath)) {
        return enviar(`❌ No hay videos guardados para la categoría "${category}".`);
    }

    // Leer los archivos en la carpeta
    const videos = fs.readdirSync(folderPath).filter(file => file.endsWith('.mp4'));

    if (videos.length === 0) {
        return enviar(`❌ No hay videos disponibles en la categoría "${category}".`);
    }

    // Seleccionar un video aleatorio
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const videoPath = path.join(folderPath, randomVideo);

    // Manejar menciones
    const mentionedUser = info.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]; // Obtener la mención
    if (!mentionedUser) {
        return enviar(`❌ Por favor, menciona a alguien para usar el comando "${category}". Ejemplo: *#${category} @usuario*`);
    }

    // Crear el mensaje con menciones
    const responseText = `@${sender.split('@')[0]} ha ${category === 'kiss' ? 'besado' : 
                      category === 'hug' ? 'abrazado' : 
                      category === 'pat' ? 'acariciado' : 
            
 category === 'love' ?'enamorado' :               
                        'lamido'} a @${mentionedUser.split('@')[0]} 💖`;

    // Enviar el video con el mensaje
    await sock.sendMessage(
        from,
        {
            video: fs.readFileSync(videoPath),
            caption: responseText,
            mentions: [sender, mentionedUser] // Menciona al remitente y al destinatario
        },
        { quoted: info }
    );
    break;
}

case 'addmedia': {
    const categories = ['kiss', 'hug', 'pat', 'lick', 'happy','love', 'pout', 'blush']; // Categorías permitidas
    const category = args[0]; // Obtener la categoría (#addmedia <categoría>)

    if (!category || !categories.includes(category)) {
        return enviar(`❌ Categoría inválida. Usa una de estas: ${categories.join(', ')}.`);
    }

    // Verificar si el mensaje contiene un video
    if (!isQuotedVideo && !isVideo) {
        return enviar("❌ Por favor, responde a un video o envíalo directamente con este comando.");
    }

    // Ruta de la carpeta para la categoría específica
    const folderPath = `./videos/${category}`;

    // Crear la carpeta si no existe
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    try {
        // Descargar el video del mensaje
        const media = isQuotedVideo
            ? await downloadContentFromMessage(quoted.videoMessage, 'video')
            : await downloadContentFromMessage(info.message.videoMessage, 'video');

        // Generar un nombre único para el video
        const fileName = `${category}_${Date.now()}.mp4`;
        const filePath = path.join(folderPath, fileName);

        // Guardar el video en el disco
        let buffer = Buffer.from([]);
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        fs.writeFileSync(filePath, buffer);

        enviar(`✅ Video guardado correctamente en la categoría "${category}" como ${fileName}.`);
    } catch (error) {
        console.error("Error al guardar el video:", error);
        enviar("❌ Hubo un error al guardar el video. Por favor, inténtalo de nuevo.");
    }
    break;
}

case 'mute':
    if (!isGroup) return enviar('❌ Este comando solo puede usarse en grupos.');

    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];
    const isGroupAdmins = groupAdmins.includes(sender);

    if (!isGroupAdmins) return enviar('❌ Este comando solo puede ser utilizado por administradores.');

    if (!botAdminMode[from]) {
        botAdminMode[from] = true;
        enviar('✅ el grupo fue muteado con éxito solo administración puede usar ek bot.');
    } else {
        botAdminMode[from] = false;
        enviar('❌ el grupo fue desmuteado con éxito todos los participantes pueden usar comandos.');
    }
    break;

case 'close': {
    const isGroup = info.key.remoteJid.endsWith('@g.us'); // Verificar si es un grupo
    if (!isGroup) return enviar("❖ Este comando solo se puede usar en grupos.");

    const sender = isGroup ? info.key.participant : info.key.remoteJid; // Remitente del mensaje
    const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''; // Metadatos del grupo
    const groupAdmins = groupMetadata.participants.filter(v => v.admin).map(v => v.id); // Lista de administradores
    const isGroupAdmins = groupAdmins.includes(sender); // Verificar si el remitente es administrador
    const BotNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net'; // Número del bot
    const isBotGroupAdmins = groupAdmins.includes(BotNumber); // Verificar si el bot es administrador

    if (!isGroupAdmins) return enviar("❖ Solo los administradores pueden usar este comando.");
    if (!isBotGroupAdmins) return enviar("❖ Necesito ser administrador para realizar esta acción.");

    await sock.groupSettingUpdate(from, 'announcement') // Cambiar a solo admins
        .then(() => sock.sendMessage(from, { react: { text: '✅', key: info.key } })) // Reacción ✅
        .catch(err => enviar(`❌ Ocurrió un error: ${err}`));
    break;
}

case 'open': {
    const isGroup = info.key.remoteJid.endsWith('@g.us'); // Verificar si es un grupo
    if (!isGroup) return enviar("❖ Este comando solo se puede usar en grupos.");

    const sender = isGroup ? info.key.participant : info.key.remoteJid; // Remitente del mensaje
    const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''; // Metadatos del grupo
    const groupAdmins = groupMetadata.participants.filter(v => v.admin).map(v => v.id); // Lista de administradores
    const isGroupAdmins = groupAdmins.includes(sender); // Verificar si el remitente es administrador
    const BotNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net'; // Número del bot
    const isBotGroupAdmins = groupAdmins.includes(BotNumber); // Verificar si el bot es administrador

    if (!isGroupAdmins) return enviar("❖ Solo los administradores pueden usar este comando.");
    if (!isBotGroupAdmins) return enviar("❖ Necesito ser administrador para realizar esta acción.");

    await sock.groupSettingUpdate(from, 'not_announcement') // Cambiar a todos los participantes
        .then(() => sock.sendMessage(from, { react: { text: '✅', key: info.key } })) // Reacción ✅
        .catch(err => enviar(`❌ Ocurrió un error: ${err}`));
    break;
}
    
    case "omitir": {
    const comandoObjetivo = args[0]; // Comando objetivo (por ejemplo, 'rw' o 'c')
    const omitirCosto = 150000; // Costo para omitir el cooldown
    const cooldownsValidos = ["rw", "c"]; // Lista de comandos que pueden omitir cooldown

    if (!comandoObjetivo) {
        return enviar("❌ Especifica el comando para el cual deseas omitir el cooldown. Ejemplo: *#omitircooldown rw*.");
    }

    if (!cooldownsValidos.includes(comandoObjetivo)) {
        return enviar(`❌ El comando *${comandoObjetivo}* no tiene soporte para omitir cooldown.`);
    }

    // Verifica el balance del usuario
    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };

    if (bal[sender].dinero < omitirCosto) {
        return enviar(`❌ No tienes suficientes ${moneda}. Necesitas ${omitirCosto} para omitir el cooldown.`);
    }

    // Descontar el costo y reiniciar el cooldown
    bal[sender].dinero -= omitirCosto;

    if (comandoObjetivo === "rw") {
        user[sender] = user[sender] || { lastRw: 0 };
        user[sender].lastRw = 0; // Reinicia el cooldown para `rw`
    } else if (comandoObjetivo === "c") {
        user[sender] = user[sender] || { lastC: 0 };
        user[sender].lastC = 0; // Reinicia el cooldown para `c`
    }

    // Guardar el nuevo balance
    guardarBalance();

    enviar(`✅ Has omitido el cooldown para el comando *${comandoObjetivo}*. Ya puedes usarlo nuevamente.`);
    break;
}

case "tienda":
    const tiendaMensaje = `
Bienvenido a la tienda Neko, estas son las opciones disponibles:

1. **Cupo para sorteo** - 200,000 coins
   - Precio: 10,000 ${moneda}
   - Comando: #comprar sorteo

2. **Waifu aleatoria** - 8,000 a 10,000 de valor
   - Precio: 5,000 ${moneda}
   - Comando: #comprar waifu
    `;
    enviar(tiendaMensaje);
    break;

case "comprar":
    const item = args[0];
    switch(item) {
        case "sorteo":
            if (bal[sender].dinero >= 10000) {
                bal[sender].dinero -= 10000;

                // Cargar participantes actuales del sorteo
                let participantes = loadSorteo();

                // Asegurar que `participantes` es un array
                if (!Array.isArray(participantes)) {
                    participantes = [];
                }

                // Añadir al participante si no está ya en la lista
                if (!participantes.includes(sender)) {
                    participantes.push(sender);
                    saveSorteo(participantes);
                    enviar("Has comprado un cupo para el sorteo. ¡Buena suerte!");
                } else {
                    enviar("Ya estás participando en el sorteo.");
                }
            } else {
                enviar("No tienes suficientes coins para comprar este artículo.");
            }
            break;

        case "waifu":
            if (bal[sender].dinero >= 5000) {
                bal[sender].dinero -= 5000;

                // Cargar la lista de waifus desde waifusDB.json
                let waifusDisponibles = JSON.parse(fs.readFileSync(waifuDBPath, 'utf-8'));
                
                // Filtrar waifus no reclamadas y con valor entre 8,000 y 10,000
                let waifusFiltradas = waifusDisponibles.filter(waifu => {
                    let valor = waifu.valor || 0;
                    return valor >= 8000 && valor <= 10000 && 
                           !Object.values(groupHarem).some(harem => harem.includes(waifu.nombre));
                });

                if (waifusFiltradas.length > 0) {
                    // Seleccionar una waifu aleatoria de las filtradas
                    let waifuSeleccionada = waifusFiltradas[Math.floor(Math.random() * waifusFiltradas.length)];

                    // Agregar la waifu al harem del usuario en groupHarem.json
                    groupHarem[sender] = groupHarem[sender] || [];
                    groupHarem[sender].push(waifuSeleccionada.nombre);

                    // Guardar los cambios en groupHarem.json
                    saveGroupHarem();

                    enviar(`¡Felicidades! Has obtenido a ${waifuSeleccionada.nombre} como tu waifu, con un valor de ${waifuSeleccionada.valor} coins.`);
                } else {
                    enviar("Lo siento, no hay waifus disponibles con el valor especificado o todas están reclamadas.");
                }
            } else {
                enviar("No tienes suficientes coins para comprar este artículo.");
            }
            break;

        default:
            enviar("El artículo que intentas comprar no está disponible.");
            break;
    }
    guardarBalance(); // Guarda los cambios en el balance
    break;

// Función para ejecutar el sorteo
const ejecutarSorteo = () => {
    const sorteoPath = './sorteo.json';
    let participantes = JSON.parse(fs.existsSync(sorteoPath) ? fs.readFileSync(sorteoPath, 'utf-8') : '[]');

    if (participantes.length > 0) {
        // Seleccionar un ganador aleatorio
        let ganador = participantes[Math.floor(Math.random() * participantes.length)];

        // Anunciar el ganador
        enviar(`🎉 ¡Felicidades @${ganador.split('@')[0]}! Has ganado el sorteo.`);

        // Limpiar la lista de participantes
        fs.writeFileSync(sorteoPath, JSON.stringify([], null, 2));
    } else {
        enviar("No hubo participantes en el sorteo.");
    }
};

// Programar el sorteo para el día siguiente (simulado con 5 segundos para pruebas)
// Cambiar a 24 * 60 * 60 * 1000 para un día completo en producción
setTimeout(ejecutarSorteo, 5 * 1000);


case "pay": {
    const amount = parseInt(args[0]); // Cantidad a transferir
    const mentionedUser = info.message.extendedTextMessage.contextInfo.mentionedJid[0]; // Usuario mencionado

    if (!amount || isNaN(amount)) {
        return enviar("Por favor, especifica una cantidad válida a transferir.");
    }

    if (!mentionedUser) {
        return enviar("Por favor, menciona al usuario al que deseas transferir monedas.");
    }

    if (!bal[sender]) {
        bal[sender] = { banco: 0, dinero: 0 };
    }

    if (!bal[mentionedUser]) {
        bal[mentionedUser] = { banco: 0, dinero: 0 };
    }

    if (bal[sender].banco < amount) {
        return enviar("No tienes suficientes monedas en el banco para realizar esta transferencia.");
    }

    // Realizar transferencia
    bal[sender].banco -= amount;
    bal[mentionedUser].banco += amount;

    // Guardar cambios
    guardarBalance();

    enviar(`✅ Has transferido *${amount} ${moneda}* a @${mentionedUser.split('@')[0]}.\nTu saldo actual en el banco: *${bal[sender].banco} ${moneda}*.`);
    sock.sendMessage(from, { text: `Has recibido *${amount} ${moneda}* de @${sender.split('@')[0]}.\nTu saldo actual en el banco: *${bal[mentionedUser].banco} ${moneda}*.`, mentions: [mentionedUser] });
    break;
}

case "s":
case "sticker": {
    try {
        const tempDir = './temp'; // Directorio temporal
        const inputPath = `${tempDir}/input.jpg`; // Archivo de entrada
        const outputPath = `${tempDir}/output.webp`; // Archivo de salida

        // Crear directorio temporal si no existe
        if (!existsSync(tempDir)) mkdirSync(tempDir);

        // Determinar si el contenido es una imagen válida
        const mediaType = isImage || isQuotedImage ? "image" : null;

        if (!mediaType) {
            return enviar("❌ Por favor, responde o envía una imagen para convertir en sticker.");
        }

        const mediaMessage = isQuotedImage
            ? quoted.message.imageMessage
            : info.message.imageMessage;

        if (!mediaMessage) {
            return enviar("❌ No se pudo procesar la imagen. Intenta nuevamente.");
        }

        // Descargar y guardar la imagen
        const buffer = await getFileBuffer(mediaMessage, "image");
        writeFileSync(inputPath, buffer);

        // Notificar al usuario
        enviar("⏳ Procesando tu sticker, por favor espera...");

        // Convertir la imagen a WebP usando sharp
        await sharp(inputPath)
            .webp({ quality: 80 }) // Ajustar calidad al 80%
            .toFile(outputPath);

        // Leer el archivo WebP generado
        const webpBuffer = readFileSync(outputPath);

        // Enviar el sticker
        await sock.sendMessage(from, { sticker: webpBuffer }, { quoted: info });

        // Limpiar archivos temporales
        unlinkSync(inputPath);
        unlinkSync(outputPath);

        enviar("✅ Sticker creado con éxito.");
    } catch (error) {
        console.error("❌ Error al crear el sticker:", error);
        enviar("❌ Ocurrió un error al intentar crear el sticker. Intenta nuevamente.");
    }
    break;
			      }

case "addimage": {
    // Verifica que se haya proporcionado el nombre de la waifu y la URL
    if (!q.includes(" ")) return enviar("❌ Por favor, proporciona el nombre de la waifu y el enlace de la imagen. Ejemplo:\n#addimage Kurumi_Tokisaki https://i.postimg.cc/ydFG67yD/1707337707358.jpg");

    const [waifuName, imageUrl] = q.split(" ");
    
    // Verifica si el enlace proporcionado es válido
    if (!imageUrl.startsWith("http") || !imageUrl.match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
        return enviar("❌ Proporciona un enlace válido de imagen. Ejemplo:\nhttps://i.postimg.cc/ydFG67yD/1707337707358.jpg");
    }

    // Busca la waifu en la base de datos
    const waifuToUpdate = waifus.find(w => w.name.toLowerCase() === waifuName.toLowerCase());
    if (!waifuToUpdate) return enviar(`❌ No se encontró ninguna waifu con el nombre "${waifuName}".`);

    // Agrega la nueva URL de la imagen al array
    waifuToUpdate.images.push(imageUrl);

    // Guarda los cambios en waifuDB.json
    fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2));
    enviar(`✅ Imagen añadida a "${waifuToUpdate.name}".`);
    break;
}


case "":
enviar("ese comando no existe usa #help para ver la lista de comandos");
break;

// COMANDOS SIN PREFIJO
default:



} 
 
 
 
 
 
 
 
 
 
 } catch (e) {
 e = String(e)
if (!e.includes("this.isZero") && !e.includes("Could not find MIME for Buffer <null>") && !e.includes("Cannot read property 'conversation' of null") && !e.includes("Cannot read property 'contextInfo' of undefined") && !e.includes("Cannot set property 'mtype' of undefined") && !e.includes("jid is not defined")) {
console.log('Error : %s', color(e, 'yellow'))
}
 
 
 }
 
 
 
        
    })





    
}

startProo()
