/* CHARGEMENT DES FICHIERS POUR CHAQUE NOTE DE MUSIQUE */
var audioDo = new Audio('sons/Do_Piano.wav');
var audioDoD = new Audio('sons/DoD_Piano.wav');
var audioRe = new Audio('sons/Re_Piano.wav');
var audioReD = new Audio('sons/ReD_Piano.wav');
var audioMi = new Audio('sons/Mi_Piano.wav');
var audioFa = new Audio('sons/Fa_Piano.wav');
var audioFaD = new Audio('sons/FaD_Piano.wav');
var audioSol = new Audio('sons/Sol_Piano.wav');
var audioSolD = new Audio('sons/SolD_Piano.wav');
var audioLa = new Audio('sons/La_Piano.wav');
var audioLaD = new Audio('sons/LaD_Piano.wav');
var audioSi = new Audio('sons/Si_Piano.wav');

//Chargement de la percussion pour le métronome//
const audioMetronome = new Audio('sons/percu_metronome.wav');


/* RECUPERATION DES NOTES DU HTML  */
// Chacune des notes est un element path du svg, 
// et possede un attribut id qui permet de la retrouver en javascript
var Do = document.getElementById('DO');
var DoD = document.getElementById('DOD');
var Re = document.getElementById('RE');
var ReD = document.getElementById('RED');
var Mi = document.getElementById('MI');
var Fa = document.getElementById('FA');
var FaD = document.getElementById('FAD');
var Sol = document.getElementById('SOL');
var SolD = document.getElementById('SOLD');
var La = document.getElementById('LA');
var LaD = document.getElementById('LAD');
var Si = document.getElementById('SI');

/* AUTRES ELEMENTS UTILES : */
// Le tableau dit 'looper' ou sont notees les notes enregistrées.
var pianoTable = document.getElementById('pianoTable');

// La barre de lecture, simple effet esthétique, qui se déplace pendant que les notes sont lues.
var barreDeLecture = document.getElementById('barreDeLecture');

// Les trois boutons : play, record et clear (delete).
var playButton = document.getElementById('playButton');
var recordButton = document.getElementById('recordButton');
var deleteButton = document.getElementById('deleteButton')

/* VARIABLE TABLE */
// La variable table contient toutes les notes enregistrees, ainsi que leur place dans le temps (en millisecondes).
// Cela donne, une fois remplie : table([[tempsAvantDeJouerNote1,Note1], [tempsAvantDeJouerNote2,Note2]...])
var table = new Map();

// isrec : booleen qui indique si l'enregistrement est en cours ou non.
var isrec = false;

// isreading : booleen qui indique si la lecture est en cours ou non (utile notamment pour ne pas cliquer sur les autres boutons).
var isreading = false;

// tempo : tempo des notes en lecture, le temps entre chaque note dépend du tempo.
var tempo = 120;

// expirationTime : commence a zero, mais grandit a chaque note enregistree, c'est le tempsAvantDeJourLaNote dans le tableau.
var expirationTime = 0;

// la liste des instruments
var select = document.getElementById('instrument-select');

// la liste des bpm
var bpm = document.getElementById('bpm');

// metronome : définit de base à 0 il va par la suite définir l'intervale à laquelle on jouera la percussion
var metronome = 0;

// isPlayingMetronome : booleen qui indique si le metronome est en cours ou non
var isPlayingMetronome = false;

// bpmValue : de base définit à 60, il va prendre la valeur de la liste bpm 
var bpmValue = 60;

/* CHAQUE NOTE A UNE FONCTION, QUI JOUE LA NOTE, ET FAIT UN EFFET ESTHETIQUE SUR L'ELEMENT */
var playDo = function () {
    audioDo.currentTime = 0;
    audioDo.play();
    Do.style.fill = "#CCC";
    setTimeout(function () {
        Do.style.fill = "#FFFFF7";
    }, 300);
}

var playDoD = function () {
    audioDoD.currentTime = 0;
    audioDoD.play();
    DoD.style.fill = "#666";
    setTimeout(function () {
        DoD.style.fill = "#4B4B4B";
    }, 300);
}

var playRe = function () {
    audioRe.currentTime = 0;
    audioRe.play();
    Re.style.fill = "#CCC";
    setTimeout(function () {
        Re.style.fill = "#FFFFF7";
    }, 300);
}

var playReD = function () {
    audioReD.currentTime = 0;
    audioReD.play();
    ReD.style.fill = "#666";
    setTimeout(function () {
        ReD.style.fill = "#4B4B4B";
    }, 300);
}

var playMi = function () {
    audioMi.currentTime = 0;
    audioMi.play();
    Mi.style.fill = "#CCC";
    setTimeout(function () {
        Mi.style.fill = "#FFFFF7";
    }, 300);
}

var playFa = function () {
    audioFa.currentTime = 0;
    audioFa.play();
    Fa.style.fill = "#CCC";
    setTimeout(function () {
        Fa.style.fill = "#FFFFF7";
    }, 300);
}

var playFaD = function () {
    audioFaD.currentTime = 0;
    audioFaD.play();
    FaD.style.fill = "#666";
    setTimeout(function () {
        FaD.style.fill = "#4B4B4B";
    }, 300);
}

var playSol = function () {
    audioSol.currentTime = 0;
    audioSol.play();
    Sol.style.fill = "#CCC";
    setTimeout(function () {
        Sol.style.fill = "#FFFFF7";
    }, 300);
}

var playSolD = function () {
    audioSolD.currentTime = 0;
    audioSolD.play();
    SolD.style.fill = "#666";
    setTimeout(function () {
        SolD.style.fill = "#4B4B4B";
    }, 300);
}

var playLa = function () {
    audioLa.currentTime = 0;
    audioLa.play();
    La.style.fill = "#CCC";
    setTimeout(function () {
        La.style.fill = "#FFFFF7";
    }, 300);
}

var playLaD = function () {
    audioLaD.currentTime = 0;
    audioLaD.play();
    LaD.style.fill = "#666";
    setTimeout(function () {
        LaD.style.fill = "#4B4B4B";
    }, 300);
}

var playSi = function () {
    audioSi.currentTime = 0;
    audioSi.play();
    Si.style.fill = "#CCC";
    setTimeout(function () {
        Si.style.fill = "#FFFFF7";
    }, 300);
}

/* ON METS DES LISTENER SUR LES NOTES DU PIANO */
Do.addEventListener('click', function (event) {
    // Quand on clic Do, on appelle la fonction playNote(), en lui donnant le code 83, puis on log 'Do'.
    playNote(83);
    console.log('Do');
});

DoD.addEventListener('click', function (event) {
    playNote(69);
    console.log('DoD');
});

Re.addEventListener('click', function (event) {
    playNote(68);
    console.log('Re');
});

ReD.addEventListener('click', function (event) {
    playNote(82);
    console.log('ReD');
});

Mi.addEventListener('click', function (event) {
    playNote(70);
    console.log('Mi');
});

Fa.addEventListener('click', function (event) {
    playNote(71);
    console.log('Fa');
});

FaD.addEventListener('click', function (event) {
    playNote(89);
    console.log('FaD');
});

Sol.addEventListener('click', function (event) {
    playNote(72);
    console.log('Sol');
});

SolD.addEventListener('click', function (event) {
    playNote(85);
    console.log('SolD');
});

La.addEventListener('click', function (event) {
    playNote(74);
    console.log('La');
});

LaD.addEventListener('click', function (event) {
    playNote(73);
    console.log('LaD');
});

Si.addEventListener('click', function (event) {
    playNote(75);
    console.log('Si');
});

/* ON AJOUTE UN LISTENER SUR LE CLAVIER */
document.addEventListener('keyup', (event) => {
    // Quand une touche est cliquee, on empeche l'evenement par defaut, et on appelle playNote avec le code associé a la note.
    event.preventDefault();
    playNote(event.keyCode);
});

/* LA FONCTION PLAYNOTE(noteCode) JOUE LA NOTE ASSOCIEE AU CODE, ET L'ENREGISTRE SI LE MODE ENREGISTREMENT EST ACTIVE */
var playNote = function (noteCode) {
    // Le rang par defaut est hors du tableau
    var rang = 12;
    // En fonction de la touche ou du code reçu, on joue une certaine note, 
    switch (noteCode) {
        case 83:
            playDo();
            rang = 0;
            break;
        case 69:
            playDoD();
            rang = 1;
            break;
        case 68:
            playRe();
            rang = 2;
            break;
        case 82:
            playReD();
            rang = 3;
            break;
        case 70:
            playMi();
            rang = 4;
            break;
        case 71:
            playFa();
            rang = 5;
            break;
        case 89:
            playFaD();
            rang = 6;
            break;
        case 72:
            playSol();
            rang = 7;
            break;
        case 85:
            playSolD();
            rang = 8;
            break;
        case 74:
            playLa();
            rang = 9;
            break;
        case 73:
            playLaD();
            rang = 10;
            break;
        case 75:
            playSi();
            rang = 11;
            break;
        default:
            rang = 12;
            break;
    }

    // Si l'enregistrement est en cours...
    if (isrec == true) {
        // On rajoute la note dans le tableau
        table.set(expirationTime, noteCode);
        // On augmente le temps avant de jouer la prochaine note
        expirationTime += (1000 / (bpmValue / 60));
        
        // Si la note est une note, on la dessine sur l'element pianoTable
        if (rang != 12) {
            pianoTable.rows[rang].children[expirationTime / (1000 / (bpmValue / 60))].style.background = "black";
        }

        // On verifie que le temps n'a pas depasse le temps maximum d'enregistrement
        if (expirationTime >= 60000/bpmValue*32) {
            isrec = false;
            recordButton.style.filter = "";
            expirationTime = 0;
        }
    }
}

/* LA FONCTION PLAYTABLE() JOUE LES NOTES ENREGISREES DANS LE TABLEAU */
var playTable = function () {
    if (!isreading) {
        // On grise les icones, on lance la barre de lecture, mais seulement pendant un certain temps
        isreading = true;

        // si le metronme est à 60 bpm mettre la classe reading60 à la barre de lecture
        if (bpmValue == 60) {
            barreDeLecture.classList = "reading60";
        }

        // si le metronme est à 90 bpm mettre la classe reading90 à la barre de lecture
        if (bpmValue == 90) {
            barreDeLecture.classList = "reading90";
        }

        // si le metronme est à 120 bpm mettre la classe reading120 à la barre de lecture
        if (bpmValue == 120) {
            barreDeLecture.classList = "reading120";
        }

        // si le metronme est à 140 bpm mettre la classe reading140 à la barre de lecture
        if (bpmValue == 140) {
            barreDeLecture.classList = "reading140";
        }

        playButton.style.filter = "grayscale()";
        recordButton.style.filter = "grayscale()";
        deleteButton.style.filter = "grayscale()";
        setTimeout(function () {
            barreDeLecture.classList = "";
            isreading = false;
            playButton.style.filter = "";
            recordButton.style.filter = "";
            deleteButton.style.filter = "";
        }, 60000/bpmValue*32);
        // On arrete l'enregistrement
        isrec = false;
        // On remet le temps a 0
        expirationTime = 0;
        console.log("Lecture des notes enregistrées...");
        console.log(table);
        
        // Pour chaque couple [temps, note] du tableau, on appelle la fontion setTimeout(fn, delay) qui permet d'appeler une fonction apres un certain delai
        for (var [timeout, keycode] of table) {
            switch (keycode) {
                case 83:
                    setTimeout(playDo, timeout);
                    break;
                case 69:
                    setTimeout(playDoD, timeout);
                    break;
                case 68:
                    setTimeout(playRe, timeout);
                    break;
                case 82:
                    setTimeout(playReD, timeout);
                    break;
                case 70:
                    setTimeout(playMi, timeout);
                    break;
                case 71:
                    setTimeout(playFa, timeout);
                    break;
                case 89:
                    setTimeout(playFaD, timeout);
                    break;
                case 72:
                    setTimeout(playSol, timeout);
                    break;
                case 85:
                    setTimeout(playSolD, timeout);
                    break;
                case 74:
                    setTimeout(playLa, timeout);
                    break;
                case 73:
                    setTimeout(playLaD, timeout);
                    break;
                case 75:
                    setTimeout(playSi, timeout);
                    break;
                case 32:
                    break;
            }
        }
    }
}

// La fonction changeIsRec() est appelée par le bouton rec, elle nettoie le tableau et lance l'enregistrement.
var changeIsRec = function () {
    if (!isreading) {
        clearTable();
        isrec = true;
        recordButton.style.filter = "hue-rotate(30deg)";
    }
}

// la fonction clearTable() est appelée par le bouton clear et la fonction changeIsRec(), elle remet les deux tableaux (physique et logiciel) a zero.
var clearTable = function () {
    if (!isreading) {
        isrec = false;
        recordButton.style.filter = "";
        table.clear();
        expirationTime = 0;
        for (var row of pianoTable.rows) {
            for (var td of row.children) {
                // Toutes les cellules ont un fond blanc
                td.style.background = "white";
            }
        }
    }
}


//La fonction playBpm intervient pour jouer le son de la percussion
var playBpm = function () {
    audioMetronome.currentTime = 0;
    audioMetronome.play();
}

// on ajoute un listener sur la liste bpm
bpm.addEventListener('change', function() {
    bpmValue = Number(bpm.value);
});

//La fonction PlayMetronome qui s'active lorqu'on appuie sur le bouton depuis le html change l'intervalle avec laquelle on répète le son pour repsecter le tempo
var playMetronome = function() {
    if (isPlayingMetronome == false) {
        isPlayingMetronome = true;
        metronome = setInterval(playBpm, (60/bpmValue)*1000);// calcul de l'intervalle en milisecondes pour répéter correctement le son de la percussion
    }
    else {
        isPlayingMetronome = false;
        clearInterval(metronome);//on arrête le métronome pour pouvour recevoir une nouvelle information sur le tempo
    }
}

// on ajoute un listener sur la liste des instruments
select.addEventListener("change", function() {
    // à chaque fois que l'on change un instrument le fond change de couleur et les sons
    switch (select.value) { 
        case 'piano':
            document.body.style.background = "#16E3CD";
            audioDo = new Audio('sons/Do_Piano.wav');
            audioDoD = new Audio('sons/DoD_Piano.wav');
            audioRe = new Audio('sons/Re_Piano.wav');
            audioReD = new Audio('sons/ReD_Piano.wav');
            audioMi = new Audio('sons/Mi_Piano.wav');
            audioFa = new Audio('sons/Fa_Piano.wav');
            audioFaD = new Audio('sons/FaD_Piano.wav');
            audioSol = new Audio('sons/Sol_Piano.wav');
            audioSolD = new Audio('sons/SolD_Piano.wav');
            audioLa = new Audio('sons/La_Piano.wav');
            audioLaD = new Audio('sons/LaD_Piano.wav');
            audioSi = new Audio('sons/Si_Piano.wav');
            break;

        case 'guitar':
            document.body.style.background = "#F8BA47";
            audioDo = new Audio('sons/Do_Guitare.wav');
            audioDoD = new Audio('sons/DoD_Guitare.wav');
            audioRe = new Audio('sons/Re_Guitare.wav');
            audioReD = new Audio('sons/ReD_Guitare.wav');
            audioMi = new Audio('sons/Mi_Guitare.wav');
            audioFa = new Audio('sons/Fa_Guitare.wav');
            audioFaD = new Audio('sons/FaD_Guitare.wav');
            audioSol = new Audio('sons/Sol_Guitare.wav');
            audioSolD = new Audio('sons/SolD_Guitare.wav');
            audioLa = new Audio('sons/La_Guitare.wav');
            audioLaD = new Audio('sons/LaD_Guitare.wav');
            audioSi = new Audio('sons/Si_Guitare.wav');
            break;

        case 'flute':
            document.body.style.background = "#F1F115";
            audioDo = new Audio('sons/Do_flute.wav');
            audioDoD = new Audio('sons/DoD_flute.wav');
            audioRe = new Audio('sons/Re_flute.wav');
            audioReD = new Audio('sons/ReD_flute.wav');
            audioMi = new Audio('sons/Mi_flute.wav');
            audioFa = new Audio('sons/Fa_flute.wav');
            audioFaD = new Audio('sons/FaD_flute.wav');
            audioSol = new Audio('sons/Sol_flute.wav');
            audioSolD = new Audio('sons/SolD_flute.wav');
            audioLa = new Audio('sons/La_flute.wav');
            audioLaD = new Audio('sons/LaD_flute.wav');
            audioSi = new Audio('sons/Si_flute.wav');
            break;

        case 'bass':
            document.body.style.background = "#62F224";
            audioDo = new Audio('sons/Do_Basse.wav');
            audioDoD = new Audio('sons/DoD_Basse.wav');
            audioRe = new Audio('sons/Re_Basse.wav');
            audioReD = new Audio('sons/ReD_Basse.wav');
            audioMi = new Audio('sons/Mi_Basse.wav');
            audioFa = new Audio('sons/Fa_Basse.wav');
            audioFaD = new Audio('sons/FaD_Basse.wav');
            audioSol = new Audio('sons/Sol_Basse.wav');
            audioSolD = new Audio('sons/SolD_Basse.wav');
            audioLa = new Audio('sons/La_Basse.wav');
            audioLaD = new Audio('sons/LaD_Basse.wav');
            audioSi = new Audio('sons/Si_Basse.wav');
            break;
    }

});
