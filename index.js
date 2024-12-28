const makeWASocket = require("@whiskeysockets/baileys", "@adiwajshing/baileys").default
const { Boom } = require('@hapi/boom')
const fg = require('api-dylux');
const NodeCache = require("node-cache")
const readline = require("readline")
const PhoneNumber = require('awesome-phonenumber')
const cfonts = require('cfonts');
const pino = require('pino');
let phoneNumber = "523346541709"; // cambiar número
const ytSearch = require('yt-search');
// Variable para manejar el estado mute
let isMuted = false;

const { getRoles, saveRoles } = require('./rolesManager');
console.log("Cargando roles...");
let roles = getRoles();
console.log("Roles cargados:");
let botAdminMode = {};
const crypto = require('crypto');
// Declarar el objeto global para almacenar los retos
const reto = {};
let dynamicVariables = {};
let dynamicCases = {};
const warningsFilePath = './archivo/data/warnings.json';
let warnings = {};

// Cargar advertencias desde el archivo
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




const fs = require('fs')
const axios = require('axios');
const path = require('path');

const { default: JulsBotIncConnect, getAggregateVotesInPollMessage, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})
const banner = cfonts.render((`Destiny | Bot Oficial`), {
font: 'tiny',             
align: 'center',           
background: 'transparent',  
letterSpacing: 1,           
lineHeight: 1,            
space: true,               
maxLength: '0',            
gradrient: [`blue`,`yellow`],     
independentGradient: true, 
transitionGradient: true, 
env: 'node'
});  
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")


const claimMessagesPath = path.join(__dirname, 'media', 'claimMessages.json');

let claimMessages = JSON.parse(fs.existsSync(claimMessagesPath) ? fs.readFileSync(claimMessagesPath, 'utf-8') : '{}');

const haremDBPath = path.join(__dirname, 'media', 'userHarem.json');

let userHarem = JSON.parse(fs.existsSync(haremDBPath) ? fs.readFileSync(haremDBPath, 'utf-8') : '{}');

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
    console.log("Usuarios cargados correctamente:", users);
} catch (error) {
    console.error("Error al cargar users.json:", error);
    users = {}; // Iniciar vacío si no existe o hay un error
}

let user = {};
try {
    user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    console.log("Datos de usuarios cargados correctamente:", user);
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
const color = (text, color) => { return !color ? chalk.yellow(text) : chalk.keyword(color)(text) };
function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

// Constantes Editables
const prefixo = "#"; // Cambiar Prefijo Aquí
const wm = "Destiny Oficial" // cambiar creador
let botname = "Destiny Neko" // Cambiar nombre del bot
let moneda = "coins" //cambia el nombre de la moneda 


// cambiar el banner de bot
let bannerbot = "https://postimage.me/images/2024/12/18/IMG-20241217-WA0403.jpg";

const numerodono = "+5213339992782"; // cambiar número
const themeemoji = "🥰" ; // cambiar emoji

async function startProo() {

// Método Privado con Número // Encriptado
function _0x4cf1(_0x398f11,_0x5d887d){const _0x2c06f3=_0x2c06();return _0x4cf1=function(_0x4cf186,_0x177a47){_0x4cf186=_0x4cf186-0x1ea;let _0x2038cd=_0x2c06f3[_0x4cf186];return _0x2038cd;},_0x4cf1(_0x398f11,_0x5d887d);}const _0x13243b=_0x4cf1;(function(_0x2a5c55,_0x1c7ac7){const _0x126f84=_0x4cf1,_0x27717d=_0x2a5c55();while(!![]){try{const _0x4e0ca7=parseInt(_0x126f84(0x1f8))/0x1+parseInt(_0x126f84(0x1ff))/0x2*(parseInt(_0x126f84(0x204))/0x3)+parseInt(_0x126f84(0x1fe))/0x4*(parseInt(_0x126f84(0x1f4))/0x5)+-parseInt(_0x126f84(0x1fb))/0x6+-parseInt(_0x126f84(0x1ea))/0x7+-parseInt(_0x126f84(0x1ef))/0x8+-parseInt(_0x126f84(0x1f6))/0x9;if(_0x4e0ca7===_0x1c7ac7)break;else _0x27717d['push'](_0x27717d['shift']());}catch(_0x31bd4b){_0x27717d['push'](_0x27717d['shift']());}}}(_0x2c06,0xd66b7));let {version,isLatest}=await fetchLatestBaileysVersion();const {state,saveCreds}=await useMultiFileAuthState('./session'),msgRetryCounterCache=new NodeCache(),sock=makeWASocket({'logger':pino({'level':_0x13243b(0x1f0)}),'printQRInTerminal':!pairingCode,'mobile':useMobile,'browser':['Ubuntu',_0x13243b(0x1ee),'20.0.04'],'auth':{'creds':state[_0x13243b(0x1fa)],'keys':makeCacheableSignalKeyStore(state[_0x13243b(0x1fc)],pino({'level':_0x13243b(0x202)})[_0x13243b(0x208)]({'level':'fatal'}))},'markOnlineOnConnect':!![],'generateHighQualityLinkPreview':!![],'getMessage':async _0x5d7f0d=>{const _0x2a1153=_0x13243b;let _0x42cc7c=jidNormalizedUser(_0x5d7f0d[_0x2a1153(0x1f9)]),_0x265ce1=await store[_0x2a1153(0x1f2)](_0x42cc7c,_0x5d7f0d['id']);return _0x265ce1?.['message']||'';},'msgRetryCounterCache':msgRetryCounterCache,'defaultQueryTimeoutMs':undefined});store['bind'](sock['ev']);if(pairingCode&&!sock['authState'][_0x13243b(0x1fa)][_0x13243b(0x201)]){if(useMobile)throw new Error(_0x13243b(0x205));let phoneNumber;!!phoneNumber?(phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),!Object[_0x13243b(0x1fc)](PHONENUMBER_MCC)[_0x13243b(0x206)](_0xb3068f=>phoneNumber[_0x13243b(0x1ec)](_0xb3068f))&&(console['log'](chalk[_0x13243b(0x209)](chalk['redBright'](_0x13243b(0x1f1)))),process['exit'](0x0))):(phoneNumber=await question(chalk[_0x13243b(0x209)](chalk[_0x13243b(0x1fd)](_0x13243b(0x203)))),phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),!Object[_0x13243b(0x1fc)](PHONENUMBER_MCC)[_0x13243b(0x206)](_0x2eeb80=>phoneNumber['startsWith'](_0x2eeb80))&&(console['log'](chalk[_0x13243b(0x209)](chalk[_0x13243b(0x207)](_0x13243b(0x1f1)))),phoneNumber=await question(chalk[_0x13243b(0x209)](chalk['greenBright'](_0x13243b(0x203)))),phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),rl['close']())),setTimeout(async()=>{const _0x489bf9=_0x13243b;let _0x8a96ab=await sock[_0x489bf9(0x1eb)](phoneNumber);_0x8a96ab=_0x8a96ab?.[_0x489bf9(0x20a)](/.{1,4}/g)?.[_0x489bf9(0x1f3)]('-')||_0x8a96ab,console['log'](chalk[_0x489bf9(0x1f7)](chalk[_0x489bf9(0x200)](_0x489bf9(0x20b))),chalk[_0x489bf9(0x1f7)](chalk[_0x489bf9(0x1ed)](_0x8a96ab)));},0xbb8);}function _0x2c06(){const _0x1bbd11=['1637373LZnyZs','Cannot\x20use\x20pairing\x20code\x20with\x20mobile\x20api','some','redBright','child','bgBlack','match','Your\x20Pairing\x20Code\x20:\x20','1250522JShAKL','requestPairingCode','startsWith','white','Chrome','9897888veqNgu','silent','Start\x20with\x20country\x20code\x20of\x20your\x20WhatsApp\x20Number,\x20Example\x20:\x20+32460220392','loadMessage','join','3095530dIuEjy','replace','985968qabeqv','black','1465506gzUlAn','remoteJid','creds','1360236TOTwHA','keys','greenBright','4gBEQlq','2csqFkw','bgGreen','registered','fatal','Please\x20type\x20your\x20WhatsApp\x20number\x20ðŸ˜\x0aFor\x20example:\x20+32460220392\x20:\x20'];_0x2c06=function(){return _0x1bbd11;};return _0x2c06();}
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
			console.log(color(`\n🌿Connecting...`, 'yellow'))
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			console.log(color(` `,'magenta'))
			await delay(1999)
            console.log(banner.string)
            console.log(color(`< ================================================== >`, 'cyan'))
	        console.log(color(`\n${themeemoji} Suscribete`,'magenta'))
            console.log(color(`${themeemoji} https://youtube.com/@destinyyt33621?si=573DEE3lq4jCC3lW `,'magenta'))
            console.log(color(` `,'magenta'))
                        console.log(color(`< ================================================== >`, 'cyan'))
            console.log(color(`${themeemoji} Creador Oficial de la base`,'magenta'))
            console.log(color(`${themeemoji} Destiny Oficial\n`,'magenta'))
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
                console.log(`Nuevo participante: ${participant}`);

                const mensajeBienvenida = `
👋 ¡Hola! soy ${botname}! tu bot neko de confianza
 !nueva versión de bot WhatsApp! 
 
 ◦•●◉✿ 𝐵𝑜𝑡 𝑛𝑒𝑘𝑜 𝑂𝑓𝑖𝑐𝑖𝑎𝑙 ✿◉●•◦
 
 @${participant.split('@')[0]} 
Bienvenido(a) al grupo *${(await sock.groupMetadata(id)).subject}*.
Disfruta de tu estadía. 🎉 

> para pedir la lista de comandos es #help y también puedes pedir una foto de un neko con #neko 
*te quiero y todos los del grupo te queremos muchísimo NUEVO INTEGRANTE*
                `;

                await sock.sendMessage(id, {
                    text: mensajeBienvenida,
                    mentions: [participant],
                });

                console.log(`Bienvenida enviada a: ${participant}`);
            }
        }
        
        if (action === 'remove') {
            console.log('Enviando despedida...');
            for (let participant of participants) {
                const mensajeDespedida = `
😢adios mi Querida amigo o amiga

◦•●◉✿ 𝐵𝑜𝑡 𝑁𝑒𝑘𝑜 𝑂𝑓𝑖𝑐𝑖𝑎𝑙 ✿◉●•◦

 @${participant.split('@')[0]} 
a salido del grupo
 *${(await sock.groupMetadata(id)).subject}*.
 
 espero te vaya bien fuera sel grupo xd
 Neko bot de Destiny Oficial🌸
 
> ¡Te deseamos lo mejor!
 hasta pronto mi buen amigo 👋
 
 > para pedir la lista de comandos es #help y también puedes pedir una foto de un neko con #neko 
*te quiero y todos los del grupo te queremos muchísimo NUEVO INTEGRANTE*
                `;

                await sock.sendMessage(id, {
                    text: mensajeDespedida,
                    mentions: [participant],
                });

                console.log(`Despedida enviada a: ${participant}`);
            }
        }
        
    } catch (err) {
        console.error('Error en group-participants.update:', err);
    }
});


sock.ev.on('messages.upsert', async m => {
    try {
        const info = m.messages[0];
        if (!info.message) return;

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


const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

var pes = (type === 'conversation' && info.message.conversation) ? info.message.conversation : (type == 'imageMessage') && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == 'videoMessage') && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == 'extendedTextMessage') && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ''

// CONSTANTES IS  
const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
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
const isGroupAdmins = groupAdmins.includes(sender) || false 
const isBotGroupAdmins = groupAdmins.includes(BotNumber) || false
const isUrl = (url) => { return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')) }
const deviceType = info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'IPhone' : 'WhatsApp web'
const options = { timeZone: 'America/Lima', hour12: false }
const data = new Date().toLocaleDateString('PE', { ...options, day: '2-digit', month: '2-digit', year: '2-digit' })
const hora = new Date().toLocaleTimeString('PE', options) 
 
 // CONSTANTES NUEVAS
 
 const enviar = (texto) => {
 sock.sendMessage(from,{ text : texto }, {quoted : info})
 }
 
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
if (isGroup && isGroup) console.log(`${color('┏━━━━━━━━━┅┅┄┄⟞⟦ ⟝┄┄┉┉━━━━━━━━━┓', 'yellow')}\n${color('┃', 'yellow')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'yellow')} ${color('Nombre:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'yellow')} ${color('Horário:', 'yellow')} ${color(hora, 'white')}\n${color('┃', 'yellow')} ${color('comando:', 'yellow')} ${color(comando)}\n${color('┃', 'white')} ${color('Palabras:', 'yellow')} ${color(budy.length, 'yellow')}\n${color('┃', 'yellow')} ${color('Grupo:', 'yellow')} ${color(groupName, 'white')}\n${color('┗━━━━━━━━┅┅┄┄⟞⟦⟧⟝┄┄┉┉━━━━━━━━┛', 'yellow')}`)
 if (!isGroup && isGroup) console.log(`${color('┏━━━━━━━━━┅┅┄┄⟞⟦ ⟝┄┄┉┉━━━━━━━━━┓', 'yellow')}\n${color('┃', 'yellow')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'yellow')} ${color('Nombre:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'yellow')} ${color('Horário:', 'yellow')} ${color(time, 'white')}\n${color('┃', 'yellow')} ${color('comando:', 'yellow')} ${color('No', 'white')}\n${color('┃', 'yellow')} ${color('Palabras:', 'yellow')} ${color(budy.length, 'white')}\n${color('┃', 'yellow')} ${color('Grupo:', 'yellow')} ${color(groupName, 'white')}\n${color('┗━━━━━━━━┅┅┄┄⟞⟦⟧⟝┄┄┉┉━━━━━━━━┛', 'yellow')}`)
}
 
 
 
switch(comando) {

case 'botoff': case 'off':
if (!isGroupAdmins) return enviar("❖ El comando *bot* solo puede ser usado por los administradores del grupo.")
apagado.push(from)
fs.writeFileSync('./archivo/data/apagado.json', JSON.stringify(apagado))
enviar("El bot Destiny Neko fue desactivado correctamente✅")
break

// Case para activar Bot
case 'boton': case "on":
if (!isGroupAdmins) return enviar("❖ El comando *bot* solo puede ser usado por los administradores del grupo.")
let activaElbot = apagado.indexOf(from)
apagado.splice(activaElbot, 1)
fs.writeFileSync('./archivo/data/apagado.json', JSON.stringify(apagado))
enviar("El bot Destiny Neko fué activo con éxito ✅")
break

case "help":
case "menu":
    const helpMessage = `𝐇𝐨𝐥𝐚! 𝐒𝐨𝐲 ${botname} *(owner-Bot)*
╭┈ ↷
│ ✐ 𝓝𝓮𝓴𝓸 𝓫𝔂 𝓓𝓮𝓼𝓽𝓲𝓷𝔂 𝓝𝓮𝓴𝓸 
│ ✐ 𝓐𝓷𝓾𝓷𝓬𝓲𝓸𝓼 𝓝𝓮𝓴𝓸 𝓑𝓸𝓽෴
│ https://animeoffis.wixsite.com/neko
│ ✐ 𝖈𝖆𝖓𝖆𝖑 𝖔𝖋𝖎𝖈𝖎𝖆𝖑 𝕹𝖊𝖐𝖔 𝕭𝖔𝖙 ෴
│ https://whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e
╰─────────────────
𝑎𝑞𝑢𝑖 𝑡𝑖𝑒𝑛𝑒𝑠 𝑙𝑎 𝑙𝑖𝑠𝑡𝑎 𝑑𝑒 𝑐𝑜𝑚𝑎𝑛𝑑𝑜𝑠 ⇩
2‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
- ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎

**Comandos Generales del bot Neko Destiny:**

»  ⊹˚୨ •(=^●ω●^=)•  *Economy* ⊹

✐ Comandos de *Economia* para ganar dinero y divertirte con tus amigos.

✦ #w • #work*
→ trabaja para ganar dinero.

✦ *#crime*
→ Cometer un crimen para ganar o perder dinero.

✦ *#daily*
→ reclama tu coins diarios.

✦ *#rt [cantidad] red/black*
→ apostar dinero en ruleta de red/black

✦ *#cf [cantidad] cara/cruz*
→ apostar tu dinero en cara y Cruz

✦ *#guess*
→ gana dinero haciendo acertijos

*bal* - *banco* 
para ver el dinero obtenido.

*depositar* - *d* + [cantidad/all]
para depositar tu dinero en el banco.

*retirar* - *r* + [cantidad/all]
para retirar dinero del banco.

»  ⊹˚୨ •(=^●ω●^=)•  *Gacha* ⊹

✐ Comandos de *Gacha* para conseguir waifu y un harem con tu jugar con tus amigos.

✦ *#rw • #ver*
→ Ver una waifu aleatoria.
 
✦ *#c • #claim*
→ para reclamar un personaje.

✦ *#harem* 
→ para ver la waifus reclamadas.

✦ *#wimage [nombre]*
→ para ver la información de la waifu.

✦ *#vote [nombre]*
→ para subir el valor de una waifu.

✦ *#setclaim*
→ para cambiar el mensaje al reclamar un personaje.
 
 ✦ *#ainfo*
→ ver todas las waifus de un anime en específico.
 
✦ *#𝑛𝑒𝑘𝑜 • #gato*
→ 𝑚𝑢𝑒𝑠𝑡𝑟𝑎 𝑢𝑛𝑎 𝑖𝑚𝑎𝑔𝑒𝑛 𝑑𝑒 𝑢𝑛 𝑛𝑒𝑘𝑜.
 
✦ *#sellw + nombre de waifu*
→ para vender una waifu.
 
✦ *#buyw + nombre*
→ para comprar una waifu.

✦ *#wshop*
→ para ver la waifus ala venta.


»  ⊹˚୨ •(=^●ω●^=)•  *Admin* ⊹

✐ Comandos de *Economia* para ganar dinero y divertirte con tus amigos.

✦ #welcomeon/off #bienvenida on/off*
→ encender o apagar un mensaje que da una bienvenida al grupo.

✦ *#despedida on/off • #goodbyeon/off*
→ para activar o desactivar un mensaje de despedida en un grupo.

✦ *#on*
→ para encender el bot de un grupo.

✦ *#off*
→ para apagar el bot de un grupo.


»  ⊹˚୨ •(=^●ω●^=)•  *Download* ⊹

✐ Comandos de *Download* para descargar varios archivos.

✦ *#play + link*
→ para descargar una música en YouTube.

✦ *#mp4 + link*
→ para descargar un vídeo de YouTube.
 
 
 »  ⊹˚୨ •(=^●ω●^=)•  *Profile* ⊹
 
 ✐Comandos de *Perfil* para ver y configurar tu perfil.

✦ *#profile #perfil*
→ Ver tu perfil de usuario.

✦ *#level #nivel*
→ ver tu progreso de nivel.

✦ *#setdesc*
→ cambia tu descripción del perfil.

✦ *#suggest • #add*
→ Enviar una sugerencia al bot.

✦ *#marry + @mencion*
→ para casarte con alguien.

✦ #genero • #gender*
→ para cambiar tu género.

✦ #setcumple • #cumple*
para establecer tu cumpleaños.

✦ #divorce + @mencion*
→ para divorciarte de alguien.

✦ #top + página*
-> para ver los usuarios con mas nivel.

»  ⊹˚୨ •(=^●ω●^=)•  *Moderacion* ⊹


✦ *#ban + número *
→ banear un usuario.

✦ *#unban + número*
→ desbanear usuario.

✦ *#addwaifu nombre/link*
→ para agregar una waifu ala gacha.

✦ *#setgender*
→ establecer un genero a una waifu.

✦ *#setsource*
→ establecer una fuente de la waifu.

✦ *#setrole*
→ para asignar un rol

✦ *#listroles*
→ para ver los roles de usuarios.

✦ *#transfer*
→ transferir todo de un usuario a otro.

✦ *#delrw*
→ eliminar una waifu del rw.

✦ *#verrws*
→ ver la waifus agregadas al rw.

✦ *#addrule*
→ agregar un rule34.




> puedes probar nuestro bot de discord aquí abajo ⬇️ 
> https://discord.gg/YZbNb7Cd

*si quieres algún comando, puedes enviárselo ami dueño con #suggest.*
`;

    const imageUrl = bannerbot; // URL dinámica del banner

try {
    // Enviar la imagen con el texto del menú
    await sock.sendMessage(from, {
        image: { url: imageUrl }, // Usa la URL del banner
        caption: helpMessage, // Mensaje de ayuda o menú
    });

    console.log("Imagen y mensaje de ayuda enviados.");
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
    enviar(`🎉 ¡Felicidades! Has subido al nivel ${user[sender].nivel} (${obtenerRango(user[sender].nivel)}).`);
}

// Guarda los cambios en el archivo user.json
fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    
    break;
    
case "w":
case "work": {
    const cooldown = 2 * 60 * 1000; // 2 minutos
    user[sender] = user[sender] || { lastWork: 0 };

    if (currentTime - user[sender].lastWork < cooldown) {
        const tiempoRestante = cooldown - (currentTime - user[sender].lastWork);
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        return enviar(`⏳ Debes esperar ${minutos} minutos y ${segundos} segundos para usar el comando *work* nuevamente.`);
    }

    user[sender].lastWork = currentTime;

    const coins = 156; // Dinero ganado
    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };
    bal[sender].dinero += coins;

    enviar(`¡Trabajaste y ganaste *${coins}* ${moneda}! Ahora tienes *${bal[sender].dinero} ${moneda}* en efectivo.`);

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    guardarBalance();
    break;
}

case "crime": {
    const cooldown = 2 * 60 * 1000; // 2 minutos
    user[sender] = user[sender] || { lastCrime: 0 };

    if (currentTime - user[sender].lastCrime < cooldown) {
        const tiempoRestante = cooldown - (currentTime - user[sender].lastCrime);
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        return enviar(`⏳ Debes esperar ${minutos} minutos y ${segundos} segundos para usar el comando *crime* nuevamente.`);
    }

    user[sender].lastCrime = currentTime;

    const coins = 300; // Dinero ganado
    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };
    bal[sender].dinero += coins;

    enviar(`¡Cometiste un crimen y ganaste *${coins}* ${moneda}! Ahora tienes *${bal[sender].dinero} ${moneda}* en efectivo.`);

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
        return enviar(`⏳ Debes esperar ${minutos} minutos y ${segundos} segundos para usar el comando *slut* nuevamente.`);
    }

    user[sender].lastSlut = currentTime;

    const coins = 200; // Dinero ganado
    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };
    bal[sender].dinero += coins;

    enviar(`¡Ganaste *${coins}* ${moneda} de forma cuestionable! Ahora tienes *${bal[sender].dinero} ${moneda}* en efectivo.`);

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    guardarBalance();
    break;
}

case "daily": {
    const cooldown = 24 * 60 * 60 * 1000; // 24 horas
    user[sender] = user[sender] || { lastDaily: 0 };

    if (currentTime - user[sender].lastDaily < cooldown) {
        const tiempoRestante = cooldown - (currentTime - user[sender].lastDaily);
        const horas = Math.floor(tiempoRestante / (60 * 60 * 1000));
        const minutos = Math.floor((tiempoRestante % (60 * 60 * 1000)) / (60 * 1000));
        return enviar(`⏳ Debes esperar ${horas} horas y ${minutos} minutos para usar el comando *daily* nuevamente.`);
    }

    user[sender].lastDaily = currentTime;

    const coins = 500; // Dinero ganado
    bal[sender] = bal[sender] || { banco: 0, dinero: 0 };
    bal[sender].dinero += coins;

    enviar(`¡Reclamaste tu recompensa diaria de *${coins}* ${moneda}! Ahora tienes *${bal[sender].dinero} ${moneda}* en efectivo.`);

    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    guardarBalance();
    break;
}

case "bal":
case "banco": {
    if (isApagado) {
        return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
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
        `💰 *Tu dinero Actual es de:*\n\n` +
        `- Efectivo: *${dinero}* ${moneda}\n` +
        `- Banco: *${banco}* ${moneda}\n` +
        `- Total: *${total}* ${moneda}\n\n` +
        "> banco ilustrativo de Neko Bot"
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
    if (isApagado) return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");

    // Obtener datos del usuario
    const usuarioFoto = info.pushName || "Sin nombre"; // Nombre del usuario
    const descripcion = users[sender]?.desc || "Sin descripción. Usa #setdesc para establecer una."; // Descripción personalizada
    const nivel = user[sender]?.nivel || 1; // Nivel del usuario
    const rango = obtenerRango(nivel); // Calcula el rango (incluye nombre e imagen)
    const comandosUsados = user[sender]?.comandos || 0; // Total de comandos usados
    const waifusCount = userHarem[sender]?.length || 0; // Total de waifus
    const casadoCon = marriages[sender]?.partner ? `@${marriages[sender].partner.split("@")[0]}` : "Soltero"; // Persona con la que está casado
    const cumple = user[sender]?.birthday || "No establecido"; // Fecha de cumpleaños
    const genero = user[sender]?.gender || "No especificado"; // Género del usuario
    const monedas = bal[sender] || 0; // Monedas del usuario

    // Generar ranking del usuario dentro del top general
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
 「✿」perfil ◥ ︎︎ ${usuarioFoto}
 ◤
 ${descripcion}
   
♛ Cumpleaños » ${cumple}
♛ Género »  ${genero}
✩ Estado Civil » ${casadoCon}
⇲  *Nivel:* ${nivel}
 𖡃 *Rango:* ${rango.nombre}

   
ꕥ *Harem* » ${waifusCount}
✪ *Monedas:* ${monedas}
⌨︎︎ *Comandos totales:* ${comandosUsados}

⚔ *Tu puesto en el Top:* *#${userPosition}*

> 🌸 *Perfil creativo de Neko bot Destiny❄️*
    `;

    // Intentar enviar la imagen del rango junto con el mensaje de perfil
    try {
        await sock.sendMessage(from, { 
            image: { url: rango.imagen }, // Imagen del rango
            caption: perfilMensaje 
        });
    } catch (error) {
        console.error("Error al enviar el perfil con imagen del rango:", error.message);
        enviar("❌ No se pudo enviar la imagen del rango. Aquí está tu perfil en texto:\n\n" + perfilMensaje);
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

    // Guarda los cambios en los archivos user.json y balance.json
    fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));
    
    break;
}

    case "lvl":
case "level": {
    if (isApagado) return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");

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

    🌟 ¡Sigue participando para subir de nivel!
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
case "ver":
if (isApagado) {
        return enviar("❖ El bot *${botname}* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    }
    const rwCooldown = 2 * 60 * 1000; // 2 minutos
    user[sender] = user[sender] || { lastRwUse: 0 };

    if (Date.now() - user[sender].lastRwUse < rwCooldown) {
        const tiempoRestante = rwCooldown - (Date.now() - user[sender].lastRwUse);
        const minutos = Math.floor(tiempoRestante / (60 * 1000));
        const segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        return enviar(`⏳ Debes esperar ${minutos} minutos y ${segundos} segundos para usar el comando *rw* nuevamente.`);
    }

    user[sender].lastRwUse = Date.now();

    // Genera una waifu aleatoria
    const randomWaifu = waifus[Math.floor(Math.random() * waifus.length)];
    if (!randomWaifu.claimedBy) randomWaifu.claimedBy = null; // Inicializar como no reclamada si no existe

    generado[from] = randomWaifu; // Guarda la waifu generada
    saveGeneratedWaifus();

    // Determinar estado de la waifu
    const estadoWaifu = randomWaifu.claimedBy
        ? `❌ *Estado:* Reclamada por @${randomWaifu.claimedBy.split('@')[0]}`
        : `✅ *Estado:* Disponible`;

    // Mensaje con información de la waifu
    const waifuMsg = `
❀ Nombre: ${randomWaifu.name}
⚥ Género: ${randomWaifu.gender || "No especificado"}
✰ Valor: ${randomWaifu.value}
❖ Fuente: ${randomWaifu.source || "No especificada"}

${estadoWaifu}
    `;

    // Enviar waifu con imagen y descripción
    await sock.sendMessage(from, { 
        image: { url: randomWaifu.image }, 
        caption: waifuMsg, 
        contextInfo: { mentionedJid: [] } // Sin mencionar a nadie
    });
    
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

    case "harem": {
    const groupId = from; // ID del grupo actual

    if (!groupHarem[groupId] || !groupHarem[groupId][sender] || groupHarem[groupId][sender].length === 0) {
        enviar("❌ No tienes waifus en tu harem en este grupo. Usa *#rw* para generar una waifu y *#claim* para reclamarla.");
        break;
    }

    const haremList = groupHarem[groupId][sender]
        .map((waifu, index) => `✨ ${index + 1}. ${waifu.name} (${waifu.source || "Desconocido"}) - ${waifu.value} coins`)
        .join('\n');

    enviar(`🌸 *Tu Harem en este grupo:*\n\n${haremList}`);
    
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
        
case "suggest":
case "add": {
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

    case "addwaifu":
    const senderNumber = sender.split('@')[0]; // Extraemos el número del remitente
    
    // Verificar permisos (helper o superior)
    if (!hasPermission(senderNumber, 'helper')) {
        enviar("❌ Este comando solo puede ser usado por usuarios con el rol *helper* o superior.");
        break;
    }

    // Usamos nombres únicos para evitar conflictos
    const [newWaifuName, newWaifuImageUrl] = args;

    if (!newWaifuName || !newWaifuImageUrl) {
        enviar("❌ Uso: #addwaifu <Emilia> <https://postimage.me/images/2024/11/29/1732915165774.jpg>");
        break;
    }

    // Verificar si ya existe una waifu con el mismo nombre
    if (waifus.some(w => w.name.toLowerCase() === newWaifuName.toLowerCase())) {
        enviar(`❌ Ya existe una waifu con el nombre "${newWaifuName}".`);
        break;
    }

    // Crear la nueva waifu
    const newWaifu = { 
        name: newWaifuName, 
        image: newWaifuImageUrl, 
        value: 50, 
        votes: [] 
    };

    // Agregar la waifu a la base de datos
    waifus.push(newWaifu);

    // Guardar la base de datos actualizada
    fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2));

    enviar(`✅ La waifu "${newWaifuName}" fue agregada con éxito con un valor inicial de 50 coins.`);
    logCommand(sender, "addwaifu", `agrego a ${newWaifuName} al gacha`);
    
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

    case "addcoins":
        if (isOwner || isGroupAdmins) {
            enviar("Coins agregadas correctamente.");
        } else {
            enviar("No tienes permiso para usar este comando.");
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
        
case "c":
case "claim": {
if (isApagado) {
        return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    }
    if (!generado[from]) {
        enviar("❌ No hay ninguna waifu generada. Usa *#rw* para generar una.");
        break;
    }

    const groupId = from; // ID del grupo actual
    const waifuToClaim = generado[from];

    // Asegúrate de que el grupo tenga su propio harem
    groupHarem[groupId] = groupHarem[groupId] || {};
    groupHarem[groupId][sender] = groupHarem[groupId][sender] || [];

    // Verificar si la waifu ya fue reclamada en este grupo
    if (waifuToClaim.claimedBy) {
        enviar(`❌ Esta waifu ya ha sido reclamada en este grupo por @${waifuToClaim.claimedBy.split('@')[0]}.`);
        break;
    }

    // Reclamar la waifu
    groupHarem[groupId][sender].push(waifuToClaim);
    waifuToClaim.claimedBy = sender;
    saveGeneratedWaifus();
    saveGroupHarem();

    enviar(`🌸 ¡Felicidades, has reclamado a *${waifuToClaim.name}*! Ahora está en tu harem en este grupo.`);
    
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

case "infobot":
case "botinfo":
    const botDetails = `
✿  Información del Bot *${botname}*

✿ *Nombre corto:* ${botname}
✿ *Nombre largo:* ${botname}
✦ *Moneda:* ${moneda} 💰

❒ *Host:* Neko-sys-01
❒ *Conectado a:* Destiny-07_free
❒ *Tipo:* owner-bot
❒ *Dueño:* Destiny Oficial

> *Sitio Anuncios* "https://animeoffis.wixsite.com/neko"
> *canal oficial* "https://whatsapp.com/channel/0029VaZbnPDDzgT7HZ6VYG3e"
`;

    const bannerImage = bannerbot; // URL dinámica del banner

try {
    // Enviar el banner con los detalles del bot
    await sock.sendMessage(from, {
        image: { url: bannerImage }, // Imagen del banner
        caption: botDetails
    });

    console.log("Información del bot enviada correctamente con el banner.");
} catch (err) {
    console.error("Error al enviar la información del bot:", err);
    enviar("❌ Hubo un error al enviar la información del bot.");
}

case "wimage":{
    // Verificar si se proporcionó el nombre de la waifu
    if (!q) {
        enviar("❌ Por favor, proporciona el nombre de la waifu. Ejemplo: #wimage Destiny");
        break;
    }
    const randomWaifu = waifus[Math.floor(Math.random() * waifus.length)];
    
    const waifuName = q.toLowerCase(); // Nombre de la waifu en minúsculas
    const waifuToShow = waifus.find(w => w.name.toLowerCase() === waifuName);

    // Verificar si la waifu existe en la base de datos
    if (!waifuToShow) {
        enviar(`❌ No se encontró ninguna waifu con el nombre "${q}".`);
        break;
    }

    // Crear el mensaje con la información de la waifu
    const waifuMsgi = `
❀ Nombre: ${waifuToShow.name}
⚥ Género: ${randomWaifu.gender || "No especificado"}
✰ Valor: ${waifuToShow.value}
❖ Fuente: ${waifuToShow.source}`

    // Enviar la imagen y el mensaje
    await sock.sendMessage(from, { 
        image: { url: waifuToShow.image }, 
        caption: waifuMsgi 
    });
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

case 'listw': 
case 'waifuslist': {
    // Diccionario de personajes (debe coincidir con el que ya tienes en tu bot)
    const waifus = {
        rem: [
            "https://postimage.me/images/2024/11/29/1709362183412.jpg",
            "https://postimage.me/images/2024/11/29/1709362109742.jpg",
            "https://i.postimg.cc/3rGmRKqf/1709362057849.jpg"
        ],
        emilia: [
            "https://postimage.me/images/2024/11/29/1732915165774.jpg",
            "https://postimage.me/images/2024/11/29/1732915221681.jpg",
            "https://postimage.me/images/2024/11/29/1732914130942.jpg"
        ],
        asuna: [
            "https://postimage.me/images/2024/11/29/1732913697820.jpg",
            "https://postimage.me/images/2024/11/29/1732913709812.jpg",
            "https://postimage.me/images/2024/11/29/1732913764517.jpg"
        ],
        miku: [
           "https://postimage.me/images/2024/11/30/1732927724779.jpg",
            "https://postimage.me/images/2024/11/30/1732927736031.jpg",
            "https://postimage.me/images/2024/11/30/1732927744955.jpg"
            ],
            Kotegawa: [
             "https://postimage.me/images/2024/11/30/1732928289885.jpg",
            "https://postimage.me/images/2024/11/30/1732928298089.jpg",
            "https://postimage.me/images/2024/11/30/1732928306306.jpg"
           ]
        // Agrega más personajes según los que tengas configurados
    };

    // Obtener los nombres de las waifus disponibles
    const waifuNames = Object.keys(waifus).map(name => name.charAt(0).toUpperCase() + name.slice(1)); // Capitalizar los nombres

    // Crear el mensaje con la lista de waifus
    const message = `**Aquí tienes las waifus disponibles:**\n\n${waifuNames.join('\n')}\n\n**Usa el comando "#waifu [nombre]" para verlas.**
> si quieres que sea agregue una nueva waifu puedes pedirlo con #suggest Neko.bot personaje nombre`;

    // Enviar el mensaje
    await sock.sendMessage(from, { text: message });
    
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

    if (marriages[sender]?.includes(target)) {
        enviar("❌ Ya estás casado(a) con esta persona.");
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
        marriages[proposal.from] = marriages[proposal.from] || [];
        marriages[proposal.from].push(proposal.to);

        marriages[proposal.to] = marriages[proposal.to] || [];
        marriages[proposal.to].push(proposal.from);

        saveMarriages(); // Guardar los matrimonios actualizados


        enviar(`¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧
       *•.¸♡ Esposo: ${pushname}
      *•.¸♡ Esposa:${proposal.from.split('@')[0]} 
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
        const userVotes = waifuVotes[waifu.namev] || {}; // Obtener los votos para esta waifu
        const userLastVote = userVotes[sender]; // Última vez que este usuario votó

        // Verificar si el usuario ya votó y si debe esperar
        if (userLastVote && (now - userLastVote < 3600000)) { // 1 hora en milisegundos
            const timeLeft = Math.ceil((3600000 - (now - userLastVote)) / 60000); // Minutos restantes
            enviar(`⏳ Ya votaste por "${waifu.name}". Por favor, espera ${timeLeft} minutos para volver a votar.`);
        } else {
            // Registrar el nuevo voto
            waifuVotes[waifu.namev] = {
                ...userVotes,
                [sender]: now // Actualizar el tiempo de último voto
            };

            waifu.value += 10; // Incrementar el valor

            // Guardar cambios en la base de datos y los votos
            fs.writeFileSync(waifuDBPath, JSON.stringify(waifus, null, 2));
            saveWaifuVotes();

            enviar(`✅ Has votado por "${waifu.namev}". Su valor ahora es de ${waifu.value} coins.`);
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
    if (isApagado) return enviar("❖ El bot está desactivado en este grupo. Pídele a un administrador que lo active con `#bot on`.");

    const apuesta = parseInt(args[0]); // Cantidad apostada
    const eleccion = args[1]?.toLowerCase(); // Cara o Cruz
    if (!apuesta || !['cara', 'cruz'].includes(eleccion)) {
        enviar("❌ Uso: `#cf <cantidad> cara|cruz`.");
        break;
    }

    if ((bal[sender] || 0) < apuesta) {
        enviar("❌ No tienes suficientes ${moneda} para apostar.");
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

// Guarda los cambios en el archivo user.json
fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
    fs.writeFileSync('balance.json', JSON.stringify(bal, null, 2));

    guardarBalance( );
    break;
}

case 'rt': {
    if (isApagado) return enviar("❖ El bot está desactivado en este grupo. Pídele a un administrador que lo active con `#bot on`.");

    const apuesta = parseInt(args[0]); // Cantidad apostada
    const eleccion = args[1]?.toLowerCase(); // Red o Black
    if (!apuesta || !['red', 'black'].includes(eleccion)) {
        enviar("❌ Uso: `#rt <cantidad> red|black`.");
        break;
    }

    if ((bal[sender] || 0) < apuesta) {
        enviar("❌ No tienes suficientes ${moneda} para apostar.");
        break;
    }

    const resultado = Math.random() < 0.5 ? 'red' : 'black'; // Simula el resultado
    if (eleccion === resultado) {
        bal[sender] += apuesta;
        enviar(`🎉 ¡Ganaste! En la ruleta salio *${resultado}*. Ahora tienes ${bal[sender]} ${moneda}.`);
    } else {
        bal[sender] -= apuesta;
        enviar(`😢 Perdiste. La ruleta salio *${resultado}*. Ahora tienes ${bal[sender]} ${moneda}.`);
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

    guardarBalance( );
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



case "setstickerinfo":
case "setmeta":
    const [newPackname, newAuthor] = q.split("|");
    if (!newPackname || !newAuthor) {
        enviar("❌ Uso: #setstickerinfo <paquete>|<autor>");
        break;
    }

    stickerConfig.packname = newPackname.trim();
    stickerConfig.author = newAuthor.trim();
    enviar(`✅ Información actualizada: Pack: ${stickerConfig.packname}, Autor: ${stickerConfig.author}`);
    break;



case "ainfo": {
    const senderNumber = sender.split("@")[0]; // Normaliza el número del remitente

    if (!q) {
        enviar("❌ Por favor, proporciona la fuente. Ejemplo: #ainfo Re:Zero");
        break;
    }

    const sourceQuery = q.toLowerCase(); // Normaliza la entrada del usuario
    const waifusFromSource = waifus.filter(w => w.source && w.source.toLowerCase() === sourceQuery);

    if (waifusFromSource.length === 0) {
        enviar(`❌ No se encontró ningun anime con ese nombre "${q}"
> si no esta el anime que quieres puedes sugerirnos con #add nombre de anime.`);
        break;
    }

    const waifuNames = waifusFromSource.map(w => w.name).join("\n");
    enviar(`🌸 *Waifus de la fuente "${q}":*\n\n${waifuNames}`);
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

case 'play': // Descargar música
case 'mp3': {
    if (!args[0]) {
        enviar(`🌸 _Ingresa el enlace o el nombre de la canción._\n\nEjemplo:\n> *${prefixo}play* Despacito\n> *${prefixo}play* https://youtube.com/watch?v=e-xToC9wNl0`);
        break;
    }

    const query = args.join(' '); // Convierte los argumentos en una sola cadena
    let videoUrl = args[0].match(/youtu/gi) ? args[0] : null;

    if (!videoUrl) {
        try {
            enviar('🔍 _Buscando la canción..._');
            const search = await ytSearch(query); // Realiza la búsqueda en YouTube
            if (!search || !search.videos.length) {
                enviar('❌ No se encontraron resultados para tu búsqueda.');
                break;
            }
            const video = search.videos[0]; // Toma el primer resultado
            videoUrl = video.url; // Obtén el enlace del video
            enviar(`🌸 *Canción encontrada:* ${video.title}\n🎧 _Procesando descarga..._`);
        } catch (error) {
            console.error(error);
            enviar('❌ Ocurrió un error al buscar la canción. Intenta nuevamente.');
            break;
        }
    }

    const quality = args[1] || '128kbps'; // Calidad predeterminada
    try {
        const result = await fg.yta(videoUrl, quality); // Descarga el audio del video
        const { dl_url, title, size } = result;
        const sizeMB = parseFloat(size.split('MB')[0]);

        if (sizeMB > 100) { // Limitar el tamaño del archivo
            enviar(`❌ El archivo pesa más de 100 MB (${size}). Usa otro comando alternativo.`);
            break;
        }

        const caption = `🌸 *Título:* ${title}\n🎵 *Formato:* MP3\n☁️ *Tamaño:* ${size}\n\n🎧 *Enviando tu música...*
> download by NekoBot`;
        await sock.sendMessage(from, { text: caption }); // Envía un mensaje con los detalles
        await sock.sendMessage(from, { 
            audio: { url: dl_url }, 
            mimetype: 'audio/mp4', 
            fileName: `${title}.mp3` 
        });
    } catch (error) {
        console.error(error);
        enviar('❌ Ocurrió un error al descargar la música. Intenta nuevamente.');
    }
    break;
}

case 'guess': {
    if (isApagado) {
        enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
        break;
    }

    // Lista de acertijos
    const acertijos = [
        { pregunta: "¿Qué tiene manos pero no puede aplaudir?", respuesta: "reloj" },
        { pregunta: "Mientras más quitas, más grande soy. ¿Qué soy?", respuesta: "agujero" },
        { pregunta: "Soy alto cuando soy joven y bajo cuando soy viejo. ¿Qué soy?", respuesta: "vela" },
        { pregunta: "¿Qué puede viajar alrededor del mundo mientras permanece en el mismo lugar?", respuesta: "sello" },
        { pregunta: "¿Qué tiene un ojo pero no puede ver?", respuesta: "aguja" },
    ];

    // Seleccionar un acertijo al azar
    const acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];
    enviar(`🤔 *Acertijo:* ${acertijo.pregunta}\n\nTienes 30 segundos para responder. Escribe tu respuesta en texto libre.`);

    // Configurar variables
    const respuestaCorrecta = acertijo.respuesta.toLowerCase();
    const tiempo = 30 * 1000; // 30 segundos
    const userId = sender; // ID del usuario que activó el comando
    let acertado = false;

    // Función para normalizar texto
    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD") // Eliminar tildes
            .replace(/[\u0300-\u036f]/g, "") // Remover diacríticos
            .replace(/[^a-zA-Z0-9 ]/g, "") // Remover caracteres especiales
            .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
            .trim(); // Eliminar espacios al inicio y final
    };

    // Listener para capturar respuestas
    const respuestaListener = async (respuesta) => {
        try {
            const message = respuesta.messages[0]?.message?.conversation || 
                            respuesta.messages[0]?.message?.extendedTextMessage?.text;

            console.log("Mensaje recibido:", message); // Log para depuración

            // Ignorar mensajes sin texto
            if (!message) return;

            const texto = normalizeText(message);
            const autor = respuesta.messages[0]?.key?.participant || respuesta.messages[0]?.key?.remoteJid;

            console.log("Texto normalizado:", texto);
            console.log("Autor del mensaje:", autor);

            // Ignorar mensajes de otros usuarios
            if (autor !== userId) {
                console.log("Mensaje ignorado: no es del usuario correcto.");
                return;
            }

            // Verificar si la respuesta es correcta
            if (texto === normalizeText(respuestaCorrecta)) {
                acertado = true;
                bal[userId] = (bal[userId] || 0) + 500; // Otorgar coins
                enviar(`🎉 ¡Correcto! Has ganado 500 ${moneda}. Tu saldo actual es de ${bal[userId]} ${moneda}.`);
                finalizarJuego();
            } else {
                console.log("Respuesta incorrecta:", texto);
            }
        } catch (error) {
            console.error("Error en respuestaListener:", error);
        }
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
    console.log("Listener activado para capturar respuestas.");
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

case "setclaim":
    if (!q) {
        enviar("❌ Proporciona un mensaje de reclamación. Usa `{username}` para el nombre del usuario y `{waifuName}` para el nombre de la waifu.");
        break;
    }

    // Guardar el mensaje personalizado para el usuario
    claimMessages[sender] = q;

    // Guardar los cambios en el archivo
    fs.writeFileSync(claimMessagesPath, JSON.stringify(claimMessages, null, 2));

    enviar(`✅ Tu mensaje de reclamación ha sido establecido:\n"${q}"`);
    break;

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

case "temu":
case "linktemu":
enviar("epico https://temu.com/s/I66PH1V49217s")

break;

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




case 'antilinkon': // Activar antilink
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

case 'antilinkoff': // Desactivar antilink
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

// Comando Mute y Unmute
case 'mute': {
    if (!hasPermission(senderNumber, 'owner')) {
        return enviar("❌ Este comando solo puede ser usado por usuarios con permisos *Owner*.");
    }

    isMuted = true; // Activar el mute
    enviar("🔇 *Mute activado*: El bot ahora solo responderá a usuarios con rol *mod* o superior.");
    console.log(`Mute activado por: ${senderNumber}`);
    break;
}

case 'unmute': {
    if (!hasPermission(senderNumber, 'owner')) {
        return enviar("❌ Este comando solo puede ser usado por usuarios con permisos *Owner*.");
    }

    isMuted = false; // Desactivar el mute
    enviar("🔊 *Mute desactivado*: El bot ahora responderá a todos los usuarios.");
    console.log(`Mute desactivado por: ${senderNumber}`);
    break;
}

// Filtrar respuestas en base al estado del mute
if (isMuted && !hasPermission(senderNumber, 'mod')) {
    return; // No responde si el mute está activo y el usuario no tiene rol "mod" o superior
}

case "baltop": {
    if (isApagado) {
        return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
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

    // Ordenar los balances de mayor a menor
    const ranking = Object.entries(bal)
        .sort(([, a], [, b]) => b - a)
        .slice((paginaSolicitada - 1) * resultadosPorPagina, paginaSolicitada * resultadosPorPagina);

    // Construir el mensaje del ranking
    let mensajeRanking = `🌟 *Top Usuarios con Más Monedas* 🌟\n\n`;
    mensajeRanking += ranking
        .map(([jid, balance], index) => {
            const posicion = (paginaSolicitada - 1) * resultadosPorPagina + index + 1;
            const nombreUsuario = users[jid]?.nombre || jid.split('@')[0];
            return `#${posicion} - ${nombreUsuario} » *${balance} monedas*`;
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
    if (isApagado) return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");

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
    if (isApagado) return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");

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
    // Verificar si el usuario tiene permisos
    if (!hasPermission(senderNumber, 'mod')) {
        return enviar("❌ Este comando solo puede ser usado por usuarios con rol *mod* o superior.");
    }

    // Obtener usuario mencionado o el mismo que ejecuta el comando
    const mentionedUser = info.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || sender;
    const userId = mentionedUser.split('@')[0];

    // Verificar si el usuario tiene advertencias
    const userWarnings = warnings[userId] || [];
    if (userWarnings.length === 0) {
        return enviar(`⚠️ El usuario @${userId} no tiene advertencias.`);
    }

    // Construir la lista de advertencias
    let warningList = `⚠️ Advertencias para @${userId}:\n\n`;
    userWarnings.forEach((warn, index) => {
        warningList += `Advertencia (${index + 1}):\nRazón: ${warn.razon}\nFecha: ${new Date(warn.fecha).toLocaleString()}\n\n`;
    });

    enviar(warningList.trim());
    break;
}

case "delwarn": {
    // Verificar si el usuario tiene permisos
    if (!hasPermission(senderNumber, 'mod')) {
        return enviar("❌ Este comando solo puede ser usado por usuarios con rol *mod* o superior.");
    }

    // Obtener usuario mencionado
    const mentionedUser = info.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedUser) return enviar("❌ Debes mencionar al usuario al que quieres eliminar una advertencia.");

    const userId = mentionedUser.split('@')[0];
    const indexToRemove = parseInt(args[1], 10) - 1; // Índice de la advertencia a eliminar

    // Verificar si el usuario tiene advertencias
    if (!warnings[userId] || warnings[userId].length === 0) {
        return enviar(`⚠️ El usuario @${userId} no tiene advertencias.`);
    }

    if (isNaN(indexToRemove)) {
        // Eliminar todas las advertencias si no se especifica un número
        delete warnings[userId];
        saveWarnings();
        return enviar(`✅ Todas las advertencias del usuario @${userId} han sido eliminadas.`);
    }

    // Verificar si el índice es válido
    if (indexToRemove < 0 || indexToRemove >= warnings[userId].length) {
        return enviar(`❌ Número de advertencia inválido. El usuario @${userId} tiene *${warnings[userId].length} advertencia(s).*`);
    }

    // Eliminar la advertencia específica
    warnings[userId].splice(indexToRemove, 1);

    // Eliminar el registro del usuario si ya no tiene advertencias
    if (warnings[userId].length === 0) {
        delete warnings[userId];
    }

    saveWarnings();
    enviar(`✅ La advertencia número *${indexToRemove + 1}* del usuario @${userId} ha sido eliminada.`);
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
    if (!isGroup) {
        enviar("❌ Este comando solo puede ser usado en grupos.");
        break;
    }

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
        return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
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
        return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
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
